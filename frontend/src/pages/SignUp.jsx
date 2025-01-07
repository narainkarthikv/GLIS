import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [formState, setFormState] = useState({
    Usr_name: '',
    Usr_email: '',
    Usr_phone: '',
    Usr_address: '',
    Usr_pass: '',
    confirmPassword: '',
    role: '',
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
      const response = await axios.post('https://glis-yqvt.onrender.com/api/user/add', formData);

      console.log('Response from server:', response.data);
      navigate('/login'); 

    } catch (error) {
      setError('Failed to sign up');
      console.error('Error signing up:', error);
    }
  };

  return (
    <React.Fragment>
      <div>
      <form className='max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold mb-4 text-center'>Sign Up</h2>
        <div className='mb-4 flex items-center'>
          <label className='block text-gray-700 w-1/3'>Username:</label>
          <input
            id="Usr_name"
            className='w-2/3 px-3 py-2 border rounded'
            type="text"
            name="Usr_name"
            value={formState.Usr_name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='block text-gray-700 w-1/3'>Email:</label>
          <input
            id="Usr_email"
            className='w-2/3 px-3 py-2 border rounded'
            type="email"
            name="Usr_email"
            value={formState.Usr_email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='block text-gray-700 w-1/3'>Phone:</label>
          <input
            id="Usr_phone"
            className='w-2/3 px-3 py-2 border rounded'
            type="text"
            name="Usr_phone"
            value={formState.Usr_phone}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='block text-gray-700 w-1/3'>Address:</label>
          <input
            id="Usr_address"
            className='w-2/3 px-3 py-2 border rounded'
            type="text"
            name="Usr_address"
            value={formState.Usr_address}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='block text-gray-700 w-1/3'>Password:</label>
          <input
            id="Usr_pass"
            className='w-2/3 px-3 py-2 border rounded'
            type="password"
            name="Usr_pass"
            value={formState.Usr_pass}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='block text-gray-700 w-1/3'>Confirm Password:</label>
          <input
            id="confirmPassword"
            className='w-2/3 px-3 py-2 border rounded'
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='block text-gray-700 w-1/3'>Select Role:</label>
          <select
            className='w-2/3 px-3 py-2 border rounded'
            name="role"
            value={formState.role}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="farmer">Farmer</option>
            <option value="governmentOfficial">Government Official</option>
          </select>
          {error && <p className='text-red-500 mt-2'>{error}</p>}
        </div>
        <div className='text-center'>
          <button className='w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600' type='submit'>Sign Up</button>
          </div>
      <div className="text-center mt-4">
        Already have an account? <Link className="text-blue-500" to="/login">Login</Link>
      </div>
      </form>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
