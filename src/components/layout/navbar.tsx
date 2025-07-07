import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 bg-gray-200 py-4 px-8 transition-opacity duration-300 ${
        isScrolled ? "opacity-80 backdrop-blur-md shadow-md" : "opacity-100"
      }`}
    >
      <div className="flex flex-row justify-between items-center px-20">
        <h1 className="font-bold text-lg">Elegant Event</h1>
        <ul className="flex gap-4">
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/venue"}>Venues</Link></li>
          <li><Link to={"/services"}>Services</Link></li>
          <li><Link to={"/gallery"}>Gallery</Link></li>
          <li><Link to={"/contact"}>Contact</Link></li>
        </ul>
        <div className="flex flex-row gap-4 items-center">
          <h1>093282345</h1>
         <Link to={'/booking'}>
          <Button  className="bg-black text-white">Book now</Button>
         </Link>
        </div>
      </div>
    </div>
  );
}
