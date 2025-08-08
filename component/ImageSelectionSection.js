"use client";

import { useState, useRef } from "react";
import { CheckCircle, UploadCloud, Loader2, Download } from "lucide-react";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const sampleImages = [
  "/group-photo/sample-1.jpg",
  "/group-photo/sample-2.jpg",
];

const promptOptions = [
  {
    label: "Raksha Bandhan - Traditional",
    prompt: "traditional",
    output: "/group-photo/sample-rakhi-1.jpg",
  },
  {
    label: "Casual in a Cafe",
    prompt: "modern",
    output: "/group-photo/sample-rakhi-modern.jpg",
  },
  {
    label: "Graduation Celebration",
    prompt: "A joyful graduation scene with two friends in black graduation robes...",
    output: "/group-photo/sample-rakhi-2.jpg",
  },
  {
    label: "Birthday Bash - Colorful Fun",
    prompt: "A vibrant birthday celebration in a garden setting...",
    output: "/group-photo/sample-rakhi-3.jpg",
  },
  {
    label: "Two Friends at the Beach",
    prompt: "Two friends enjoying a sunny day at the beach with waves crashing behind them...",
    output: "/group-photo/sample-beach-friends.jpg",
  },
  {
    label: "A Date at a Cafe",
    prompt: "A romantic moment between a couple having coffee at a cozy outdoor cafe...",
    output: "/group-photo/sample-cafe-date.jpg",
  },
  {
    label: "Picnic in the Park",
    prompt: "A cheerful group picnic in a lush green park with blankets, food baskets, and laughter...",
    output: "/group-photo/sample-picnic.jpg",
  },
  {
    label: "Supermodels Photoshoot",
    prompt: "Two glamorous supermodels striking poses in a high-fashion studio photoshoot...",
    output: "/group-photo/sample-photoshoot.jpg",
  },
  {
    label: "Magazine Cover",
    prompt: "A polished group portrait styled like a high-end fashion magazine cover...",
    output: "/group-photo/sample-magazine-cover.jpg",
  },
  {
    label: "Taj Mahal Group Selfie",
    prompt: "A lively group selfie taken in front of the Taj Mahal, filled with joy and wonder...",
    output: "/group-photo/sample-tajmahal-selfie.jpg",
  },
  {
    label: "Exchanging Wedding Vows",
    prompt: "A romantic wedding ceremony scene where a couple is exchanging vows...",
    output: "/group-photo/sample-wedding-vows.jpg",
  },
  {
    label: "Downtown New York",
    prompt: "A dynamic group shot in bustling downtown New York with iconic skyscrapers in the background...",
    output: "/group-photo/sample-nyc.jpg",
  },
  {
    label: "Celebrity Interview",
    prompt: "An exciting interview scene with a fan sitting across their favorite celebrity in a studio setup...",
    output: "/group-photo/sample-celebrity-interview.jpg",
  },
  {
    label: "Custom Prompt..",
    prompt: "Add your own custom group photo idea...",
    output: "/group-photo/sample-custom.jpg",
  },
];

