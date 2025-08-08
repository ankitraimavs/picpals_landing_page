"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const MergedNavbarBanner = ({ showModal, setShowModal, onNotifyClick }) => {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(null);
    const modalRef = useRef(null);

    const handleNavigation = (path) => router.push(path);

    const menuItems = [
        {
            name: "About Us",
            route: "/about",
            submenu: [],
        },
    ];

    const handleHover = (index) => setActiveIndex(index);
    const handleLeave = () => setActiveIndex(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal]);

    return (
        <>
            <div className="w-full fixed top-0 left-0 z-50">
                <div className="w-full h-32 md:h-32 bg-gradient-to-r from-red-50 via-yellow-50 via-orange-50 to-red-50 shadow-lg border-b-2 border-orange-200 relative overflow-hidden backdrop-blur-md">
                    {/* Decorative background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Floating marigold petals */}
                        <div className="absolute top-1 left-16 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
                        <div className="absolute top-3 right-20 w-2 h-2 bg-orange-400 rounded-full opacity-50 animate-bounce delay-300"></div>
                        <div className="absolute bottom-1 left-32 w-2 h-2 bg-red-400 rounded-full opacity-40 animate-bounce delay-500"></div>
                        <div className="absolute bottom-3 right-24 w-3 h-3 bg-yellow-500 rounded-full opacity-50 animate-bounce delay-700"></div>

                        {/* Subtle rangoli pattern */}
                        <div className="absolute top-0 left-1/4 w-16 h-16 opacity-5">
                            <svg viewBox="0 0 64 64" className="w-full h-full">
                                <polygon points="32,8 40,24 56,24 44,36 48,52 32,44 16,52 20,36 8,24 24,24" fill="#DC2626" />
                            </svg>
                        </div>
                        <div className="absolute bottom-0 right-1/4 w-12 h-12 opacity-5 rotate-45">
                            <svg viewBox="0 0 48 48" className="w-full h-full">
                                <polygon points="24,4 30,18 42,18 33,27 36,39 24,33 12,39 15,27 6,18 18,18" fill="#F59E0B" />
                            </svg>
                        </div>
                    </div>

                    {/* Navigation Layer */}
                    <div className="absolute top-0 left-0 w-full h-full z-10">
                        <div className="max-w-7xl mx-auto h-full px-2 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-full">
                                {/* Left Side - Logo */}
                                <div className="flex items-center">
                                    <span
                                        onClick={() => router.push("/")}
                                        className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent drop-shadow-md cursor-pointer hover:opacity-90 transition-all duration-200"
                                    >
                                        Lensational
                                    </span>
                                </div>

                                {/* Center - Rakhi Celebration Content */}
                                <div className="flex items-center justify-center flex-1 mx-2 sm:mx-4">
                                    {/* Left Rakhi Image */}
                                    <div className="hidden sm:flex flex-col items-center space-y-2 mr-4 lg:mr-6">
                                        <div className="relative w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center">
                                            <Image
                                                src="/rakhi.png"
                                                alt="Rakhi"
                                                fill
                                                className="object-contain scale-125 lg:scale-150"
                                                priority
                                                style={{
                                                    animation: 'fadeInOut 3s ease-in-out infinite'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="text-center">
                                        <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-1">
                                            {/* Mobile Rakhi */}
                                            <div className="sm:hidden">
                                                <svg width="20" height="20" viewBox="0 0 28 28" className="animate-pulse">
                                                    <circle cx="14" cy="14" r="8" fill="#DC2626" stroke="#F59E0B" strokeWidth="2" />
                                                    <circle cx="14" cy="14" r="4" fill="#FBBF24" />
                                                    <circle cx="14" cy="14" r="1.5" fill="#DC2626" />
                                                </svg>
                                            </div>

                                            <div>
                                                <h2 className="text-sm sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                                                    Celebrate Rakhi with Us
                                                </h2>
                                            </div>

                                            <div className="sm:hidden">
                                                <svg width="20" height="20" viewBox="0 0 28 28" className="animate-pulse delay-500">
                                                    <circle cx="14" cy="14" r="8" fill="#F59E0B" stroke="#DC2626" strokeWidth="2" />
                                                    <circle cx="14" cy="14" r="4" fill="#FEF3C7" />
                                                    <circle cx="14" cy="14" r="1.5" fill="#EF4444" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                                            <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                                            <p className="text-xs sm:text-sm lg:text-base text-orange-700 font-medium tracking-wide">
                                                Create Beautiful Memories Together
                                            </p>
                                            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Right Rakhi Image */}
                                    <div className="hidden sm:flex flex-col items-center space-y-2 ml-4 lg:ml-6">
                                        <div className="relative w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center">
                                            <Image
                                                src="/rakhi.png"
                                                alt="Rakhi"
                                                fill
                                                className="object-contain scale-125 lg:scale-150"
                                                priority
                                                style={{
                                                    animation: 'fadeInOut 3s ease-in-out infinite 1.5s'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Navigation Menu */}
                                <div className="flex items-center">
                                    {/* Desktop Layout */}
                                    <div className="hidden sm:flex items-center gap-2 sm:gap-4">
                                        {/* Navigation Items */}
                                        <ul className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
                                            {menuItems.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="relative"
                                                    onMouseEnter={() => handleHover(index)}
                                                    onMouseLeave={handleLeave}
                                                >
                                                    <div
                                                        onClick={() => handleNavigation(item.route)}
                                                        className="flex items-center gap-1 cursor-pointer px-2 sm:px-3 py-1.5 rounded-full bg-white/80 text-orange-600 hover:bg-white hover:text-orange-700 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
                                                    >
                                                        {item.name}
                                                        {item.submenu.length > 0 && (
                                                            <ChevronDown
                                                                size={14}
                                                                className={`mt-[1px] transition-transform duration-200 ${activeIndex === index ? "rotate-180" : ""
                                                                    }`}
                                                            />
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Get Notified Button */}
                                        <button
                                            onClick={onNotifyClick}
                                            className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
                                        >
                                            Get Notified
                                        </button>
                                    </div>

                                    {/* Mobile Layout - Stacked */}
                                    <div className="sm:hidden flex flex-col items-end gap-1">
                                        {/* Navigation Items */}
                                        <ul className="flex items-center text-xs font-medium">
                                            {menuItems.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="relative"
                                                    onMouseEnter={() => handleHover(index)}
                                                    onMouseLeave={handleLeave}
                                                >
                                                    <div
                                                        onClick={() => handleNavigation(item.route)}
                                                        className="flex items-center gap-1 cursor-pointer px-2 py-1 rounded-full bg-white/80 text-orange-600 hover:bg-white hover:text-orange-700 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
                                                    >
                                                        {item.name}
                                                        {item.submenu.length > 0 && (
                                                            <ChevronDown
                                                                size={12}
                                                                className={`mt-[1px] transition-transform duration-200 ${activeIndex === index ? "rotate-180" : ""
                                                                    }`}
                                                            />
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Get Notified Button */}
                                        <button
                                            onClick={onNotifyClick}
                                            className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
                                        >
                                            Get Notified
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced bottom decorative border with pattern */}
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 via-orange-400 to-red-400"></div>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-300 via-red-300 to-orange-300"></div>

                    <style jsx>{`
                        @keyframes fadeInOut {
                            0%, 100% { opacity: 0.7; transform: scale(1); }
                            50% { opacity: 1; transform: scale(1.05); }
                        }
                    `}</style>
                </div>
            </div>

            {/* Spacing for fixed header */}
            <div className="h-32" />
        </>
    );
};

export default MergedNavbarBanner;