import { data } from "autoprefixer";
import React, {  useState, useEffect } from "react";
import {
    BrowserRouter as 
    Navigate
  } from "react-router-dom";

const Return = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [lineItems, setLineItems] = useState({});
    const [userEmail, setUserEmail] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const sessionId = urlParams.get('session_id');
    
          const sessionResponse = await fetch(`http://localhost:3001/stripe/session-status?session_id=${sessionId}`, {
            method: 'GET',
            credentials: 'include'
          });
    
          const data = await sessionResponse.json();
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
          setLineItems(data.line_items);
          setUserEmail(data.user_email);
          console.log("Checkout data:", data);
    
          const orderResponse = await fetch('http://localhost:3001/orders', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ 
              user_email: data.user_email,
              line_items: data.line_items
             }), // Use data.user_email from the response
          });
    
    
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      fetchData();
    }, []);
    
    

    //Save an order to the database where orders.user_id = users.id
    // orderID state is then set
    //Then save each item as an order item where order_items.order_id = orderID state
  
    if (status === 'open') {
      return (
        <Navigate to="/checkout" />
      )
    }
  
    if (status === 'complete') {
      return (
        <section id="success">
          <p>
            We appreciate your business! A confirmation email will be sent to {customerEmail}.
  
            If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>
        </section>
      )
    }
  
    return null;
  }

  export default Return;