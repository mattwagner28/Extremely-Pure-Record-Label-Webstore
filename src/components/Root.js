import React, { useEffect, useState, createContext } from "react";
import Logo from "../components/Logo";
import Nav from "../Nav";
import Home from "../components/home/Home";
import ShoppingCart from "../components/ShoppingCart";
import { Outlet, useLocation } from "react-router-dom";

export const UserContext = createContext();

function Root() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  useEffect(() => {
    fetch("http://localhost:3001/users/verifytoken", {
      credentials: 'include',
    })
    .then(response => response.json())
    .then(tokenVerification => {
      if (tokenVerification.error) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setLoggedIn(false);
    });
  }, []);

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  const addItemToCart = (product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some(item => item.id === product.id);
  
      if (!isProductInCart) {
        const newProduct = { ...product, quantity: (product.quantity || 0) + 1 };
        return [...prevCart, newProduct];
      } else {
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
    const updatedProduct = { ...product, quantity: product.quantity - 1 };
  
    setCart((prevCart) => {
      return prevCart
        .map(item =>
          item.id === product.id ? updatedProduct : item
        )
        .filter(item => item.quantity > 0);
    });
  
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      const newQuantity = (newQuantities[product.id] || 0) - 1;
  
      if (newQuantity <= 0) {
        delete newQuantities[product.id];
      } else {
        newQuantities[product.id] = newQuantity;
      }
  
      return newQuantities;
    });
  };

  return (
    <UserContext.Provider value={loggedIn}>
      <>
        <Logo />
        <Nav toggleCart={toggleCartVisibility} />
        {isHomeRoute && <Home />}
        <main className="flex justify-center mt-1">
          <Outlet context={{ cart, addItemToCart, removeItemFromCart, quantities }} />
        </main>
        <ShoppingCart 
          visible={cartVisible} 
          toggleCart={toggleCartVisibility} 
          cart={cart} 
          addItemToCart={addItemToCart} 
          removeItemFromCart={removeItemFromCart} 
          quantities={quantities} 
        />
      </>
    </UserContext.Provider>
  );
}

export default Root;

