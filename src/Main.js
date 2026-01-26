import React, { useState, useEffect } from 'react'; // Idinagdag ang useState at useEffect
import Counter from './client/components/Counter'; 
import { useNavigate } from 'react-router-dom';

// Inalis ang 'products' sa props dahil gagamit tayo ng internal state (fetch)
export default function Main({ onAdd, onRemove, cartItems }) {
  const [products, setProducts] = useState([]); // Eto ang source ng products mo
  const [loading, setLoading] = useState(true); // Para sa loading state
  const navigate = useNavigate();

  // 1. Fetch products tuwing mag-load ang page
  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // 2. Loading State
  if (loading) {
    return <div className="container mt-5 text-center"><h3>Loading products...</h3></div>;
  }

  // 3. Guard clause
  if (!products || products.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <div className="header-actions mb-3">
            <button className="add-main-btn" onClick={() => navigate('/add-product')}>
                + Add New Product
            </button>
        </div>
        <h3>No products found. Please check your database.</h3>
      </div>
    );
  }

  return (
    <main className="container mt-4">
      <div className="header-actions mb-4">
        <button className="add-main-btn" onClick={() => navigate('/add-product')}>
            + Add New Product
        </button>
      </div>

      <div className="row">
        {products.map((item) => {
          // Siguraduhing safe ang cartItems check
          const exist = cartItems?.find((x) => x.id === item.id);
          const quantity = exist ? exist.qty : 0;

          return (
            <div key={item.id} className="col-12 col-sm-6 col-md-3 mb-4">
              <Counter 
                counter={item} 
                onAdd={onAdd} 
                onRemove={onRemove}
                quantity={quantity}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}