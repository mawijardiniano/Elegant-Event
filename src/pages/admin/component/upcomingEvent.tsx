import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseISO, isAfter, isBefore, startOfDay, endOfDay } from "date-fns";
import { formatted } from "@/lib/dateFormat";

export default function UpcomingEvent() {
  const [bookings, setBookings] = useState([]);
  const API = "http://localhost:3000/booking";

  const fetchBookings = async () => {
    try {
      const res = await axios.get(API);
      const data = res.data;

      const today = new Date();
      const startToday = startOfDay(today);
      const endToday = endOfDay(today);
      const filtered = data.filter((b) => {
        const start = b.booking_date ? parseISO(b.booking_date) : null;
        const end = b.booking_end ? parseISO(b.booking_end) : start;

        const isActive =
          start &&
          end &&
          (isAfter(startToday, start) || startToday.getTime() === start.getTime()) &&
          (isBefore(endToday, end) || endToday.getTime() === end.getTime());

        const isPending = b.status === "PENDING";

        return isPending || isActive;
      });

      setBookings(filtered);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="border border-gray-200 p-4">
      <h1 className="mb-4 text-xl font-bold">Pending & Active Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((b) => {
            const start = b.booking_date ? parseISO(b.booking_date) : null;
            const end = b.booking_end ? parseISO(b.booking_end) : null;

            return (
              <div
                key={b.booking_id}
                className="border p-4 rounded shadow-sm flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">{b.event_name}</h2>
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      b.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <p>
                  <strong>Venue:</strong> {b.venue?.venue_name || "N/A"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {start ? formatted(start) : "N/A"}{" "}
                  {end && end !== start ? `- ${formatted(end)}` : ""}
                </p>
                <p>
                  <strong>Booked by:</strong> {b.first_name} {b.last_name}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
