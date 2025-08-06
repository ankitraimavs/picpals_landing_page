"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(null);

  const menuItems = [
    {
      name: "Pricing",
      submenu: ["Basic Plan", "Pro Plan", "Enterprise"],
    },
    {
      name: "Downloads",
      submenu: ["Play Store", "App Store"],
    },
  ];

  const handleHover = (index) => setActiveIndex(index);
  const handleLeave = () => setActiveIndex(null);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#f59e0b] text-white border-b border-[#d97706] px-6 sm:px-10 py-4 shadow-md shadow-white-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/next.svg"
            alt="Logo"
            width={40}
            height={40}
            className="invert"
          />
          <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-md">
            Picapals
          </span>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <div className="flex items-center gap-1 cursor-pointer px-3 py-1.5 rounded-full hover:bg-white hover:text-amber-700 transition-all duration-200">
                {item.name}
                {item.submenu.length > 0 && (
                  <ChevronDown
                    size={16}
                    className={`mt-[2px] transition-transform duration-200 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {/* Submenu */}
              {item.submenu.length > 0 && (
                <ul
                  className={`absolute top-full left-0 mt-2 bg-white text-amber-700 border border-amber-200 rounded-xl shadow-xl overflow-hidden min-w-[160px] transition-all duration-200 ${
                    activeIndex === index
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  {item.submenu.map((subitem, subIndex) => (
                    <li
                      key={subIndex}
                      className="px-4 py-2 text-sm hover:bg-amber-100 hover:text-amber-800 transition-colors duration-150"
                    >
                      {subitem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="bg-white text-amber-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:shadow-lg hover:bg-amber-100 transition-all duration-200">
          Get the App
        </button>
      </div>
    </nav>
  );
}
