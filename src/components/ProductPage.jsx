import React from 'react';
import { useParams } from 'react-router-dom';
import useEyewearStore from '../stores/eyewearStore';

const ProductPage = () => {
    const { productId } = useParams(); // Retrieve productId from the URL

    // Check if productId is defined
    if (!productId) {
        return <div>Product ID is not available.</div>;
    }

    const { eyewear } = useEyewearStore();

    // Split the productId to get the name and index
    const [name, index] = productId.split('-');
    const product = eyewear[index]; // Use the index to find the product

    if (!product) {
        return <div>Product not found</div>;
    }

    const {
        imageUrl = product.images[0],
        name: productName = product.title,
        price = product.cost,
        offerText = product.offer,
        offerStrip = product.offerStrip,
    } = product;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row">
                <img src={imageUrl} alt={productName} className="w-full md:w-1/2 h-96 object-cover rounded-md" />
                <div className="md:ml-4">
                    <h1 className="text-3xl font-bold">{productName}</h1>
                    {offerStrip && (
                        <div className="bg-teal-500 text-white text-sm px-2 py-1 mt-3 rounded-md mb-2">
                            {offerStrip}
                        </div>
                    )}
                    <p className="text-gray-700 text-xl font-bold">₹{price}</p>
                    <p className="text-sm text-gray-500 mt-1">{offerText}</p>
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-teal-600 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;