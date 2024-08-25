import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
import useEyewearStore from '../stores/eyewearStore';

const navItems = [
  { name: 'Eyeglasses', path: '/eyeglasses' },
  { name: 'Sunglasses', path: '/sunglasses' },
  { name: 'Style Quiz', path: '/style-quiz' },
  { name: 'Accessories', path: '/accessories' },
  { name: 'Store Locator', path: '/store-locator' },
];

const Header = () => {
  const navigate = useNavigate();
  const { fetchEyewear } = useEyewearStore();

  const handleEyewearClick = async () => {
    await fetchEyewear();
    navigate('/eyeglasses');
  };

  return (
    <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">JOHN JACOBS</h1>
        <h2 className="text-red-500 font-bold">URBAN ELEGANCE</h2>
        <nav>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-red-500"
                  onClick={item.name === 'Eyeglasses' ? handleEyewearClick : null}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex space-x-4">
          <Link to="/profile"><FaUser /></Link>
          <Link to="/favorites"><FaHeart /></Link>
          <Link to="/search"><FaSearch /></Link>
          <Link to="/cart"><FaShoppingCart /></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;