import React from 'react';
import { Link } from 'react-router-dom';

const Counter = ({ counter, onAdd, onRemove, quantity, product }) => {
  const truncate = (str) => {
    if (!str) return ""; // Return empty string if str is undefined/null
    if (str.length > 80) {
      return str.substring(0, 80) + "...";
    }
    return str;
  };

  return (
    <div className="card h-100 shadow-sm border-0">

<Link to={`/product/${counter.id}`}>
        <img 
        src={counter.image} 
        alt={counter.name} 
        className="card-img-top p-3" 
        style={{ height: "180px", objectFit: "contain", cursor: 'cursor' }} 
      />
      </Link>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-bold" style={{ minHeight: "40px" }}>
          {truncate(counter.name, 30)}
        </h6>
        <p className="card-text text-muted mb-1">P{counter.price}</p>
        <p className="card-text small text-secondary" style={{ height: "60px", overflow: "hidden" }}>
          {truncate(counter.description, 80)}
        </p>
        
        <div className="mt-auto" style={{ width: "100%" }}>
  {quantity > 0 ? (
    <div className="d-flex align-items-center justify-content-between gap-1 w-100">
      {/* Minus Button: Grows to fill space */}
      <button 
        onClick={() => onRemove(counter)} 
        className="btn btn-primary btn-sm fw-bold flex-grow-1"
        style={{ borderRadius: '4px' }}
      >
        -
      </button>
    
      {/* Quantity Display: Fixed width so buttons do the scaling */}
      <div 
        className="border-0 rounded bg-white text-dark fw-bold flex-grow-1" 
        style={{textAlign: 'center' }}
      >
        {quantity}
      </div>
    
      {/* Plus Button: Grows to fill space */}
      <button 
        onClick={() => onAdd(counter)} 
        className="btn btn-primary btn-sm fw-bold flex-grow-1"
        style={{ borderRadius: '4px'}}
      >
        +
      </button>
    </div>
  ) : (
    <button className="btn btn-outline-primary btn-sm w-100" onClick={() => onAdd(counter)}>
      <i className="fa fa-shopping-cart me-2"></i> ADD TO CART
    </button>
  )}
</div>
      </div>
    </div>
  );
};

export default Counter;