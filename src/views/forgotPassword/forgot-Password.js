import React from "react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const [isValid, setisValid] = useState({ validity: true, message: "" });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (Email === "") {
      setisValid({ validity: false, message: "Email Required" });
      return;
    }
    try {
      const body = {
        email: Email,
      };
      if (isValid.validity === true) {
        const resp = await axios.post("/forgotpassword", body);
        console.log(resp);
        if (resp.status === 200) {
          swal({
            title: "Success!",
            text: "Password Sent to your Mail",
            icon: "success",
            button: false,
          });
          setEmail("");
        }
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 404) {
        swal({
          title: "Oops!",
          text: "Email Does Not Exist",
          icon: "error",
          button: false,
        });
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <h3>
                    <i className="fa fa-lock fa-4x"></i>
                  </h3>
                  <h2 className="text-center ">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  <div className="panel-body">
                    <form
                      className="form"
                      onSubmit={(e) => {
                        onSubmitHandler(e);
                      }}
                    >
                      <fieldset className="border p-5 shadow-sm">
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="glyphicon glyphicon-envelope color-blue"></i>
                            </span>

                            <input
                              id="emailInput"
                              placeholder="Email address"
                              className="form-control"
                              type="email"
                              name="name"
                              value={Email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (
                                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                                    Email
                                  )
                                ) {
                                  setisValid({ validity: true, message: "" });
                                } else {
                                  setisValid({
                                    validity: false,
                                    message: "Invalid Email",
                                  });
                                  return false;
                                }
                              }}
                            />
                          </div>
                          <span>
                            {isValid.validity === false ? isValid.message : ""}
                          </span>
                        </div>
                        <div
                          className="form-group text-center"
                          style={{ marginTop: "32px" }}
                        >
                          <input
                            className="btn  btn-primary btn-block rounded"
                            style={{ border: "none" }}
                            value="Send My Password"
                            type="submit"
                          />
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
