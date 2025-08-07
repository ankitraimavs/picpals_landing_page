"use client";

import { useState, useRef } from "react";
import { CheckCircle, UploadCloud, Loader2 } from "lucide-react";

const sampleImages = [
  "/group-photo/group-photo-1.jpg",
  "/group-photo/group-photo-2.jpg",
];

const promptOptions = [
  {
    label: "Raksha Bandhan - Traditional",
    prompt:
      "A warm Raksha Bandhan moment captured in a traditionally decorated Indian living room...",
    output: "/group-photo/group-photo-2.jpg", 
  },
  {
    label: "Graduation Celebration",
    prompt:
      "A joyful graduation scene with two friends in black graduation robes...",
    output: "/group-photo/group-photo-2.jpg",
  },
  {
    label: "Birthday Bash - Colorful Fun",
    prompt:
      "A vibrant birthday celebration in a garden setting...",
    output: "/group-photo/group-photo-2.jpg",
  },
];

export default function ImageSelectionSection() {
  const [selected, setSelected] = useState([]);
  const [processedImage, setProcessedImage] = useState(null);
  const [useCustom, setUseCustom] = useState(true);
  const [customImages, setCustomImages] = useState([null, null]);
  const [prompt, setPrompt] = useState(promptOptions[0].prompt);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);


  const fileInputs = [useRef(null), useRef(null)];

  const toggleSelect = (url) => {
    if (selected.includes(url)) {
      setSelected(selected.filter((img) => img !== url));
    } else if (selected.length < 2) {
      setSelected([...selected, url]);
    }
  };

  const handleFileChange = (index, file) => {
    if (file) {
      const updated = [...customImages];
      updated[index] = file;
      setCustomImages(updated);
    }
  };

  const handleProcess = async () => {
    setIsLoading(true);
    setProcessedImage(null);
      setCountdown(120); 


  const interval = setInterval(() => {
    setCountdown((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

    if (!useCustom) {

      const selectedPrompt = promptOptions.find((opt) => opt.prompt === prompt);
      if (selectedPrompt?.output) {
        setTimeout(() => {
          setProcessedImage(selectedPrompt.output);
          setIsLoading(false);
        }, 1000); 
        return;
      }
    }

    const formData = new FormData();

    if (useCustom) {
      if (!customImages[0] || !customImages[1]) return;
      formData.append("image1", customImages[0]);
      formData.append("image2", customImages[1]);
    } else {
      const fetchBlob = async (url) => {
        const res = await fetch(url);
        return await res.blob();
      };
      const blob1 = await fetchBlob(selected[0]);
      const blob2 = await fetchBlob(selected[1]);

      formData.append("image1", new File([blob1], "sample1.jpg", { type: "image/jpeg" }));
      formData.append("image2", new File([blob2], "sample2.jpg", { type: "image/jpeg" }));
    }

    formData.append("prompt", prompt);

    try {
      const response = await fetch("https://picpals.api.yonderwonder.ai/api/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to generate image");

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImage(imageUrl);
    } catch (err) {
      alert("Failed to process image. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen w-full px-4 py-8 bg-[#fff4e6] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/image-3.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl ml-[400px] mx-auto bg-white/70 border border-orange-200 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col lg:flex-row items-start gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-orange-600 mb-2 text-center lg:text-left">
            Make Your Group Magic
          </h2>
          <p className="text-gray-700 text-lg mb-6 text-center lg:text-left">
            Choose <strong>any two solo photos</strong> below or upload your own!
          </p>

          {/* Toggle Button */}
          {useCustom ? (
            <button
              onClick={() => {
                setUseCustom(false);
                setCustomImages([null, null]);
              }}
              className="text-sm text-gray-600 hover:underline mt-2"
            >
              Use Sample Images
            </button>
          ) : (
            <button
              onClick={() => {
                setUseCustom(true);
                setSelected([]);
              }}
              className="text-sm text-orange-700 hover:underline mt-2"
            >
              Use My Own Images
            </button>
          )}

          {/* Sample Images */}
          {!useCustom ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center mt-4">
              {sampleImages.map((imgUrl, index) => {
                const isSelected = selected.includes(imgUrl);
                return (
                  <div
                    key={index}
                    onClick={() => toggleSelect(imgUrl)}
                    className={`relative cursor-pointer rounded-xl border-2 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden shadow-md transition-all ${
                      isSelected
                        ? "border-fuchsia-500 ring-2 ring-orange-400 scale-105"
                        : "border-orange-300 hover:scale-105"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Sample ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {isSelected && (
                      <div className="absolute top-1 right-1">
                        <CheckCircle className="text-fuchsia-600 bg-white rounded-full p-0.5 w-5 h-5 shadow" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
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
                      src={URL.createObjectURL(customImages[i])}
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
            </div>
          )}

          {/* Prompt Dropdown */}
          <div className="mb-2 mt-6">
            <label
              htmlFor="prompt-select"
              className="block mb-2 text-sm font-medium text-orange-700"
            >
              Choose a Theme
            </label>
            <select
              id="prompt-select"
              className="w-full border-2 border-orange-400 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            >
              {promptOptions.map((option, idx) => (
                <option key={idx} value={option.prompt}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8">
            <button
              disabled={
                isLoading ||
                (useCustom ? !(customImages[0] && customImages[1]) : selected.length !== 2)
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
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={18} /> Processing...
                </span>
              ) : (
                "Generate Group Photo"
              )}
            </button>
            {isLoading && countdown > 0 && (
  <p className="mt-2 mx-3 text-sm text-black text-left">
    Average Waiting Time : {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
  </p>
)}

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
