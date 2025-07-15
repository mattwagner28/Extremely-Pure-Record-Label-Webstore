import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/Root";
import { NavLink } from "react-router-dom";

function Profile() {
  const loggedIn = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [greeting, setGreeting] = useState("");

  //Fetches data
  const ordersData = async () => {
    try {
      const getOrders = await fetch(`${process.env.REACT_APP_API_URL}/orders/userOrders`, {
        credentials: "include",
      });
      const orderData = await getOrders.json();

      if (orderData) {
        setOrders(orderData.orders);
        console.log("All order Items", orderData.orders);
        setGreeting(`Hello, ${orderData.orders[0].first_name}!`);
                // setGreeting(`You are now logged in. Profile page is still under construction. If you place an order while logged in, your order data will be saved and eventually displayed here.`);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const allOrders = orders.reduce((accumulator, currentValue) => {
      const uniqueOrder = accumulator.find(order => order.order_id === currentValue.order_id);
      if (!uniqueOrder) {
        accumulator.push(currentValue);
      }
      return accumulator
  }, []);

  console.log('Unique Orders:', allOrders);

  useEffect(() => {
    ordersData();
    // console.log("Individual order IDs:", userOrderIDs);
  }, []);

  if (loggedIn) {
    return (
      <div>

        <p className="text-center text-sm">{greeting}</p>

      </div>
    );
  } else {
    return (
      <div>
        <h1 className="font-bold text-center text-2xl">PROFILE</h1>
        <NavLink
          to="/login"
          className="text-center mt-2 block p-6 rounded bg-slate-300 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
        >
          Please login.
        </NavLink>
      </div>
    );
  }
}

export default Profile;
