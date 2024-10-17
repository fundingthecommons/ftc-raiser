// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-gradient-to-r from-blue-400 to-green-400 p-4 shadow-md">
            <div className="flex items-center space-x-4">
                <Image src="/images/ftc-logo.png" alt="Funding the Commons Logo" width={100} height={29.5} />
            
            </div>
            <div className="text-white text-sm font-medium">
                Transforming funding models & mechanisms for public goods funding
            </div>
        </nav>
    );
};

export default Navbar;
