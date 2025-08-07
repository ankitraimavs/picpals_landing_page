"use client";

import React from "react";

const outputImages = [
  {
    src: "/group-photo/rakhi-1.jpg",
    caption: "Framed with Love",
  },
  {
    src: "/group-photo/rakhi-2.jpg",
    caption: "Tied by Tradition",
  },
  {
    src: "/group-photo/rakhi-3.jpg",
    caption: "A Moment Together",
  },
  {
    src: "/group-photo/rakhi-4.jpg",
    caption: "A Moment Together",
  },
];

export default function FestivalSlideshow() {
  return (
    <section className="bg-gradient-to-br from-orange-300/75 via-orange-500/85 to-red-500/80 text-white py-20 px-6 sm:px-12 lg:px-24">
      {/* Heading */}
      <div className="text-center mb-16 animate-fadeIn">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Tie the Thread of Togetherness
        </h2>
        <p className="text-lg sm:text-xl text-[#FFECD1] max-w-2xl mx-auto">
          Upload two photos and let AI bring you together in a Rakhi-themed frame
        </p>
      </div>

      {/* Slideshow Grid */}
      <div className="flex flex-wrap justify-center gap-10 animate-fadeInSlow">
        {outputImages.map((item, index) => (
          <div
            key={index}
            className="group max-w-[280px] w-full transition-transform duration-500 ease-in-out transform hover:-translate-y-2"
          >
            {/* Decorative Border Wrapper */}
            <div className="relative aspect-[3/4] rounded-3xl p-[5px] bg-gradient-to-tr from-yellow-300 via-red-400 to-pink-500 shadow-xl transition-shadow duration-500 ease-in-out hover:shadow-2xl">
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover rounded-2xl transform transition-transform duration-500 ease-in-out will-change-transform group-hover:scale-105"
                />
              </div>
            </div>

            {/* Caption */}
            <p className="text-center mt-4 text-lg font-semibold text-white">
              {item.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
