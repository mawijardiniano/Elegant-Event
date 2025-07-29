import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { eachDayOfInterval, parseISO } from "date-fns";
import ChartBarActive from "@/pages/admin/component/barChart";
import UpcomingEvent from "../component/upcomingEvent";
import RecentBooking from "../component/recentBooking";

export default function Dashboard() {
  const [booking, setBooking] = useState([]);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const [range, setRange] = useState<any>(undefined);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [showError, setShowError] = useState(false);
  const API = import.meta.env.VITE_BOOKING_API;

  const fetchBooking = async () => {
    try {
      const res = await axios.get(API);
      const bookings = res.data;

      const revenue = bookings.reduce((acc: number, curr: any) => {
        return acc + (curr.total_price || 0);
      }, 0);

      setBooking(bookings);
      setTotalRevenue(revenue);

      const dates: Date[] = [];
      bookings.forEach((booking: any) => {
        const start = parseISO(booking.booking_date);
        const end = booking.booking_end ? parseISO(booking.booking_end) : start;
        const days = eachDayOfInterval({ start, end });
        dates.push(...days);
      });

      setDisabledDates(dates);
    } catch (error) {
      console.error("Error fetching booking", error);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <p>Welcome back! Here's what's happening with your events.</p>

      <div className="grid grid-cols-3 gap-4 py-4">
        <div className="grid grid-cols-2 col-span-2 gap-4">
          <div className="border border-gray-200 p-4 rounded-md h-52">
            <h2 className="text-lg font-semibold">Total Bookings</h2>
            <p className="text-2xl">{booking.length}</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-md h-52">
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            <p className="text-2xl">₱{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-md h-52">
            <h2 className="text-lg font-semibold">Venue Utilization</h2>
            <p className="text-2xl">78%</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-md h-52">
            <h2 className="text-lg font-semibold">Growth Rate</h2>
            <p className="text-2xl">15%</p>
          </div>
        </div>
        <div className="w-full max-w-xs border border-gray-200 p-4 rounded-md">
          <h1 className="text-2xl font-bold mb-4">Booking Calendar</h1>

          <div className="flex justify-center">
            <Calendar
              mode="range"
              selected={range}
              onSelect={(selectedRange) => {
                console.log("Selected Range:", selectedRange);
                setRange(selectedRange);
                setShowError(false);
              }}
              fromDate={new Date()}
              className="rounded-lg border border-gray-200"
              modifiers={{
                start: range?.from,
                end: range?.to,
                booked: disabledDates,
              }}
              modifiersClassNames={{
                start: "bg-green-500 text-white",
                end: "bg-blue-500 text-white",
                booked: "bg-red-500 text-white",
              }}
            />
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <h3 className="font-medium mb-2">Legend</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-sm" />
                <span>Booked Date</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 ">
          <ChartBarActive />
        </div>
        <UpcomingEvent />
      </div>
      <RecentBooking/>
    </div>
  );
}
