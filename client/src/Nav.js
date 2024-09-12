import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./components/Root";

function Nav({
  toggleCart,
  signout,
  navVisible,
  isLargeScreen,
  toggleNavVisibility,
}) {
  const loggedIn = useContext(UserContext);
  const [animation, setAnimation] = useState("");
  const [navHidden, setNavHidden] = useState("hidden");
  const [navLinkCSS, setNavLinkCSS] = useState("");

  useEffect(() => {
    if (navVisible && isLargeScreen) {
      setAnimation("");
      setNavHidden("");
    } else if (navVisible) {
      setAnimation("animate-slide-in");
      setNavHidden("");
    } else {
      setAnimation("animate-slide-out");
    }
  }, [navVisible, navHidden, isLargeScreen]);

  useEffect(() => {
    if (isLargeScreen) {
      setNavLinkCSS(
        "px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
      );
    } else {
      setNavLinkCSS(
        "flex items-center justify-center py-4 text-2xl text-center font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
      );
    }
  }, [isLargeScreen]);

  return (
    <div>
      <nav
        className={`flex flex-col ${navHidden} transform ${animation} w-full z-10 fixed top-0 right-0 bg-red-100 lg:flex lg:flex-row lg:z-10 lg:justify-between lg:fixed lg:top-0 lg:w-full lg:bg-red-100 lg:px-8`}
      >
        <NavLink to="/" className={navLinkCSS} onClick={toggleNavVisibility}>
          HOME
        </NavLink>

        <NavLink
          to="/store"
          className={navLinkCSS}
          onClick={toggleNavVisibility}
        >
          STORE
        </NavLink>

        {/* <NavLink
        to="/artists"
        className={navLinkCSS}
        onClick={toggleNavVisibility}
      >
        ARTISTS
      </NavLink> */}

        {/* <NavLink
          to="/discography"
          className={navLinkCSS}
          onClick={toggleNavVisibility}
        >
          DISCOGRAPHY
        </NavLink>

        <NavLink
          to="/playlists"
          className={navLinkCSS}
          onClick={toggleNavVisibility}
        >
          PLAYLISTS
        </NavLink> */}

        <NavLink
          to="/about"
          className={navLinkCSS}
          onClick={toggleNavVisibility}
        >
          ABOUT
        </NavLink>

        {/* <NavLink
        to="/stemplayer"
        className={navLinkCSS}
        onClick={toggleNavVisibility}
      >
        STEM PLAYER
      </NavLink> */}

        {loggedIn ? (
          <>
            <NavLink
              onClick={() => {
                signout();
                toggleNavVisibility();
              }}
              to="/"
              className={navLinkCSS}
            >
              LOGOUT
            </NavLink>
            <NavLink
              to="/profile"
              className={navLinkCSS}
              onClick={toggleNavVisibility}
            >
              <img
                src="/user.png"
                height="8"
                width="20"
                className="pt-0.5"
                alt="profile icon"
              />
            </NavLink>
          </>
        ) : (
          <NavLink
            to="/login"
            className={navLinkCSS}
            onClick={toggleNavVisibility}
          >
            <img
              src="/user.png"
              height="8"
              width="20"
              className="pt-0.5"
              alt="profile icon"
            />
          </NavLink>
        )}

        <button
          onClick={() => {
            toggleCart();
            toggleNavVisibility();
          }}
          className={navLinkCSS}
        >
          <img
            src="/shopping-cart.png"
            height="24"
            width="24"
            alt="shopping cart icon"
          />
        </button>

       {!isLargeScreen && <button
          onClick={() => {
            toggleNavVisibility();
          }}
          className={navLinkCSS}
        >
          EXIT
        </button>
}
      </nav>
    </div>
  );
}

export default Nav;
