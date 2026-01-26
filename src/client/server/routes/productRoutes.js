const express = require('express');
const router = express.Router();
const { sequelize, ProductModel } = require('../models/product'); 
const Joi = require('joi');

const productValidationSchema = Joi.object({
    id: Joi.any().optional(),
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().required(),
    price: Joi.number().precision(2).positive().required(),
    category: Joi.string().optional(),
    image: Joi.string().required(),
    // Ginawang optional dahil may default values sa DB, 
    // pero nilagyan ng validation para sa tamang data type
    rate: Joi.number().min(0).max(5).default(0),
    count: Joi.number().integer().min(0).default(0),
    stock: Joi.number().integer().min(0).default(0)
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
// server/routes/productRoutes.js

router.post('/add', async (req, res) => {
    // 1. I-validate ang request body
    console.log('Body', req.body);
    
    const { error, value } = productValidationSchema.validate(req.body, { 
        abortEarly: false // Ipakita lahat ng error, hindi lang yung una
    });

    if (error) {
        // Kunin lahat ng validation messages at ibalik sa frontend
        const errorMessages = error.details.map(detail => detail.message);
        console.log('Body', req.body);
        return res.status(400).json({ 
            message: "Validation Failed", 
            errors: errorMessages 
        });
    }

    try {
        // 2. Gamitin ang 'value' mula sa Joi (ito yung malinis na data na may defaults)
        const newProduct = await ProductModel.create(value);
        
        console.log(`✅ Product created: ${newProduct.name}`);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("❌ Database Error:", err);
        res.status(500).json({ 
            message: "Internal Server Error", 
            error: err.message 
        });
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
        const { id } = req.params;
        const deleted = await ProductModel.destroy({
            where: { id: id }
        });

        if (deleted) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
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