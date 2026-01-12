import React from 'react';
import Counter from './components/Counter'; 

export default function Main(props) {
  const { products, onAdd } = props;

  return (
    <main className="container mt-4">
      {/* 1. Use the 'row' class to create a grid container */}
      <div className="row">
        {products && products.map((item) => (
          /* 2. col-md-3 means 4 items per row on medium screens (12 / 3 = 4) */
          <div key={item.id} className="col-md-3 mb-4">
            <Counter 
              counter={item} 
              onAdd={() => onAdd(item)} 
            />
          </div>
        ))}
      </div>
    </main>
  );
}