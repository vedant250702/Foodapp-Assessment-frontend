// Navbar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';

function Navbar() {
  const location = useLocation();
  const selector=useSelector((state:any)=>state.cartReducers)
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container">

        {/* Left: Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <span>Foodie.</span>
        </Link>

        {/* Right side group: links + cart (desktop) */}
        <div className="right-group">

          {/* Desktop navigation links */}
          <ul className="nav-links desktop">
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link 
                to="/orders" 
                className={location.pathname === '/orders' ? 'active' : ''}
              >
                Orders
              </Link>
            </li>
                        <li>
              <Link 
                to="/admin" 
                className={location.pathname === '/admin' ? 'active' : ''}
              >
                Admin
              </Link>
            </li>
          </ul>

          {/* Cart - always visible */}
          <Link to="/cart" className="cart-btn">
            🛒 <span>{selector.cart.length}</span>
          </Link>

          {/* Hamburger - mobile only */}
          <button 
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile slide-in menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links mobile">
            <li>
              <Link to="/" onClick={closeMenu}>Menu</Link>
            </li>
            <li>
              <Link to="/orders" onClick={closeMenu}>Orders</Link>
            </li>
            <li>
              <Link to="/admin" onClick={closeMenu}>Admin</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;