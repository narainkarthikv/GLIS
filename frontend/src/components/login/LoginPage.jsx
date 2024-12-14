import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/LoginPage.css';

const LoginPage = ({ isAuthenticated, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (email, pass) => {
    try {
      setIsSubmitting(true);

      const response = await fetch('https://glis-stats-on-view.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pass }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      setIsAuthenticated(true); 
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && pass) {
      handleLogin(email, pass);
    } else {
      setError('Please enter both email and password');
    }
  };

  return isAuthenticated ? (
    <Link to='/'></Link>
  ) : (
    <div className="Login">
      <form className="LoginForm" onSubmit={onSubmit}>
        <img className="loginform-img" src="https://img.icons8.com/windows/96/17ed9f/smile-beam.png" alt="login" />
        <h1 className='loginform-header'>Login Page</h1>
        <div className="loginform-group">
        <label className='loginform-label' htmlFor="email">Email:</label>
          <input
            id="email"
            className='loginform-control'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="loginform-group">
        <label className='loginform-label' htmlFor="password">Password:</label>
          <input
            id="password"
            className='loginform-control'
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="loginform-submit-container">
           <button className={`loginform-submit-btn ${isSubmitting ? 'loading' : ''}`} type="submit" disabled={isSubmitting}>
              {isSubmitting ? (<div class="loader">Loading...</div>) : 'Login'}
           </button>
        </div>

        {error && <div className="loginform-error-msg">{error}</div>}
        
        <div className="loginform-signup">
          Don't have an account? <Link className="loginform-signup-btn" to="/signup">Sign Up</Link>
        </div>

      </form>
    </div>
  );
};

export default LoginPage;
