const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const usersRouter = require('./routes/users');

// Parse application/json
app.use(express.json());

// Parse application/x-www-form-urlencoded with extended option
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

// Use the usersRouter for /users routes
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
