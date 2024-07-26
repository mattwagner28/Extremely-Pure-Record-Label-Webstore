const express = require("express");
// const { Pool } = require("pg");
const stripeRouter = express.Router();
const stripe = require('stripe')('sk_test_51Pb6CxFrTCMUt7gzYizK3ZvjghcE6gwcboxIFQjkODuNhUeqWuQIGlBoSdFK9eDC2edoTNmc9goGUCo7RrnAsJ9w00YI7rTw4t');


// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "extremelypure",
//   password: "postgres",
//   port: 5432,
// });


const YOUR_DOMAIN = 'http://localhost:3000';

stripeRouter.post('/create-checkout-session', async (req, res) => {

    const cart = req.body;
    const lineItems = cart.map((item) => (
      {
        price: item.test_price_id,
        quantity: item.quantity
      }
    )

    );

    console.log("Cart fetched from client:", lineItems);

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: lineItems,
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: {enabled: true},
    });
  
    res.send({clientSecret: session.client_secret});
  });
  

stripeRouter.get('/session-status', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  
    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  });

  module.exports = stripeRouter;