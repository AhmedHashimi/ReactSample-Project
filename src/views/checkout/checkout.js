import React, { useState, useEffect } from "react";
import CheckoutForm from "./checkoutForm";
import { stripe } from "../../App";
import { Elements } from "@stripe/react-stripe-js";
import { getCart } from "../cart/cartApi";
import axios, { Axios } from "axios";
import { imagesBaseUrl } from "../../util/constants";
const Checkout = () => {
  const [User, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [sessionId, setSessionId] = useState("");
  const [showObjectives, setshowObjectives] = useState(true);
  const [athlete, setAthlete] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    let sessionID = sessionStorage.getItem("sessionId");

    setSessionId(sessionID);

    if (sessionId || User) {
      getCartElement();
    }
  }, []);
  const getAthlete = async (id) => {
    let athlete_id = id;
    let resp = await axios.get(`/getAthlete/${athlete_id}`);
    let athlete = resp.data.athlete;
    setAthlete(athlete);
    console.log(athlete);
  };
  const getCartElement = async () => {
    let body = { id: User ? User?.id : sessionId };
    let resp = await getCart(body);
    console.log("Resp", resp);
    let cart = resp.data.cartDetails;
    console.log(cart);
    if (cart.length > 1) {
      for (let i = 0; i < cart.length; i++) {
        if (
          cart[0].athlete_id !== cart[i]?.athlete_id ||
          cart[0].athlete_id === null
        ) {
          setshowObjectives(false);
          getAthlete(cart[0].athlete_id);
        } else {
          getAthlete(cart[0].athlete_id);
        }
      }
    } else if (cart[0].athlete_id !== null && cart.length > 0) {
      setshowObjectives(true);
      getAthlete(cart[0].athlete_id);
    }
  };
  return (
    <div>
      <div className="container checkout_main">
        <div className="row mt-5 mb-0 gx-sm-5">
          {User && showObjectives && (
            <>
              <div className="col-lg-6">
                <img
                  src={`${imagesBaseUrl}athletes/${athlete?.image}`}
                  className="w-100"
                  alt=""
                />
              </div>
              <div className="col-lg-6">
                <h2 className="font-28 skyblue work_sans_bold mt-lg-0 mt-4">
                  Athlete
                </h2>
                <h2 className="font-20 work_sans_bold mt-3">{athlete?.name}</h2>
                <h2 className="font-16 work_sans" style={{ color: "#8A8A8A" }}>
                  Swimmer & Mentor
                </h2>
                <p className="font-18 my-5 work_sans">{athlete?.description}</p>
                {/* <h2 className="font-28 skyblue work_sans_bold">Quick Facts</h2>
                <div className="d-flex" style={{ gap: "30px" }}>
                  <img src="img/arrow-right.svg" width="7px" alt="" />
                  <p className="font-18 wor_sans mt-3 ml-3">
                    Lorem Ipsum is simply dummy text of the printing
                  </p>
                </div>
                <div className="d-flex" style={{ gap: "30px" }}>
                  <img src="img/arrow-right.svg" width="7px" alt="" />
                  <p className="font-18 wor_sans mt-3 ml-3">
                    and typesetting industry. Lorem Ipsum has been the
                  </p>
                </div>
                <div className="d-flex" style={{ gap: "30px" }}>
                  <img src="img/arrow-right.svg" width="7px" alt="" />
                  <p className="font-18 wor_sans mt-3 ml-3">
                    industry's standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div className="d-flex" style={{ gap: "30px" }}>
                  <img src="img/arrow-right.svg" width="7px" alt="" />
                  <p className="font-18 wor_sans mt-3 ml-3">
                    when an unknown printer took a galley.
                  </p>
                </div> */}
              </div>
              <div className="col-md-12 mt-sm-5 mt-3 mb-3">
                <h2 className="font-28 skyblue work_sans_bold mb-4">
                  Freestyle
                </h2>
                <textarea
                  style={{ border: "1px solid #707070 !important" }}
                  className="w-100 form-control checkout_textarea"
                  placeholder="Input up to three objectives you’d like to focus on"
                  id=""
                  cols="30"
                  rows="5"
                />
              </div>
            </>
          )}
          <div className="col-md-12 my-4">
            {User && showObjectives && (
              <>
                <p className="font-18 work_sans">
                  Will you be supplying your own video footage for analysis?
                </p>
                <div className="d-flex" style={{ columnGap: "50px" }}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="yes"
                    />
                    <label
                      className="form-check-label ms-sm-4 ms-2"
                      htmlFor="yes"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="no"
                    />
                    <label
                      className="form-check-label ms-sm-4 ms-2"
                      htmlFor="no"
                    >
                      No
                    </label>
                  </div>
                </div>
              </>
            )}
            <div className="col-md-12 mt-sm-5 mt-3 mb-3">
              <h2 className="font-28 skyblue work_sans_bold mb-4">
                Choose your payment method
              </h2>
              {/* <div className="row">
                <div className="col-lg-7 col-md-8">
                  <div className="p-sm-5 p-2" style={{ background: "#F2F2F2" }}>
                    <div
                      className="d-flex"
                      style={{ columnGap: "20px", alignItems: "center" }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          style={{ width: "25px", height: "25px" }}
                          type="radio"
                          name="flexRadioDefault"
                          id="paypal"
                        />
                      </div>
                      <input
                        className="w-50 form-control checkout_input"
                        type="text"
                        placeholder="Enter Paypal"
                      />
                      <img src="img/paypal.svg" className="paypal" alt="" />
                    </div>
                    <p
                      className="font-18 work_sans mt-3 w-65"
                      style={{ color: "#8A8A8A" }}
                    >
                      Safe payment online. Credit card needed. Paypal account is
                      not necessary.
                    </p>
                  </div>
                </div>
              </div> */}
              <div className="row">
                <div className="col-lg-7 col-md-8">
                  <div className="pt-5 pb-sm-5 pb-2 ps-sm-5 ps-2">
                    <div
                      className="d-flex"
                      style={{ columnGap: "20px", alignItems: "center" }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          style={{ width: "25px", height: "25px" }}
                          type="radio"
                          name="flexRadioDefault"
                          id="creditCard"
                        />
                      </div>
                      <h3 className="w-100 font-18 work_sans_bold mb-0">
                        Credit Card
                      </h3>
                      <img
                        src="img/credit_card.svg"
                        className="creditCard"
                        alt=""
                      />
                    </div>
                    <p
                      className="font-18 work_sans mt-3 w-75 mb-4"
                      style={{ color: "#8A8A8A" }}
                    >
                      Safe money transfer using your bank account. Visa,
                      Maestro, discover, American express.
                    </p>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7 col-md-8 ps-sm-5 ps-3">
                  <Elements stripe={stripe}>
                    <CheckoutForm></CheckoutForm>
                  </Elements>
                  {/* checkOUT FORM HEERE LOL */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
