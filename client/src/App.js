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
import CheckoutForm from "./components/CheckoutForm";
import Return from "./components/Return";
import Profile from "./components/Profile";
import Release from "./components/Release";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
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
      <Route path="profile" element={<Profile />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="reset-password/:id/:token" element={<ResetPassword />} />
      <Route path="shoppingcart" element={<ShoppingCart />} />
      <Route path="releases/:artistName/:releaseTitle" element={<Release />} />
      <Route path="checkout" element={<CheckoutForm />} />
      <Route path="return" element={<Return />} />
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

