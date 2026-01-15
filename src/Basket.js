import React from 'react';

// Make sure ({ cartItems }) is inside the parentheses here!
export default function Basket({ cartItems, onAdd, onRemove }) {
  
  // Now cartItems is defined and can be used for calculations
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  return (
    <div className="container mt-5">
      <h2>Order Summary</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th className="text-end">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 && <tr><td colSpan="4">Cart is empty</td></tr>}
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                {/* Optional: Add buttons to use your onAdd/onRemove functions */}
                <button onClick={() => onRemove(item)} className="btn btn-sm btn-danger">-</button>
                <span className="mx-2">{item.qty}</span>
                <button onClick={() => onAdd(item)} className="btn btn-sm btn-success">+</button>
              </td>
              <td>P{item.price}</td>
              <td className="text-end">P{(item.qty * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <h4>Subtotal: P{itemsPrice.toFixed(2)}</h4>
      </div>
    </div>
  );
}