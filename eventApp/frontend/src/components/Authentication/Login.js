import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://eventApp-backend.cloud-stacks.com/api/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        // Save JWT token, redirect to dashboard, etc.
        console.log('Login successful', response.data);
      }
    } catch (error) {
      console.error('Error logging in:', error.response.data.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.post('https://eventApp-backend.cloud-stacks.com/api/google-signin', {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        console.log('Google sign-in successful', response.data);
      }
    } catch (error) {
      console.error('Error with Google sign-in:', error.response.data.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const response = await axios.post('https://eventApp-backend.cloud-stacks.com/api/facebook-signin', {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        console.log('Facebook sign-in successful', response.data);
      }
    } catch (error) {
      console.error('Error with Facebook sign-in:', error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleEmailLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="social-login">
        <button onClick={handleGoogleLogin}>Login with Google</button>
        <button onClick={handleFacebookLogin}>Login with Facebook</button>
      </div>
    </div>
  );
}

export default Login;
