import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "./data-table"; // Your DataTable component
import { columns } from "./columns";
import type { Booking } from "@/utils/types";

export default function Booking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const API = "http://localhost:3000/booking";

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await axios.get(API);
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching booking", error);
      }
    }
    fetchBookings();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      console.log("Sample booking:", bookings[0]);
    }
  }, [bookings]);

  return (
    <div>
        <h1 className="text-2xl font-bold">Bookings Management</h1>
        <p>Manage all event bookings and reservations</p>
        <div className="flex flex-row gap-4 p-4">
                        <div className="w-full p-4 border border-gray-200">dsa</div>
                                    <div className="w-full p-4 border border-gray-200">dsa</div>
                                                <div className="w-full p-4 border border-gray-200">dsa</div>
                                                            <div className="w-full p-4 border border-gray-200">dsa</div>
        </div>

        <div className="p-4">
              <DataTable columns={columns} data={bookings} />
        </div>
    
    </div>
  );
}
