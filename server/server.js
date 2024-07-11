const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('./routes/auth');
const PORT = process.env.PORT || 3001;
const usersRouter = require('./routes/users');
const cors = require('cors');

//Implement cors
app.use(cors({
  origin: 'http://localhost:3000'
}));


// Parse application/json
app.use(express.json());

// Parse application/x-www-form-urlencoded with extended option
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "biscuitjams",
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

// Use the usersRouter for /users routes
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
