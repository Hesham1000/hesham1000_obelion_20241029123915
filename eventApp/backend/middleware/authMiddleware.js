```javascript
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('eventApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

const authMiddleware = {
  authenticateToken: async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      req.user = user;
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid token' });
    }
  },

  authorizeRole: (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    };
  }
};

module.exports = authMiddleware;
```