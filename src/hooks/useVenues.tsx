import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useVenues = () => {
  return useQuery({
    queryKey: ["venues"],
    queryFn: async () => {
      const res = await axios.get(import.meta.env.VITE_VENUE_API);

      return res.data.map((venue: any) => ({
        ...venue,
        tags: venue.tags?.map((t: any) => t.tag) || [],
      }));
    },
    staleTime: 1000 * 60 * 5, 
    retry: 1,
  });
};
