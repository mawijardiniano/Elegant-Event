import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="bg-gray-200 px-8 py-10">
      <div className="grid grid-cols-4 gap-8">
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
              <Link to="/venue">Venues</Link>
            </li>
            <li>
              <button onClick={() => handleNavClick("service")} className="text-left">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick("contact")} className="text-left">
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="font-medium text-xl">Services</h1>
          <ul className="text-sm text-gray-600 pt-2">
            <li>Event Planning</li>
            <li>Venue Decoration</li>
            <li>Catering Services</li>
          </ul>
        </div>

        <div>
          <h1 className="font-medium text-xl">Contact Info</h1>
          <ul className="text-sm text-gray-600 pt-2">
            <li>📞 0932-823-45xx</li>
            <li>📧 info@elegantevent.com</li>
            <li>📍 Makati City, PH</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
