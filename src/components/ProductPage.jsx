import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useEyewearStore from '../stores/eyewearStore';
import useCartStore from '../stores/cartStore';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import useUserStore from '../stores/userStore';
import { supabase } from '../supabaseClient';

const ProductPage = () => {
    const { productId } = useParams();
    const { eyewear, fetchEyewear } = useEyewearStore();
    const addToCart = useCartStore(state => state.addToCart);
    const [product, setProduct] = useState(null);
    const user = useUserStore(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (eyewear.length === 0) {
            fetchEyewear();
        }
    }, [eyewear, fetchEyewear]);

    useEffect(() => {
        if (productId && eyewear.length > 0) {
            const [name, index] = productId.split('-');
            const foundProduct = eyewear[parseInt(index, 10)];
            setProduct(foundProduct);
        }
    }, [productId, eyewear]);

    if (!product) {
        return <div>Loading product...</div>;
    }

    const {
        id,
        images,
        name,
        price,
        offer,
        offerStrip,
        rating,
        reviewCount,
        color,
        size,
    } = product;

    const handleAddToCart = () => {
        addToCart(product);
        alert("Product added to cart successfully!");
    };

    return (
        <div className="container mx-auto p-4 pt-20 flex flex-col md:flex-row">
            <div className="md:w-1/2">
                <img src={images[0]} alt={name} className="w-full object-cover rounded-md" />
            </div>
            <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <div className="flex space-x-2">
                        <FaShareAlt className="text-gray-500 cursor-pointer" />
                        <FaHeart className="text-gray-500 cursor-pointer" />
                    </div>
                </div>
                <p className="text-2xl font-bold mt-2">₹{price} <span className="text-sm font-normal">(Inclusive of GST)</span></p>
                <div className="flex items-center mt-2">
                    <span className="bg-gray-200 text-black px-2 py-1 rounded-full text-sm">{rating} ★ | {reviewCount}</span>
                </div>
                {offerStrip && (
                    <div className="bg-teal-100 text-teal-800 text-sm px-2 py-1 mt-3 rounded-md">
                        {offerStrip}
                    </div>
                )}
                <div className="mt-4">
                    <p className="font-semibold">Color: {color}</p>
                    <div className="flex mt-2 space-x-2">
                        <div className="w-6 h-6 bg-black rounded-full border-2 border-gray-300"></div>
                        <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-semibold">Size: {size}</p>
                    <button className="mt-2 border border-gray-300 rounded-full px-4 py-2 text-sm">
                        Extra Wide ( 142 mm )
                    </button>
                    <a href="#" className="ml-4 text-sm text-blue-500">Size Guide</a>
                </div>
                <div className="mt-4 bg-gray-800 text-white p-3 rounded-md">
                    JJ Perks: Shop 1 Pair & Get A 2nd At ₹0!
                </div>
                <button className="mt-4 w-full bg-green-500 text-white py-3 rounded-md flex items-center justify-center">
                    <img src="/path-to-whatsapp-icon.png" alt="WhatsApp" className="mr-2 h-5 w-5" />
                    Let's Chat
                </button>
                <button 
                    onClick={handleAddToCart}
                    className="mt-4 w-full bg-black text-white py-3 rounded-md"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductPage;