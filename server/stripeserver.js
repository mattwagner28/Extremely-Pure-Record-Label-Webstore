
// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
const stripe = require('stripe')('sk_test_...');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4242;

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_5fba892037840b8e64e3f2bd730895f2c603e4239d755025d185ba6fdc700ba8";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    // case 'checkout.session.async_payment_succeeded':
    //   const checkoutSessionAsyncPaymentSucceeded = event.data.object;
    //   console.log(checkoutSessionAsyncPaymentSucceeded)
    //   // Then define and call a function to handle the event checkout.session.async_payment_succeeded
    //   break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      console.log(checkoutSessionCompleted);
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
  