import React from "react";
import ProgressComponent from "./progress";
import { useSelector, useDispatch } from "react-redux";
import { formatted } from "@/lib/dateFormat";
import { Separator } from "@/components/ui/separator";
import { prevStep, nextStep, setTotalPrice } from "@/pages/booking/redux/bookingSlice";
import { Button } from "@/components/ui/button";

export default function StepSix() {
  const dispatch = useDispatch();

  // Redux state
  const venue = useSelector((state: any) => state.booking.venue);
  const bookingDate = useSelector((state: any) => state.booking.booking_date);
  const event = useSelector((state: any) => state.booking.guest_info);
  const contact = useSelector((state: any) => state.booking.contact_info);
  const pkg = useSelector((state: any) => state.booking.package);
  const services = useSelector((state: any) => state.booking.service || []);

  // Extract start date properly
  let startDate: Date | null = null;
  if (bookingDate?.start) {
    startDate = new Date(bookingDate.start);
  }

  const venuePrice = venue?.venue_price || 0;
  const packagePrice = pkg?.package_price || 0;
  const servicesTotal = services.reduce((acc: number, s: any) => acc + (s.serv_price || 0), 0);
  const total = venuePrice + packagePrice + servicesTotal;

  // Handle continue (go to next step)
  const handleContinue = () => {
    dispatch(setTotalPrice(total));
    dispatch(nextStep());
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={6} totalSteps={8} />

      <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h1 className="font-bold text-2xl">Booking Summary</h1>
        <p className="text-gray-600 mt-1">
          Please review your booking details before proceeding to payment.
        </p>

        <div className="flex flex-row gap-4 mt-4">
          <div className="border border-gray-200 p-4 w-92">
            <h2 className="font-semibold text-lg mb-2">Event Details</h2>
            <p><strong>Venue:</strong> {venue?.venue_name}</p>
<p>
  <strong>Date:</strong>{" "}
  {startDate
    ? formatted(startDate) +
      (bookingDate?.end ? ` - ${formatted(new Date(bookingDate.end))}` : "")
    : "No date selected"}
</p>
<p>
  <strong>Time:</strong> {bookingDate?.time ?? "No time selected"}
</p>


            <p><strong>Expected Guests:</strong> {event?.expected_guest}</p>
            <p><strong>Event Type:</strong> {event?.event_type?.event_type}</p>
            <p><strong>Event Name:</strong> {event?.event_name}</p>
          </div>

          <div className="border border-gray-200 p-4 w-92">
            <h2 className="font-semibold text-lg mb-2">Contact Information</h2>
            <p>{contact?.first_name} {contact?.last_name}</p>
            <p>{contact?.number}</p>
            <p>{contact?.email}</p>
          </div>
        </div>
        {(packagePrice > 0 || services.length > 0) && (
          <div className="w-full border border-gray-200 mt-6 p-4">
            <h2 className="font-semibold text-lg mb-2">Package & Services</h2>

            {packagePrice > 0 && (
              <>
                <p><strong>Package:</strong> {pkg?.package_name}</p>
                <p><strong>Package Price:</strong> ₱{packagePrice.toLocaleString()}</p>
              </>
            )}

            <p><strong>Venue Price:</strong> ₱{venuePrice.toLocaleString()}</p>

            {services.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Additional Services:</p>
                <ul className="list-disc list-inside">
                  {services.map((s: any, idx: number) => (
                    <li key={idx}>
                      {s.serv_name}: ₱{s.serv_price?.toLocaleString() || 0}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator className="my-4" />
            <p className="text-lg font-bold">Total: ₱{total.toLocaleString()}</p>
          </div>
        )}
        <div className="flex justify-between px-10 pt-8">
          <Button
            className="bg-black text-white"
            onClick={() => dispatch(prevStep())}
          >
            Previous
          </Button>
          <Button
            className="bg-black text-white"
            onClick={handleContinue}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
