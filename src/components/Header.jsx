import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
import useUserStore from '../stores/userStore';
import useCartStore from '../stores/cartStore';

const Header = () => {
  const user = useUserStore(state => state.user);
  const logout = useUserStore(state => state.logout);
  const cartItemsCount = useCartStore(state => state.getCartItemsCount());

  return (
    <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto p-4 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold">EyeWear</Link>
        <nav className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link to="/eyeglasses" className="hidden md:inline">Eyeglasses</Link>
          <Link to="/sunglasses" className="hidden md:inline">Sunglasses</Link>
          {user ? (
            <>
              <Link to="/account"><FaUser /></Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/auth">Login</Link>
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
        </nav>
      </div>
    </header>
  );
}

export default Header;