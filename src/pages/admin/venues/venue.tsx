import React, { useEffect, useState } from "react";
import axios from "axios";
import type { VenueList } from "@/utils/types";

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
    <div>
      {venue.map((venues, index) => (
        <div key={index}>
          <p>{venues.venue_name}</p>
        </div>
      ))}
    </div>
  );
}
