import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('https://eventApp-backend.cloud-stacks.com/register', {
        email,
        password,
        confirmPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        history.push('/login');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await axios.post('https://eventApp-backend.cloud-stacks.com/google-signin', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await axios.post('https://eventApp-backend.cloud-stacks.com/facebook-signin', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="social-login">
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        <button onClick={handleFacebookSignIn}>Sign in with Facebook</button>
      </div>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
