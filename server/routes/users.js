require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "extremelypure",
  password: "postgres",
  port: 5432,
});

// Nodemailer transporter object using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "extremelypurerecords@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD, // Ensure you use the actual app password
  },
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

usersRouter.get("/verifytoken", (req, res, next) => {
  const token = req.cookies.token;
  console.log("Cookies:", req.cookies);
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json(user);
  } catch (err) {
    res.clearCookie("token");
    res.status(403).json({ error: "Invalid token" });
  }
});

usersRouter.get("/clearcookie", (req, res, next) => {
  const token = req.cookies.token;
  res.clearCookie("token").json({ message: "cookie deleted" });
});

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

usersRouter.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const emailResult = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );

    if (emailResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      "INSERT INTO users (email, password) VALUES($1, $2) RETURNING *",
      [email, hashedPassword]
    );

    const newUser = userResult.rows[0];

    // console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET);

    const jwtUser = { email: newUser.email, id: newUser.id };

    const accessToken = jwt.sign(jwtUser, process.env.ACCESS_TOKEN_SECRET);

    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 3600000, //1 hour
    });

    res.status(201).json({
      loggedIn: true,
      message: `User added with ID ${newUser.id}`,
      userId: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userInfo = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = userInfo.rows[0];

    if (!user) {
      return res.status(400).json({ error: "Incorrect email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect email or password" });
    }

    // Create JWT
    // console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET);

    const jwtUser = { email: user.email, id: user.id };

    const accessToken = jwt.sign(jwtUser, process.env.ACCESS_TOKEN_SECRET);

    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 3600000, //1 hour
    });

    // Respond with JWT token
    res.status(200).json({ message: "Logged in successfully", accessToken });
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
});

usersRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Query the database to find the user
    const oldUserData = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (oldUserData.rows.length === 0) {
      // Email details
      const noAccountFoundEmail = {
        from: "extremelypurerecords@gmail.com",
        to: email, // Send to the user's email
        subject: "Password Reset Request",
        text: `Hello,

            We received a request to reset your password, however no account was created with the email you submitted.

            Please visit http://localhost:3000/signup to create an account.

            If you did not request this change, please ignore this email.

            Thank you,
            Extremely Pure Records`,
      };

      // Send email
      await transporter.sendMail(noAccountFoundEmail);
      console.log("No account with that email was found, so an email to create an account was sent.");
      return res.status(200).json({ message: "No account with that email was found, so an email to create an account was sent." });
    }

    const oldUserId = oldUserData.rows[0].id;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const token = jwt.sign({ email: email, id: oldUserId }, secret, {
      expiresIn: "5m",
    });

    const link = `http://localhost:3000/reset-password/${oldUserId}/${token}`;

    // Email details
    const resetEmail = {
      from: "extremelypurerecords@gmail.com",
      to: email, // Send to the user's email
      subject: "Password Reset Request",
      text: `Hello,

            We received a request to reset your password.

            Please follow this link to reset your password: ${link}

            If you did not request this change, please ignore this email.

            Thank you,
            Extremely Pure Records`,
    };

    // Send email
    await transporter.sendMail(resetEmail);

    console.log("Email sent successfully");
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

usersRouter.get("/reset-password/:token", async (req, res) => {
  const { token } = req.params;

  try {
    // Verify the token
    const verifiedUserEmail = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (verifiedUserEmail) {
      res.status(200).json({ message: "Token verified, request successful." });
    }
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: "Invalid token, or token has expired." });
  }
});

usersRouter.put("/:id", async (req, res) => {
  const { id, token, password } = req.body;

  try {
    // Verify and decode token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decoded.id != id) {
      return res
        .status(403)
        .json({ message: "Reset token not verified or expired." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    const result = await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPassword, id]
    );

    // Check if the update was successful
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log("Password successfully replaced!", result);
    return res.status(200).json({ message: "Password successfully replaced." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

usersRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = usersRouter;
