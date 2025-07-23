import React, { useEffect, useState } from "react";
import ProgressComponent from "./progress";
import axios from "axios";
import type { Packages, Service } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import {
  setPackage,
  setService,
  nextStep,
  prevStep,
} from "@/pages/booking/redux/bookingSlice";
import { FiPackage, FiCheckCircle, FiCheck, FiPlusCircle } from "react-icons/fi";

export default function StepFour() {
  const dispatch = useDispatch();
  const PACKAGE_API = "http://localhost:3000/package";
  const SERVICE_API = "http://localhost:3000/service";

  const [packages, setPackages] = useState<Packages[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const fetchService = async () => {
    try {
      const res = await axios.get(SERVICE_API);
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  const handleSelectPackage = (pkg: Packages) => {
    setSelectedPackage(pkg.package_id);
    dispatch(setPackage(pkg));
  };

  const handleServiceToggle = (service: Service) => {
    setSelectedServices((prev) => {
      if (prev.find((s) => s.serv_id === service.serv_id)) {
        return prev.filter((s) => s.serv_id !== service.serv_id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleContinue = () => {
    if (selectedPackage === null) {
      alert("Please select a package before continuing.");
      return;
    }

    dispatch(setService(selectedServices)); // Dispatch full Service objects
    dispatch(nextStep());
  };
  const fetchPackage = async () => {
    try {
      const res = await axios.get(PACKAGE_API);
      const packagesWithParsedFeatures = res.data.map((pkg: Packages) => ({
        ...pkg,
        features:
          typeof pkg.features === "string"
            ? pkg.features.split(",").map((f: string) => f.trim())
            : pkg.features,
      }));

      setPackages(packagesWithParsedFeatures);
    } catch (error) {
      console.error("Error fetching packages", error);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, []);

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={4} totalSteps={8} />

      <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h1 className="font-bold text-2xl">Select Package & Add-ons</h1>
        <p className="text-gray-600 mt-1">
          Choose the package that best fits your needs and add any additional
          services.
        </p>
        <p>Choose Your Package</p>
        <div className="flex flex-row justify-between gap-2">
          {packages.map((p, index) => (
            <div
              key={index}
              onClick={() => handleSelectPackage(p)}
              className={`cursor-pointer border-2 ${
                selectedPackage === p.package_id
                  ? "border-black"
                  : "border-gray-200"
              } min-w-[200px] min-h-[350px] rounded-md flex flex-col overflow-hidden px-2 py-4`}
            >
              <p className="text-center text-xl font-black">{p.package_name}</p>
              <p className="text-center w-56 text-md text-gray-500">{p.package_desc}</p>
              <p className="text-center">${p.package_price.toFixed(2)}</p>
              <ul className="list-disc ml-6 mt-2">
                {p.features &&
                  p.features.map((feature: string, i: number) => (
                    <li className="list-none flex flex-row gap-2 items-center text-sm" key={i}>
                     <FiCheck color="blue text-lg"/> {feature}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <h2 className="text-xl font-semibold mb-4">
            Select Additional Services
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <label
                key={index}
                className="border border-gray-200 p-4 flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedServices.some(
                    (s) => s.serv_id === service.serv_id
                  )}
                  onChange={() => handleServiceToggle(service)}
                  className="mr-3"
                />

                <div>
                  <h3 className="font-medium">{service.serv_name}</h3>
                  <p>${service.serv_price.toFixed(2)}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between px-10 pt-8">
          <Button
            className="bg-black text-white"
            onClick={() => dispatch(prevStep())}
          >
            Previous
          </Button>
          <Button className="bg-black text-white" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
