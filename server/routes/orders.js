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
  const userID = userIDQuery.rows[0];
  console.log("User ID", userID);

  //Create new order based on userID
  // const saveOrder = await pool.query("INSERT INTO orders ()")

  //map through line items to get the order total


});

module.exports = ordersRouter;
