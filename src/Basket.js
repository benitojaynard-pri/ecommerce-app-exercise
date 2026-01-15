import React from 'react';

export default function Basket({ cartItems, onAdd, onRemove }) {
  // Calculate the total price of all items in the cart
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr className="text-muted">
                <th style={{ width: "60%" }}>Product Name</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Unit</th>
                <th className="text-end">Price</th>
              </tr>
            </thead>
            <tbody>
              {/* Show message if cart is empty */}
              {cartItems.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">Cart is empty. Go back to shopping!</td>
                </tr>
              )}

              {/* Loop through each item in the cartItems array */}
              {cartItems.map((item) => (
                <tr key={item.id} className="align-middle">
                  <td className="fw-bold">{item.title}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                      <button onClick={() => onRemove(item)} className="btn btn-sm btn-outline-danger me-2">-</button>
                      <span className="fw-bold">{item.qty}</span>
                      <button onClick={() => onAdd(item)} className="btn btn-sm btn-outline-success ms-2">+</button>
                    </div>
                  </td>
                  <td className="text-center text-muted">P{item.price}</td>
                  <td className="text-end fw-bold">P{(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Subtotal Section matching your second screenshot */}
          <div className="row mt-4 border-top pt-3">
            <div className="col-12 d-flex justify-content-end align-items-center">
              <h4 className="text-secondary me-5 mb-0">Subtotals</h4>
              <h4 className="fw-bold mb-0">P{itemsPrice.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}