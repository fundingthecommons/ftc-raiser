'use client'
// components/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ConnectButton from './connect-button';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-400 to-green-400 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Image src="/images/ftc-logo.png" alt="Funding the Commons Logo" width={200} height={58} />
                </div>
                
                {/* Hamburger menu button for mobile */}
                <button onClick={toggleMenu} className="lg:hidden text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {/* Desktop menu */}
                <div className="hidden lg:flex items-center space-x-6">
                    <Link href="/" className="text-white hover:text-gray-200 transition-colors">Home</Link>
                    <Link href="/organizations" className="text-white hover:text-gray-200 transition-colors">Organizations</Link>
                    <Link href="/transactions" className="text-white hover:text-gray-200 transition-colors">Donations</Link>
                    <Link href="/distribution/10/0xEe6196D67586f813a17E64f0dD7000D53edcb1aF" className="text-white hover:text-gray-200 transition-colors">Distribution</Link>
                    <ConnectButton />
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
                <Link href="/" className="block text-white hover:text-gray-200 transition-colors py-2">Home</Link>
                <Link href="/organizations" className="block text-white hover:text-gray-200 transition-colors py-2">Organizations</Link>
                <Link href="/transactions" className="block text-white hover:text-gray-200 transition-colors py-2">Donations</Link>
                <Link href="/distribution/10/0xEe6196D67586f813a17E64f0dD7000D53edcb1aF" className="block text-white hover:text-gray-200 transition-colors py-2">Distribution</Link>
                <div className="mt-4">
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
