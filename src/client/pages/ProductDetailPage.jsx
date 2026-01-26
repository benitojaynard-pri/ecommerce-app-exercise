import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './product.css'; 

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const dataToUpdate = {
      id: parseInt(id),
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      description: product.description
    };

    try {
      const response = await fetch(`http://localhost:5001/api/products/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToUpdate),
      });

      if (response.ok) {
        alert("✅ Saved!");
        window.location.href = "/"; 
      }
    } catch (err) {
      alert("❌ Save failed.");
    }
  };

  const handleDelete = async () => {
    // Confirmation dialog
    const confirmDelete = window.confirm("Are you sure to delete this product?");
    
    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:5001/api/products/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("🗑️ Product deleted!");
                window.location.href = "/"; 
            } else {
                alert("❌ Failed to delete product.");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("❌ Error connecting to server.");
        }
    }
};

  if (loading) return <div className="product-detail-container">Loading...</div>;

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Products
      </button>
      
      <div className="edit-card">
        {/* KALIWA: Image Section */}
        <div className="image-preview-section">
          <img src={product.image} alt={product.name} className="preview-image" />
          <p className="label-preview">Image Preview</p>
        </div>

        {/* KANAN: Form Section */}
        <form className="form-section" onSubmit={handleSave}>
          <h2>Edit Product Details</h2>

          <div className="input-group">
            <label>Product Name</label>
            <input 
              name="name" 
              className="input-field"
              value={product.name} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Price ($)</label>
            <input 
              type="number" 
              name="price" 
              className="input-field"
              value={product.price} 
              onChange={handleInputChange} 
              step="0.01" 
              required 
            />
          </div>

          <div className="input-group">
            <label>Image URL</label>
            <input 
              name="image" 
              className="input-field"
              value={product.image} 
              onChange={handleInputChange} 
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea 
              name="description" 
              className="textarea-field"
              value={product.description} 
              onChange={handleInputChange} 
              rows="5"
            />
          </div>
          <div className="button-group">
           <button type="submit" className="save-button">Save Changes</button>
           <button type="button" className="delete-button" onClick={handleDelete}>
           Delete Product
           </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductDetail;
     