export default function ImageSelectionSection() {
  const [selected, setSelected] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);
  const [useCustom, setUseCustom] = useState(true);
  const [customImages, setCustomImages] = useState([null, null]);
  const [prompt, setPrompt] = useState(promptOptions[0].prompt);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);



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
    setProcessedImages([]);
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
          setProcessedImages([selectedPrompt.output]);
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
      const response = await fetch(`${baseUrl}/api/process`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to generate image");

      const data = await response.json();
      const imagePaths = data.images;

      // Fetch each image individually
      const imageFetchPromises = imagePaths.map(async (path) => {
        const imageResponse = await fetch(`${baseUrl}/api${path}`);
        if (!imageResponse.ok) throw new Error("Failed to fetch image");
        return URL.createObjectURL(await imageResponse.blob());
      });

      const imageUrls = await Promise.all(imageFetchPromises);
      setProcessedImages(imageUrls);
    } catch (err) {
      console.error(err);
      alert("Failed to process image. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isSampleOutput = !useCustom && selected.length === 2;

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
      <div className="max-w-6xl w-full mx-auto bg-white/70 border border-orange-200 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col lg:flex-row items-start gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-600 mb-2 text-center lg:text-left">
            Bringing You Together
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-6 text-center lg:text-left">
            Choose <strong>any two solo photos</strong> below or upload your own!
          </p>

          {/* Toggle */}
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
                    className={`relative cursor-pointer rounded-xl border-2 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden shadow-md transition-all ${isSelected
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
              <p className="text-sm text-orange-700 font-medium mb-2 text-center sm:text-left">
                Please upload the <strong>Sister’s</strong> image first and the <strong>Brother’s</strong> image second.
              </p>

              {[0, 1].map((i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative flex items-center gap-4 bg-white/60 backdrop-blur-md border-2 border-dotted border-orange-300 rounded-xl px-4 py-3"
                >

                  <button
                    onClick={() => fileInputs[i]?.current?.click()}
                    className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-800"
                  >
                    <UploadCloud size={20} />
                    {`Upload ${i === 0 ? "Sister's" : "Brother's"} Image`}

                  </button>
                  {customImages[i] && (
                    <img
                      src={URL.createObjectURL(customImages[i])}
                      alt={`Upload ${i + 1}`}
                      className="w-16 h-16 rounded-lg object-cover border border-orange-300"
                    />
                  )}

                  {hoveredIndex === i && processedImages.length === 0 && (
                    <div className="absolute z-50 left-full top-1/2 -translate-y-1/2 ml-4 w-[280px] bg-white border border-orange-300 p-4 rounded-xl shadow-xl pointer-events-none">
                      <h3 className="text-lg font-semibold text-orange-600 mb-2">
                        For Best Results
                      </h3>
                      <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                        <li>Face the camera directly, with a neutral or slight smile</li>
                        <li>Keep the camera at eye level</li>
                        <li>Ensure good lighting and clear visibility</li>
                        <li>Avoid filters, sunglasses, or obstructions</li>
                        <li>Upload a solo photo (no group shots)</li>
                        <li>Acceptable formats: JPG or PNG</li>
                      </ul>
                      {customImages[i] && (
                        <img
                          src="/group-photo/example.jpg"
                          alt="example"
                          className="mt-2 w-full h-36 rounded-lg object-cover border border-orange-300"
                        />
                      )}
                    </div>
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

          {/* Prompt Select */}
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
              {promptOptions.map((option, idx) => {
                const isEnabled =
                  option.label === "Raksha Bandhan - Traditional" ||
                  option.label === "Casual in a Cafe";

                return (
                  <option
                    key={idx}
                    value={option.prompt}
                    disabled={!isEnabled}
                    className={!isEnabled ? "text-gray-400" : ""}
                  >
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Generate Button */}
          <div className="mt-8">
            <button
              disabled={
                isLoading ||
                (useCustom ? !(customImages[0] && customImages[1]) : selected.length !== 2)
              }
              onClick={handleProcess}
              className={`px-8 py-3 rounded-full font-semibold transition-all shadow-md ${useCustom
                ? customImages[0] && customImages[1]
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
                : selected.length === 2
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
              <p className="mt-2 text-sm text-black text-left">
                Average Waiting Time : {Math.floor(countdown / 60)}:{
                  (countdown % 60).toString().padStart(2, "0")
                }
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-4">Preview</h3>
          <div className="w-full max-w-lg min-h-[400px] bg-white/60 border-2 border-dotted border-orange-300 rounded-2xl shadow-inner flex items-center justify-center overflow-hidden">

            {processedImages.length > 0 ? (
              <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-1 p-1">
                {processedImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden group transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={imgUrl}
                      alt={`Generated ${index + 1}`}
                      onClick={() => setFullscreenImage(imgUrl)}
                      className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300"
                    />


                    <a
                      href={imgUrl}
                      download={`generated-group-photo-${index + 1}.jpg`}
                      className="absolute bottom-2 right-2 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-orange-100"
                      title="Download image"
                    >
                      <Download className="w-4 h-4 text-orange-600" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 px-6 text-center">
                Your output group photos will appear here!
              </p>
            )}
          </div>


        </div>



      </div>
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6   p-1.5 rounded-full shadow-lg z-50"
          >
            <span className="text-xl font-bold text-white">×</span>
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full rounded-lg shadow-lg cursor-zoom-out"
            onClick={() => setFullscreenImage(null)}
          />
        </div>
      )}
    </section>
  );
}