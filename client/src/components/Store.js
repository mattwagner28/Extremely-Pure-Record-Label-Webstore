import { useEffect, useState } from "react";
import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function Store() {
  const { cart, addItemToCart, removeItemFromCart, quantities } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate(); 

  const handleProductClick = (artist, title) => {
    navigate(`/releases/${artist}/${title}`); // Navigate to the dynamic route
  };

  useEffect(() => {
    fetch("https://extremelypure-server.onrender.com/shop")
      .then((response) => response.json())
      .then((allProducts) => {
        setProducts(allProducts);
      })
      .catch((error) => {
        console.error("A fetch error occured:", error);
        setErrMsg("An error occurred. Please visit our bandcamp page.")
      });
  }, []);


  useEffect(() => {
    console.log('Shopping cart:', cart);
    console.log('Quantities:', quantities);
  }, [cart, quantities]);

  return (
    <>
      <div className="relative w-full z-0 lg:w-4/5 m-2">
        <div className="product-container grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {products.map((product, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <h1 className="artist text-lg font-bold">{product.artist}</h1>
              <button
                className="text-xl bg-transparent border-none text-left cursor-pointer hover:underline"
                onClick={() => handleProductClick(product.artist, product.title)}
              >
                {product.title}
              </button>
              <h3>{product.size} {product.color} {product.category}</h3>
              <p className="text-lg font-semibold">${product.price}</p>
              <button
                className="bg-red-300 rounded-lg p-2 mt-2 mr-2 text-white"
                onClick={() => addItemToCart(product)}
              >
                ADD TO CART + {quantities[product.id] || 0}
              </button>
              <button
                className={`bg-red-300 rounded-lg p-2 mt-2 text-white ${!quantities[product.id] ? "hidden" : "inline"}`}
                onClick={() => removeItemFromCart(product)}
              >
                -
              </button>
              <img
                alt={`${product.title} by ${product.artist}`}
                src={`/merchphotos/${product.photo_path}`}
                
                className="mt-2"
              />
            </div>
          ))}
        </div>
      </div>
      <h1>{errMsg}</h1>
    </>
  );
}

export default Store;
