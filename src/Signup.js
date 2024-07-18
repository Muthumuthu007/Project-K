import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();

    const payload = {
      "username": username,
      "email": email,
      "password": password
    };

    try {
      console.log(payload);
      const response = await axios.post('http://18.222.131.4:8000/register', payload);
      console.log(response.data);

      if (response.data.status === 'User registered successfully!') {
        setError('');
        navigate('/login');
      }
      if (response.data.status === 'Username or email already exists!') {
        setError('Username already Exist');
        
      } else {
        setError('Invalid registration details');
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
      <h1>Signup</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
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
            Email:
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
