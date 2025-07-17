import React, { useState, useEffect } from "react";
import releasesData from "../releaseDetails.json";
import { useParams, useOutletContext } from "react-router-dom";

function Release() {
  const priceID = process.env.REACT_APP_PRICE_ID;

  const { artistName, releaseTitle } = useParams();
  const { cart, addItemToCart, removeItemFromCart } = useOutletContext();

  const [productData, setProductData] = useState([]);
  const [releaseData, setReleaseData] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    const foundRelease = releasesData.releases.find(
      (release) => release.title === releaseTitle
    );
    setReleaseData(foundRelease);

    const fetchData = async () => {
      try {
        const getProductData = await fetch(
          `${process.env.REACT_APP_API_URL}/shop/${artistName}/${releaseTitle}`
        );
        const productData = await getProductData.json();
        setProductData(productData);
      } catch (error) {
        console.error("Error in getting product info:", error);
      }
    };

    fetchData();
  }, [artistName, releaseTitle]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setFullscreenImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="container mx-auto w-full flex flex-col-reverse lg:flex-row lg:justify-center">
      {/* Left Side */}
      <div className="left-side lg:w-1/2 lg:m-2">
        {releaseData?.coverArt && (
          <img
            className="w-full h-auto"
            alt="Cover art"
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

      {/* Right Side */}
      <div className="right-side-container lg:flex lg:flex-col lg:w-1/2 lg:m-2">
        <h1 className="font-bold uppercase text-center text-4xl">
          {releaseData?.artist}
        </h1>
        <h2 className="italic text-center text-2xl">{releaseData?.title}</h2>
        <h3 className="text-center">{releaseData?.format}</h3>
        <h3 className="text-center">{releaseData?.catalog_number}</h3>
        <h3 className="text-center">{releaseData?.date}</h3>

        {/* Products */}
        <div className="products px-12 my-3">
          {productData.map((product) => {
            const cartItem = cart.find(
              (item) => item[priceID] === product[priceID]
            );

            return (
              <div
                className="card my-3 flex flex-row justify-between content-center border-b-2"
                key={product.id}
              >
                <div className="left-side w-1/3 flex-row content-center">
                  <h2>
                    {product.color} {product.category} {product.size}
                  </h2>
                  <h2 className="font-semibold">${product.price}</h2>
                </div>

                <div className="center-merch-photo flex w-1/3 justify-left">
                  <img
                    className="w-24 h-auto cursor-pointer transition-transform duration-200 hover:scale-105"
                    alt="merch item"
                    src={`/merchPhotos/${product.photo_path}`}
                    onClick={() => setFullscreenImage(product.photo_path)}
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

        {/* Info */}
        <div className="px-12 info my-3">
          {releaseData?.info ? (
            <div
              dangerouslySetInnerHTML={{
                __html: releaseData?.info.replace(/\n/g, "<br />"),
              }}
            />
          ) : null}
        </div>

        {/* Press Quotes */}
        <div className="px-12 press-quotes my-3">
          {releaseData?.press.map((feature, i) =>
            feature.quote ? (
              <div key={i}>
                <p className="italic">"{feature.quote}"</p>
                <p className="text-right font-semibold pr-12 mb-6">
                  - {feature.source}
                </p>
              </div>
            ) : null
          )}
        </div>

        {/* YouTube */}
        {releaseData?.youtube && (
          <div className="flex justify-center mb-4">
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
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center"
          onClick={() => setFullscreenImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 left-4 text-white text-4xl font-bold z-[10000] hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenImage(null);
            }}
          >
            &times;
          </button>

          <img
            src={`/merchPhotos/${fullscreenImage}`}
            alt="Fullscreen merch item"
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </main>
  );
}

export default Release;