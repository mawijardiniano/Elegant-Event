import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/layout";
import Hero from "@/components/homepage/hero";
import Venue from "@/components/homepage/venue";
import Services from "@/components/homepage/services";
import EventPackage from "@/components/homepage/eventPackage";
import Contact from "@/components/homepage/contact";

export default function Homepage() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); 
      }
    }
  }, [location]);

  return (
    <Layout>
      <Hero />
      <Venue />
      <div id="service">
        <Services />
      </div>
      <EventPackage />
      <div id="contact">
        <Contact />
      </div>
    </Layout>
  );
}
