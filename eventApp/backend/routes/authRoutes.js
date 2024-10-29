```javascript
const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const AuthController = require('../controllers/AuthController');

const sequelize = new Sequelize('eventApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const result = await AuthController.register(email, password);
    return res.status(201).json({ message: 'User registered successfully', data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthController.login(email, password);
    return res.status(200).json({ message: 'Login successful', data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/google-signin', async (req, res) => {
  try {
    const result = await AuthController.googleSignIn();
    return res.status(200).json({ message: 'Google sign-in successful', data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/facebook-signin', async (req, res) => {
  try {
    const result = await AuthController.facebookSignIn();
    return res.status(200).json({ message: 'Facebook sign-in successful', data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```