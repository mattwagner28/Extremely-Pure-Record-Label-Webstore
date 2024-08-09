import React, { useState, useEffect } from "react";
import releasesData from "../releaseDetails.json";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Release() {
  const { artistName, releaseTitle } = useParams();
  const { cart, addItemToCart, removeItemFromCart } = useOutletContext();

  const [productData, setProductData] = useState([]);
  const [releaseData, setReleaseData] = useState(null);

  useEffect(() => {
    // Fetch release data based on artistName and releaseTitle
    const foundRelease = releasesData.releases.find(
      (release) => release.title === releaseTitle
    );
    setReleaseData(foundRelease);

    // Fetch product data from the database
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

  return (
    //Main container
    <main className="container mx-auto w-full flex flex-col-reverse lg:flex-row lg:justify-center">

      {/*Left Side Container with album art */}
      <div className="left-side lg:w-2/5 lg:m-2 bg-slate-300">
        {releaseData?.coverArt && (
          <img
            className="w-full h-auto"
            alt={`Cover art`}
            src={`/albumart/${releaseData.coverArt}`}
          />
        )}
        <p>{releaseData?.coverArtist}</p>
      </div>

      {/*Right Side Container with album art */}
      <div className="right-side-container lg:flex lg:flex-col lg:w-2/5 lg:m-2">
        <h1 className="font-bold uppercase text-center text-4xl">{releaseData?.artist}</h1>
        <h2 className="italic text-center text-2xl">{releaseData?.title}</h2>
        <h3 className="text-center"> {releaseData?.catalog_number}</h3>
        <h3  className="text-center">{releaseData?.date}</h3>
        
        {/*Items for sale section*/}
        <div className="products">
          {productData.map((product) => {
            const cartItem = cart.find(
              (item) => item.test_price_id === product.test_price_id
            );

            return (
              <div className="card flex content-center" key={product.id}>
                <div className="left-side flex-row content-center">
                    <h2>  {product.color} {product.category} {product.size} </h2>
                      {cartItem ? (
                        <>
                          <p>In cart: {cartItem.quantity}</p>
                          <button className="rounded px-2 mr-2 bg-slate-400 text-white" onClick={() => addItemToCart(product)}>+</button>
                          <button className="rounded px-2 mr-2 bg-slate-400 text-white"  onClick={() => removeItemFromCart(product)}>-</button>
                        </>
                      ) : (
                        <>
                          <p>In cart: 0</p>
                          <button className="rounded px-2 bg-slate-400 text-white" onClick={() => addItemToCart(product)}>ADD TO CART</button>
                        </>
                      )}
                </div>
                <div className="right-side place-self-center">
                    <img
                      className="w-24  h-auto"
                      alt="merch item"
                      src={`/merchphotos/${product.photo_path}`}
                    />
                </div>
              </div>
            );
          })}
        </div>

        {releaseData?.youtube && (
          <iframe
            width="560"
            height="315"
            src={releaseData.youtube}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </main>
  );
}

export default Release;
