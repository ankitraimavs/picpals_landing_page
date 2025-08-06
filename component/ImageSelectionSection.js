"use client";

import { useState, useRef } from "react";
import { CheckCircle, UploadCloud } from "lucide-react";

const sampleImages = [
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&h=400&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=400&q=80",
];

export default function ImageSelectionSection() {
  const [selected, setSelected] = useState([]);
  const [processedImage, setProcessedImage] = useState(null);
  const [useCustom, setUseCustom] = useState(true);
  const [customImages, setCustomImages] = useState([null, null]);

  const fileInputs = [useRef(null), useRef(null)];

  const toggleSelect = (url) => {
    if (selected.includes(url)) {
      setSelected(selected.filter((img) => img !== url));
    } else if (selected.length < 2) {
      setSelected([...selected, url]);
    }
  };

  const handleProcess = () => {
    if (useCustom) {
      if (customImages[0]) setProcessedImage(customImages[0]);
    } else if (selected.length === 2) {
      setProcessedImage(selected[0]);
    }
  };

  const handleFileChange = (index, file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      const updated = [...customImages];
      updated[index] = url;
      setCustomImages(updated);
    }
  };

  return (
   <section className="relative min-h-screen w-full px-4 py-8 bg-[#fff4e6] flex items-center justify-center overflow-hidden"  
    style={{
    backgroundImage: `url('/image-3.jpg')`,
    backgroundSize: 'cover',   
    backgroundPosition: 'center',    
    backgroundRepeat: 'no-repeat',   
  }}
   >
      <div className="max-w-6xl ml-[400px] mx-auto bg-white/70 border border-orange-200 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col lg:flex-row items-start gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-orange-600 mb-2 text-center lg:text-left">
            Make Your Group Magic ✨
          </h2>
          <p className="text-gray-700 text-lg mb-6 text-center lg:text-left">
            Choose <strong>any two solo photos</strong> below or upload your own!
          </p>

          {!useCustom && (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
                {sampleImages.map((imgUrl, index) => {
                  const isSelected = selected.includes(imgUrl);
                  return (
                    <div
                      key={index}
                      onClick={() => toggleSelect(imgUrl)}
                      className={`relative cursor-pointer rounded-xl border-2 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden shadow-sm transition-all ${
                        isSelected
                          ? "border-fuchsia-500 ring-2 ring-orange-300 scale-105"
                          : "border-dotted border-gray-300 hover:scale-105"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Sample ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                          <CheckCircle className="text-fuchsia-600 w-6 h-6" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setUseCustom(true);
                  setSelected([]);
                }}
                className="mt-6 text-sm text-orange-700 hover:underline"
              >
                Use My Own Images
              </button>
            </>
          )}

          {useCustom && (
            <div className="mt-6 space-y-4">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/60 backdrop-blur-md border-2 border-dotted border-orange-300 rounded-xl px-4 py-3"
                >
                  <button
                    onClick={() => fileInputs[i]?.current?.click()}
                    className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-800"
                  >
                    <UploadCloud size={20} />
                    Upload Image {i + 1}
                  </button>
                  {customImages[i] && (
                    <img
                      src={customImages[i]}
                      alt={`Upload ${i + 1}`}
                      className="w-16 h-16 rounded-lg object-cover border border-orange-300"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputs[i]}
                    onChange={(e) => handleFileChange(i, e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>
              ))}
              <button
                onClick={() => setUseCustom(false)}
                className="text-sm text-gray-600 hover:underline mt-2"
              >
                Use Sample Images
              </button>
            </div>
          )}

          <div className="mt-8">
            <button
              disabled={
                useCustom
                  ? !(customImages[0] && customImages[1])
                  : selected.length !== 2
              }
              onClick={handleProcess}
              className={`px-8 py-3 rounded-full font-semibold transition-all shadow-md ${
                (useCustom
                  ? customImages[0] && customImages[1]
                  : selected.length === 2)
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Generate Group Photo
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <h3 className="text-3xl font-bold text-orange-600 mb-4">Preview</h3>
          <div className="w-full max-w-md aspect-video bg-white/60 border-2 border-dotted border-orange-300 rounded-2xl shadow-inner flex items-center justify-center overflow-hidden">
            {processedImage ? (
              <img
                src={processedImage}
                alt="Processed Group"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-500 px-6 text-center">
                Your AI-generated group photo will appear here!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
