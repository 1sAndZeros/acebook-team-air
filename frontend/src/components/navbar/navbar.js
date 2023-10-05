import React from "react";
import "./navbar.css";
import Avatar from "../user/Avatar";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout, token, user }) => {
  return (
    <nav className="navbar" id="navbar">
      <Link to={"/posts"}>
        <div className="navbar-brand">
          <img
            className="d-inline-block align-text-top"
            src="/apple-touch-icon.png"
            alt="acebook-logo"
          />
          AceBook
        </div>
      </Link>
      <div className="navbar-right">
        <h5>{user && user.username}</h5>
        <Avatar size={60} user={user} />
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
