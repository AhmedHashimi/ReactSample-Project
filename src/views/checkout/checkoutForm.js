import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeCount } from "../../state/actions/cartActions";
import { isLoading } from "../../state/actions/spinner";

import { Link } from "react-router-dom";
import { getCart } from "../cart/cartApi";
import swal from "sweetalert";
import isEmail from "validator/lib/isEmail";

import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const CheckoutForm = () => {
  const stripeHook = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [myCart, setMyCart] = useState([]);
  const [error, setErrors] = useState({});
  useEffect(() => {
    getMyCart();
  }, []);

  const getMyCart = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let sessionID = sessionStorage.getItem("sessionId");
    let body = { id: user ? user?.id : sessionID };

    const resp = await getCart(body);
    console.log(resp);
    console.log("carrt", resp?.data?.cartDetails);
    let mycart = resp?.data?.cartDetails || [];
    let count = mycart.length;
    dispatch(changeCount(count));
    setMyCart(mycart);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setErrors({ email: "Email is Required" });
    }
    if (email && isEmail(email)) {
      dispatch(isLoading(true));
      const resp = await stripeHook
        .createToken(
          elements.getElement(
            CardNumberElement,
            CardExpiryElement,
            CardCvcElement
          )
        )
        .then((resp) => {
          console.log(resp);
          if (resp.error) {
            swal("Failure", `${resp.error.message}`, "warning");
            dispatch(isLoading(false));
          } else {
            console.log(resp?.token?.id);
            sendToken(resp?.token?.id);
            dispatch(isLoading(false));
          }
        });
    }
  };
  const sendToken = async (token) => {
    let total = localStorage.getItem("total");
    const body = {
      stripeToken: token,
      amount: total,
    };
    try {
      const resp = await axios.post("/stripe", body);
      console.log(resp);
      if (resp && resp.data.code === 200) {
        swal("Successful", "Payment Successful", "success");
        buy(email);
        navigate("/browse-category");
        dispatch(isLoading(false));
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const buy = async (email) => {
    let formData = new FormData();
    let total = localStorage.getItem("total");
    let user = JSON.parse(localStorage.getItem("user"));
    formData.append("total_price", total);
    for (let i = 0; i < myCart.length; i++) {
      formData.append(`id[${i}]`, myCart[i].id);
    }
    if (user) {
      formData.append("user_id", user.id);
    }
    formData.append("email", email);

    try {
      const resp = await axios.post("/buy", formData);
      console.log("Buy Resp", resp);
      getMyCart();
    } catch (error) {
      console.log(error.resp);
    }
  };
  return (
    <>
      <form onSubmit={SubmitHandler}>
        <div className="row ms-sm-0">
          <div className="col-md-12 mt-4">
            <input
              className="form-control checkout_input"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <small style={{ color: "red" }}>{error.email}</small>
            )}
          </div>
          <div className="col-md-12 mt-4">
            <CardNumberElement className="form-control checkout_input"></CardNumberElement>
            {/* <input
                            className="form-control checkout_input"
                            type="text"
                            placeholder="Card Number"
                          /> */}
          </div>
          <div className="col-md-6 mt-4">
            {/* <input
                            className="form-control checkout_input"
                            type="text"
                            placeholder="CVV Code"
                          /> */}
            <CardExpiryElement className="form-control checkout_input"></CardExpiryElement>
          </div>
          <div className="col-md-6 mt-4">
            <CardCvcElement className="form-control checkout_input"></CardCvcElement>
            {/* <input
                            className="form-control checkout_input"
                            type="text"
                            placeholder="Expiry Date"
                          /> */}
          </div>
          <div className="col-md-12 mt-4">
            <input
              className="form-control checkout_input"
              type="text"
              placeholder="Name On Card"
            />
          </div>
        </div>
        <div className="row ms-sm-0">
          <div className="d-flex justify-content-between cart_btns mt-md-5 mt-3">
            <button className="btn btn-primary mb-3" type="submit">
              Pay Now
            </button>

            <Link to="/cart">
              <button className="btn btn-primary btn_2 mb-3 w-100">
                Back to Cart
              </button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
