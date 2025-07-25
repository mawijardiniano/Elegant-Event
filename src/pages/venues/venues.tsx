import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import axios from "axios";
import type { VenueList } from "@/utils/types";
import GrandHall from "@/assets/GrandHall.jpg";
import { Button } from "@/components/ui/button";
import { HiUsers, HiLocationMarker } from "react-icons/hi";

export default function Venues() {
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
    <Layout>
      <div>
        <section className="w-full pt-12 pb-6 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Venues
            </h1>
            <p className="text-lg text-gray-600">
              Discover the perfect venue for your special event. From intimate
              gatherings to grand celebrations, we have the ideal space to make
              your occasion unforgettable.
            </p>
          </div>
        </section>

        <div className="flex flex-row flex-wrap justify-center gap-6 py-8">
          {venueList.map((venue) => (
            <div
              key={venue.venue_id}
              className="border border-gray-200 w-full max-w-xs min-h-[450px] rounded-lg flex flex-col overflow-hidden shadow-sm"
            >
              <div className="relative">
                <img
                  src={venue.venue_img}
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
                  <div className="flex flex-row justify-between items-center mb-2">
                    <h1 className="font-medium">{venue.venue_name}</h1>
                    <span className="text-sm text-yellow-500">
                      ★ {venue.venue_ratings}
                    </span>
                  </div>

                  <div className="min-h-[140px]">
                    <p className="text-gray-500 text-sm mb-2 line-clamp-3">
                      {venue.venue_desc}
                    </p>

                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <HiUsers className="text-lg text-gray-700" />
                      Capacity: {venue.venue_capacity}
                    </p>

                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <HiLocationMarker className="text-lg text-gray-700" />
                      {venue.venue_loc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {venue.tag && venue.tag.length > 0 ? (
                        venue.tag.map(
                          (tag: { tag_name: string }, idx: number) => (
                            <span
                              key={idx}
                              className="bg-gray-200 text-xs px-2 py-1 rounded-full"
                            >
                              {tag.tag_name}
                            </span>
                          )
                        )
                      ) : (
                        <span className="text-gray-400 text-xs">No tags</span>
                      )}
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-black text-white mt-auto mt-6">
                  View Details & Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
