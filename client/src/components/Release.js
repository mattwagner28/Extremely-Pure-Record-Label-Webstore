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
          `https://extremelypure-server.onrender.com/shop/${artistName}/${releaseTitle}`
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
      <div className="left-side lg:w-1/2 lg:m-2">
        {releaseData?.coverArt && (
          <img
            className="w-full h-auto"
            alt={`Cover art`}
            src={`/albumart/${releaseData.coverArt}`}
          />
        )}
        <p className="text-center">{releaseData?.coverArtist}</p>
        <div className="w-full h-80">
          <iframe
            className="border-0 w-full h-full"
            src={releaseData?.bandcamp_embed}
            seamless
            title="Bandcamp Embed"
          >
            <a href={releaseData?.bandcamp_link}>
              {releaseTitle} by {artistName}
            </a>
          </iframe>
        </div>
      </div>

      {/*Right Side Container with album art */}
      <div className="right-side-container lg:flex lg:flex-col lg:w-1/2 lg:m-2">
        <h1 className="font-bold uppercase text-center text-4xl">
          {releaseData?.artist}
        </h1>
        <h2 className="italic text-center text-2xl">{releaseData?.title}</h2>
        <h3 className="text-center"> {releaseData?.format}</h3>
        <h3 className="text-center"> {releaseData?.catalog_number}</h3>
        <h3 className="text-center">{releaseData?.date}</h3>

        {/*Items for sale section*/}
        <div className="products px-12 my-3 ">
          {productData.map((product) => {
            const cartItem = cart.find(
              (item) => item.price_id === product.price_id
            );

            return (
              //Card for each product fonud
              <div className="card my-3 flex flex-row justify-between content-center border-b-2" key={product.id}>

                <div className="left-side w-1/3 flex-row content-center">
                  <h2>
                    {" "}
                    {product.color} {product.category} {product.size}{" "}
                  </h2>
                  <h2 className="font-semibold">${product.price}</h2>

                </div>

                <div className="center-merch-photo flex w-1/3 justify-left">
                  <img
                    className="w-24  h-auto"
                    alt="merch item"
                    src={`/merchPhotos/${product.photo_path}`}
                  />
                </div>

                <div className="right-side w-1/3 content-center">
                {cartItem ? (
                    <>
                      <button
                        className="rounded px-2 mr-2 bg-slate-400 text-white"
                        onClick={() => addItemToCart(product)}
                        >
                        +
                      </button>
                      <button
                        className="rounded px-2 ml-4 bg-slate-400 text-white"
                        onClick={() => removeItemFromCart(product)}
                        >
                        -
                      </button>
                        <p>In cart: {cartItem.quantity}</p>
                    </>
                  ) : (
                    <>
                      <button
                        className="rounded px-2 bg-slate-400 text-white"
                        onClick={() => addItemToCart(product)}
                      >
                        ADD TO CART
                      </button>
                      <p>In cart: 0</p>
                    </>
                  )}


                </div>
                


              </div>
            );
          })}
        </div>

        {/* Press quotes */}
        <div className="px-12 press-quotes my-3">
          {releaseData?.press.map((feature) => (
            <div>
              <p className="italic">"{feature.quote}"</p>
              <p className="text-right font-semibold pr-12 mb-6">
                - {feature.source}
              </p>
            </div>
          ))}

          {/* <p className="italic">"{releaseData?.press[0].quote}"</p>
            <p className="text-right font-semibold pr-12">- {releaseData?.press[0].source}</p> */}
        </div>

        {/*Youtube Video  */}
        <div className="flex justify-center mb-4">
          {releaseData?.youtube && (
            <iframe
              className="self-center"
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
      </div>
    </main>
  );
}

export default Release;
