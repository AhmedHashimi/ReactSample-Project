/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { getCart, deleteCart, saveCartApi } from "./cartApi";
import { useNavigate } from "react-router-dom";
import { imagesBaseUrl } from "../../util/constants";
import { useDispatch } from "react-redux";
import { changeCount } from "../../state/actions/cartActions";
import { isLoading } from "../../state/actions/spinner";
import { useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [myCart, setCart] = useState([]);
  const [total, setTotal] = useState([]);
  const navigate = useNavigate();
  const selector = useSelector((state) => {
    return state.count;
  });
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let sessionID = sessionStorage.getItem("sessionId");
    console.log(sessionID);
    window.scrollTo(0, 0);
    setSessionId(sessionID);
    setUser(user);
    if (sessionId || user) {
      getNowCart();
    }
    getTotal();
  }, [sessionId]);
  useEffect(() => {
    getTotal();
  }, [myCart, user]);
  const getNowCart = async () => {
    let body = { id: user ? user?.id : sessionId };
    console.log(!!user);
    dispatch(isLoading(true));
    // if (!!user) {
    //   console.log("in");
    //   body = { id: sessionId };
    // } else {
    //   body = { id: user?.id };
    // }
    try {
      const resp = await getCart(body);
      console.log(resp);
      console.log("carrt", resp?.data?.cartDetails);

      let myCart = resp?.data?.cartDetails || [];
      let count = myCart.length;
      dispatch(isLoading(false));
      dispatch(changeCount(count));
      setCart(myCart);
    } catch (error) {
      dispatch(isLoading(false));
      dispatch(changeCount(selector));
    }
  };
  const deleteItem = async (id) => {
    const resp = await deleteCart(id);
    if (resp?.data?.status === 200) {
      getNowCart();
    }
    console.log(resp);
  };

  const getTotal = () => {
    console.log(myCart);
    if (myCart) {
      let total = myCart.reduce(function (accumulator, currentValue) {
        console.log(currentValue);
        return accumulator + Number(currentValue?.price);
      }, 0);

      console.log(total);
      localStorage.setItem("total", total);
      setTotal(total);
    }
  };

  const saveCart = async () => {
    if (!user) {
      swal({
        title: "Login To Save Cart?",
        text: "Click ok To  Login",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          navigate("/login");
        } else {
        }
      });
    } else {
      let cartId = myCart.map((element) => {
        return element.id;
      });

      let formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("email", user.email);
      for (let i = 0; i < cartId.length; i++) {
        formData.append(`id[${i}]`, cartId[i]);
      }

      const resp = await saveCartApi(formData);
      let status = resp.data.status;
      if (status === 200) {
        swal({
          title: "Success!",
          text: "Your Cart is Saved!",
          icon: "success",
          button: false,
        });
      }
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          {/* <div className="col-md-12">
            <h3 className="blue_title text-start">My lessons</h3>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="mylessons_list_main">
                <div className="mylessons_list">
                  <img src="img/backstroke.png" className="w-100" alt="" />
                  <h3>Sprint Freestyle</h3>
                  <p>John Doe</p>
                  <span>10 Nov, 2021</span>
                </div>
                <div className="mylessons_list">
                  <img src="img/backstroke.png" className="w-100" alt="" />
                  <h3>Sprint Freestyle</h3>
                  <p>John Doe</p>
                  <span>10 Nov, 2021</span>
                </div>
                <div className="mylessons_list">
                  <img src="img/backstroke.png" className="w-100" alt="" />
                  <h3>Sprint Freestyle</h3>
                  <p>John Doe</p>
                  <span>10 Nov, 2021</span>
                </div>
                <div className="mylessons_list">
                  <img src="img/backstroke.png" className="w-100" alt="" />
                  <h3>Sprint Freestyle</h3>
                  <p>John Doe</p>
                  <span>10 Nov, 2021</span>
                </div>
                <div className="mylessons_list">
                  <img src="img/backstroke.png" className="w-100" alt="" />
                  <h3>Sprint Freestyle</h3>
                  <p>John Doe</p>
                  <span>10 Nov, 2021</span>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-md-12">
            <h3 className="blue_title text-start">My Cart</h3>
          </div>
          <div className="col-md-12">
            <table className="table table-borderless mycart_table">
              <tbody>
                <tr>
                  <th>Lesson</th>
                  <th style={{ width: "33%" }}>Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
                {myCart &&
                  myCart.map((el, i) => {
                    return (
                      <tr key={i}>
                        <td className="d-flex">
                          <img
                            src={
                              el?.athlete?.image
                                ? `${imagesBaseUrl}athletes/${el.athlete.image}`
                                : `${imagesBaseUrl}clinics/${el.clinic.image}`
                            }
                            width="100px"
                            alt=""
                          />
                          <h4>{el?.athlete?.name || el?.clinic?.name}</h4>
                        </td>
                        <td>${el?.athlete?.price || el?.clinic?.price}</td>
                        <td>${el?.athlete?.price || el?.clinic?.price}</td>
                        <td>
                          <img
                            src="img/delete.svg"
                            className="delete"
                            width="50px"
                            height="50px"
                            alt=""
                            onClick={() => deleteItem(el.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                {/* <tr>
                  <td className="d-flex">
                    <img src="img/2.png" width="100px" alt="" />
                    <h4>Freestyle</h4>
                  </td>
                  <td>$99.99</td>
                  <td>$100</td>
                  <td>
                    <img
                      src="img/delete.svg"
                      className="delete"
                      width="50px"
                      height="50px"
                      alt=""
                    />
                  </td>
                </tr> */}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td>Total</td>
                  <td>${total || "0"}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          {myCart.length != 0 ? (
            <div className="col-md-12 text-end cart_btns my-md-5 my-3">
              <button className="btn btn-primary btn_1 mb-3" onClick={saveCart}>
                Save Cart
              </button>
              {user && (
                <Link to="/checkout">
                  <button className="btn btn-primary ms-3 btn_2 mb-3">
                    Checkout
                  </button>
                </Link>
              )}
              {!user && (
                <>
                  <Link to="/checkout">
                    <button className="btn btn-primary ms-3 btn_2 mb-3">
                      Checkout as Guest
                    </button>
                  </Link>

                  <Link to="/login">
                    <button className="btn btn-primary ms-3 btn_3 mb-3">
                      Checkout with Gmail
                    </button>
                  </Link>
                </>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
