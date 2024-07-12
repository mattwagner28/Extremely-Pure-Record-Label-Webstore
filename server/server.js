const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const usersRouter = require('./routes/users');
const cors = require('cors');
const cookieParser = require('cookie-parser');


//Implement cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Parse application/json
app.use(express.json());

app.use(cookieParser());

// Parse application/x-www-form-urlencoded with extended option
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

// Use the usersRouter for /users routes
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
