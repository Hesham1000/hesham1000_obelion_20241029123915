const nodemailer = require('nodemailer');
const { Sequelize, DataTypes } = require('sequelize');

// Database connection setup
const sequelize = new Sequelize('eventApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

// Email service configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Function to send registration confirmation email
async function sendRegistrationEmail(to, subject, text) {
  try {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: to,
      subject: subject,
      text: text
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = {
  sendRegistrationEmail,
  User
};
