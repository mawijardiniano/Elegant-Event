import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import type { VenueList } from "@/utils/types";
import GrandHall from "@/assets/GrandHall.jpg";

export default function Venue() {
  const API = "http://localhost:3000/venue";
  const [venueList, setVenueList] = useState<VenueList[]>([]);

  const fetchVenue = async () => {
    try {
      const res = await axios.get(API);
      const data = res.data.map((venue: any) => ({
        ...venue,
        tag: venue.tag ? [venue.tag] : [],
      }));
      setVenueList(data);
    } catch (error) {
      console.error("Error fetching venue", error);
    }
  };

  useEffect(() => {
    fetchVenue();
  }, []);

  return (
    <section className="flex flex-col items-center py-20">
      <h1 className="text-4xl font-bold">Our Premium Venue</h1>
      <p className="text-center max-w-xl text-xl font-medium text-gray-400 py-4">
        Choose from our collection of carefully curated venues, each offering
        unique charm and exceptional service.
      </p>

      <div className="flex flex-row flex-wrap justify-center gap-4 mt-8">
        {venueList.map((venue) => (
          <div
            key={venue.venue_id}
            className="border border-gray-200 max-w-[300px] min-h-[450px] rounded-md flex flex-col overflow-hidden"
          >
            <div className="relative">
              <img
                src={GrandHall}
                alt="Grand Hall"
                className="w-full h-52 object-cover"
              />
              <div className="absolute top-2 left-2">
                <h1 className="bg-white py-1 px-3 rounded-full text-xs shadow">
                  From ₱{venue.venue_price}
                </h1>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex flex-row justify-between items-center">
                  <h1 className="font-medium">{venue.venue_name}</h1>
                  <span className="text-sm text-yellow-500">
                    ★ {venue.venue_ratings}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-2">{venue.venue_desc}</p>
                <p className="text-gray-500 text-sm">
                  Capacity: {venue.venue_capacity}
                </p>
                <p className="text-gray-500 text-sm">
                  Location: {venue.venue_loc}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {venue.tag && venue.tag.length > 0 ? (
                    venue.tag.map((tag: { tag_name: string }, idx: number) => (
                      <span
                        key={idx}
                        className="bg-gray-200 text-xs px-2 py-1 rounded-full"
                      >
                        {tag.tag_name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">No tags</span>
                  )}
                </div>
              </div>

              <Button className="w-full mt-6">View Details & Book</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10">
        <Button className="bg-black text-white">View All Venues</Button>
      </div>
    </section>
  );
}
