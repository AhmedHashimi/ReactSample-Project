/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  getSingleAthlete,
  upDateAthlete,
  addSlot,
  getRelatedSlots,
  getIncome,
} from "./accountApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { imagesBaseUrl } from "../../util/constants";
import Select from "../../components/Select";
import * as Yup from "yup";
import swal from "sweetalert";

let initialValues = {
  rate: "",
  timezone: "",
};
let addSlotInitialValue = {
  dateof: "",
  startTime: "",
  endTime: "",
};
const Account = () => {
  const [value, onChange] = useState(new Date());
  const [image, setImage] = useState();
  const [Athlete, setAthlete] = useState();
  const [Earnings, setEarnings] = useState([]);
  const [uploadImage, setuploadImage] = useState();
  const [initialValue, setinitialValues] = useState(initialValues);
  const [slotForm, setslotForm] = useState(addSlotInitialValue);
  const [slots, setSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);

  const weekDays = [
    { title: "Monday", value: "Monday" },
    { title: "Tuesday", value: "Tuesday" },
    { title: "Wednesday", value: "Wednesday" },
    { title: "Thursday", value: "Thursday" },
    { title: "Friday", value: "Friday" },
    { title: "Saturday", value: "Saturday" },
    { title: "Sunday", value: "Sunday" },
  ];
  let validate = Yup.object({
    dateof: Yup.string().required("Field is required"),
    startTime: Yup.string().required("Field is required"),
    endTime: Yup.string().required("Field is required"),
  });

  useEffect(() => {
    Profile();
    getSlots();
    getEarning();
  }, []);
  useEffect(() => {
    let dayNo = value.getDay();
    let day = myDate(dayNo);
    let filter = [];
    filter = slots.filter((element) => {
      if (element.day === day) {
        return (element["dates"] = value);
      }
    });
    console.log(filter);
    setFilteredSlots(filter);
  }, [initialValue, Athlete, slotForm, slots]);

  useEffect(() => {
    onChangeDate();
  }, [value]);
  const Profile = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    const res = await getSingleAthlete(user?.athlete_id);
    let athlete = res?.data?.athlete;

    setAthlete(athlete);

    initialValues = { rate: athlete?.price, timezone: athlete?.time_zone };
    setinitialValues(initialValues);
  };
  const onImageChange = (e) => {
    let file = e.target.files[0];
    setuploadImage(file);

    let image = URL.createObjectURL(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      let preview = reader.result;
      console.log(String(preview));
    };
    setImage(image);
  };
  const editAthlete = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let formdata = new FormData();
    formdata.append("id", user.athlete_id);
    formdata.append("price", initialValue.rate);
    formdata.append("time_zone", initialValue.timezone);
    formdata.append("image", uploadImage);
    // const body = {
    //   id: user.athlete_id,
    //   price: initialValue.rate,
    //   time_zone: initialValue.timezone,
    //   image:uploadImage ,
    // };
    // eslint-disable-next-line no-unused-vars
    const resp = await upDateAthlete(formdata);
  };
  const addSlots = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let body = {};
    if (slotForm) {
      body = {
        day: slotForm.dateof,
        start_time: slotForm.startTime,
        end_time: slotForm.endTime,
        athlete_id: user.athlete_id,
        athlete_name: user.username,
      };
    }
    const resp = await addSlot(body);
    let status = resp?.data?.status;
    if (status === 200) {
      swal({
        title: "Success!",
        text: "Slot is Added",
        icon: "success",
        button: false,
      });
      getSlots();
    }
    if (status === 404) {
      swal("Oops", `${resp.data.message}`, "warning");
    }
  };
  const getSlots = async () => {
    const resp = await getRelatedSlots();
    let available = resp?.data?.athleteSlots || [];
    console.log('slots',available);
    console.log('slots',resp);
    setSlots(available);
  };
  const getEarning = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let id = user?.athlete_id;
    const resp = await getIncome(id);

    let earning = resp?.data.records || [];
    earning.forEach((element) => {
      element.detail.forEach((item) => {
        item["dateer"] = item.created_at.split("T")[0];
      });
    });
    setEarnings(earning);
  };
  const myDate = (no) => {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    return weekdays[no];
  };
  const onChangeDate = () => {
    let date = new Date(value);
    let dayNo = date.getDay();
    let Day = myDate(dayNo);
    getFilteredSlots({ day: Day, dates: date.toDateString() });
    // GET SELECTED DAY FROM WEEKDAYS ARRAY

    // let index = weekDays.findIndex((element) => element.day === Day);
    // setActiveIndex(index);
  };
  const getFilteredSlots = (days) => {
    let filtered = [];

    const { dates, day } = days;
    console.log("day", day);
    switch (day) {
      case "Monday":
        filtered = slots.filter((element) => {
          if (element.day === "Monday") {
            return (element["dates"] = dates);
          }
        });
        console.log(filtered);
        setFilteredSlots(filtered);
        break;
      case "Tuesday":
        filtered = slots.filter((element) => {
          if (element.day === "Tuesday") {
            return (element["dates"] = dates);
          }
        });
        console.log(filtered);
        setFilteredSlots(filtered);
        break;
      case "Wednesday":
        filtered = slots.filter((element) => {
          if (element.day === "Wednesday") {
            return (element["dates"] = dates);
          }
        });
        console.log(filtered);
        setFilteredSlots(filtered);
        break;
      case "Thursday":
        filtered = slots.filter((element) => {
          if (element.day === "Thursday") {
            return (element["dates"] = dates);
          }
        });
        console.log(filtered);
        setFilteredSlots(filtered);
        break;
      case "Friday":
        filtered = slots.filter((element) => {
          if (element.day === "Friday") {
            return (element["dates"] = dates);
          }
        });
        console.log(filtered);
        setFilteredSlots(filtered);
        break;
      case "Saturday":
        filtered = slots.filter((element) => {
          if (element.day === "Saturday") {
            return (element["dates"] = dates);
          }
        });
        console.log(filtered);
        setFilteredSlots(filtered);
        break;
      case "Sunday":
        filtered = slots.filter((element) => {
          if (element.day === "Sunday") {
            return (element["dates"] = dates);
          }
        });
        console.log(filtered);
        setFilteredSlots(filtered);
        break;
      default:
        return (filtered = slots.filter((element) => {
          if (element.day === "Monday") {
            return element;
          }
        }));
    }
  };
  return (
    <div>
      <div className="container account_main">
        <div className="row">
          <div className="col-md-12 my-4">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active font-18 work_sans"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Account
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link font-18 work_sans"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Earnings
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link font-18 work_sans"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  Schedule
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row">
                  <div className="col-md-4 mt-2">
                    <div className="avatar-upload">
                      <div className="avatar-edit">
                        <input
                          type="file"
                          id="imageUpload"
                          accept="image/*"
                          onChange={(e) => {
                            onImageChange(e);
                          }}
                        />
                        <label htmlFor="imageUpload">
                          <img src="img/image_upload.svg" alt="" />
                        </label>
                      </div>
                      <div className="avatar-preview ">
                        {/* <div
                          id="imagePreview"
                          style={{
                            backgroundImage: 'url("img/imgupload.png")',
                          }}
                        ></div> */}
                        <img
                          id="imagePreview"
                          className="img-circle rounded-circle"
                          style={{ width: "220px", height: "220px" }}
                          src={
                            image ||
                            `${imagesBaseUrl}athletes/${Athlete?.image}`
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 mt-5">
                    <div className="d-flex justify-content-between">
                      <h2 className="font-28 work_sans_bold skyblue mb-0">
                        {Athlete?.name}
                      </h2>
                      <div className="icons">
                        <img
                          className="ms-3"
                          src="img/facebook_icon.svg"
                          alt=""
                        />
                        <img
                          className="ms-3"
                          src="img/twitter_icon.svg"
                          alt=""
                        />
                        <img
                          className="ms-3"
                          src="img/google_icon.svg"
                          alt=""
                        />
                      </div>
                    </div>
                    <p
                      className="font-18 work_sans mb-5"
                      style={{ color: "#8A8A8A" }}
                    >
                      Swimmer & Mentor
                    </p>
                    <h3 className="font-20 work_sans_bold mb-3">
                      Professional Bio
                    </h3>
                    <p className="font-18 work_sans">{Athlete?.description}</p>
                    <h3 className="font-20 work_sans_bold mb-3 mt-4 pt-3">
                      Hourly Rate
                    </h3>
                    <Formik
                      initialValues={initialValues}
                      enableReinitialize={true}
                      // validationSchema={validate}
                      // onSubmit={(values) => onSubmit(values)}
                    >
                      {({ errors, touched, handleChange }) => (
                        <Form>
                          <div className="mt-3">
                            <Field
                              type="text"
                              style={{ width: "280px", height: "52px" }}
                              className="form-control"
                              placeholder="$15 / hr"
                              name="rate"
                              onChange={(e) => {
                                handleChange(e);
                                setinitialValues({
                                  ...initialValue,
                                  rate: e.target.value,
                                });
                              }}
                            />
                            <ErrorMessage
                              component="div"
                              name="email"
                            ></ErrorMessage>
                          </div>
                          <h3 className="font-20 work_sans_bold mb-3 mt-4">
                            Timezone
                          </h3>
                          <div className="mt-3">
                            <Field
                              type="text"
                              style={{ width: "280px", height: "52px" }}
                              className="form-control"
                              placeholder="Timezone"
                              name="timezone"
                              onChange={(e) => {
                                handleChange(e);
                                setinitialValues({
                                  ...initialValue,
                                  timezone: e.target.value,
                                });
                              }}
                            />
                            <ErrorMessage
                              component="div"
                              name="email"
                            ></ErrorMessage>
                          </div>

                          <div className="row mx-0">
                            <div className="cart_btns mt-md-5 mt-3 px-0">
                              <button
                                className="btn btn-primary btn_3 mb-3 me-sm-3"
                                style={{ width: "220px" }}
                                type="submit"
                                onClick={editAthlete}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <h2 className="font-20 work_sans_bold text-center mt-5 mb-4">
                  Current Week
                </h2>
                {Earnings?.map((element, i) => {
                  const { detail } = element;
                  return (
                    <>
                      <h2 key={i} className="font-20 work_sans_bold mb-4">
                        {element?.month}
                      </h2>
                      {detail?.map((item, i) => {
                        return (
                          <div
                            className="d-flex py-3 px-4 justify-content-between"
                            style={{ background: "#F4F4F4" }}
                            key={i}
                          >
                            <p className="font-18 work_sans mb-0">
                              {item?.dateer}
                            </p>
                            <p className="font-18 work_sans mb-0">
                              ${item?.price}
                            </p>
                          </div>
                        );
                      })}
                    </>
                  );
                })}
                
              </div>
              <div
                className="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <div className="row mt-5 gx-sm-5">
                  <div className="col-md-7">
                    <Calendar
                      className="w-100"
                      onChange={onChange}
                      value={value}
                    />
                  </div>
                  <div className="col-md-5">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="font-18 work_sans mb-0">
                        You are suggesting
                      </p>
                      <img
                        data-bs-toggle="modal"
                        data-bs-target="#addscheduleModal"
                        width="30px"
                        src="img/add_schedule.svg"
                        alt=""
                      />
                    </div>
                    <div className="mt-5">
                      {filteredSlots &&
                        filteredSlots.map((item, i) => {
                          return (
                            <div className="schedule p-3 mb-3">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="font-18 work_sans mb-0">
                                  {item.day}
                                </p>
                                {/* <button
                                  type="button"
                                  className="btn-close"
                                ></button> */}
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="font-18 skyblue work_sans mb-0">
                                  {item.start_time}-{item.end_time}
                                </p>
                                {/* <p className="font-18 work_sans mb-0 cancel">
                                  Cancel
                                </p> */}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="addscheduleModal"
        tabIndex="-1"
        aria-labelledby="addscheduleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content px-3">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="addscheduleModalLabel">
                Add Availability
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <Formik
              initialValues={addSlotInitialValue}
              validationSchema={validate}
              onSubmit={(value, { resetForm }) => {
                console.log(value);
                addSlots();
                resetForm({ values: "" });
              }}
            >
              {(formik) => (
                <Form>
                  <div className="modal-body">
                    <p className="font-18 work_sans_bold mt-3 mb-2">Date</p>
                    {/* <input
                      type="date"
                      className="form-control"
                      placeholder=""
                    /> */}
                    <Field
                      as="select"
                      name="dateof"
                      className="form-select"
                      onChange={(e) => {
                        formik.handleChange(e);
                        const name = e.target.name;
                        const value = e.target.value;
                        setslotForm({ ...slotForm, [name]: value });
                      }}
                    >
                      <option value="">Select Day</option>
                      {weekDays?.map((element, i) => {
                        return (
                          <option key={i} value={element.value}>
                            {element.title}
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage component="div" name="dateof"></ErrorMessage>
                    <p className="font-18 work_sans_bold mt-3 mb-2">
                      Start Time
                    </p>
                    {/* <input
                      type="time"
                      className="form-control"
                      placeholder=""
                    /> */}
                    <Select
                      className="form-control form-select"
                      name={"startTime"}
                      onChange={(e) => {
                        formik.handleChange(e);
                        const name = e.target.name;
                        const value = e.target.value;
                        setslotForm({ ...slotForm, [name]: value });
                      }}
                    ></Select>
                    <p className="font-18 work_sans_bold mt-3 mb-2">End Time</p>
                    <Select
                      className="form-control form-select"
                      name={"endTime"}
                      onChange={(e) => {
                        formik.handleChange(e);
                        const name = e.target.name;
                        const value = e.target.value;
                        setslotForm({ ...slotForm, [name]: value });
                      }}
                    ></Select>
                    {/* <input
                      type="time"
                      className="form-control"
                      placeholder=""
                    /> */}
                  </div>
                  <div className="modal-footer justify-content-start border-0">
                    <div className="cart_btns">
                      <button
                        className="btn btn-primary btn_3 mb-3 me-sm-3"
                        style={{ width: "120px", borderRadius: "0px" }}
                        type="submit"
                      >
                        Save
                      </button>

                      <button
                        className="btn btn-primary btn_2 mb-3"
                        data-bs-dismiss="modal"
                        style={{ width: "120px", borderRadius: "0px" }}
                      >
                        Cancel
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
  );
};

export default Account;
