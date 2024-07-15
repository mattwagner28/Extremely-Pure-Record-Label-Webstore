import React from "react";
import Root from "./components/Root";
import Store from "./components/Store";
import Artists from "./components/Artists";
import Discography from "./components/Discography";
import Playlists from "./components/Playlists";
import About from "./components/About";
import StemPlayer from "./components/StemPlayer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ShoppingCart from "./components/ShoppingCart";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
    >
      <Route path="store" element={<Store />} />
      <Route path="artists" element={<Artists />} />
      <Route path="discography" element={<Discography />} />
      <Route path="playlists" element={<Playlists />} />
      <Route path="about" element={<About />} />
      <Route path="stemplayer" element={<StemPlayer />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="shoppingcart" element={<ShoppingCart />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

