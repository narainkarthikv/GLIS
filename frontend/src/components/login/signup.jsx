import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/signup.css'; // Assuming the CSS file path is correct

const SignUp = () => {
  const [formState, setFormState] = useState({
    Usr_name: '',
    Usr_email: '',
    Usr_phone: '',
    Usr_address: '',
    Usr_pass: '',
    confirmPassword: '',
    role: '', // New state for role selection
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.role) {
      setError('Please select a role');
      return;
    }

    if (formState.Usr_pass !== formState.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { confirmPassword, ...formData } = formState;

    try {
      const response = await axios.post('https://glis-backend.onrender.com/api/user/add', formData);

      console.log('Response from server:', response.data);
      navigate('/login'); 

    } catch (error) {
      setError('Failed to sign up');
      console.error('Error signing up:', error);
    }
  };

  return (
    <form className='SignUp' onSubmit={handleSubmit}>
      <h2 className='signupform-header'>Sign Up</h2>
      <div className='signupform-group'>
        <label className='signupform-label'>Username:</label>
        <input
          id="Usr_name"
          className='signupform-control'
          type="text"
          name="Usr_name"
          value={formState.Usr_name}
          onChange={handleChange}
        />
      </div>

      <div className='signupform-group'>
        <label className='signupform-label'>Email:</label>
        <input
          id="Usr_email"
          className='signupform-control'
          type="email"
          name="Usr_email"
          value={formState.Usr_email}
          onChange={handleChange}
        />
      </div>

      <div className='signupform-group'>
        <label className='signupform-label'>Phone:</label>
        <input
          id="Usr_phone"
          className='signupform-control'
          type="text"
          name="Usr_phone"
          value={formState.Usr_phone}
          onChange={handleChange}
        />
      </div>

      <div className='signupform-group'>
        <label className='signupform-label'>Address:</label>
        <input
          id="Usr_address"
          className='signupform-control'
          type="text"
          name="Usr_address"
          value={formState.Usr_address}
          onChange={handleChange}
        />
      </div>

      <div className='signupform-group'>
        <label className='signupform-label'>Password:</label>
        <input
          id="Usr_pass"
          className='signupform-control'
          type="password"
          name="Usr_pass"
          value={formState.Usr_pass}
          onChange={handleChange}
        />
      </div>

      <div className='signupform-group'>
        <label className='signupform-label'>Confirm Password:</label>
        <input
          id="confirmPassword"
          className='signupform-control'
          type="password"
          name="confirmPassword"
          value={formState.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className='signupform-group'>
        <label className='signupform-label'>Select Role:</label>
        <select
          className='signupform-control'
          name="role"
          value={formState.role}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="farmer">Farmer</option>
          <option value="governmentOfficial">Government Official</option>
        </select>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div className='signupform-submit-container'>
        <button className='signupform-submit-btn' type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUp;
