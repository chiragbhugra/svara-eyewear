import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
import useUserStore from '../stores/userStore';
import useCartStore from '../stores/cartStore';

const Header = () => {
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);
  const logout = useUserStore(state => state.logout);
  const cartItemsCount = useCartStore(state => state.getCartItemsCount());

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">JOHN JACOBS</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/eyeglasses">Eyeglasses</Link></li>
          </ul>
        </nav>
        <div className="flex space-x-4">
          {!user ? (
            <Link to="/auth">Login</Link>
          ) : (
            <>
              <Link to="/account">Account</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
          <Link to="/favorites"><FaHeart /></Link>
          <Link to="/search"><FaSearch /></Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;