import React, { useEffect, useState } from "react";
import axios from "axios";
import type { VenueList } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import DeleteModal from "../component/deleteModal";

export default function Venue() {
  const VENUE_API = "http://localhost:3000/venue";
  const BOOKING_API = "http://localhost:3000/booking";

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingCounts, setBookingCounts] = useState<Record<string, number>>(
    {}
  );
  const [revenueMap, setRevenueMap] = useState<Record<string, number>>({});

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<VenueList | null>(null);

  const venuesPerPage = 2;

  const [form, setForm] = useState({
    venue_name: "",
    venue_desc: "",
    venue_capacity: "",
    venue_loc: "",
    venue_price: "",
    tag: [{ tag_name: "" }],
  });

  const [venue, setVenue] = useState<VenueList[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      tag: [{ ...prev.tag[0], tag_name: value }],
    }));
  };

  const addVenueModal = () => setIsOpen(true);
  const closeVenueModal = () => setIsOpen(false);

  const fetchVenue = async () => {
    try {
      const res = await axios.get(VENUE_API);
      setVenue(res.data);
    } catch (error) {
      console.error("Error fetching venue", error);
    }
  };

  const fetchTotalBooking = async () => {
    try {
      const res = await axios.get(BOOKING_API);
      const bookings = res.data;

      const bookingCountMap: Record<string, number> = {};

      bookings.forEach((booking: any) => {
        const venueId = booking.venue_id;
        if (venueId) {
          bookingCountMap[venueId] = (bookingCountMap[venueId] || 0) + 1;
        }
      });

      setBookingCounts(bookingCountMap);
    } catch (error) {
      console.error("Error fetching total bookings:", error);
    }
  };

  const fetchTotalRevenue = async () => {
    try {
      const res = await axios.get(BOOKING_API);
      const bookings = res.data;

      const revenuePerVenue: Record<string, number> = {};

      bookings.forEach((booking: any) => {
        const venueId = booking.venue?.venue_id?.toString();
        const total = parseFloat(booking.total_price);

        if (venueId && !isNaN(total)) {
          revenuePerVenue[venueId] = (revenuePerVenue[venueId] || 0) + total;
        }
      });

      setRevenueMap(revenuePerVenue);
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };

  useEffect(() => {
    fetchVenue();
    fetchTotalBooking();
    fetchTotalRevenue();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredVenues = venue.filter((v) =>
    v.venue_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);
  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = filteredVenues.slice(
    indexOfFirstVenue,
    indexOfLastVenue
  );

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold">Venues Management</h1>
          <p>Manage your event venues and their availability</p>
        </div>
        <Button onClick={addVenueModal}>Add Venue</Button>
      </div>

      <div className="flex flex-row gap-4 py-4">
        <div className="w-full p-4 border border-gray-200">{venue.length}</div>
        <div className="w-full p-4 border border-gray-200">dsa</div>
        <div className="w-full p-4 border border-gray-200">dsa</div>
        <div className="w-full p-4 border border-gray-200">dsa</div>
      </div>

      <div className="p-4 border border-gray-200">
        <Input
          placeholder="Search venue"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 py-4">
        {currentVenues.map((venues, index) => (
          <div key={index} className="border border-gray-200 p-4 w-full">
            <div className="flex flex-row justify-between">
              <p>{venues.venue_name}</p>
              <p>4.9</p>
            </div>
            <p>{venues.venue_desc}</p>
            <p>{venues.venue_loc}</p>
            <p>{venues.venue_capacity}</p>
            <p className="text-sm text-gray-500">
              Bookings: {bookingCounts[venues.venue_id] || 0}
            </p>
            <p>
              Revenue: ₱
              {(revenueMap[venues.venue_id.toString()] || 0).toLocaleString()}
            </p>

            <div>
              <Button>Edit</Button>
              <Button
                className="bg-red-500 text-white"
                onClick={() => {
                  setVenueToDelete(venues);
                  setIsDeleteOpen(true);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {isDeleteOpen && venueToDelete && (
        <DeleteModal
          venueId={venueToDelete.venue_id.toString()}
          onClose={() => {
            setIsDeleteOpen(false);
            setVenueToDelete(null);
          }}
          onDeleted={() => {
            setIsDeleteOpen(false);
            setVenueToDelete(null);
            fetchVenue();
          }}
        />
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center">
          <div className="w-[500px] bg-white p-6 rounded-md shadow-lg">
            <div className="flex fle-row justify-between">
              <h1 className="text-2xl font-bold mb-4">Add Venue</h1>
              <Button className="text-2xl" onClick={closeVenueModal}>
                X
              </Button>
            </div>

            <Input
              name="venue_name"
              placeholder="Venue Name"
              value={form.venue_name}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              name="venue_desc"
              placeholder="Venue Description"
              value={form.venue_desc}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              name="venue_capacity"
              placeholder="Venue Capacity"
              value={form.venue_capacity}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              name="venue_loc"
              placeholder="Venue Location"
              value={form.venue_loc}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              name="venue_price"
              placeholder="Venue Price"
              value={form.venue_price}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              name="tag_name"
              placeholder="Tag"
              value={form.tag[0]?.tag_name}
              onChange={handleTagChange}
              className="mb-4"
            />
            <div className="w-full flex justify-end">
              <Button className="bg-black text-white">Submit</Button>
            </div>
          </div>
        </div>
      )}

      <footer className="fixed bottom-4 right-6 z-50">
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </footer>
    </div>
  );
}
