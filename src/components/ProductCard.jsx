import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
    const navigate = useNavigate();

    const {
        imageUrl = product.images[0], 
        name = product.title, 
        price = product.cost, 
        offerText = product.offer,
        offerStrip = product.offerStrip,
    } = product;

    const uniqueId = `${name}-${index}`;

    const handleClick = () => {
        navigate(`/product/${uniqueId}`);
    };

    return (
        <div className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-102 cursor-pointer">
            <div className="relative w-full h-48 md:h-56 lg:h-64" onClick={handleClick}>
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-contain" // Use object-contain to fit the image within the card
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <button className="border rounded-full p-2 hover:bg-gray-200">
                        <FaHeart />
                    </button>
                </div>
            </div>
            <div className="p-4 flex flex-col">
                
                <p className="text-gray-700 text-xl font-bold">₹{price}</p>
                <p className="text-sm text-gray-500 mt-1">{offerText}</p>
            </div>
            {offerStrip && (
                    <div className="bg-teal-500 text-white text-sm font-bold px-2 py-1 rounded-md w-2/3 mb-3 ml-1">
                        {offerStrip}
                    </div>
                )}
        </div>
    );
};

export default ProductCard;