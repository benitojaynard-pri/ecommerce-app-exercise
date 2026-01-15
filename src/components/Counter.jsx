import React from 'react';

const Counter = ({ counter, onAdd }) => {
  // Logic to keep the UI clean
  const truncate = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className="card h-100 shadow-sm border-0 product-card">
      <img 
        src={counter.image} 
        className="card-img-top p-3" 
        alt={counter.title} 
        style={{ height: "180px", objectFit: "contain" }}
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-bold">{truncate(counter.title, 35)}</h6>
        <p className="card-text text-muted mb-1">P{counter.price}</p>
        
        {/* Truncated description for uniform card height */}
        <p className="card-text small text-secondary mb-3" style={{ fontSize: "0.8rem" }}>
          {truncate(counter.description, 80)}
        </p>
        
        <div className="mt-auto">
          {/* Add to Cart Button */}
          <button 
            className="btn btn-outline-primary btn-sm w-100"
            onClick={() => onAdd(counter)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;