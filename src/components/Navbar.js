import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"/"}>
            myNotes
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/about"}>
                  About
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="button">
              <NavLink className="btn btn-primary" role="button" to={"/signin"}>
                Sign In
              </NavLink>
              <NavLink className="btn btn-primary mx-3" role="button" to={"/signup"}>
                Sign Up
              </NavLink>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
