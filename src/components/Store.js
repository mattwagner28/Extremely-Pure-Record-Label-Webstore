import { useEffect, useState } from "react";
import React from "react";

function Store() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // const [quantities, setQuantities] = useState([]);  
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/shop")
      .then((response) => response.json())
      .then((allProducts) => {
        setProducts(allProducts);
      });
  }, []);




    const addItemToCart = (product) => { 
    setCart((prevCart) => [...prevCart, product]);
    //Create an object that has the product id and the quantity added

    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[product.id] = (newQuantities[product.id] || 0) + 1;
      return newQuantities;
    });

  };

  const removeItemFromCart = (product) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[product.id] = (newQuantities[product.id] || 0) - 1;
      return newQuantities;
    });
  }

  useEffect(()=> {
    console.log('Shopping cart:', cart);
    console.log('Quantities:', quantities);

  }, [cart, quantities]);



  return (
    <div className="w-full z-0 lg:w-4/5  m-2">
      <div className="product-container grid grid-cols-1 lg:grid-cols-4">
        {products.map((product, index) => (
          <div key={index}>
            <h1 className="artist">{product.artist}</h1>
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <button className="bg-red-300 rounded-lg p-1" onClick={()=> addItemToCart(product) }>ADD TO CART + {quantities[product.id] || 0}</button>
            <button className={`${(!quantities[product.id]) ? "hidden" : "inline"} bg-red-300 rounded-lg p-1`}onClick={()=> removeItemFromCart(product) }>-</button>
            <img
              src={`merchphotos/${product.photo_path}`}
              alt={`${product.title} by ${product.artist}`}
            ></img>
            {/* <p>{quantities[product.id] || 0}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
