import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Booking from "./pages/booking/booking";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.STRIPE_API!);

function App() {
  return (
    <BrowserRouter>
   <Routes>
    <Route path="/" element={<Homepage/>}></Route>
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
