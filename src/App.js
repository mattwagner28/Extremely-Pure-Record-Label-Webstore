import React from "react";
import Root from "./components/Root";
import Store from "./components/Store";
import Artists from "./components/Artists";
import Discography from "./components/Discography";
import Playlists from "./components/Playlists";
import About from "./components/About";
import StemPlayer from "./components/StemPlayer";
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

