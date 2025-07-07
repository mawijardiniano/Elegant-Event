import React, { useState } from 'react';
import {
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import type { StripeCardElement } from '@stripe/stripe-js';

import { useSelector } from 'react-redux';
import type { RootState } from '@/pages/booking/store';

export default function StepSeven() {
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = useSelector((state: RootState) => state.booking.total_price);

  const [name, setName] = useState('');
  const [cardError, setCardError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setCardError(null);

    if (!name.trim()) {
      setCardError('Please enter the name on the card.');
      return;
    }

    if (!stripe || !elements) {
      setCardError('Stripe has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement) as StripeCardElement | null;

    if (!cardElement) {
      setCardError('Card element not found.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/payment/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice * 100 }), 
      });

      const data = await res.json();

      if (!data.clientSecret) {
        throw new Error("clientSecret is missing from backend response");
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name },
        },
      });

      if (result.error) {
        setCardError(result.error.message || 'Payment failed.');
      } else if (result.paymentIntent?.status === 'succeeded') {
        setSuccess(true);
        setCardError(null);
        alert('Payment successful!');
      }
    } catch (err: unknown) {
      setCardError('Something went wrong.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Payment Step</h2>

      <p>Total: ₱{(totalPrice).toLocaleString()}</p>

      <label htmlFor="name">Name on Card</label>
      <input
        id="name"
        type="text"
        placeholder="Cardholder Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '12px',
          fontSize: '16px',
          boxSizing: 'border-box',
        }}
      />

      <label>Card Details</label>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: 4,
          padding: '10px 12px',
          marginBottom: '12px',
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
                fontFamily: 'Arial, sans-serif',
                ':-webkit-autofill': { color: '#fce883' },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
          onChange={e => setCardError(e.error ? e.error.message : null)}
        />
      </div>

      {cardError && <div style={{ color: 'red', marginBottom: 12 }}>{cardError}</div>}

      <button
        onClick={handlePayment}
        disabled={!stripe || loading || totalPrice <= 0}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: loading ? '#888' : '#5469d4',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Processing…' : `Pay ₱${(totalPrice).toLocaleString()}`}
      </button>

      {success && (
        <p style={{ color: 'green', marginTop: 12 }}>
          Payment completed successfully!
        </p>
      )}
    </div>
  );
}
