import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Booking } from "@/utils/types";
import { formatted } from "@/lib/dateFormat";

export default function RecentBooking() {
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const API = import.meta.env.VITE_BOOKING_API;

  const fetchBookings = async () => {
    try {
      const res = await axios.get(API);
      const data = res.data;

      const recent = data.filter(
        (booking: Booking) => booking.status === "COMPLETED"
      );
      setRecentBookings(recent);
    } catch (error) {
      console.error("Error fetching booking", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <div className="border border-gray-200 p-4">
      <h1 className="mb-2 text-2xl font-bold">Recent Booking</h1>
      <div className="flex flex-col gap-2">
        {recentBookings.map((recent, index) => (
          <div className="border border-gray-200 p-4" key={index}>
            <p>{recent.venue?.venue_name}</p>
            <p>
              {" "}
              {recent.booking_date === recent.booking_end
                ? formatted(recent.booking_date)
                : `${formatted(recent.booking_date)} - ${formatted(
                    recent.booking_end
                  )}`}
            </p>
            <p>{recent.expected_guest}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
