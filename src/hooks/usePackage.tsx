import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePackage = () => {
  return useQuery({
    queryKey: ["package"],
    queryFn: async () => {
      const res = await axios.get(import.meta.env.VITE_PACKAGE_API);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, 
    retry: 1,
  });
};
