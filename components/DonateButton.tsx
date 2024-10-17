'use client'

import { useCallback } from 'react';

const DonateButton = () => {
    const scrollToDonate = useCallback(() => {
        const donateElement = document.getElementById('donate-section');
        donateElement?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <button 
            onClick={scrollToDonate} 
            className="lg:hidden absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
            Donate Now
        </button>
    );
};

export default DonateButton;
