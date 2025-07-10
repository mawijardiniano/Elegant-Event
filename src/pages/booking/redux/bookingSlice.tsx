import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type {
  BookingState,
  VenueList,
  Packages,
  Service,
  GuestInfo,
  UserContact,
  BookingDateTime
} from "@/utils/types";

const initialState: BookingState = {
  booking_id: 0,
  currentStep: 1,
  venue: null,
  booking_date: null,
  event_type: null,
  package: null,
  service: null,
  guest_info: null,
  contact_info: null,
  total_price: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setVenue: (state, action: PayloadAction<VenueList>) => {
      state.venue = action.payload;
    },
    setPackage: (state, action: PayloadAction<Packages>) => {
      state.package = action.payload;
    },
    setService: (state, action: PayloadAction<Service[]>) => {
      state.service = action.payload;
    },
    setGuestInfo: (state, action: PayloadAction<GuestInfo>) => {
      state.guest_info = action.payload;
    },
    setContactInfo: (state, action: PayloadAction<UserContact>) => {
      state.contact_info = action.payload;
    },
    setBookingDate: (state, action: PayloadAction<BookingDateTime>) => {
      state.booking_date = action.payload;
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.total_price = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    resetBooking: () => initialState,
  },
});

export const {
  setVenue,
  setPackage,
  setService,
  setGuestInfo,
  setContactInfo,
  setBookingDate,
  setTotalPrice,
  nextStep,
  prevStep,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
