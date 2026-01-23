import React from "react";
import { Link } from 'react-router-dom';

const NavBar = ({ countCartItems }) => {
  return (
    <nav className="navbar navbar-dark bg-primary shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">E-Commerce App</Link>
        <div className="d-flex align-items-center">
          <Link to="/" className="text-white me-3"><i className="fa fa-home fa-lg"></i></Link>
          <Link to="/cart" className="text-white position-relative">
            <i className="fa fa-shopping-cart fa-lg"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {countCartItems}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;