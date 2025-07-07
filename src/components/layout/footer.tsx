import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-200 px-8 py-10">
      <div className="grid grid-cols-4 gap-8 ">
        <div>
          <h1 className="font-medium text-xl">Elegant Event</h1>
          <p className="w-60">
            Creating unforgettable moments with premium event venues and
            exceptional service.
          </p>
        </div>
        <div>
          <h1 className="font-medium text-xl">Quick Links</h1>
          <ul className="flex flex-col gap-4">
            <li>
              <Link to={"/venue"}>Venues</Link>
            </li>
            <li>
              <Link to={"/services"}>Services</Link>
            </li>
            <li>
              <Link to={"/gallery"}>Gallery</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="font-medium text-xl">Services</h1>
        </div>
        <div>
          <h1 className="font-medium text-xl">Contact Info</h1>
        </div>
      </div>
    </footer>
  );
}
