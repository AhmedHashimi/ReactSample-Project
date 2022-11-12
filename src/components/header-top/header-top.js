import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../views/login/loginApi";
import cart from "../../assets/cart.png";
import profile_icon from "../../assets/profile_icon.png";
// import globe from "../../assets/globe.png";
import login from "../../assets/login.png";
import { useSelector } from "react-redux";
import { useGoogleLogout } from "react-google-login";

const HeaderTop = (props) => {
  const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
  const navigate = useNavigate();
  const [User, setUser] = useState();
  const onLogoutSuccess = (res) => {
    console.log("logout", res);
  };
  const onFailure = (resp) => {
    console.log(resp);
  };
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });
  const isAuthenticated = isLoggedIn();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    isLoggedIn();
  }, [isAuthenticated]);

  const selector = useSelector((state) => {
    return state.count;
  });
  console.log(selector);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    signOut();
    navigate("/");
    // window.location.reload();
  };
  return (
    <div className="header_top_main">
      <div className="container">
        <div className="row mx-0">
          <div className="col-md-12" style={{ padding: "10px 0px" }}>
            <div className="d-flex justify-content-sm-end justify-content-center">
              {User && User.user_type === "athlete" ? (
                <div className="my_cart d-flex align-items-center ">
                  <div className="position-relative">
                    <img
                      src={profile_icon}
                      style={{ width: "22px", height: "22px" }}
                      alt="dashboard"
                    />
                  </div>
                  <Link to="/account">
                    <p>Dashboard</p>
                  </Link>
                </div>
              ) : (
                ""
              )}
              {/* <div className="my_cart d-flex align-items-center align-items-sm-start">
                <img src={globe} alt="globe" />
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option>English</option>
                  <option>English 2</option>
                </select>
              </div> */}

              <div className="my_cart d-flex align-items-center align-items-sm-start">
                <img src={login} alt="login" />
                {isAuthenticated ? (
                  <Link to="/login" onClick={logout}>
                    <p>Logout</p>
                  </Link>
                ) : (
                  <Link to="/login">
                    <p>Login</p>
                  </Link>
                )}
              </div>
              <div className="my_cart d-flex align-items-center align-items-sm-start">
                <div className="position-relative">
                  <img src={cart} alt="cart" />
                  {selector ? (
                    <span className="position-absolute top-0 start-100 badge rounded-pill cart_pill">
                      {selector || 0}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <Link to="/my-cart">
                  <p>My Cart</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
