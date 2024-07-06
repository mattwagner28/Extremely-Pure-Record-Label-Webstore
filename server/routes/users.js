const express = require('express');
const usersRouter = express.Router();
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'extremelypure',
  password: 'postgres',
  port: 5432,
});

usersRouter.get('/', (req, res, next) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
});

module.exports = usersRouter;