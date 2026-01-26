import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./client/components/NavBar";
import Main from "./Main";
import Basket from "./Basket";
import ProductList from './client/pages/ProductList';
import ProductDetail from './client/pages/ProductDetailPage';
console.log("Checking Component:", ProductDetail);

function App() {
  // Inside your React Component
const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
      const res = await fetch('http://localhost:5001/api/products');
      const data = await res.json();
      setProducts(data);
  };
  fetchProducts();
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
           {/* <Route path="/" element={<ProductList />} /> */}
           <Route path="/product/:id" element={<ProductDetail/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


