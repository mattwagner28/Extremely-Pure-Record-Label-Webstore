const express = require("express");
const { Pool } = require("pg");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const passport = require("../routes/auth");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "extremelypure",
  password: "postgres",
  port: 5432,
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

usersRouter.get("/", async (req, res, next) => {
  try {
    const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
    if (results.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(results.rows);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const emailResult = await pool.query("SELECT email FROM users WHERE email = $1", [email]);

    if (emailResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      "INSERT INTO users (email, password) VALUES($1, $2) RETURNING *",
      [email, hashedPassword]
    );

    const newUser = userResult.rows[0];

    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }

      res.status(201).json({
        loggedIn: true,
        message: `User added with ID ${newUser.id}`,
        userId: newUser.id,
        email: newUser.email
      });
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Logged in successfully', user: req.user });
});

usersRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});


module.exports = usersRouter;
