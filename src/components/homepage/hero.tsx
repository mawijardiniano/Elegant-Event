import React from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col h-screen items-center justify-center gap-10 bg-gray-100">
      <h1 className="text-7xl text-gray-400 font-bold">
        Create Unforgettable <br />{" "}
        <span className="flex justify-center text-black">Moments</span>
      </h1>
      <p className="flex flex-row text-center text-2xl font-medium max-w-xl">
        Discover the perfect venue for your special event. From intimate
        gatherings to grand celebrations, we make your dreams come true.
      </p>
      <div>
        <Button className="bg-black text-white">Book Event Now</Button>
        <Button>Explore Venues</Button>
      </div>
      <div className="flex flex-row gap-40">
        <div>
          <h1>Average Rating</h1>
        </div>
        <div>
          <h1>Event Hosted</h1>
        </div>
        <div>
          <h1>Years Experience</h1>
        </div>
      </div>
    </section>
  );
}
