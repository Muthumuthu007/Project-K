import React, { useState } from 'react';
import axios from 'axios';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      "username": username,
      "password": password

    }
    try {
      console.log(payload);
      const response = await axios.post('http://3.16.49.62:8000/get-user-details',payload);
      console.log(response.data.status);

      if (response.data.status === 'success') { 
        setIsLoggedIn(true);
        setError('');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <h2>Welcome, Muthu!</h2>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
          
        </form>
      )}
    </div>
  );
}

export default Login;