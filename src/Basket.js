import React from 'react';

export default function Basket({ cartItems, onAdd, onRemove }) {
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr className="text-muted">
                <th>Product Name</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Unit</th>
                <th className="text-end">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 && <tr><td colSpan="4" className="text-center">Cart is empty</td></tr>}
              {cartItems.map((item) => (
                <tr key={item.id} className="align-middle">
                  <td>{item.name}</td>
                  <td className="text-center">
                    <button onClick={() => onRemove(item)} className="btn btn-sm btn-outline-danger me-2">-</button>
                    <span className="fw-bold">{item.qty}</span>
                    <button onClick={() => onAdd(item)} className="btn btn-sm btn-outline-success ms-2">+</button>
                  </td>
                  <td className="text-center">P{item.price}</td>
                  <td className="text-end fw-bold">P{(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end align-items-center border-top pt-3">
            <h4 className="text-secondary me-5 mb-0">Subtotal</h4>
            <h4 className="fw-bold mb-0">P{itemsPrice.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}