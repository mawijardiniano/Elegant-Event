import React, { useEffect, useState } from "react";
import ProgressComponent from "./progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import type { EventType, GuestInfo } from "@/utils/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import {
  setGuestInfo,
  nextStep,
  prevStep,
} from "@/pages/booking/redux/bookingSlice";

export default function StepThree() {
  const dispatch = useDispatch();
  const GET_EVENTS = "http://localhost:3000/events";
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const [guestCount, setGuestCount] = useState<string>("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [request, setRequest] = useState("");
  const [showError, setShowError] = useState(false);
  const handleContinue = () => {
    if (!events || !guestCount || !eventName) {
      setShowError(true);
      return;
    }

    const payload: GuestInfo = {
      event_type: selectedEvent,
      expected_guest: parseInt(guestCount),
      event_name: eventName,
      description,
      request,
    };

    dispatch(setGuestInfo(payload));
    dispatch(nextStep());
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(GET_EVENTS);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching Events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={3} totalSteps={8} />

      <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h1 className="font-bold text-2xl">Event Details</h1>
        <p className="text-gray-600 mt-1">
          Tell us more about your event so we can provide the best service.
        </p>

        <div className="border border-gray-200 p-4 mt-4">
          <div className="flex flex-row justify-between gap-8">
            <div className="w-full">
              <Label className="mb-1 block">Event Type</Label>
              <Select
                value={selectedEvent?.event_type}
                onValueChange={(value) => {
                  const found = events.find(
                    (event) => event.event_type === value
                  );
                  setSelectedEvent(found ?? null);
                }}
              >
                <SelectTrigger className="w-[350px]">
                  <SelectValue placeholder="Choose Event Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {events.map((event) => (
                    <SelectItem
                      key={event.event_type_id}
                      value={event.event_type}
                    >
                      {event.event_type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Label className="mb-1 block">Expected Guest Count</Label>
              <Input
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
              />
            </div>
          </div>
          <Label className="mb-1 block">Event Name</Label>
          <Input
            className="w-full"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <Label className="mb-1 block">Event Description</Label>
          <Textarea
            className="w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label className="mb-1 block">
            Special Requests or Accommodations
          </Label>
          <Textarea
            className="w-full"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />

           {showError && (
            <p className="text-red-500 text-sm mt-4">
              Please fill out required fields before continuing.
            </p>
          )}
        </div>
              <div className="flex justify-between px-10 pt-8">
        <Button
          className="bg-black text-white"
          onClick={() => dispatch(prevStep())}
        >
          Previous
        </Button>
        <Button className="bg-black text-white" onClick={handleContinue}>
          Continue
        </Button>
      </div>
      </div>

    </div>
  );
}
