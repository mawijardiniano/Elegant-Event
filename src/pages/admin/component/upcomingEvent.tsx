import  { useEffect, useState } from "react";
import axios from "axios";
import type { Booking } from "@/utils/types";
import { formatted } from "@/lib/dateFormat";

export default function UpcomingEvent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const API = import.meta.env.VITE_BOOKING_API;

  const fetchBookings = async () => {
    try {
      const res = await axios.get(API);
      const data: Booking[] = res.data;

      const filtered = data.filter(
        (booking) => booking.status === "PENDING" || booking.status === "ACTIVE"
      );

      setBookings(filtered.slice(0, 2));
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  });

  return (
    <div className="border border-gray-200 p-4 rounded">
      <h1 className="mb-4 text-xl font-bold">Upcoming Events</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No upcoming bookings found.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {bookings.map((booking) => (
            <div
              key={booking.booking_id}
              className="border p-3 rounded-md shadow-sm bg-white"
            >
              <p>
                <strong>Venue:</strong> {booking.venue?.venue_name || "No venue"}
              </p>
<p>
  <strong>Date:</strong>{" "}
  {booking.bookingDate?.booking_date
    ? booking.bookingDate.booking_date === booking.bookingDate.booking_end
      ? formatted(new Date(booking.bookingDate.booking_date))
      : `${formatted(new Date(booking.bookingDate.booking_date))} - ${formatted(
          new Date(booking.bookingDate.booking_end || booking.bookingDate.booking_date)
        )}`
    : "No date set"}
</p>


              <p>{booking.bookingDate?.booking_time}</p>
              <p>{booking.venue.venue_name}</p>
              <p>{booking.guest_info.expected_guest}</p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
