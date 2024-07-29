import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const isFirstRender = useRef(true); // Flag to track the first render

  useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false; // Update flag after the first render
      return; // Skip the effect on the first render
  }
  
    const fetchData = async () => {
      try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        if (!sessionId) {
          console.error('No session ID found in query string');
          return;
        }

        // GET request to retrieve data from the Stripe sessions
        const sessionResponse = await fetch(`http://localhost:3001/stripe/session-status?session_id=${sessionId}`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!sessionResponse.ok) {
          throw new Error('Failed to fetch session data');
        }

        const data = await sessionResponse.json();
        setStatus(data.status);
        setCustomerEmail(data.customer_email);

        // POST request to save order data
        const orderResponse = await fetch('http://localhost:3001/orders', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ data }),
        });

        if (!orderResponse.ok) {
          throw new Error('Failed to save order');
        }

        console.log("Order request from client:", await orderResponse.json());

      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.
          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null; // Render nothing if status is not open or complete
};

export default Return;
