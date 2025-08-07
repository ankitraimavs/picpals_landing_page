"use client";

import { useEffect, useRef, useState } from "react";
import EarlyAccessSection from "@/component/EarlyAccessSection";
import FeaturesSection from "@/component/FeaturesSection";
import ImageSelectionSection from "@/component/ImageSelectionSection";
import Navbar from "@/component/Navbar";
import FestivalSlideshow from "@/component/FestivalSlideshow"; 

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const imageSectionRef = useRef(null);

  const handleScrollToImages = () => {
    imageSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    <>
    <div className="pt-10 relative font-sans bg-white text-gray-800 overflow-hidden">

      <div className="relative z-10 px-6 sm:px-12 lg:px-24 pt-24 pb-16 space-y-32 max-w-screen-xl mx-auto">
        
        <Navbar setShowModal={setShowModal} />

        <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20">
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-orange-600 leading-tight">
              Snap Together, Even When Apart!
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl mx-auto md:mx-0 mb-6">
              Turn solo shots into stunning shared moments with AI. Upload two
              photos and let our app create a beautiful group photo that brings
              you together.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="bg-white text-[#FF8A33] px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:shadow-lg hover:bg-orange-100 transition-all duration-200"
              >
                Get Notified
              </button>

              <button
                onClick={handleScrollToImages}
                className="bg-[#FF8A33] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:shadow-lg hover:bg-orange-600 transition-all duration-200"
              >
                Try Now
              </button>
            </div>
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
      </div>

      <FestivalSlideshow />

      {/* Image Selection Section */}
      <div
        ref={imageSectionRef}
        className="relative z-20 mt-5 w-full bg-white scroll-mt-28"
      >
        <ImageSelectionSection />
      </div>

      {/* Early Access Section */}
      <EarlyAccessSection />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm overflow-auto flex items-center justify-center px-4 py-12">
          <div className="relative bg-white rounded-xl w-full max-w-md sm:max-w-lg md:max-w-2xl px-6 py-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-orange-600 text-2xl font-bold z-50"
            >
              &times;
            </button>
            <div className="max-h-[80vh] overflow-y-auto">
              <EarlyAccessSection />
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
