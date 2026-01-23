const express = require('express');
const cors = require('cors');
// Import the sequelize instance and the Model from your product.js
const { sequelize, ProductModel } = require('./models/product'); 

const app = express();
const PORT = 5001;

// 1. Middleware
app.use(cors()); // Allows React (port 3000) to talk to this server
app.use(express.json()); // Allows server to read JSON bodies in POST requests

// 2. API Routes
app.get('/api/products', async (req, res) => {
  try {
    // Fetch all products from the 'products' table in the 'sys' database
    const products = await ProductModel.findAll();
    
    // Log for debugging in your terminal
    console.log(`Successfully fetched ${products.length} products.`);
    
    res.json(products);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ 
      message: "Internal Server Error", 
      details: error.message 
    });
  }
});

// 3. Start Server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
  // Optional: Verify DB connection on startup
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL (sys database) via Sequelize.');
  } catch (err) {
    console.error('Database connection failed at startup:', err);
  }
});