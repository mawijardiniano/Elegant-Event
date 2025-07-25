import React from "react";
import { Button } from "@/components/ui/button";
import HeroBg from "@/assets/hero.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Darken the image using Tailwind's brightness */}
      <img
        src={HeroBg}
        alt="Hero Background"
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
        loading="eager"
      />

      {/* Optional: extra soft overlay for depth */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" /> */}

      <div className="relative z-20 flex flex-col h-full items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl text-white font-bold mb-4">
          Create Unforgettable <br />
          <span className="text-white">Moments</span>
        </h1>

        <p className="text-xl md:text-2xl font-medium text-white max-w-xl mb-6">
          Discover the perfect venue for your special event. From intimate
          gatherings to grand celebrations, we make your dreams come true.
        </p>

        <div className="flex gap-4 mb-10">
          <Button className="bg-white text-black hover:bg-gray-200">
            Book Event Now
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            Explore Venues
          </Button>
        </div>

        <div className="flex flex-row gap-20 text-white font-semibold text-lg">
          <div>
            <h1>⭐ 4.8 Average Rating</h1>
          </div>
          <div>
            <h1>🎉 300+ Events Hosted</h1>
          </div>
          <div>
            <h1>📅 10+ Years Experience</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
