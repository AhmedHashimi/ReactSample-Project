import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { isLoading } from "../../state/actions/spinner";

import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const validate = Yup.object({
    userName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    Phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });
  const onSubmitHandler = async (value, resetForm) => {
    dispatch(isLoading(true));
    try {
      console.log(value);
      const { userName, password, Phone, email } = value;
      const body = {
        username: userName,
        password,
        email,
        phone: Phone,
      };
      const resp = await axios.post("/signUp", body);
      console.log("signUp", resp);
      dispatch(isLoading(false));

      if (resp?.data?.code === "200") {
        toast.success("Registered Succesfully");
        resetForm();
        navigate("/home");
      }
    } catch (error) {
      console.log(error.response);
      let errors = error.response;
      dispatch(isLoading(false));

      if (error && errors?.status === 422) {
        if (error && errors?.data?.email) {
          toast.error(`${errors?.data?.email[0]}`);
        }
        if (error && errors.data.phone) {
          toast.error(`${errors?.data?.phone[0]}`);
        }
      }
    }
  };
  return (
    <div className="container mt-3">
      <ToastContainer />
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{
              userName: "",
              Phone: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validate}
            onSubmit={(values, { resetForm }) => {
              onSubmitHandler(values, resetForm);
            }}
          >
            {(formik) => (
              <div>
                <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                <Form>
                  <TextField label="Username" name="userName" type="text" />
                  <TextField label="Phone" name="Phone" type="text" />
                  <TextField label="Email" name="email" type="email" />
                  <TextField label="Password" name="password" type="password" />
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />
                  <button
                    className="btn btn-dark mt-3"
                    style={{ backgroundColor: "#009fd8" }}
                    type="submit"
                  >
                    Register
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        <div className="col-md-7 my-auto">
          <img className="img-fluid w-100" src="/img/rocket.png" alt="" />
        </div>
      </div>
    </div>
  );
};
export default Signup;
