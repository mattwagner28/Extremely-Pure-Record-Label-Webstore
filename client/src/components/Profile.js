import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/Root";
import { NavLink } from "react-router-dom";

function Profile() {
  const loggedIn = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [firstName, setFirstName] = useState("");

  //Fetches data
  const ordersData = async () => {
    try {
      const getOrders = await fetch(`${process.env.REACT_APP_API_URL}/orders/userOrders`, {
        credentials: "include",
      });
      const orderData = await getOrders.json();

      if (orderData) {
        setOrders(orderData.orders);
        // console.log("All order Items", orders);
        // setFirstName(`Hello, ${orderData.orders[0].first_name}!`);
                setFirstName(`You are now logged in. Profile page is still under construction. If you place an order while logged in, your order data will be saved and eventually displayed here.`);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  //Returns array of just the order IDs for each order
  // const allOrderItems = orders.map((order) => order.order_id);

  //Returns an array of just EACH order number
  // const userOrderIDs = allOrderItems.reduce((accumulator, currentValue) => {
  //   if (!accumulator.includes(currentValue)) {
  //     accumulator.push(currentValue);
  //   }
  //   return accumulator;
  // }, []);

  useEffect(() => {
    ordersData();
    // console.log("Individual order IDs:", userOrderIDs);
  }, []);

  if (loggedIn) {
    return (
      <div>
        {/* Greeting */}

        <p className="text-center text-sm">{firstName}</p>

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
