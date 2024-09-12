import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {

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
        const sessionResponse = await fetch(`https://extremelypure-server.onrender.com/stripe/session-status?session_id=${sessionId}`, {
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
        const orderResponse = await fetch('https://extremelypure-server.onrender.com/orders', {
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

        // console.log("Response from server:", await orderResponse.json());

      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); 

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.
          If you have any questions, please email <a href="extremelypurerecords@gmail.com">extremelypurerecords@gmail.com</a>.
        </p>
      </section>
    );
  }

  return null; 
};

export default Return;
