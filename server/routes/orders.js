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
    console.log("POST REQUEST:", req.body);
    const userEmail = req.body.user_email
    console.log("User Email:", userEmail);

    const userIDQuery = await pool.query("SELECT id FROM users WHERE email = $1", [userEmail]);
    const userID = userIDQuery.rows[0];
    console.log("User ID", userID);


});

module.exports = ordersRouter;