import React, { useCallback, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useOutletContext } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe("pk_test_51Pb6CxFrTCMUt7gzUya5yoynk7shDrb1XFGtljgbxZjo5peCVdOAAgxXAAAHAO5KKm1G47YD0fHvLFcIHWhjBz0C00oWzphEQa");

const CheckoutForm = () => {
  const { cart } = useOutletContext();

  useEffect(() => {
    console.log("Cart prop sent to checkout form:", cart);
  }, [cart]);

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("http://localhost:3001/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(cart),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [cart]);

  const options = { fetchClientSecret };

  return (
    <div className="w-full mt-10 mb-10" id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default CheckoutForm;
