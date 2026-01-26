const express = require('express');
const router = express.Router();
const Product = require('../../models/product'); // Import the model

// Example API Route to get all products
router.get('/products', async (req, res) => {
  try {
    const allProducts = await Product.find();
    console.log("route.js all products");
    
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;