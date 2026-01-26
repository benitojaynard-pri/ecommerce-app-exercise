// src/components/AddProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './product.css';

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '', description: '', price: '', category: '',
    image: '', rate: 0, count: 0, stock: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("✅ Product Added!");
        navigate('/');
      }
    } catch (err) {
      alert("❌ Error adding product");
    }
  };

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      <form className="edit-card form-section" onSubmit={handleAdd} style={{flexDirection: 'column'}}>
        <h2>Add New Product</h2>
        <div className="input-group">
          <label>Name</label>
          <input name="name" className="input-field" onChange={handleInputChange} required />
        </div>
        <div style={{display: 'flex', gap: '10px'}}>
            <div className="input-group" style={{flex: 1}}>
              <label>Price</label>
              <input type="number" name="price" className="input-field" onChange={handleInputChange} required />
            </div>
            <div className="input-group" style={{flex: 1}}>
              <label>Category</label>
              <input name="category" className="input-field" onChange={handleInputChange} required />
            </div>
        </div>
        <div className="input-group">
          <label>Image URL</label>
          <input name="image" className="input-field" onChange={handleInputChange} required />
        </div>
        <div style={{display: 'flex', gap: '10px'}}>
            <div className="input-group">
                <label>Stock</label>
                <input type="number" name="stock" className="input-field" onChange={handleInputChange} />
            </div>
            <div className="input-group">
                <label>Initial Rate</label>
                <input type="number" name="rate" className="input-field" onChange={handleInputChange} step="0.1" />
            </div>
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea name="description" className="textarea-field" onChange={handleInputChange} rows="4" required />
        </div>
        <button type="submit" className="save-button">Create Product</button>
      </form>
    </div>
  );
}

export default AddProduct;