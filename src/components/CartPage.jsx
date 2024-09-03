import React from 'react';
import useCartStore from '../stores/cartStore';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCartStore();

    const handleQuantityChange = (productId, index, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(productId, index, newQuantity);
        } else {
            removeFromCart(productId, index);
        }
    };

    return (
        <div className="container mx-auto p-4 pt-20">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center text-gray-500 text-xl">Your cart is empty.</p>
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {cart.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex items-center border-b border-gray-200 py-4 px-6">
                                <img 
                                    src={item.images[0]} 
                                    alt={item.name} 
                                    className="w-24 h-24 object-contain bg-white rounded-md mr-6"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                    }}
                                />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {item.name}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        ₹{(item.price).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onClick={() => handleQuantityChange(item.id, index, item.quantity - 1)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-l transition duration-200"
                                    >
                                        <FaMinus size={12} />
                                    </button>
                                    <span className="bg-gray-100 px-4 py-1 font-semibold text-gray-800">{item.quantity}</span>
                                    <button 
                                        onClick={() => handleQuantityChange(item.id, index, item.quantity + 1)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-r transition duration-200"
                                    >
                                        <FaPlus size={12} />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id, index)}
                                    className="ml-6 text-red-500 hover:text-red-700 transition duration-200"
                                >
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-gray-700">Subtotal:</span>
                            <span className="text-2xl font-bold text-gray-900">₹{getCartTotal().toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-black hover:bg-gray-900 text-white font-bold py-3 px-4 rounded transition duration-200">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
