import React, { useEffect, useState } from "react";
import axios from "axios";
import type { VenueList } from "@/utils/types";
import { Button } from "@/components/ui/button";

export default function Venue() {
  const VENUE_API = "http://localhost:3000/venue";

  const [venue, setVenue] = useState<VenueList[]>([]);

  const fetchVenue = async () => {
    try {
      const res = await axios.get(VENUE_API);
      setVenue(res.data);
    } catch (error) {
      console.error("Error fetching venue", error);
    }
  };

  useEffect(() => {
    fetchVenue();
  }, []);
  return (
    <div className="p-4">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold">Venues Management</h1>
          <p>Manage your event venues and their availability</p>
        </div>
        <Button>Add Venue</Button>
      </div>
      {venue.map((venues, index) => (
        <div key={index} className="border border-gray-200 p-4">
          <p>{venues.venue_name}</p>
        </div>
      ))}
    </div>
  );
}
