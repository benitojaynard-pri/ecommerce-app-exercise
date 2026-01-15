import React from 'react';
import Counter from './components/Counter'; 

export default function Main({ products, onAdd, onRemove, cartItems }) {
    return (
      <main className="container mt-4">
        <div className="row">
          {products.map((item) => {
            // Check if this item is in the cart to get its quantity
            const exist = cartItems.find((x) => x.id === item.id);
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