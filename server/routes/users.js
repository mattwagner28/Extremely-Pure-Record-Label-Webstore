const express = require("express");
const { Pool } = require("pg");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "extremelypure",
  password: "postgres",
  port: 5432,
});

// Regular expression to validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET all users
usersRouter.get("/", async (req, res, next) => {
  try {
    const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    next(error);
  }
});

// GET user by ID
usersRouter.get("/:id", async (req, res, next) => {
  try {
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    if (results.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(results.rows);
  } catch (error) {
    next(error);
  }
});

// POST a new user
usersRouter.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    // Check if email already exists
    const emailResult = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );

    if (emailResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }
    //Hash password using Bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const userResult = await pool.query(
      "INSERT INTO users (email, password) VALUES($1, $2) RETURNING *",
      [email, hashedPassword]
    );

    res
      .status(201)
      .json({
        loggedIn: true,
        message: `User added with ID ${userResult.rows[0].id}`,
        userId: userResult.rows[0].id,
        email: email,
        password: hashedPassword,
      });
  } catch (error) {
    next(error);
  }
});

// Error handler middleware
usersRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = usersRouter;
