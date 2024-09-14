const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const usersRouter = require('./routes/users');
const shopRouter = require('./routes/shop');
const stripeRouter = require('./routes/stripe')
const ordersRouter = require('./routes/orders')
const cors = require('cors');
const cookieParser = require('cookie-parser');


//Implement cors
app.use(cors({
  origin: [process.env.RENDER_SUBDOMAIN, 'http://localhost:3000', process.env.YOUR_DOMAIN ],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Parse application/json
app.use(express.json());

//Parse cookies
app.use(cookieParser());

// Parse application/x-www-form-urlencoded with extended option
app.use(express.urlencoded({ extended: true }));

// Use the usersRouter for /users routes
app.use('/users', usersRouter);
app.use('/shop', shopRouter);
app.use('/stripe', stripeRouter);
app.use('/orders', ordersRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
