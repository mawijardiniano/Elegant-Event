export type ProgressProps = {
  step: number;
  totalSteps: number;
};

export type Tag = {
  tag_id: number;
  tag_name: string;
};

export type VenueList = {
  venue_id: number;
  venue_name: string;
  venue_ratings: number;
  venue_desc: string;
  venue_capacity: number;
  venue_loc: string;
  venue_price: number;
  tag: Tag[];
};

export type Packages = {
  package_id: number;
  package_name: string;
  package_desc: string;
  package_price: number;
  features: string[];
};

export type Service = {
  serv_id: number;
  serv_name: string;
  serv_price: number;
};

export type EventType = {
  event_type_id: number;
  event_type: string;
};

export type GuestInfo = {
  event_type: EventType | null;
  expected_guest: number;
  event_name: string;
  description: string;
  request: string;
};

export type UserContact = {
  first_name: string;
  last_name: string;
  email: string;
  number: string;
};

export type Booking = {
  booking_id: number;
  currentStep: number;
  venue: VenueList;
  booking_date: string | null;
  booking_end: string | null;
  booking_time: string | null;
  event_type: EventType;
  package: Packages;
  service: Service[] | null;
  guest_info: GuestInfo;
  contact_info: UserContact;
  status: string;
};

export type BookingState = {
  booking_id: number;
  currentStep: number;
  venue: VenueList | null;
  booking_date: string | null;
  booking_end: string | null;
  booking_time: string | null;
  event_type: EventType | null;
  package: Packages | null;
  service: Service[] | null;
  guest_info: GuestInfo | null;
  contact_info: UserContact | null;
  total_price: number;
};

// export type VenueState = {
//   venue_id: number;
//   venue_name: string;
//   venue_ratings: number;
//   venue_desc: string;
//   venue_capacity: number;
//   venue_loc: string;
//   venue_price: number;
//   tag: Tag[];
// };
