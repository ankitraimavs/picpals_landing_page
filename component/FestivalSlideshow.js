"use client";

import React from "react";
import Image from "next/image";
import "./FestivalSlideshow.css"; // Custom CSS for keyframes

const images = [
  "/group-photo/group-photo-1.jpg",
  "/group-photo/group-photo-2.jpg",
  "/group-photo/group-photo-3.jpg",
  "/group-photo/group-photo-4.jpg",
  "/group-photo/group-photo-5.jpg",
  "/group-photo/group-photo-6.jpg",
];

export default function FestivalSlideshow() {
  return (
    <div className="bg-orange-200 rounded-xl shadow-xl px-6 py-12 space-y-12 text-center">
      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-700">
          Celebrate Moments Together
        </h2>
        <p className="text-gray-800 max-w-2xl mx-auto text-base sm:text-lg">
          Here's a glimpse of the beautiful memories shared by our users during festive seasons.
          Join the <span className="font-semibold text-yellow-700">Picapals</span> family and relive your favorite moments!
        </p>
      </div>

      <div className="relative overflow-hidden h-[240px]">
        <div className="absolute flex animate-slideLeft space-x-[15px] items-center min-w-max">
          {[...images, ...images].map((src, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 relative h-[220px] min-w-[260px] overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt={`Group ${i}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 260px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden h-[240px]">
        <div className="absolute flex animate-slideRight space-x-[15px] items-center min-w-max">
          {[...images, ...images].map((src, i) => (
            <div
              key={`row2-${i}`}
              className="flex-shrink-0 relative h-[220px] min-w-[260px] overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt={`Group ${i}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 260px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
