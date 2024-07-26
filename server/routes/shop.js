const express = require("express");
const { Pool } = require("pg");
const shopRouter = express.Router();
const stripe = require('stripe')('sk_test_51Pb6CxFrTCMUt7gzYizK3ZvjghcE6gwcboxIFQjkODuNhUeqWuQIGlBoSdFK9eDC2edoTNmc9goGUCo7RrnAsJ9w00YI7rTw4t');


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "extremelypure",
  password: "postgres",
  port: 5432,
});

const YOUR_DOMAIN = 'http://localhost:3000';

shopRouter.get("/", async (req, res, next) => {
  try {
    const query = `
        SELECT variant_id AS id, artist_name AS artist, product_name AS title, price, color_name AS color, size_name AS size, category_name AS category, catalog_number, photo_path, test_price_id
        FROM product_variants
        LEFT JOIN products ON products.product_id = product_variants.product_id
        LEFT JOIN colors ON colors.color_id = product_variants.color_id
        LEFT JOIN sizes ON sizes.size_id = product_variants.size_id
        LEFT JOIN categories ON categories.category_id = products.category_id
        LEFT JOIN artists ON artists.id = products.artist_id
        ORDER BY artist_name ASC;
      `;
    const getProducts = await pool.query(query);
    res.status(200).json(getProducts.rows);
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
});


module.exports = shopRouter;
