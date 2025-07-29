"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const sampleImages = [
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80",
];

export default function ImageSelectionSection() {
  const [selected, setSelected] = useState([]);
  const [processedImage, setProcessedImage] = useState(null);

  const toggleSelect = (url) => {
    if (selected.includes(url)) {
      setSelected(selected.filter((img) => img !== url));
    } else if (selected.length < 2) {
      setSelected([...selected, url]);
    }
  };

  const handleProcess = () => {
    if (selected.length === 2) {
      // Show one of the selected images for now as a placeholder
      setProcessedImage(selected[0]);
    }
  };

  return (
    <section className="relative w-full px-4 sm:px-10 lg:px-20 py-20 bg-gradient-to-br from-[#fff7f0] to-[#fef9f9] overflow-hidden">
      {/* Blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-100 opacity-30 rounded-full z-0 animate-blob-1"></div>
      <div className="absolute bottom-[-100px] right-[-60px] w-96 h-96 bg-orange-200 opacity-30 rounded-full z-0 animate-blob-2"></div>

      {/* Main Card */}
    <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 bg-white/70 backdrop-blur-md border border-orange-100 rounded-3xl shadow-xl p-10 flex flex-col gap-12 lg:flex-row items-center lg:items-start">

        {/* Left: Selection */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-orange-500 mb-2 text-center lg:text-left">
            Make Your Group Magic
          </h2>
          <p className="text-gray-600 text-lg mb-6 text-center lg:text-left">
            Choose <strong>any two solo photos</strong> below and let our AI do the magic!
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
            {sampleImages.map((imgUrl, index) => {
              const isSelected = selected.includes(imgUrl);
              return (
                <div
                  key={index}
                  onClick={() => toggleSelect(imgUrl)}
                  className={`relative group cursor-pointer rounded-xl border-4 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden shadow-md transition-all duration-300 ease-in-out ${
                    isSelected
                      ? "border-orange-400 ring-2 ring-orange-300 scale-105"
                      : "border-transparent hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Person ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                      <CheckCircle className="text-orange-500 w-7 h-7" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center lg:justify-start">
            <button
              disabled={selected.length !== 2}
              onClick={handleProcess}
              className={`px-8 py-3 text-base font-semibold rounded-full transition shadow-md ${
                selected.length === 2
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Generate Group Photo
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <h3 className="text-3xl font-bold text-orange-500 mb-4 text-center">Preview</h3>
          <div className="w-full max-w-md aspect-video bg-white rounded-2xl shadow-inner flex items-center justify-center overflow-hidden border border-orange-200">
            {processedImage ? (
              <img
                src={processedImage}
                alt="Processed Group"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400 px-6 text-center">
                Your AI-generated group photo will appear here!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
