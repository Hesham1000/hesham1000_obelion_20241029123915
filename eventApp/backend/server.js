const express = require('express');
const mysql = require('mysql');
const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profileRoutes');
// const venueRoutes = require('./routes/venueRoutes');
// const vendorRoutes = require('./routes/vendorRoutes');
// const eventRoutes = require('./routes/eventRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: 'db',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.use('/auth', authRoutes);
// app.use('/profile', profileRoutes);
// app.use('/venues', venueRoutes);
// app.use('/vendors', vendorRoutes);
// app.use('/events', eventRoutes);
// app.use('/payments', paymentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
