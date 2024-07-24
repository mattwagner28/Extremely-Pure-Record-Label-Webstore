require('dotenv').config();
const express = require("express");
const { Pool } = require("pg");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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


usersRouter.get('/verifytoken', (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies);
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

usersRouter.get('/clearcookie', (req, res, next) => {
  const token = req.cookies.token;
  res.clearCookie("token").json({ message: "cookie deleted" });
})

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

    console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET);
    
    const jwtUser = { email: newUser.email, id: newUser.id };

    const accessToken = jwt.sign(jwtUser, process.env.ACCESS_TOKEN_SECRET);
    
    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 3600000 //1 hour
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

    // Create JWT
    console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET);
    
    const jwtUser = { email: user.email, id: user.id }

    const accessToken = jwt.sign(jwtUser, process.env.ACCESS_TOKEN_SECRET);
    
    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 3600000 //1 hour
    });
    
    // Respond with JWT token
    res.status(200).json({ message: 'Logged in successfully', accessToken });

  } catch (error) {
    next(error); // Pass error to Express error handler
  }
});

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwtUser) => {
//     if (err) return res.sendStatus(403);
//     req.user = jwtUser;
//     next();
//   })
// }


usersRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});


module.exports = usersRouter;
