import { Link } from 'react-router-dom';

const NavBar = ({ countCartItems }) => {
  return (
    <nav className="navbar navbar-dark bg-primary mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">E-Commerce App</Link>
        <Link to="/cart" className="btn btn-primary position-relative">
          <i className="fa fa-shopping-cart"></i>
          {countCartItems > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {countCartItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

