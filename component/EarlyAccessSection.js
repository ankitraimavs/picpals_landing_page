"use client";

import { useState } from "react";

export default function EarlyAccessSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative bg-gradient-to-tr from-orange-50 to-indigo-50 py-20 px-6 sm:px-12 lg:px-24 rounded-3xl shadow-lg overflow-hidden mt-20">
      {/* Orange Blob - Moves */}
      <div className="absolute w-72 h-72 bg-orange-400 opacity-40 rounded-full blur-2xl animate-blob-1 z-0"></div>

      {/* Yellow Blob - Moves */}
      <div className="absolute w-72 h-72 bg-yellow-300 opacity-40 rounded-full blur-2xl animate-blob-2 z-0"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-6">
          Be the First to Try It!
        </h2>
        <p className="text-gray-700 mb-10">
          Sign up now to get early access and be notified when we launch. Experience the future of mobile magic.
        </p>

        <form
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full sm:w-[300px] px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            Notify Me
          </button>
        </form>

        {submitted && (
          <p className="text-sm text-green-600 mt-4">
            Thanks! We'll let you know soon 🎉
          </p>
        )}
      </div>

      {/* Blob animation styles */}
    <style jsx>{`
  @keyframes blob1 {
    0% {
      transform: translate(-150px, -100px) scale(1);
    }
    25% {
      transform: translate(100px, 50px) scale(1.1);
    }
    50% {
      transform: translate(200px, -100px) scale(0.9);
    }
    75% {
      transform: translate(-50px, 100px) scale(1.2);
    }
    100% {
      transform: translate(-150px, -100px) scale(1);
    }
  }

  @keyframes blob2 {
    0% {
      transform: translate(150px, 100px) scale(1);
    }
    25% {
      transform: translate(-100px, -50px) scale(1.1);
    }
    50% {
      transform: translate(-200px, 100px) scale(0.9);
    }
    75% {
      transform: translate(50px, -100px) scale(1.2);
    }
    100% {
      transform: translate(150px, 100px) scale(1);
    }
  }

  .animate-blob-1 {
    animation: blob1 40s ease-in-out infinite;
    top: 0;
    left: 0;
  }

  .animate-blob-2 {
    animation: blob2 50s ease-in-out infinite;
    bottom: 0;
    right: 0;
  }
`}</style>
    </section>
  );
}
