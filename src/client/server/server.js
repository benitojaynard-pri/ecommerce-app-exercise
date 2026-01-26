const express = require('express');
const cors = require('cors');
// Import the sequelize instance and the Model from your product.js
const { sequelize, ProductModel } = require('./models/product'); 
const ProductRoutes = require('./routes/productRoutes')

const app = express();
const PORT = 5001;

// 1. Middleware
app.use(cors()); // Allows React (port 3000) to talk to this server
app.use(express.json()); // Allows server to read JSON bodies in POST requests

// 2. routes
app.use('/api/products/', ProductRoutes);

// 3. Start Server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  sequelize.sync({ alter: true }) // 'alter: true' ay mag-uupdate ng columns nang hindi binubura ang table
  .then(() => console.log('Database synced & ID set to auto-increment'))
  .catch(err => console.error('Sync error:', err));
  
  // Optional: Verify DB connection on startup
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL (sys database) via Sequelize.');
  } catch (err) {
    console.error('Database connection failed at startup:', err);
  }
});