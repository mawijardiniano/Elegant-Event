import type { ColumnDef } from "@tanstack/react-table";
import type { Booking } from "@/utils/types";

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "first_name", 
    header: "First Name",
  },
  {
    accessorKey: "last_name",  
    header: "Last Name",
  },
  {
    accessorKey: "email", 
    header: "Email",
  },
  {
    accessorKey: "venue.venue_name",
    header: "Venue",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
