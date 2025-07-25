import React, { useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { StripeCardElement } from "@stripe/stripe-js";
import ProgressComponent from "@/pages/booking/components/progress";
import { prevStep, nextStep } from "../redux/bookingSlice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/pages/booking/store";

export default function StepSeven() {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const venue = useSelector((state: RootState) => state.booking.venue);
  const pkg = useSelector((state: RootState) => state.booking.package);
  const service = useSelector((state: RootState) => state.booking.service);
  const guestInfo = useSelector((state: RootState) => state.booking.guest_info);
  const contactInfo = useSelector((state: RootState) => state.booking.contact_info);
  const booking_date = useSelector((state: RootState) => state.booking.booking_date);
  const totalPrice = useSelector((state: RootState) => state.booking.total_price);

  const venuePrice = venue?.venue_price || 0;
  const packagePrice = pkg?.package_price || 0;
  const servicesTotal = (service || []).reduce(
    (acc: number, s) => acc + (s.serv_price || 0),
    0
  );
  const total = venuePrice + packagePrice + servicesTotal;

  const [name, setName] = useState("");
  const [cardError, setCardError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setCardError(null);

    if (!name.trim()) {
      setCardError("Please enter the name on the card.");
      return;
    }

    if (!stripe || !elements) {
      setCardError("Stripe has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement) as StripeCardElement | null;
    if (!cardElement) {
      setCardError("Card element not found.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/payment/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice * 100, email: contactInfo?.email }),
      });

      const data = await res.json();
      if (!data.clientSecret) throw new Error("Missing client secret");

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name },
        },
      });

      if (result.error) {
        setCardError(result.error.message || "Payment failed.");
        setLoading(false);
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        const bookingPayload = {
          venue_id: venue?.venue_id,
          package_id: pkg?.package_id ?? null,
          booking_date,
          total_price: totalPrice,
          event_type_id: guestInfo?.event_type?.event_type_id ?? null,
          expected_guest: guestInfo?.expected_guest ?? 0,
          event_name: guestInfo?.event_name ?? "",
          description: guestInfo?.description ?? "",
          request: guestInfo?.request ?? "",
          first_name: contactInfo?.first_name ?? "",
          last_name: contactInfo?.last_name ?? "",
          email: contactInfo?.email ?? "",
          number: contactInfo?.number ?? "",
          services: {
            create: (service ?? []).map((s) => ({
              serv_id: s.serv_id,
            })),
          },
        };

        const bookingRes = await fetch("http://localhost:3000/booking/add-booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingPayload),
        });

        if (!bookingRes.ok) {
          throw new Error("Booking creation failed.");
        }

        dispatch(nextStep());
      }
    } catch (err) {
      console.error(err);
      setCardError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={7} totalSteps={8} />

      <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
        <p className="mb-4 text-gray-600">
          Secure payment processing. Your information is encrypted and protected.
        </p>

        <div className="flex flex-row gap-8">
          <div className="border border-gray-200 p-4 w-full">
            <h2>Card Information</h2>

            <label htmlFor="name" className="block mb-1 font-medium">
              Name on Card
            </label>
            <input
              id="name"
              type="text"
              placeholder="Cardholder Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block mb-1 font-medium">Card Details</label>
            <div className="border border-gray-300 p-3 rounded mb-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                      fontFamily: "Arial, sans-serif",
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
                onChange={(e) => setCardError(e.error ? e.error.message : null)}
              />
            </div>

            {cardError && <p className="text-red-600 mb-2">{cardError}</p>}
          </div>

          {/* Summary */}
          <div className="w-full border border-gray-200 p-4">
            <h2>Order Summary</h2>
            <p>
              <strong>Venue:</strong> {venue?.venue_name}
            </p>
            <p>₱{venuePrice.toLocaleString()}</p>

            {(packagePrice > 0 || (service?.length ?? 0) > 0) && (
              <div>
                <h2 className="font-semibold text-lg mb-2">Package & Services</h2>

                {packagePrice > 0 && (
                  <>
                    <p>
                      <strong>Package:</strong> {pkg?.package_name}
                    </p>
                    <p>
                      <strong>Package Price:</strong> ₱
                      {packagePrice.toLocaleString()}
                    </p>
                  </>
                )}

                {service && service.length > 0 && (
                  <div className="mt-2">
                    <p className="font-semibold">Additional Services:</p>
                    <ul className="list-disc list-inside">
                      {service.map((s, idx) => (
                        <li className="list-none" key={idx}>
                          {s.serv_name}: ₱
                          {(s.serv_price ?? 0).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Separator className="my-4" />
                <p className="text-lg font-bold">Total: ₱{total.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between px-10 pt-8">
          <Button
            className="bg-black text-white"
            onClick={() => dispatch(prevStep())}
            disabled={loading}
          >
            Previous
          </Button>

          <Button
            className="bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400"
            onClick={handlePayment}
            disabled={!stripe || loading || totalPrice <= 0}
          >
            {loading ? "Processing…" : `Pay ₱${totalPrice.toLocaleString()}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
