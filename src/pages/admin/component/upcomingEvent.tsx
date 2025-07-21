import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Booking } from "@/utils/types";
import { formatted } from "@/lib/dateFormat";

export default function UpcomingEvent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const API = "http://localhost:3000/booking";

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
  }, []);

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
                {booking.booking_date === booking.booking_end
                  ? formatted(booking.booking_date)
                  : `${formatted(booking.booking_date)} - ${formatted(
                      booking.booking_end
                    )}`}
              </p>
              <p>{booking.booking_time}</p>
              <p>{booking.venue.venue_name}</p>
              <p>{booking.expected_guest}</p>
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
