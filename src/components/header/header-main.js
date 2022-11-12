import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/TopHeader.css";
// import logo from "../../assets/logo.svg";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { isLoggedIn } from "../../views/login/loginApi";
import { searchApi } from "./headerApi";

import AClogo from "../../assets/AClogo.png";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
const HeaderMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  useEffect(() => {}, [query]);

  const Ac = bindActionCreators(actionCreators, dispatch);
  const { searchQuery } = Ac;
  const isAuthenticated = isLoggedIn();
  const search = async (data) => {
    const resp = await searchApi(data);
    const state = resp?.data;
    if (resp) {
      searchQuery(state);
      navigate("/search-result");
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("called");
    search(query);
  };
  return (
    <div className="header_main">
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{ padding: "10px 0px" }}>
            <nav className="navbar navbar-expand-xl navbar-light">
              <div className="container-fluid pe-sm-0">
                <a className="navbar-brand" href="/">
                  <img src={AClogo} style={{ width: "60px" }} alt="logo" />
                </a>
                <div className="seperator"></div>
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
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
                    <li className="nav-item">
                      <NavLink
                        className={`nav-link ${({ isActive }) =>
                          isActive ? "active" : ""}`}
                        to="/"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className={`nav-link ${({ isActive }) =>
                          isActive ? "active" : ""}`}
                        to="/browse-category"
                      >
                        Browse Categories
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className={`nav-link ${({ isActive }) =>
                          isActive ? "active" : ""}`}
                        to="/clinics"
                      >
                        Clinics
                      </NavLink>
                    </li>
                    {isAuthenticated && (
                      <li className="nav-item">
                        <NavLink
                          className={`nav-link ${({ isActive }) =>
                            isActive ? "active" : ""}`}
                          to="/my-lessons"
                        >
                          My Lessons
                        </NavLink>
                      </li>
                    )}
                    <li className="nav-item">
                      <NavLink
                        className={`nav-link ${({ isActive }) =>
                          isActive ? "active" : ""}`}
                        to="/media"
                      >
                        Media Section
                      </NavLink>
                    </li>
                  </ul>
                  <form
                    className="d-flex mt-3"
                    onSubmit={(e) => onSubmitHandler(e)}
                  >
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text search_icon"
                        id="basic-addon1"
                      >
                        <FontAwesomeIcon icon="search" />
                      </span>
                      <input
                        type="text"
                        className="form-control header_search_input"
                        onChange={(e) => {
                          setQuery(e.target.value);
                        }}
                        style={{
                          paddingLeft: "0px",
                          borderColor: "black",
                          borderRadius: "0px",
                        }}
                        placeholder="Search"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
