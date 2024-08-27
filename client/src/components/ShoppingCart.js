import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ShoppingCart({ cartVisible, toggleCartVisibility, cart, addItemToCart, removeItemFromCart, loggedIn }) {
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
    <div className={`${cartHidden} cart flex flex-col z-20 fixed top-0 right-0 bg-blue-200 transform ${animation} h-full w-full lg:w-1/3 md:w-1/2`}>
     <div className="header pl-4">
        <button
          onClick={toggleCartVisibility}
          className="text-white bg-gray-800 hover:bg-purple-400 p-2 rounded mt-4"
        >
          HIDE CART
        </button>
        <h1 className="text-gray-700 font-semibold mt-1">{cart.length === 0 ? "Shopping cart is currently empty" : ""}</h1>
     </div>
     
      <div className={`items overflow-y-auto h-full p-4`}>
        <div className="card p-4"> 
          {cart.map(item => (
            <div className="flex flex-row justify-between" key={item.id}>
              <div  className="text-gray-700 font-semibold mb-4">
                <h2>{item.artist}</h2>
                <h2 className="italic">{item.title}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price * item.quantity}</p>
                <button className="bg-white rounded px-2 mr-2 active:bg-slate-400" onClick={() => addItemToCart(item)}>+</button>
                <button className="bg-white rounded px-2 mr-2 active:bg-slate-400" onClick={() => removeItemFromCart(item)}>-</button>
              </div>
                <img className="size-24" alt="merch item" src={`/merchPhotos/${item.photo_path}`}></img>
            </div>
          ))}
        </div>
      </div>
            <div className="footer flex w-full justify-normal pl-4 h-24 bg-blue-200">
              <button>
                  <NavLink to="/checkout" onClick={toggleCartVisibility} className={cart.length === 0 ? "hidden" : "rounded text-white bg-gray-800 hover:bg-purple-400 p-2" }>
                    {loggedIn ? "CHECKOUT" : "CHECKOUT AS GUEST"}
                  </NavLink>
                </button>

                <button className="pl-4">
                  {!loggedIn && <NavLink to="/login" onClick={toggleCartVisibility} className={"rounded text-white bg-gray-800 hover:bg-purple-400 p-2"}>
                    LOG IN
                  </NavLink>}
                </button>
            </div>
    </div>
  );
}

export default ShoppingCart;
