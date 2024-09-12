const express = require("express");
const { Pool } = require("pg");
const shopRouter = express.Router();

const pool = new Pool({
  connectionString: process.env.INTERNAL_DB_URL,
  ssl: false 
});

//Retrieves all items for the shop component
shopRouter.get("/", async (req, res, next) => {
  try {
    const query = `
        SELECT variant_id AS id, artist_name AS artist, product_name AS title, price, color_name AS color, size_name AS size, category_name AS category, catalog_number, photo_path, price_id
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
    next(err); 
  }
});

//Retrieves all items for a release title
shopRouter.get("/:artist/:title", async (req, res, next) => {
  console.log(req.params);
  const title = req.params.title;
  try {
    const query = `
    SELECT 
        variant_id AS id, 
        artist_name AS artist, 
        product_name AS title, 
        price, 
        color_name AS color, 
        size_name AS size, 
        category_name AS category, 
        catalog_number, 
        photo_path, 
        price_id
    FROM product_variants
    LEFT JOIN products ON products.product_id = product_variants.product_id
    LEFT JOIN colors ON colors.color_id = product_variants.color_id
    LEFT JOIN sizes ON sizes.size_id = product_variants.size_id
    LEFT JOIN categories ON categories.category_id = products.category_id
    LEFT JOIN artists ON artists.id = products.artist_id
    WHERE product_name = $1
    ORDER BY artist_name ASC;
`;
    const getProducts = await pool.query(query, [title]);
    res.status(200).json(getProducts.rows);
  } catch (err) {
    next(err);
  }
})


module.exports = shopRouter;
