import React from "react";
import ProgressComponent from "@/pages/booking/components/progress";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { formatted } from "@/lib/dateFormat";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { resetBooking } from "../redux/bookingSlice";


export default function StepEight() {
    const dispatch = useDispatch()
  const navigate = useNavigate();
  const totalPrice = useSelector(
    (state: RootState) => state.booking.total_price
  );
  const venue = useSelector((state: RootState) => state.booking.venue);
  const date = useSelector((state: RootState) => state.booking.booking_date);
  const total_guest = useSelector(
    (state: RootState) => state.booking.guest_info?.expected_guest
  );
   const handleGoHome = () => {
    dispatch(resetBooking()); // reset all booking info and step = 1
    navigate("/"); // redirect to home page
  };


  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={8} totalSteps={8} />

      <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h2 className="text-center text-2xl font-bold">Booking Confirmed!</h2>
        <p className="text-center text-gray-600 text-md">
          Your event reservation has been successfully processed.
        </p>
        <div className="flex flex-row gap-4 my-6">
          <div className="border border-gray-200 p-4 w-full rounded-md">
            <h2 className="text-xl font-bold">Event Details</h2>
            <p>{venue?.venue_name}</p>
            <p>{venue?.venue_loc}</p>
            <p>{formatted(new Date(date))}</p>
            <p>{total_guest}</p>
          </div>
          <div className="border border-gray-200 p-4 w-full rounded-md">
            <h2 className="text-xl font-bold">Payment Summary</h2>
            <p>Total amount paid {totalPrice}</p>
          </div>
        </div>
        <div className="border border-gray-200 p-4 rounded-md">
          <h2 className="text-xl font-bold">What Happen Next?</h2>
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="font-medium">Confirmation Email</h3>
              <p className="text-sm text-gray-600">
                You'll receive a detailed confirmation email within 5 minutes at
                gdf
              </p>
            </div>

            <div>
              <h3 className="font-medium">Event Coordinator Contact</h3>
              <p className="text-sm text-gray-600">
                Our event coordinator will call you within 24 hours to discuss
                details and finalize arrangements
              </p>
            </div>
            <div>
              <h3 className="font-medium">Final Planning</h3>
              <p className="text-sm text-gray-600">
                We'll work with you to finalize all details 2 weeks before your
                event date
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 p-4 rounded-md">
          <h2 className="text-xl font-bold">Need Help?</h2>
          <div className="flex flex-row ">
            <div className="w-full border border-gray-200 p-4 rounded-md">
              <h2>Call Us</h2>
              <p>093282345</p>
            </div>
            <div className="w-full border border-gray-200 p-4 rounded-md">
              <h2>Email Us</h2>
              <p>events@elegantevents.com</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button className="bg-black text-white" onClick={handleGoHome}>Go to Home</Button>
        </div>
      </div>
    </div>
  );
}
