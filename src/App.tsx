import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Venue from './pages/venues/venues'
import Booking from "./pages/booking/booking";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Layout from "@/pages/admin/component/layout/layout";
import Dashboard from "@/pages/admin/dashboard/dashboard";
import Bookings from "@/pages/admin/booking/booking";
import VenueAdmin from "@/pages/admin/venues/venue";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API!);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
         <Route path="/venue" element={<Venue />} />

        <Route
          path="/admin"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <Layout>
              <Bookings />
            </Layout>
          }
        />
        <Route
          path="/admin/venue"
          element={
            <Layout>
              <VenueAdmin />
            </Layout>
          }
        />
        

        <Route
          path="/booking"
          element={
            <Elements stripe={stripePromise}>
              <Booking />
            </Elements>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
