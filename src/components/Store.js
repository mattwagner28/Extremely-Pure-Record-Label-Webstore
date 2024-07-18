import { useEffect, useState } from "react";
import React from "react";

function Store() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // const [quantities, setQuantities] = useState([]);  
  const [quantities, setQuantities] = useState({});
  // const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/shop")
      .then((response) => response.json())
      .then((allProducts) => {
        setProducts(allProducts);
      });
  }, []);



  const addItemToCart = (product) => {
    console.log({ id: product.id });
  
    setCart((prevCart) => {
      const isProductInCart = prevCart.some(item => item.id === product.id);
  
      if (!isProductInCart) {
        // Create a new product object with quantity initialized
        const newProduct = { ...product, quantity: (product.quantity || 0) + 1 };
        return [...prevCart, newProduct];
      } else {
        // Update the quantity of the existing product
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }


    
    });

    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: (prevQuantities[product.id] || 0) + 1,
    }));
  };

  const removeItemFromCart = (product) => {
    // Create a new product object with decreased quantity
    const updatedProduct = { ...product, quantity: product.quantity - 1 };
  
    setCart((prevCart) => {
      // Update the cart: map to update quantity, filter to remove item if quantity is 0
      return prevCart
        .map(item => 
          item.id === product.id ? updatedProduct : item
        )
        .filter(item => item.quantity > 0); // Remove item if quantity is 0
    });
  
    setQuantities((prevQuantities) => {
      // Update the quantities
      const newQuantities = { ...prevQuantities };
      const newQuantity = (newQuantities[product.id] || 0) - 1;
  
      if (newQuantity <= 0) {
        delete newQuantities[product.id]; // Remove the item from quantities if quantity is 0
      } else {
        newQuantities[product.id] = newQuantity;
      }
  
      return newQuantities;
    });
  };




  useEffect(()=> {
    console.log('Shopping cart:', cart);
    // const quant = cart.map((item) => (
      
    // ));
    console.log('Quantities:', quantities);

  }, [cart, quantities]);



  return (
    <div className="w-full z-0 lg:w-4/5 m-2">
      <button className="bg-red-600">CHECKOUT </button>
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
            {/* <p>{product.quantity}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
