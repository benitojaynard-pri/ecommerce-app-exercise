import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Para makabalik sa listahan
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const styles = {
    container: { padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' },
    backBtn: { marginBottom: '20px', padding: '10px 15px', cursor: 'pointer', background: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' },
    card: { display: 'flex', gap: '30px', background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
    imageSection: { flex: '1', textAlign: 'center' },
    previewImg: { width: '100%', borderRadius: '8px', marginBottom: '10px', objectFit: 'cover' },
    formSection: { flex: '2', display: 'flex', flexDirection: 'column', gap: '15px' },
    title: { margin: '0 0 20px 0', color: '#333' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { fontSize: '14px', color: '#666' },
    input: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' },
    textarea: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px', resize: 'vertical' },
    saveBtn: { padding: '15px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px', marginTop: '10px' }
  };

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Hindi mahanap ang product");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // ProductDetailPage.jsx
const handleSave = async (e) => {
  e.preventDefault();

  // I-construct ang object na match sa screenshot at sa backend schema
  const dataToUpdate = {
      name: product.name,
      price: parseFloat(product.price), // Siguraduhing number ito para sa MySQL/Joi
      image: product.image,
      description: product.description
  };

  try {
      const response = await fetch(`http://localhost:5001/api/products/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToUpdate), 
      });

      const result = await response.json();
      if (response.ok) {
          alert("Successfully updated!");
          window.location.href = "/";
      } else {
          alert(`Error: ${result.message}`);
      }
  } catch (err) {
      console.error("Fetch Error:", err);
      alert(" Failed to connect to server.");
  }
};

  if (loading) return <div className="loader">Loading details...</div>;
  if (!product) return <div className="error">Product not found.</div>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backBtn}>← Back to Products</button>
      
      <div style={styles.card}>
        <div style={styles.imageSection}>
          <img src={product.image} alt={product.name} style={styles.previewImg} />
          <p style={styles.label}>Image Preview</p>
        </div>

        <form onSubmit={handleSave} style={styles.formSection}>
          <h2 style={styles.title}>Edit Product Details</h2>

          <div style={styles.inputGroup}>
            <label>Product Name</label>
            <input name="name" value={product.name} onChange={handleInputChange} style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label>Price ($)</label>
            <input type="number" name="price" value={product.price} onChange={handleInputChange} style={styles.input} step="0.01" required />
          </div>

          <div style={styles.inputGroup}>
            <label>Image URL</label>
            <input name="image" value={product.image} onChange={handleInputChange} style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label>Description</label>
            <textarea name="description" value={product.description} onChange={handleInputChange} style={styles.textarea} rows="5" />
          </div>

          <button type="submit" style={styles.saveBtn}>Save Changes</button>
        </form>
      </div>
    </div>
  );
}

// Simple Inline CSS para mabilis mong makita ang resulta


export default ProductDetail;