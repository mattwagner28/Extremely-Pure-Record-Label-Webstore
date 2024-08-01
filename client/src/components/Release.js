import React, { useState, useEffect } from "react";
import releasesData from "../releaseDetails.json";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Release() {
  const { artistName, releaseTitle } = useParams();
  const { cart, addItemToCart, removeItemFromCart } = useOutletContext();

  const [productData, setProductData] = useState([]);
  const [releaseData, setReleaseData] = useState(null); // State for release data

  useEffect(() => {
    // Fetch release data based on artistName and releaseTitle
    const foundRelease = releasesData.releases.find(
      (release) => release.title === releaseTitle
    );
    setReleaseData(foundRelease);

    // Fetch product data from the shop
    const fetchData = async () => {
      try {
        const getProductData = await fetch(
          `http://localhost:3001/shop/${artistName}/${releaseTitle}`
        );
        const productData = await getProductData.json();
        setProductData(productData);
        console.log("Product Data:", productData);
      } catch (error) {
        console.error("Error in getting product info:", error);
      }
    };

    fetchData();
    console.log("Cart (from release page):", cart);
  }, [artistName, releaseTitle, cart]);

  // useEffect(() => {
  //   console.log("Cart (from release page):", cart);
  // }, []);

  return (
    <div className="flex w-full justify-center">

      <div className="flex w-2/5 m-2 bg-slate-300">
        {releaseData?.coverArt && (
          <img
            className="size-full"
            alt={`Cover art`}
            src={`/albumart/${releaseData.coverArt}`}
          />
        )}
      </div>

      <div className="flex w-2/5 m-2 bg-red-300">
        <div className="products">
          {productData.map(product => {
            // Check if the product is in the cart
            const cartItem = cart.find(item => item.test_price_id === product.test_price_id);

            return (
              <div className="card" key={product.id}>
                <h2>{product.color} {product.category} {product.size}</h2>
                <img className="size-24" alt="merch item" src={`/merchphotos/${product.photo_path}`}></img>
                
                {/* Render quantity and buttons */}
                <div>
                  {cartItem ? (
                    <>
                      <p>Quantity: {cartItem.quantity}</p>
                      <button onClick={() => addItemToCart(product)}>+</button>
                      <button onClick={() => removeItemFromCart(product)}>-</button>
                    </>
                  ) : (
                    <>
                      <p>In cart: 0</p>
                      <button onClick={() => addItemToCart(product)}>Add to Cart</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default Release;

