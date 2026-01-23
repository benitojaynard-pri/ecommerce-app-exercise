import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import products from "./components/Products";
import Main from "./Main";
import Basket from "./Basket"
import { ProductModel } from "./models/product";

function App() {
  const [cartItems, setCartItems] = useState([]);
  console.log(ProductModel)

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


