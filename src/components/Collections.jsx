import React, { useEffect, useRef } from 'react';
import useEyewearStore from '../stores/eyewearStore';
import ProductCard from './ProductCard';
import FilterComponent from './filterCpmponent';
import { FaMale, FaFemale, FaGlasses, FaDesktop } from 'react-icons/fa';

const Collections = () => {
    const { eyewear, fetchEyewear, loading, error } = useEyewearStore();
    const observerRef = useRef();

    useEffect(() => {
        fetchEyewear(); // Initial fetch
    }, [fetchEyewear]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                fetchEyewear(); // Fetch next page when the observer is triggered
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loading, fetchEyewear]);

    if (loading && eyewear.length === 0) {
        return <div>Loading collections...</div>;
    }

    if (error) {
        return <div>Error loading collections: {error}</div>;
    }

    return (
       <>
        <FilterComponent/>
        <div className="container mx-auto pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {eyewear.map((product, index) => (
                    <ProductCard 
                        key={`${product.title}-${index}`} 
                        product={product} 
                        index={index} 
                    />
                ))}
            </div>
            <div ref={observerRef} className="h-10" /> {/* Empty div for the observer */}
        </div>
       </>
    );
};

export default Collections;