import React, { useState, useEffect } from "react";
import axios from "axios";
import type { Packages } from "@/utils/types";

export default function EventPackage() {
  const [packageList, setPackages] = useState<Packages[]>([]);

  const API = "http://localhost:3000/package";

  const fetchPackage = async () => {
    try {
      const res = await axios.get(API);
      setPackages(res.data.splice(0,3));
    } catch (error) {
      console.error("WError fetching packages", error);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, []);
  return (
    <section className="flex flex-col items-center  py-20">
      <h1 className="text-4xl font-bold">Event Packages</h1>
      <p className="text-center max-w-xl text-xl font-medium text-gray-400 py-4">
        Choose the perfect package for your event. All packages can be
        customized to meet your specific needs.
      </p>
      <div className="flex flex-row gap-8 ">
        {packageList.map((packages) => (
          <div className="min-w-[350px] min-h-[450px] border border-gray-200" key={packages.package_id}>
            <h1>{packages.package_name}</h1>
          </div>
        ))}
      </div>
    </section>
  );
}
