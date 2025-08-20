// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mobileRoutes = require('./routes/mobileRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/mobiles', mobileRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 