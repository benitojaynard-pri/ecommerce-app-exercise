const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Joi = require('joi');

// --- FORM VALIDATION SCHEMA ---
const productValidationSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    image: Joi.string().uri().required(),
    stock: Joi.number().min(0).required(),
    rating: Joi.object({
        rate: Joi.number().default(0),
        count: Joi.number().default(0)
    })
});

// 1. GET ALL PRODUCTS
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
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
    // Validate the update data
    const { error } = productValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        // Find by the custom 'id' field in your schema, not the MongoDB _id
        const updatedProduct = await Product.findOneAndUpdate(
            { id: req.params.id }, 
            req.body, 
            { new: true } // returns the modified document rather than the original
        );
        
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: "Update failed", error: err.message });
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

module.exports = router;