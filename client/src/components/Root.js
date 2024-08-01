import React, { useEffect, useState, createContext } from "react";
import Logo from "./Logo";
import Nav from "../Nav";
import Home from "./home/Home";
import ShoppingCart from "./ShoppingCart";
import Release from "./Release";
import { Outlet, useLocation } from "react-router-dom";

export const UserContext = createContext();
export const UserContextUpdater = createContext();

function Root() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/verifytoken", { credentials: 'include' });
      const tokenVerification = await response.json();
      setLoggedIn(!tokenVerification.error);
    } catch (error) {
      console.error('Error:', error);
      setLoggedIn(false);
    }
  };

  const signout = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/clearcookie", { credentials: 'include' });
      const tokenDeletion = await response.json();
      setLoggedIn(!tokenDeletion.error);
    } catch (error) {
      console.error('Error:', error);
      setLoggedIn(true);
    }
  };

  const toggleCartVisibility = () => setCartVisible(prev => !prev);

  const addItemToCart = (product) => {
    setCart(prevCart => {
      const isProductInCart = prevCart.some(item => item.id === product.id);
      if (!isProductInCart) {
        return [...prevCart, { ...product, quantity: (product.quantity || 0) + 1 }];
      }
      return prevCart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });

    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [product.id]: (prevQuantities[product.id] || 0) + 1,
    }));
  };

  const removeItemFromCart = (product) => {
    setCart(prevCart => {
      return prevCart
        .map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0);
    });

    setQuantities(prevQuantities => {
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
      <UserContextUpdater.Provider value={{ setLoggedIn }}>
        <div>
          <img src="/hamburger.png" className="z-20 mr-4 fixed right-0 size-24 object-right lg:hidden" alt="Menu" />
          <Logo />
          <Nav toggleCart={toggleCartVisibility} signout={signout} />
          {isHomeRoute && <Home />}
          <main className="flex justify-center mt-1">
            <Outlet context={{ cart, addItemToCart, removeItemFromCart, quantities, verifyToken }} />
          </main>
          <ShoppingCart 
            cartVisible={cartVisible} 
            toggleCart={toggleCartVisibility} 
            cart={cart} 
            addItemToCart={addItemToCart} 
            removeItemFromCart={removeItemFromCart} 
            quantities={quantities} 
            loggedIn={loggedIn}
          />
        </div>
      </UserContextUpdater.Provider>
    </UserContext.Provider>
  );
}

export default Root;
