const express = require('express');
const router = express.Router();
const User = require('../Model/user.js'); // Import User model

router.post('/add', async (req, res) => {
  try {
    const { Usr_name, Usr_email, Usr_phone, Usr_address, Usr_pass, role } = req.body;

    // Create a new user without hashing the password
    const newUser = new User({
      Usr_name,
      Usr_email,
      Usr_phone,
      Usr_address,
      Usr_pass, // Store the password in plain text (not recommended)
      role
    });

    await newUser.save(); // Save the user to the database

    const response = {
      message: 'User created successfully'
    };
    res.status(200).json(response);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ Usr_email: email });

    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password without bcrypt (not recommended)
    if (user.Usr_pass !== pass) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If both email and password are valid, return 200 OK
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
