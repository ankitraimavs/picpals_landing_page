"use client";
import Navbar from "@/component/Navbar";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen mt-15 bg-white text-[#333] font-sans">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <section className="mb-12">
          <h1 className="text-4xl font-extrabold text-[#FF8A33] mb-4 drop-shadow">
            About Lensational
          </h1>
          <p className="text-lg leading-7 mb-4">
            <strong className="text-[#FF8A33]">Lensational</strong> is your AI-powered memory-maker! Our app uses advanced generative AI to create heartwarming group photos by merging solo pictures — perfect for long-distance families, friends, or anyone wanting to feel closer.
          </p>
          <p className="text-lg leading-7 mb-4">
            Just upload two individual photos and watch our AI seamlessly bring you together in a shared moment, whether you're miles apart or simply missed a photo opportunity.
          </p>
          <p className="text-lg leading-7 mb-4">
            No complicated tools or editing skills needed — just pure magic powered by cutting-edge technology. We're currently in early access and working hard to improve realism, lighting, and emotional authenticity in every AI-generated image.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#FF8A33] mb-4">Our Vision</h2>
          <p className="text-lg leading-7 mb-4">
            At Lensational, we believe memories should be shared — even when life gets in the way. Our mission is to bridge emotional and physical distances using AI so you can be in the moment, even if you weren’t in the frame.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#FF8A33] mb-4">Our Team</h2>

          <article className="mb-6">
            <h3 className="text-xl font-semibold mb-1">Jagannath Krishnan — Founder</h3>
            <p className="text-base leading-7">
              Jagannath holds a Bachelor’s in Computer Science from Goa College of Engineering and an MS from Stanford, with further specialization in Machine Learning and Computer Vision from MIT. 
              He has over 25 years of experience leading tech at Amazon, VMware, and Twitter. Passionate about building emotional-tech, he founded Lensational to bring people together in the moments that matter most.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
