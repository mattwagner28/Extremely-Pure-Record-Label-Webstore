const express = require("express");
const { Pool } = require("pg");
const shopRouter = express.Router();


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "extremelypure",
  password: "postgres",
  port: 5432,
});

shopRouter.get('/', async (req, res, next) => {
    try {
      const query = `
        SELECT artist_name AS artist, product_name AS title, price, color_name AS color, size_name AS size, category_name AS category, catalog_number, photo_path
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
