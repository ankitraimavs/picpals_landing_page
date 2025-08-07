"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import EarlyAccessSection from "./EarlyAccessSection";

export default function Navbar() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
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
      <nav className="w-full fixed top-0 left-0 z-50 bg-[#FF8A33] text-white border-b border-[#e6761e] px-6 sm:px-10 py-4 shadow-md shadow-white-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              onClick={() => router.push("/")}
              className="text-2xl font-extrabold tracking-tight text-white drop-shadow-md cursor-pointer hover:opacity-90 transition"
            >
              Lensational
            </span>

          </div>

          <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleLeave}
              >
                <div
                  onClick={() => handleNavigation(item.route)}
                  className="flex items-center gap-1 cursor-pointer px-3 py-1.5 rounded-full hover:bg-white hover:text-[#FF8A33] transition-all duration-200"
                >
                  {item.name}
                  {item.submenu.length > 0 && (
                    <ChevronDown
                      size={16}
                      className={`mt-[2px] transition-transform duration-200 ${activeIndex === index ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </div>

                {item.submenu.length > 0 && (
                  <ul
                    className={`absolute top-full left-0 mt-2 bg-white text-[#FF8A33] border border-orange-200 rounded-xl shadow-xl overflow-hidden min-w-[160px] transition-all duration-200 ${activeIndex === index
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                      }`}
                  >
                    {item.submenu.map((subitem, subIndex) => (
                      <li
                        key={subIndex}
                        className="px-4 py-2 text-sm hover:bg-orange-100 hover:text-orange-800 transition-colors duration-150"
                      >
                        {subitem}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-[#FF8A33] px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:shadow-lg hover:bg-orange-100 transition-all duration-200"
          >
            Get Notify
          </button>
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm overflow-auto flex items-center justify-center px-4 py-12">
          <div ref={modalRef} className="relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-white hover:text-orange-300 text-3xl font-bold z-50"
            >
              &times;
            </button>
            <EarlyAccessSection />
          </div>
        </div>
      )}
    </>
  );
}
