import React, { useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../App";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import { setCart } from "./Usereducer";
import setCart from "./Usereducer";

// Using style as inline CSS for DawatDaftar heading
const style = {
  color: "black",
  "font-family": "Sacramento",
  "font-style": "bold",
  "font-size": "3.5rem",
};


const Navbar = () => {
  const { state, dispatch } = useContext(userContext);  // Helped to maitain user state across the whole application
  const { itemCount } = useContext(setCart);
  const { cart } = useContext(setCart);

  if (state) {
    // if else block is used to toggle nav items if user is logged in
    // here if state is true user is logged in
    return (
      <>
        <nav
          style={{ backgroundColor: "white" }}
          id="navbar-header"
          className="navbar navbar-expand-lg"
        >
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="lnr lnr-menu"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav d-flex justify-content-between">
                <li className="nav-item only-desktop">
                  <a className="nav-link" id="side-nav-open" href="#">
                    <span className="lnr lnr-menu"></span>
                  </a>
                </li>
                <div className="d-flex flex-lg-row flex-column">
                  <li className="nav-item active">
                    <NavLink to="/" className="nav-link">
                      Home <span className="sr-only">(current)</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/about" className="nav-link">
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/contact" className="nav-link">
                      Contact Us
                    </NavLink>
                  </li>
                </div>
              </ul>

              <NavLink
                style={style}
                to="/"
                className="navbar-brand navbar-brand-center d-flex align-items-center only-desktop"
              >
                DawatDaftar
              </NavLink>
              <ul className="navbar-nav d-flex justify-content-between">
                <div className="d-flex flex-lg-row flex-column">
                  <li className="nav-item active">
                    <NavLink to="/orders" className="nav-link">
                      Order
                    </NavLink>
                  </li>
                  <li className="nav-item profile">
                    <NavLink to="/about" className="nav-link">
                      <i class="fa fa-user" aria-hidden="true">
                        &ensp;
                      </i>
                      {localStorage.getItem("username")}
                      &ensp;&ensp;
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink to="/logout" className="nav-link">
                      Logout
                    </NavLink>
                  </li>
                </div>
                <li className="nav-item">
                  <a id="side-search-open" className="nav-link" href="/payment">
                  <Badge color="secondary" badgeContent={itemCount}>
                <ShoppingCartIcon />
              </Badge>
                  </a>
                </li>
                <li className="nav-item">
                  <a id="side-search-open" className="nav-link" href="#">
                    <span className="lnr lnr-magnifier"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav
          style={{ backgroundColor: "white" }}
          id="navbar-header"
          className="navbar navbar-expand-lg"
        >
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="lnr lnr-menu"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav d-flex justify-content-between">
                <li className="nav-item only-desktop">
                  <a className="nav-link" id="side-nav-open" href="#">
                    <span className="lnr lnr-menu"></span>
                  </a>
                </li>
                <div className="d-flex flex-lg-row flex-column">
                  <li className="nav-item active">
                    <NavLink to="/" className="nav-link">
                      Home <span className="sr-only">(current)</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/about" className="nav-link">
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/contact" className="nav-link">
                      Contact
                    </NavLink>
                  </li>
                </div>
              </ul>

              <NavLink
                style={style}
                to="/"
                className="navbar-brand navbar-brand-center d-flex align-items-center only-desktop d-print-none"
              >
                DawatDaftar
              </NavLink>
              <ul className="navbar-nav d-flex justify-content-between">
                <div className="d-flex flex-lg-row flex-column">
                  <li className="nav-item active">
                    <NavLink to="/orders" className="nav-link">
                      Order
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Sign In
                    </NavLink>
                  </li>

                  <li className="nav-item dropdown">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                </div>
                <li className="nav-item">
                  <a id="side-search-open" className="nav-link" href="/payment">
                  <Badge color="secondary" badgeContent={itemCount}>
                <ShoppingCartIcon />
              </Badge>
                  </a>
                </li>
                
                <li className="nav-item">
                  <a id="side-search-open" className="nav-link" href="/orders">
                    <span className="lnr lnr-magnifier"></span>
                  </a>
                </li>

                
              </ul>
            </div>
          </div>
        </nav>
      </>
      
    );
  }
};

export default Navbar;
