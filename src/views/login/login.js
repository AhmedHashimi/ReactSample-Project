import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLoggedIn } from "../login/loginApi";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { useGoogleLogin } from "react-google-login";
import { socailLogin } from "../login/loginApi";
import { saveCartApi } from "../cart/cartApi";
import { getCart } from "../cart/cartApi";
import { useDispatch } from "react-redux";
import { changeCount } from "../../state/actions/cartActions";
import { useGoogleLogout } from "react-google-login";

import { isLoading } from "../../state/actions/spinner";

const Login = (props) => {
  const { changeUser } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [myCart, setmyCart] = useState([]);
  const dispatch = useDispatch();
  const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
  console.log(clientId);
  const onSuccess = (resp) => {
    console.log(resp.profileObj);
    let res = resp.profileObj;
    googleLogin(res);
  };
  const onLogoutSuccess = (resp) => {
    console.log("Logout Suucess", resp);
  };
  const onFailureLogout = (resp) => {
    console.log("LogoutFailure", resp);
  };
  const onFailure = (e) => {
    console.log(e);
  };
  // GOOGLE LOGIN
  const googleLogin = async (res) => {
    let body = {
      social_token: res.tokenId,
      email: res.email,
      username: `${res.givenName}${res.familyName}`,
    };
    try {
      let response = await socailLogin(body);
      console.log(response);
      if (response) {
        let token = response.data.data.token;
        let user = response.data.data.user;
        setUser(user);
        navigate("/");
        window.location.reload();
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      }
    } catch (error) {
      if (error) {
        signOut();
      }
      console.log(error);
    }
  };
  const onScriptLoadFailure = (e) => {
    console.log(e);
  };
  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    clientId,
    isSignedIn: true,
    onFailure,
    accessType: "offline",
    onScriptLoadFailure,
  });
  // LOGOUT GOOGLE
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailureLogout,
  });
  useEffect(() => {
    const isAuthenticated = isLoggedIn();
    console.log(isAuthenticated);

    if (isAuthenticated) {
      console.log("in");
      navigate("/");
    }
    if (!!user) {
      localStorage.setItem("user", JSON.stringify(user));
      saveCart();
    }
  }, [user]);
  useEffect(() => {
    getNowCart();
  }, []);

  // GET CART
  const getNowCart = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let sessionId = sessionStorage.getItem("sessionId");
    let body = { id: user ? user?.id : sessionId };
    console.log(!!user);

    const resp = await getCart(body);
    console.log("carrt", resp?.data?.cartDetails);
    let mycart = resp?.data?.cartDetails || [];
    setmyCart(mycart);
    if (mycart) {
      let count = mycart.length;
      console.log(count);
      dispatch(changeCount(count));
    }
  };
  // SAVE CART
  const saveCart = async () => {
    let cartId = myCart.map((element) => {
      return element.id;
    });

    let formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("email", user.email);
    for (let i = 0; i < cartId.length; i++) {
      formData.append(`id[${i}]`, cartId[i]);
    }

    let resp = await saveCartApi(formData);
    console.log("saved Cart", resp);
  };

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values) => {
    dispatch(isLoading(true));
    axios
      .post("/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        let loginRes = res.data;
        let token = loginRes.data.token;
        let user = loginRes.data.data;
        setUser(user);
        changeUser(user);
        if (res) {
          dispatch(isLoading(false));
        }
        console.log("user", user);
        localStorage.setItem("token", token);
        toast.success("Logged in Successfully");
        setTimeout(() => {
          navigate("/");
          // window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        let loginError = error.response;
        if (loginError) {
          dispatch(isLoading(false));

          const { data } = loginError;

          toast.error(`${data.message}`);

          console.log(data.message);
        } else if (error) {
          toast.error(`Something Went Wrong`);
          dispatch(isLoading(false));
        }
      });
  };

  return (
    <div>
      <ToastContainer />

      <div className="login_main gg">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="row">
                <div className="col-md-4">
                  <div className="my-5">
                    <h4>Login to</h4>
                    <h1>Athlete Connection</h1>
                  </div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validate}
                    onSubmit={(values) => onSubmit(values)}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="mb-3">
                          {/* <input type="text" className="form-control"name="email" placeholder="Email"/> */}
                          <Field
                            type="text"
                            name="email"
                            className={`form-control ${
                              errors.email && touched.email ? "is-invalid" : ""
                            }`}
                            placeholder="Email"
                            autoComplete="off"
                          />
                          <ErrorMessage
                            component="div"
                            name="email"
                          ></ErrorMessage>
                        </div>
                        <div className="mb-3">
                          {/* <input type="password" className="form-control" name="password" placeholder="Password"/> */}
                          <Field
                            type="password"
                            name="password"
                            className={`form-control ${
                              errors.password && touched.password
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Password"
                            autoComplete="off"
                          />
                          <ErrorMessage
                            component="div"
                            name="password"
                          ></ErrorMessage>
                        </div>
                        <div className="ps-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label">
                              Remember me
                            </label>
                          </div>
                        </div>
                        <Link to="/forgot-password">
                          <small>Forgot Password</small>
                        </Link>
                        <button className="blue_btn w-100 my-4" type="submit">
                          Login
                        </button>
                        <p className="text-center my-3">OR</p>
                        <button className="red_btn w-100 my-4" onClick={signIn}>
                          <img
                            src="img/google.svg"
                            className="google_icon"
                            alt="google"
                          />
                          Login with Google
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-6 d-flex align-item-center justify-content-center">
                  <img
                    src="img/login-img.png"
                    className="my-auto mx-auto w-75"
                    alt="login"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
