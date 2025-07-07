import React, { useState } from "react";
import ProgressComponent from "./progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import {
  prevStep,
  nextStep,
  setContactInfo,
} from "@/pages/booking/redux/bookingSlice";

export default function StepFive() {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  const isFormValid =
    [firstName, lastName, email, number].every(
      (field) => field.trim() !== ""
    ) && agreedToTerms;

  const handleContinue = () => {
    if (!firstName || !lastName || !email || !number) {
      alert("Please fill in all personal information fields.");
      return;
    }

    if (!agreedToTerms) {
      alert("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    dispatch(
      setContactInfo({
        first_name: firstName,
        last_name: lastName,
        email,
        number,
      })
    );

    dispatch(nextStep());
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={5} totalSteps={8} />

      <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h1 className="font-bold text-2xl">Contact Information</h1>
        <p className="text-gray-600 mt-1">
          Please provide your contact details for the booking confirmation and
          event coordination.
        </p>

        <div className="border border-gray-200 p-4">
          <h1 className="pb-4 font-semibold">Personal Information</h1>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="w-full">
              <Label className="mb-1 block">First Name</Label>
              <Input
                placeholder="Enter your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label className="mb-1 block">Last Name</Label>
              <Input
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="w-full">
              <Label className="mb-2 block">Email</Label>
              <Input
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label className="mb-2 block">Number</Label>
              <Input
                placeholder="Enter your Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>

          <h2 className="mt-6 font-semibold mb-4">Address Information</h2>

          <div className="flex flex-row gap-4 mb-4">
            <div className="w-full">
              <Label className="mb-2 block">Street</Label>
              <Input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label className="mb-2 block">Barangay</Label>
              <Input
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 mb-4">
            <div className="w-full">
              <Label className="mb-2 block">Municipality</Label>
              <Input
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label className="mb-2 block">Province/City</Label>
              <Input
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label className="mb-2 block">Zip Code</Label>
              <Input value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms((prev) => !prev)}
              />
              <span>
                I agree to the{" "}
                <a href="/terms" className="text-blue-500 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/policy" className="text-blue-500 underline">
                  Privacy Policy
                </a>{" "}
                *
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={subscribeNewsletter}
                onChange={() => setSubscribeNewsletter((prev) => !prev)}
              />
              <span>
                Subscribe to our newsletter for event tips and special offers
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between px-10 pt-8">
        <Button
          className="bg-black text-white"
          onClick={() => dispatch(prevStep())}
        >
          Previous
        </Button>
        <Button
          className={`text-white ${
            isFormValid
              ? "bg-black hover:bg-gray-800"
              : "bg-gray-600 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
