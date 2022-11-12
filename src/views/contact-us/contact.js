import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import swal from "sweetalert";

import * as Yup from "yup";

import axios from "axios";

// import { Item } from './yourItem';
const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const intialValues = {
    first_name: "",
    last_name: "",
    email: "",
    message: "",
    details: "",
  };
  const validate = Yup.object({
    first_name: Yup.string().required("Field is Required"),
    last_name: Yup.string().required("Field is Required"),
    email: Yup.string()
      .email("Email is Not Valid")
      .required("Field is Required"),
    message: Yup.string().required("Field is Required"),
  });
  const contactUs = async (values) => {
    const resp = await axios.post("/contactus", values);
    return resp;
  };
  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <h2 className="skyblue work_sans_bold mb-4">
              Ask how we can help you
            </h2>
            <p className="font-18 wor_sans mt-3">
              Explore lesson insight page & FAQ page for more information
              regarding lessons
            </p>
            <p className="font-18 wor_sans mt-3">
              Explore our interested in working for us page if you think you’d
              be a positive team member
            </p>
            <div className="col-md-12">
              <div className="row mt-5">
                <div className="col-md-6">
                  <h2 className="font-28 skyblue work_sans_bold mb-4">
                    Points of contact
                  </h2>
                  <div className="mb-4">
                    <h6 className="work_sans_bold font-20">Media inquiries</h6>
                    <p className="work_sans font-20">
                      athletesconnected1@gmail.com
                    </p>
                  </div>
                  <div className="mb-4">
                    <h6 className="work_sans_bold font-20">
                      Partnership inquiries
                    </h6>
                    <p className="work_sans font-20">
                      athletesconnected1@gmail.com
                    </p>
                  </div>
                  <div className="mb-4">
                    <h6 className="work_sans_bold font-20">Support</h6>
                    <p className="work_sans font-20">
                      athletesconnected1@gmail.com
                    </p>
                  </div>
                  <div className="mb-4">
                    <h6 className="work_sans_bold font-20">Support Line</h6>
                    <p className="work_sans font-20">443-699-5094</p>
                  </div>
                </div>
                <div className="col-md-6 text-end">
                  <img src="img/contact_img.png" className="w-75" alt="" />
                </div>
                <div className="col-md-12 mt-4">
                  <Formik
                    initialValues={intialValues}
                    validationSchema={validate}
                    onSubmit={async (values, { resetForm }) => {
                      let resp = await contactUs(values);
                      console.log(resp);
                      if (resp.data.status === 200) {
                        swal(
                          "Successful",
                          "Your Message Has Been Sent",
                          "success"
                        );
                        resetForm({ values: "" });
                      }
                    }}
                  >
                    {(errors, touched) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="mb-3">
                              <Field
                                type="text"
                                className={`form-control ${
                                  errors.first_name && touched.first_name
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="FIRST NAME"
                                name="first_name"
                              />
                              <ErrorMessage
                                component="div"
                                name="first_name"
                              ></ErrorMessage>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <Field
                                type="text"
                                className={`form-control ${
                                  errors.last_name && touched.last_name
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="LAST NAME"
                                name="last_name"
                              />
                              <ErrorMessage
                                component="div"
                                name="last_name"
                              ></ErrorMessage>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <Field
                                type="email"
                                className={`form-control ${
                                  errors.email && touched.email
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="EMAIL"
                                name="email"
                              />
                              <ErrorMessage
                                component="div"
                                name="email"
                              ></ErrorMessage>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <Field
                                as="textarea"
                                placeholder="MESSAGE"
                                cols="30"
                                rows="5"
                                name="message"
                                className={`w-100 form-control ${
                                  errors.message && touched.message
                                    ? "is-invalid"
                                    : ""
                                }`}
                              ></Field>
                              <ErrorMessage
                                component="div"
                                name="message"
                              ></ErrorMessage>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <Field
                                as="textarea"
                                placeholder="ADDITIONAL DETAILS"
                                cols="30"
                                rows="5"
                                name="details"
                                className="w-100 form-control"
                              ></Field>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <button className="blue_btn py-3" type="submit">
                              Send Message
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
