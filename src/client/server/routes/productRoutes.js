const express = require('express');
const router = express.Router();
const { sequelize, ProductModel } = require('../models/product'); 
const Joi = require('joi');
const app = express();

// --- FORM VALIDATION SCHEMA ---
const productValidationSchema = Joi.object({
    id: Joi.number().optional(),
    name: Joi.string().min(3).required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().uri().required(),
});

// 1. GET ALL PRODUCTS
router.get('/', async (req, res) => {
    try {
      console.log("working all products.");
      
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

// 2. ADD PRODUCT (with Validation)
router.post('/add', async (req, res) => {
    // Validate form data against schema
    const { error } = productValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: "Error saving product", error: err.message });
    }
});

// 3. UPDATE PRODUCT
router.put('/update/:id', async (req, res) => {
    // 1. Validation check (Siguraduhin na match ang fields sa schema mo)
    const { error } = productValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const { id } = req.params;

        // 2. Sequelize Update Syntax para sa MySQL
        const [updatedRows] = await ProductModel.update(
            {
                id: req.params.id,
                name: req.body.name,
                price: req.body.price,
                image: req.body.image,
                description: req.body.description
            },
            { where: { id: id } } // 'id' column sa MySQL
        );

        if (updatedRows > 0) {
            // Kunin ang bagong data para i-return sa frontend
            const updatedProduct = await ProductModel.findByPk(id);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: "No changes made or product not found" });
        }
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ message: "Update failed", error: err.message });
    }
});

// 4. DELETE PRODUCT
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
});

// 5. Get By Id
router.get('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findByPk(req.params.id);
        if (product) res.json(product);
        else res.status(404).send("Not found");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;