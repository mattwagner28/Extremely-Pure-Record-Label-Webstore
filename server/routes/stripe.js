const express = require("express");
const { Pool } = require("pg");
const stripeRouter = express.Router();
const stripe = require('stripe')('sk_test_51Pb6CxFrTCMUt7gzYizK3ZvjghcE6gwcboxIFQjkODuNhUeqWuQIGlBoSdFK9eDC2edoTNmc9goGUCo7RrnAsJ9w00YI7rTw4t');


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "extremelypure",
  password: "postgres",
  port: 5432,
});


const YOUR_DOMAIN = 'http://localhost:3000';

stripeRouter.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1PdgzIFrTCMUt7gz51z3dFc7',
          quantity: 1,
        },
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1Pb6xgFrTCMUt7gzJd7xNDjS',
          quantity: 1,
        }
      ],
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: {enabled: true},
    });
  
    res.send({clientSecret: session.client_secret});
  });
  

  shopRouter.get('/session-status', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  
    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  });

  module.exports = stripeRouter;