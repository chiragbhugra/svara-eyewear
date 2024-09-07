import React, { useState, useEffect } from 'react';
import useCartStore from '../stores/cartStore';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, getCartSubtotal, applyDiscount, discount, fetchCart } = useCartStore();
    const [couponCode, setCouponCode] = useState('');

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        } else {
            removeFromCart(productId);
        }
    };

    const subtotal = getCartSubtotal();
    const discountAmount = subtotal * discount;
    const shipping = subtotal < 10000 ? 500 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal - discountAmount + shipping + tax;

    const handleApplyCoupon = () => {
        if (couponCode.toLowerCase() === 'discount10') {
            applyDiscount(0.1);
        } else {
            console.log('Invalid coupon code');
        }
    };

    return (
        <div className="container mx-auto p-4 pt-20">
            <h1 className="text-3xl font-bold mb-6">Shopping Bag</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <h2 className="text-xl font-semibold mb-4">{cart.length} items in your bag</h2>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center border-b border-gray-200 py-4 px-6">
                                <img 
                                    src={item.images[0]} 
                                    alt={item.name} 
                                    className="w-24 h-24 object-contain bg-white rounded-md mr-6"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {item.name}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        Color: N/A
                                    </p>
                                    <p className="text-gray-600">
                                        Size: N/A
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">₹{item.price.toFixed(2)}</p>
                                    <div className="flex items-center justify-end mt-2">
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <FaMinus size={12} />
                                        </button>
                                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <FaPlus size={12} />
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-6 text-red-500 hover:text-red-700 transition duration-200"
                                >
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Coupon Code</h2>
                        <p className="text-gray-600 mb-2">Enter your coupon code if you have one</p>
                        <div className="flex">
                            <input 
                                type="text" 
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="flex-grow border rounded-l px-3 py-2"
                                placeholder="Enter coupon code"
                            />
                            <button 
                                onClick={handleApplyCoupon}
                                className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
                        <div className="flex justify-between mb-2">
                            <span>Cart Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between mb-2 text-green-600">
                                <span>Discount</span>
                                <span>-₹{discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span>Tax (10%)</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Cart Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-black text-white mt-4 py-2 rounded hover:bg-gray-800">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;