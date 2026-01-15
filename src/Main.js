import React from 'react';
import Counter from './components/Counter'; 

export default function Main({ products, onAdd }) {
  return (
    <main className="container">
      <h2 className="mb-4">Products</h2>
      {/* 'row' acts as the flex container */}
      <div className="row">
        {products && products.map((item) => (
          /* 'col-md-3' ensures 4 items per row on desktop */
          <div key={item.id} className="col-12 col-sm-6 col-md-3 mb-4">
            <Counter 
              counter={item} 
              onAdd={onAdd} 
            />
          </div>
        ))}
      </div>
    </main>
  );
}