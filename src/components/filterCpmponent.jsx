import React from 'react';
import { FaMale, FaFemale, FaGlasses, FaDesktop } from 'react-icons/fa';

const FilterComponent = () => {
  return (
    <div className="flex items-center space-x-4 pt-20 ml-20">
      <button className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-200">
        <FaMale className="mr-2" />
        Men
      </button>
      <button className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-200">
        <FaFemale className="mr-2" />
        Women
      </button>
      <button className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-200">
        <FaGlasses className="mr-2" />
        Aviators
      </button>
      <button className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-200">
        <FaDesktop className="mr-2" />
        Computer Eyeglasses
      </button>
      <button className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-200">
        <FaGlasses className="mr-2" />
        Sunglasses
      </button>
      <div className="relative">
        <button className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-200">
          Sort
          <span className="ml-2">&#x25BC;</span>
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
          {/* Dropdown items can be added here */}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
