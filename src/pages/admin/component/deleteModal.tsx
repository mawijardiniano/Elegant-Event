import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";

interface DeleteModalProps {
  venueId: string;
  onClose: () => void;
  onDeleted: () => void;
}

export default function DeleteModal({ venueId, onClose, onDeleted }: DeleteModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const VENUE_API = (id: string) => `${import.meta.env.VITE_VENUE_DELETE_API}/${id}`;


  const deleteVenue = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(VENUE_API(venueId));
      if (res.status === 200 || res.status === 204) {
        onDeleted(); // notify parent that deletion was successful
        setIsOpen(false);
        onClose();
      } else {
        setError("Failed to delete venue.");
      }
    } catch (err) {
      setError("Error deleting venue.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
        <h1 className="text-xl font-bold mb-4">Are you sure you want to delete this venue?</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => { setIsOpen(false); onClose(); }} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={deleteVenue} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
