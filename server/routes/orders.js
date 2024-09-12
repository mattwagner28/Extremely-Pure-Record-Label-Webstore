const express = require("express");
const { Pool } = require("pg");
const ordersRouter = express.Router();

const pool = new Pool({
  connectionString: process.env.INTERNAL_DB_URL,
  ssl: false 
});


ordersRouter.get("/:email", async (req, res, next) => {
  try {
    const userEmail = req.params.email;

    //Queries individual orders by date
    const getOrdersQuery = await pool.query("SELECT order_date, order_id FROM users INNER JOIN orders ON users.id = orders.user_id WHERE users.email = $1 ORDER BY order_date", [userEmail]);

    //Returns message to be displayed in user profile if user has not placed any orders.
    if (getOrdersQuery.rows.length === 0) {
      console.log("No orders have been purchased while logged in this account.");
      return res.status(200).json({ message: "No orders have been purchased while logged in this account." });
    }
    
    //TODO: Create response so it sends order info to user profile if orders have been placed.
    res.json({ orders: getOrdersQuery.rows })

  } catch (error) {
    res.status(500).json({ message: "Intermal server error" });
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    if (!req.body.data.user_email) {
      console.log("User did not sign in, order purchased as guest");
      return res.status(200).json({ message: "User did not sign in, order purchased as guest" });
    }

    const {
      payment_intent,
      amount_subtotal,
      amount_total,
      shipping_cost,
      line_items,
      user_email,
    } = req.body.data;

    // Retrieve user ID based on user email
    const userIDQuery = await pool.query("SELECT id FROM users WHERE email = $1", [user_email]);
    if (userIDQuery.rows.length === 0) {
      throw new Error("User not found");
    }
    const userID = userIDQuery.rows[0].id;
    console.log("User ID:", userID);

    // Create new order
    const saveOrder = await pool.query(
      "INSERT INTO orders(user_id, stripe_payment_intent, amount_total, amount_subtotal, shipping_cost) VALUES($1, $2, $3, $4, $5) RETURNING order_id",
      [userID, payment_intent, amount_total, amount_subtotal, shipping_cost]
    );
    const orderID = saveOrder.rows[0].order_id;
    console.log("Order ID:", orderID);

    // Save each line item in the order
    for (const item of line_items) {
      await pool.query(
        "INSERT INTO order_items(order_id, quantity, price, variant_test_price_id) VALUES($1, $2, $3, $4)",
        [orderID, item.quantity, item.amount_total, item.price.id]
      );
    }

    res.status(201).json({ message: "Order created successfully", orderID });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = ordersRouter;
