import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ShoppingCart({ visible, toggleCart, cart, addItemToCart, removeItemFromCart, quantities }) {
  const [animation, setAnimation] = useState("");
  const [cartHidden, setCartHidden] = useState('hidden');

  useEffect(() => {
    if (visible) {
      setAnimation("animate-slide-in");
      setCartHidden("");
    } else {
      setAnimation("animate-slide-out");
    }
  }, [visible]);

  return (
    <div className={`${cartHidden} z-20 h-full w-1/3 fixed top-0 right-0 bg-black transition transform ${animation}`}>
      <h1 className="text-white">{cart.length === 0 ? "Shopping cart is currently empty" : ""}</h1>
      <button
        onClick={toggleCart}
        className="text-white bg-red-500 hover:bg-red-700 p-2 rounded mt-4"
      >
        Close Cart
      </button>
      {cart.map(item => (
        <div key={item.id} className="text-white">
          <h2>{item.title}</h2>
          <p>{item.artist}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.price * item.quantity}</p>
          {/* <img
                src={`merchphotos/${item.photo_path}`}
                alt={`${item.title} by ${item.artist}`}
                className="mt-2"
              /> */}
          <button onClick={() => addItemToCart(item)}>+</button>
          <button onClick={() => removeItemFromCart(item)}>-</button>
        </div>
      ))}
      <NavLink to="/checkout" className={cart.length === 0 ? "hidden" : "text-white bg-red-500 hover:bg-red-700 p-2 rounded mt-4"}>CHECKOUT</NavLink>
    </div>
  );
}

export default ShoppingCart;
