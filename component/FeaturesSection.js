"use client";

import Image from "next/image";

const features = [
  {
    title: "At the Beach",
    description: "Relaxed vibes and sun-soaked memories.",
    position: "top-0 left-1/2 -translate-x-1/2",
    color: "bg-sky-400",
  },
  {
    title: "Pub Hangout",
    description: "Cheers with friends in your favorite bar.",
    position: "top-[15%] right-0 -translate-y-1/2",
    color: "bg-amber-600",
  },
  {
    title: "Suits & City",
    description: "Sharp looks in a modern setting.",
    position: "top-1/2 right-0 -translate-y-1/2",
    color: "bg-gray-800",
  },
  {
    title: "Cafe Moment",
    description: "Warm drinks and cozy chats.",
    position: "bottom-[15%] right-0 translate-y-1/2",
    color: "bg-rose-500",
  },
  {
    title: "Workout Partners",
    description: "Sweat and hustle, side by side.",
    position: "bottom-0 left-1/2 -translate-x-1/2",
    color: "bg-lime-600",
  },
  {
    title: "Festival Fun",
    description: "Dance, lights, and celebration.",
    position: "bottom-[15%] left-0 translate-y-1/2",
    color: "bg-purple-700",
  },
  {
    title: "Classic Studio",
    description: "Minimal and clean studio portraits.",
    position: "top-1/2 left-0 -translate-y-1/2",
    color: "bg-gray-400",
  },
  {
    title: "Street Style",
    description: "Urban fashion in motion.",
    position: "top-[15%] left-0 -translate-y-1/2",
    color: "bg-yellow-400",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative w-full min-h-[700px] sm:min-h-[900px] flex items-center justify-center px-4 mt-20">
      
      {/* Circular Feature Texts */}
      <div className="absolute w-[90vw] h-[90vw] max-w-[750px] max-h-[750px] hidden sm:block">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`absolute ${feature.position} w-[140px] text-center`}
          >
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 ${feature.color} text-white rounded-full flex items-center justify-center mb-2 text-sm font-semibold shadow-md`}>
                {index + 1}
              </div>
              <p className="text-sm font-semibold text-gray-800">{feature.title}</p>
              <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Centered & Bigger Smartphone */}
      <div className="">
       <video
              src="/smartphone3.mp4"
              width={300}
              height={800}
              className="object-contain w-[160px] sm:w-[240px] md:w-[300px] lg:w-[320px]"
              autoPlay
              muted
              playsInline
            />
      </div>
    </section>
  );
};

export default FeaturesSection;
