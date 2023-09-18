import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from "react-transition-group";

export default function Navbar() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isDropdownVisible2, setDropdownVisible2] = useState(false);
    const [isMobileNavVisible, setMobileNavVisible] = useState(false);

    const handleLinkClick = () => {
        setMobileNavVisible(false);
        setDropdownVisible(false);
    };

    const duration = 250;

    return (
        <div className="bg-black p-4 relative z-10">
            <div className="flex justify-between items-center">

       
                <Link to="/" className="text-white text-3xl hover:underline">Stellar</Link>

                <div className="space-x-8 mx-auto hidden md:flex">
                    <Link to="/news" className="text-2xl text-white hover:underline">News</Link>
                    <div className="relative group"
                         onMouseEnter={() => setDropdownVisible(true)}
                         onMouseLeave={() => setDropdownVisible(false)}>
                        <span className="text-2xl text-white cursor-pointer hover:underline">SpaceX</span>
                        {isDropdownVisible && (
                            <div className="absolute top-full left-0 w-28 rounded-md shadow-lg bg-white">
                                <div className="py-1">
                                    
                                    <Link to="/learn/company" className="block px-4 py-2 text-black hover:bg-gray-300">Company</Link>
                                    <Link to="/learn/capsules" className="block px-4 py-2 text-black hover:bg-gray-300">Capsules</Link>
                                    <Link to="/learn/crew" className="block px-4 py-2 text-black hover:bg-gray-300">Crew</Link>
                                    <Link to="/learn/dragons" className="block px-4 py-2 text-black hover:bg-gray-300">Dragons</Link>
                                    <Link to="/learn/launches" className="block px-4 py-2 text-black hover:bg-gray-300">Launches</Link>
                                    <Link to="/learn/payloads" className="block px-4 py-2 text-black hover:bg-gray-300">Payloads</Link>
                                    <Link to="/learn/roadster" className="block px-4 py-2 text-black hover:bg-gray-300">Roadster</Link>
                                    <Link to="/learn/rockets" className="block px-4 py-2 text-black hover:bg-gray-300">Rockets</Link>
                                    <Link to="/learn/ships" className="block px-4 py-2 text-black hover:bg-gray-300">Ships</Link>
                                    <Link to="/learn/starlink" className="block px-4 py-2 text-black hover:bg-gray-300">Starlink</Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative group"
                         onMouseEnter={() => setDropdownVisible2(true)}
                         onMouseLeave={() => setDropdownVisible2(false)}>
                        <span className="text-2xl text-white cursor-pointer hover:underline">Learn</span>
                        {isDropdownVisible2 && (
                            <div className="absolute top-full left-0 w-28 rounded-md shadow-lg bg-white">
                                <div className="py-1">
                                    
                                    <Link to="/learn/planets" className="block px-4 py-2 text-black hover:bg-gray-300">Planets</Link>

                                </div>
                            </div>
                        )}
                    </div>
                    <Link to="/gallery" className="text-2xl text-white hover:underline pr-28">Gallery</Link>
                </div>

             
                <div className="md:hidden z-20">
                    <button onClick={() => setMobileNavVisible(!isMobileNavVisible)} className="text-white text-2xl">
                        {isMobileNavVisible ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            <Transition in={isMobileNavVisible} timeout={duration}>
                {state => (
                    <div className={`md:hidden fixed top-0 left-0 h-screen w-full bg-black p-8 z-20 transform transition-transform duration-${duration}ms ${state === 'entering' || state === 'entered' ? 'translate-y-0' : '-translate-y-full'}`}>
                        <button onClick={handleLinkClick} className="absolute top-4 right-4 text-2xl text-white">
                            ✕
                        </button>
                        <Link to="/news" onClick={handleLinkClick} className="block mb-8 text-2xl text-white hover:underline">News</Link>

                        <div className="relative group mb-8">
                            <span onClick={() => setDropdownVisible(!isDropdownVisible)} className="block text-2xl text-white cursor-pointer hover:underline">SpaceX</span>
                            
                            {isDropdownVisible && (
                                <div className="mt-4 bg-white rounded-md shadow-lg">
                                    <Link to="/learn/company" onClick={handleLinkClick} className="block px-4 py-2 text-xl text-black hover:bg-gray-300">Company</Link>
                                    <Link to="/learn/capsules" onClick={handleLinkClick} className="block px-4 py-2 text-xl text-black hover:bg-gray-300">Capsules</Link>
                                    <Link to="/learn/crew" onClick={handleLinkClick} className="block px-4 py-2 text-xl text-black hover:bg-gray-300">Crew</Link>
                                    <Link to="/learn/dragons" onClick={handleLinkClick} className="block px-4 py-2 text-xl text-black hover:bg-gray-300">Dragons</Link>
                                    <Link to="/learn/launches" onClick={handleLinkClick} className="block px-4 py-2 text-xl text-black hover:bg-gray-300">Launches</Link>
                                    <Link to="/learn/payloads" onClick={handleLinkClick} className="block px-4 py-2 text-xl text-black hover:bg-gray-300">Payloads</Link>
                                    <Link to="/learn/roadster" onClick={handleLinkClick} className="block px-4 py-2 text-xl text-black hover:bg-gray-300">Roadster</Link>
                                    <Link to="/learn/rockets" onClick={handleLinkClick} className="block px-4 py-2 text-xl text-black hover:bg-gray-300">Rockets</Link>
                                    <Link to="/learn/ships" onClick={handleLinkClick} className="block px-4 py-2 text-xl text-black hover:bg-gray-300">Ships</Link>
                                    <Link to="/learn/starlink" onClick={handleLinkClick} className="block px-4 py-2 text-xl text-black hover:bg-gray-300">Starlink</Link>
                                </div>
                            )}
                        </div>

                        <div className="relative group mb-8">
                            <span onClick={() => setDropdownVisible2(!isDropdownVisible2)} className="block text-2xl text-white cursor-pointer hover:underline">Learn</span>
                            
                            {isDropdownVisible2 && (
                                <div className="mt-4 bg-white rounded-md shadow-lg">
                                    <Link to="/learn/planets" onClick={handleLinkClick} className="block px-4 py-2 text-xl text-black hover:bg-gray-300">Planets</Link>
                                
                                </div>
                            )}
                        </div>

                        <Link to="/gallery" onClick={handleLinkClick} className="block text-2xl text-white hover:underline">Gallery</Link>
                    </div>
                )}
            </Transition>
        </div>
    );
}