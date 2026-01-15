import React from 'react';

const Counter = ({ counter, onAdd, onRemove, quantity }) => {
  const truncate = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <img 
        src={counter.image} 
        alt={counter.title} 
        className="card-img-top p-3" 
        style={{ height: "180px", objectFit: "contain" }} 
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-bold" style={{ minHeight: "40px" }}>
          {truncate(counter.title, 40)}
        </h6>
        <p className="card-text text-muted mb-1">P{counter.price}</p>
        <p className="card-text small text-secondary" style={{ height: "60px", overflow: "hidden" }}>
          {truncate(counter.description, 80)}
        </p>
        
        <div className="mt-auto">
          {quantity > 0 ? (
            <div className="d-flex align-items-center justify-content-between bg-primary rounded text-white overflow-hidden">
              <button onClick={() => onRemove(counter)} className="btn btn-primary fw-bold border-0 px-3">-</button>
              <span className="fw-bold">{quantity}</span>
              <button onClick={() => onAdd(counter)} className="btn btn-primary fw-bold border-0 px-3">+</button>
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