require('dotenv').config();
const express = require("express");
const stripeRouter = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');


const YOUR_DOMAIN = process.env.YOUR_DOMAIN || 'http://localhost:3000';

stripeRouter.post('/create-checkout-session', async (req, res) => {

    const cart = req.body;
    const lineItems = cart.map((item) => (
      {
        price: item.price_id,
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
      }
    ));

    console.log("Cart fetched from client:", lineItems);

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 500,
              currency: 'usd',
            },
            display_name: 'USPS Media Mail',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
      ui_mode: 'embedded',
      line_items: lineItems,
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: {enabled: true},
    });
  
    res.send({clientSecret: session.client_secret});
  });
  

  stripeRouter.get('/session-status', async (req, res) => {
    try {
      let userEmail = null;

      //Check for JWT token in cookies
      const token = req.cookies.token;
      if (token) {
        try {
          const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          userEmail = decodedToken.email; 
        } catch (error) {
          console.error('Error verifying JWT upon checkout:', error);
        }
      }

      const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
      const lineItems = await stripe.checkout.sessions.listLineItems(req.query.session_id);
  
      res.send({
        session_id: session.id,
        payment_intent: session.payment_intent,
        status: session.status,
        amount_subtotal: session.amount_subtotal,
        amount_total: session.amount_total,
        shipping_cost: session.shipping_cost.amount_total,
        customer_email: session.customer_details.email,
        line_items: lineItems.data,
        user_email: userEmail,
        customer_details: session.customer_details

      });
    } catch (error) {
      console.error('Error retrieving session status:', error);
      res.status(500).send('Internal Server Error');
    }
  });

 

  module.exports = stripeRouter;