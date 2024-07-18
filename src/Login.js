import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      "username": username,
      "password": password
    };

    try {
      console.log(payload);
      const response = await axios.post('http://18.222.131.4:8000/get-user-details', payload);
      console.log(response.data);

      if (response.data.status === 'success') {
        setIsLoggedIn(true);
        setError('');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        setError(error.response.data.message || 'Invalid username or password');
      } else {
        console.error('Error:', error.message);
        setError('Invalid username or password');
      }
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <h2>Welcome, {username}!</h2>
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
          <button type="button" onClick={() => navigate('/signup')}>Sign up</button>
        </form>
      )}
    </div>
  );
}

export default Login;
