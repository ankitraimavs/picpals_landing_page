"use client";

import { useEffect, useState } from "react";
import EarlyAccessSection from "@/component/EarlyAccessSection";
import FeaturesSection from "@/component/FeaturesSection";
import ImageSelectionSection from "@/component/ImageSelectionSection";
import Navbar from "@/component/Navbar";
import FestivalSlideshow from "@/component/FestivalSlideshow";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="relative font-sans bg-white text-gray-800 overflow-hidden">


      {/* Main content */}
      <div className="relative z-10 px-6 sm:px-12 lg:px-24 pt-24 pb-16 space-y-32 max-w-screen-xl mx-auto">
        <Navbar />

        {/* HERO SECTION */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20">
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-orange-600 leading-tight">
              Snap Together, Even When Apart!
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl mx-auto md:mx-0">
              Turn solo shots into stunning shared moments with AI magic. Upload two photos and let our app create a beautiful group photo that brings you together.
            </p>
          </div>

  {/* Right Video (unchanged) */}
  <div className="flex-1 flex justify-center">
    <video
      src="/smartphone2.mp4"
      width={300}
      height={800}
      className="object-contain w-[200px] sm:w-[300px] md:w-[360px] lg:w-[360px]"
      autoPlay
      loop
      muted
      playsInline
    />
  </div>
</section>



        {/* FEATURES SECTION */}
        {/* <FeaturesSection /> */}
      </div>
      <FestivalSlideshow/>

      {/* Image Selection Section */}
      <div className="relative z-20 mt-5 w-full bg-white">
        <ImageSelectionSection />
      </div>

     

      {/* Early Access Section */}
        <EarlyAccessSection />
  
    </div>
  );
}
