import React, { useEffect, useState, createContext } from "react";
import Logo from "./Logo";
import Nav from "../Nav";
import NavMobile from "../NavMobile";
import Home from "./home/Home";
import ShoppingCart from "./ShoppingCart";
import { Outlet, useLocation } from "react-router-dom";

export const UserContext = createContext();
export const UserContextUpdater = createContext();

function Root() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024); 
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

    // Handle screen size changes, 1024 is when tailwind class is "lg"
    useEffect(() => {
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 1024);
      };
  
      window.addEventListener("resize", handleResize);
      handleResize(); 
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Adjust nav visibility based on screen size
    useEffect(() => {
      // Show nav on large screens
      if (isLargeScreen) {
        setNavVisible(true); 
      } else {
        // Hide nav on small screens
        setNavVisible(false); 
      }
    }, [isLargeScreen]);


  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await fetch("https://extremelypure-server.onrender.com/users/verifytoken", { credentials: 'include' });
      const tokenVerification = await response.json();
      setLoggedIn(!tokenVerification.error);
    } catch (error) {
      console.error('Error:', error);
      setLoggedIn(false);
    }
  };

  const signout = async () => {
    try {
      const response = await fetch("https://extremelypure-server.onrender.com/users/clearcookie", { credentials: 'include' });
      const tokenDeletion = await response.json();
      setLoggedIn(false);
    } catch (error) {
      console.error('Error:', error);
      setLoggedIn(true);
    }
  };

  const toggleCartVisibility = () => setCartVisible(prev => !prev);

  const toggleNavVisibility = () => {
    // Only toggle nav visibility on small screens
    if (!isLargeScreen) { 
      setNavVisible(prev => !prev);
    }
  };

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
          {!isLargeScreen && <NavMobile toggleNavVisibility={toggleNavVisibility} toggleCart={toggleCartVisibility} loggedIn={loggedIn}/>}
          <Logo isLargeScreen={isLargeScreen}/>
          <Nav toggleCart={toggleCartVisibility} signout={signout} navVisible={navVisible} isLargeScreen={isLargeScreen} toggleNavVisibility={toggleNavVisibility} />
          {isHomeRoute && <Home />}
          <main className="mt-28 flex justify-center lg:mt-2">
            <Outlet context={{ cart, addItemToCart, removeItemFromCart, quantities, verifyToken }} />
          </main>
          <ShoppingCart 
            cartVisible={cartVisible} 
            toggleCartVisibility={toggleCartVisibility} 
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
