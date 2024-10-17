// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ConnectButton from './connect-button';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-gradient-to-r from-blue-400 to-green-400 p-4 shadow-md">
            <div className="flex items-center space-x-4">
                <Image src="/images/ftc-logo.png" alt="Funding the Commons Logo" width={200} height={58} />
            </div>
            <div className="flex items-center space-x-6">
                <Link href="/" className="text-white hover:text-gray-200 transition-colors">
                    Home
                </Link>
                <Link href="/organizations" className="text-white hover:text-gray-200 transition-colors">
                    Organizations
                </Link>
                <Link href="/leaderboard" className="text-white hover:text-gray-200 transition-colors">
                    Leaderboard
                </Link>
                <Link href="/distribution/11155111/0x3836188746D85F15ba932FE14424DEbBdC0Cf9FD" className="text-white hover:text-gray-200 transition-colors">
                    Distribution
                </Link>
            </div>
            <div> <ConnectButton/></div>
        </nav>
    );
};

export default Navbar;
