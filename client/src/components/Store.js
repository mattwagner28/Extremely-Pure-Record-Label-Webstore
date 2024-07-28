import { useEffect, useState } from "react";
import React from "react";
import { useOutletContext } from "react-router-dom";

function Store() {
  const { cart, addItemToCart, removeItemFromCart, quantities } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/shop")
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
        <div className="product-container grid grid-cols-1 lg:grid-cols-4 gap-4 mt-12">
          {products.map((product, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <h1 className="artist text-lg font-bold">{product.artist}</h1>
              <h2 className="text-xl">{product.title}</h2>
              <p className="text-lg font-semibold">{product.price}</p>
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
                src={`merchphotos/${product.photo_path}`}
                alt={`${product.title} by ${product.artist}`}
                className="mt-2"
              />
            </div>
          ))}
        </div>
      </div>
      <h1>{errMsg}</h1>
      {/* <ShoppingCart visible={cartVisible} toggleCart={toggleCartVisibility} /> */}
    </>
  );
}

export default Store;
