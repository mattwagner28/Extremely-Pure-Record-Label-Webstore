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

    res.status(201).json({
      loggedIn: true,
      message: `User added with ID ${newUser.id}`,
      userId: newUser.id,
      email: newUser.email,
    });

    //Creates JWT Token after signing up
    // const token = jwt.sign({ email: newUser.email }, secret, { expiresIn: '1h' });


    // res.cookie("token", token, {
    //   httpOnly: true,
    //   //secure: true,
    //   // maxAge: 1000000,
    //   //signed: true
    // });

  
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userInfo = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = userInfo.rows[0];

    if (!user) {
      return res.status(400).json({ error: "Incorrect email or password" }); 
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect email or password" }); 
    }

    // If login is successful
    res.status(200).json({ message: 'Logged in successfully', user: user });

  } catch (error) {
    next(error); // Pass error to Express error handler
  }
});

usersRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});


module.exports = usersRouter;
