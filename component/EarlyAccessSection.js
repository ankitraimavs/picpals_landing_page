"use client";

import { useRef, useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function EarlyAccessSection() {
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    try {
      const formData = new FormData();
      formData.append("email", email);
      const res = await fetch(`${baseUrl}/api/save-email`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Network response was not ok");

      setSubmitted(true);
      emailRef.current.value = "";
    } catch (err) {
      console.error("Failed to submit email:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="relative py-28 px-6 sm:px-12 lg:px-24 bg-[#FFF7ED] text-gray-900 overflow-hidden rounded-3xl shadow-2xl mt-10">
      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#FDBA74] opacity-30 rounded-full blur-3xl z-0 animate-blob-1" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D8B4FE] opacity-30 rounded-full blur-3xl z-0 animate-blob-2" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-block bg-[#F97316] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 shadow-md">
          We're Launching Our Mobile App
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#7C2D12] mb-6">
          Join the Waitlist Today
        </h2>

        <p className="text-lg text-gray-800 mb-8">
          Don’t miss out — get early access and exclusive previews before launch.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <input
            ref={emailRef}
            type="email"
            required
            placeholder="Enter your email"
            className="w-full sm:w-[300px] px-5 py-3 rounded-full border border-orange-300 shadow-md focus:ring-2 focus:ring-[#F97316] outline-none transition"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[#F97316] text-white font-semibold hover:bg-[#ea580c] transition shadow-md"
          >
            Notify Me
          </button>
        </form>

        {submitted && (
          <p className="text-sm text-green-600 font-medium">
            You're on the list! We’ll keep you posted.
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="h-12 w-40 flex items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-full object-contain"
            />
          </div>
          <div className="h-12 w-40 flex items-center justify-center">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes blob1 {
          0% {
            transform: translate(-100px, -50px) scale(1);
          }
          50% {
            transform: translate(50px, 20px) scale(1.1);
          }
          100% {
            transform: translate(-100px, -50px) scale(1);
          }
        }

        @keyframes blob2 {
          0% {
            transform: translate(100px, 50px) scale(1);
          }
          50% {
            transform: translate(-30px, -80px) scale(1.2);
          }
          100% {
            transform: translate(100px, 50px) scale(1);
          }
        }

        .animate-blob-1 {
          animation: blob1 30s ease-in-out infinite;
        }

        .animate-blob-2 {
          animation: blob2 40s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
