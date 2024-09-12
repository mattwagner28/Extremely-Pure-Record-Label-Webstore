import { useEffect, useState } from "react";
import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function Store() {
  const { cart, addItemToCart, removeItemFromCart, quantities } =
    useOutletContext();
  const [products, setProducts] = useState([]);
  const [loadingMsg, setLoadingMSg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleProductClick = (artist, title) => {
    navigate(`/releases/${artist}/${title}`); 
  };

  useEffect(() => {
    fetch("https://extremelypure-server.onrender.com/shop")
      .then((response) => response.json())
      .then((allProducts) => {
        setProducts(allProducts);
      })
      .catch((error) => {
        console.error("A fetch error occurred:", error);
        setErrMsg("An internal server error occurred.");

      });
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      setLoadingMSg(
        "Loading..."
      );
    } else {
      setLoadingMSg("");
    }
  }, [products]);

  // useEffect(() => {
  //   // console.log("Shopping cart:", cart);
  //   // console.log("Quantities:", quantities);
  // }, [cart, quantities]);

  return (
    <>
      {/*Main container */}
      <div className="relative w-full z-0 lg:w-4/5">

        {/*Container with product cards */}
        <div className="product-container grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {products.map((product, index) => (
            
            <div key={index} className="card flex flex-col border rounded-lg shadow-md">

              <div className="card-top p-4 flex-shrink-0">
                <h1 className="artist text-lg font-bold">{product.artist}</h1>
                <button
                  className="text-xl bg-transparent border-none text-left cursor-pointer hover:underline"
                  onClick={() =>
                    handleProductClick(product.artist, product.title)
                  }
                >
                  {product.title}
                </button>
                <h3>
                  {product.size} {product.color} {product.category}
                </h3>
                <p className="text-lg font-semibold">${product.price}</p>
              </div>

              <div className="card-middle-merchphoto flex-1 flex items-center justify-center p-4">
                <img
                  alt={`${product.title} by ${product.artist}`}
                  src={`/merchPhotos/${product.photo_path}`}
                  onClick={() =>
                    handleProductClick(product.artist, product.title)
                  }
                  className="cursor-pointer max-w-full max-h-full object-cover"
                />
              </div>

              <div className="card-bottom flex w-full border-dotted border-t-2 p-0 flex-shrink-0">
                      
                    
                    <h1 className={`p-4 text-center w-full ${quantities[product.id] ? "hidden" : "inline"} cursor-pointer hover:bg-cyan-200`} onClick={() => addItemToCart(product)}>ADD TO CART</h1>

                      <div className={`${!quantities[product.id] ? "hidden" : "inline"} flex-1 bg-gray-200 hover:bg-cyan-100 p-4 text-center cursor-pointer`} onClick={() => addItemToCart(product)}>
                        <h2>+</h2>
                      </div>

                      <div className={`${!quantities[product.id] ? "hidden" : "inline"} flex-1 p-4 text-center text-bold`}>
                        <h2>{quantities[product.id]}</h2>
                      </div>

                      <div className={`${!quantities[product.id] ? "hidden" : "inline"} flex-1 bg-gray-200 hover:bg-red-300 p-4 text-center cursor-pointer`} onClick={() => removeItemFromCart(product)} >
                        <h2>-</h2>
                      </div>
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-center">{loadingMsg}</h1>
        <h1>{errMsg}</h1>
      </div>
    </>
  );
}

export default Store;
