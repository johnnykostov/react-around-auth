import React from "react";
import logoUs from "../images/Vector.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header({ loggedIn, userEmail, handleSignout }) {
  const location = useLocation();
  const login = location.pathname === "/signIn";
  const register = location.pathname === "/signUp";
  return (
    <header className="header">
      <div className="header__container">
        {" "}
        <img src={logoUs} alt="icon" className="header__icon" />
        <nav className="header_navbar">
          <ul
            className={`header__links ${
              login || register ? "header__links_signUp-login-page" : ""
            }`}
          >
            {login && (
              <li className="header__link-item">
                <Link to="/signUp" className="header__link">
                  Sign up
                </Link>
              </li>
            )}
            {register && (
              <li className="header__link-item">
                <Link to="/signIn" className="header__link">
                  Log in
                </Link>
              </li>
            )}
            {loggedIn && (
              <li className="header__link-item">
                <Link
                  to="/signIn"
                  className="header__link"
                  onClick={handleSignout}
                >
                  Log out
                </Link>
              </li>
            )}
            {loggedIn && <li className="header__link-item">{userEmail}</li>}
          </ul>
        </nav>
      </div>
    </header>
  );
}