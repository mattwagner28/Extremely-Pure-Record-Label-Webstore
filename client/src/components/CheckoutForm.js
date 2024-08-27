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
const stripePromise = loadStripe("pk_live_51Pb6CxFrTCMUt7gzDhBPqA64Oign7lRBas6D7kaiu5ZYd14RebtjK1LW6aDWoGJ4jY9N9XwhGdBZ0bOqa1Etq59N00FPVEHM0n");

const CheckoutForm = () => {
  const { cart } = useOutletContext();

  useEffect(() => {
    console.log("Cart prop sent to checkout form:", cart);
  }, [cart]);

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("https://extremelypure-server.onrender.com/stripe/create-checkout-session", {
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
