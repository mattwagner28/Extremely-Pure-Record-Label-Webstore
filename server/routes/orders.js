const express = require("express");
const { Pool } = require("pg");
const ordersRouter = express.Router();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "extremelypure",
  password: "postgres",
  port: 5432,
});

ordersRouter.post("/", async (req, res, next) => {
  res.send(req.body);
  console.log("Order Req:", req.body.data);

  const {
    payment_intent,
    amount_subtotal,
    amount_total,
    shipping_cost,
    line_items,
    user_email,
  } = req.body.data;

  const userIDQuery = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [user_email]
  );
  const userID = userIDQuery.rows[0].id;
  console.log("User ID", userID);

  //Create new order based on userID
  const saveOrder = await pool.query("INSERT INTO orders(user_id, stripe_payment_intent, amount_total, amount_subtotal, shipping_cost) VALUES($1, $2, $3, $4, $5)", [userID, payment_intent, amount_total, amount_subtotal, shipping_cost]);
  console.log(saveOrder);

//Save order ID as a variable to be used later
  const orderIDQuery = await pool.query(
    "SELECT order_id FROM orders WHERE stripe_payment_intent = $1", 
    [payment_intent]
  );
  const orderID = orderIDQuery.rows[0].order_id;
  console.log("Order ID", orderID);

//Save each line item in the order with the order id
 await line_items.forEach((item) => (
  pool.query("INSERT INTO order_items(order_id, quantity, price, variant_test_price_id) VALUES($1, $2, $3, $4)",
  [orderID, item.quantity, item.amount_total, item.price.id]) 

  ));

});

module.exports = ordersRouter;
