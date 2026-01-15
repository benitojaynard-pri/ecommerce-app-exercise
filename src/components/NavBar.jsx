import { Link } from 'react-router-dom';

const NavBar = ({ countCartItems }) => {
  return (
    <nav className="navbar navbar-dark bg-primary mb-4">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand fw-bold">E-Commerce App</Link>
        <div>
           <Link to="/" className="text-white me-3"><i className="fa fa-home"></i></Link>
           <Link to="/cart" className="text-white">
             <i className="fa fa-shopping-cart"></i> {/* The icon class */}
             <span className="badge bg-danger rounded-pill ms-1">{countCartItems}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;