import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ShoppingCart({ cartVisible, toggleCart, cart, addItemToCart, removeItemFromCart, loggedIn, quantities }) {
  const [animation, setAnimation] = useState("");
  const [cartHidden, setCartHidden] = useState('hidden');

  useEffect(() => {
    if (cartVisible) {
      setAnimation("animate-slide-in");
      setCartHidden("");
    } else {
      setAnimation("animate-slide-out");
    }
  }, [cartVisible]);

  return (
    <div className={`${cartHidden} cart flex flex-col z-20 fixed top-0 right-0 bg-black transition transform ${animation} h-full w-full lg:w-1/3 md:w-1/2`}>
     <div className="header pl-4">
        <h1 className="text-white">{cart.length === 0 ? "Shopping cart is currently empty" : ""}</h1>
        <button
          onClick={toggleCart}
          className="text-white bg-red-500 hover:bg-red-700 p-2 rounded mt-4"
        >
          HIDE CART
        </button>
     </div>
     
      <div className={`items overflow-y-auto h-full p-4`}>
        <div className="card p-4"> {/* Optional padding to give some space inside the container */}
          {cart.map(item => (
            <div className="flex flex-row justify-between">
              <div key={item.id} className="text-white mb-4">
                <h2>{item.title}</h2>
                <p>{item.artist}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price * item.quantity}</p>
                {/* <img
                      src={`merchphotos/${item.photo_path}`}
                      alt={`${item.title} by ${item.artist}`}
                      className="mt-2"
                    /> */}
                <button onClick={() => addItemToCart(item)}>+</button>
                <button onClick={() => removeItemFromCart(item)}>-</button>
              </div>
                <img className="size-24" src={`merchphotos/${item.photo_path}`}></img>
            </div>
          ))}
        </div>
      </div>
            <div className="footer w-full h-32 bg-red-400 bottom-0 left-0">
                <NavLink to="/checkout" className={cart.length === 0 ? "hidden" : "text-white bg-red-500 hover:bg-red-700 p-2 rounded mt-4"}>
                  {loggedIn ? "CHECKOUT" : "CHECKOUT AS GUEST"}
                </NavLink>
                {loggedIn ? null : <NavLink to="/login" className={"text-white bg-red-500 hover:bg-red-700 p-2 rounded mt-4"}>
                  LOG IN
                </NavLink>}
            </div>
    </div>
  );
}

export default ShoppingCart;
