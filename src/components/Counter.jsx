import React from 'react';

const Counter = ({ counter, onAdd, onRemove, quantity }) => {
  return (
    <div className="product-card card h-100 shadow-sm border-0">
      <img 
        src={counter.image} 
        alt={counter.title} 
        className="card-img-top p-3" 
        style={{ height: "180px", objectFit: "contain" }} 
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-bold">{counter.title}</h6>
        <p className="card-text text-muted mb-1">P{counter.price}</p>
        
        <div className="mt-auto">
          {quantity > 0 ? (
            /* The 2-Button Quantity Selector */
            <div className="d-flex align-items-center justify-content-between">
               <button 
                  onClick={() => onRemove(counter)} 
                  className="btn btn-primary border-0 rounded-0 rounded-start rounded-end flex-grow-1 fw-bold"
                  style={{ width: '40px' }}
                >
                -
              </button>
              
              <div className="border-0 d-flex align-items-center justify-content-center flex-grow-1" 
                   style={{ height: '38px', minWidth: '40px' }}>
                <span className="fw-bold">{quantity}</span>
              </div>

              <button 
                onClick={() => onAdd(counter)} 
                className="btn btn-primary rounded-0 rounded-end rounded-start flex-grow-1 fw-bold"
                style={{ width: '40px' }}
              >
                +
              </button>
            </div>
          ) : (
            /* Default Add to Cart Button */
            <button 
              className="btn btn-outline-primary btn-sm w-100" 
              onClick={() => onAdd(counter)}
            >
              <i className="fa fa-shopping-cart me-2"></i> ADD TO CART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Counter;