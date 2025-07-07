import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setBookingDate,
  nextStep,
  prevStep,
} from "@/pages/booking/redux/bookingSlice";

import ProgressComponent from "./progress";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function StepTwo() {
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (!date) {
      setShowError(true);
      return;
    }

    dispatch(setBookingDate(date.toISOString()));
    dispatch(nextStep());
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={2} totalSteps={8} />

      <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h1 className="font-bold text-2xl">Select Date & Time</h1>
        <p className="text-gray-600 mt-1">
          Choose the most convenient date for your event.
        </p>

        <div className="flex flex-col items-center mt-8">
          <div className="border border-gray-200 px-6 py-4 rounded-md">
            <h1 className="py-2 font-semibold text-center">Select Date</h1>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setShowError(false);
              }}
              fromDate={new Date()} // disable past dates
              className="rounded-lg border border-gray-200"
            />
            {date && (
              <p className="mt-4 text-sm text-gray-600 text-center">
                Selected Date:{" "}
                <span className="font-medium">{date.toDateString()}</span>
              </p>
            )}
            {showError && (
              <p className="text-red-500 text-sm text-center mt-2">
                Please select a date to continue.
              </p>
            )}
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
