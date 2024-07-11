const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "extremelypure",
  password: "postgres",
  port: 5432,
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, cb) => {
  pool.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
    if (err) { return cb(err); }
    const user = result.rows[0];
    if (!user) {
      return cb(null, false, { message: 'Incorrect email or password.' });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) { return cb(err); }
      if (!isMatch) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
      return cb(null, user);
    });
  });
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  pool.query("SELECT * FROM users WHERE id = $1", [id], (err, result) => {
    if (err) { return cb(err); }
    cb(null, result.rows[0]);
  });
});

module.exports = passport;
