import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./client/components/NavBar";
import products from "./client/components/Products";
import Main from "./Main";
import Basket from "./Basket";


function App() {
  // Inside your React Component
const [products, setProducts] = useState([]);

useEffect(() => {
  fetch('http://localhost:5000/api/products')
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error("API Error:", err));
}, []);
  const [cartItems, setCartItems] = useState([]);
  

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <Router>
      <div className="App">
        <NavBar countCartItems={cartItems.length} />
        <Routes>
          <Route path="/" element={
            <Main 
              products={products} 
              onAdd={onAdd} 
              onRemove={onRemove} 
              cartItems={cartItems} 
            />
          } />
          <Route path="/cart" element={
            <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


