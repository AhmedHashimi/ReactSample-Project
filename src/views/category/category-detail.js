/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { imagesBaseUrl } from "../../util/constants";
import { VideoBaseUrl } from "../../util/constants";
import { addToCartApi } from "./cartApi";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeCount } from "../../state/actions/cartActions";
import { useParams } from "react-router-dom";

import swal from "sweetalert";
const CategoryDetail = () => {
  const { id } = useParams();

  const selector = useSelector((state) => state.cart);
  const closeModal = useRef(null);
  const dispatch = useDispatch();

  const [athlete, setathlete] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [slots, setSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [user, setUser] = useState("");
  const [modal, setModal] = useState({});
  const [browserId, setBrowserId] = useState("");
  const [weekDays, setWeekDays] = useState([]);
  const [firstDate, setFirstDate] = useState("");
  const [today, setToday] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookedSlots, setBookedSlots] = useState([]);
  // const Ac = bindActionCreators(cartactionCreators, dispatch);
  // const { addToCart, removeFromCart } = Ac;

  const weekDay = [
    { target: "#pills-home1", id: "pills-home-tab5" },
    { target: "#pills-home1", id: "pills-home-tab6" },
    { target: "#pills-home1", id: "pills-home-tab7" },
    { target: "#pills-home1", id: "pills-home-tab1" },
    { target: "#pills-home1", id: "pills-home-tab2" },
    { target: "#pills-home1", id: "pills-home-tab3" },
    { target: "#pills-home1", id: "pills-home-tab4" },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    let today = new Date().toISOString().slice(0, 10);
    // console.log("today", today);
    let user = JSON.parse(localStorage.getItem("user"));
    let sessionId = sessionStorage.getItem("sessionId");
    setBrowserId(sessionId);
    console.log(user);
    setUser(user);
    setToday(today);
    setWeekDays(weekDay);
    getSingleAthlete();
    getAthleteAvailabilty();
    getGetDate();
  }, []);
  useEffect(() => {}, [mainImage, selector, slots, selectedDate]);
  useEffect(() => {}, [slots]);
  // GETWEEKDAY
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
  const getSingleAthlete = async () => {
    try {
      const resp = await axios.get(`/getAthlete/${id}`);
      const response = resp?.data?.athlete;
      response.athleteimages.unshift({ image: response.image });
      console.log(response);
      if (response?.athleteimages[0]) {
        setMainImage(
          `${imagesBaseUrl}athletes/${response?.athleteimages[0].image}`
        );
      }

      setathlete(response);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getAthleteAvailabilty = async (date, Day) => {
    let no = new Date().getDay();
    let day = myDate(no);
    if (date) {
      var stringDate = date.toDateString();
    }
    let today = new Date().toDateString();
    const body = {
      id: id,
      date: stringDate || today,
      day: Day || day,
    };
    try {
      const resp = await axios.post(`/getslots`, body);
      console.log("slots", resp);
      const slots = resp.data.athleteSlots;
      let filteredSlot = slots.map((item) => {
        return {
          ...item,
          date: stringDate || today,
        };
      });
      setSlots(slots);
      setFilteredSlots(filteredSlot);
    } catch (error) {
      console.log(error.response);
    }
  };
  const modalData = (slot) => {
    console.log(slot);
    setModal(slot);
  };
  const addslotsToCart = async () => {
    let body = {};
    if (!user) {
      body = {
        browser_id: browserId,
        slotdetail_id: modal?.id,
        slot_date: modal?.date,
        athlete_id: athlete.id,
        price: athlete.price,
        // user_id: user?.id ? user?.id : "",
      };
    } else {
      body = {
        // browser_id: user ? "" : browserId,
        slotdetail_id: modal?.id,
        slot_date: modal?.date,
        athlete_id: athlete.id,
        price: athlete.price,
        user_id: user?.id ? user?.id : "",
      };
    }
    const resp = await addToCartApi(body);
    console.log(resp);
    if (resp && resp.data.status === 200) {
      swal("Successful", "Product Has Been Added To Cart", "success");
      // console.log("close", closeModal.current.click())
      let count = resp.data.count;
      dispatch(changeCount(count));
    }
    if (resp && resp.data.status === 404) {
      swal("Oops", "Slot is Already Booked", "warning");
      // console.log("close", closeModal.current.click())
    }
  };
  // Setting Dates in  Day Tabs
  const getGetDate = () => {
    // var firstnew = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    let weekArray = [...weekDay];
    let date = new Date();
    // GET NEXT SEVEN DAYS
    weekArray.forEach((element, i) => {
      let nextFiveDay = new Date(
        date.setDate(date.getDate() + 1)
      ).toDateString();
      element["dates"] = nextFiveDay;
    });

    // SET CURRRENT DATE TO GET SLOTS OF PRESENT DATE
    let today = new Date().toDateString();
    setFirstDate(today);
    // ADD TODAYS DATE
    weekArray.unshift({
      title: "Day",
      target: "#pills-home1",
      id: "pills-home-tab5",
      dates: today,
    });
    // REMOVE LAST DAY
    weekArray.pop();
    // ADD DAYS
    weekArray.forEach((element) => {
      const d = new Date(element.dates);
      element["dayNo"] = d.getDay();
      switch (element.dayNo) {
        case 0:
          element["day"] = "Sunday";
          break;
        case 1:
          element["day"] = "Monday";
          break;
        case 2:
          element["day"] = "Tuesday";
          break;
        case 3:
          element["day"] = "Wednesday";
          break;
        case 4:
          element["day"] = "Thursday";
          break;
        case 5:
          element["day"] = "Friday";
          break;
        case 6:
          element["day"] = "Saturday";
          break;
        default:
      }
    });
    console.log("weekArray", weekArray);
    setWeekDays(weekArray);
  };

  const onDateChange = (date) => {
    console.log(date);
    let slotDates = new Date(date);
    let dayNo = slotDates.getDay();
    let Day = myDate(dayNo);

    let index = weekDays.findIndex((element) => element.day === Day);
    console.log("Selected Tab", index);
    setActiveIndex(index);
    getAthleteAvailabilty(slotDates, Day);
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
      <div className="container-lg my-5">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="row mt-3">
              <div className="col-3  smallImgContainer  text-center ">
                {athlete?.athleteimages?.map((element, i) => {
                  return (
                    <img
                      src={`${imagesBaseUrl}athletes/${element?.image}`}
                      key={i}
                      className="mb-3"
                      width="100%"
                      alt=""
                      onClick={() => {
                        setMainImage(
                          `${imagesBaseUrl}athletes/${element?.image}`
                        );
                      }}
                    />
                  );
                })}
              </div>
              <div className="col-8 ">
                <img
                  style={{ display: "inline-block" }}
                  src={mainImage}
                  width="100"
                  height="100%"
                  id="one"
                  className=" w-100  align-self-stretch"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12 ">
            <h3 className="mt-3">{athlete?.name || "Jon Doe"} </h3>
            <p className="Swimmer">Swimmer & Mentore</p>
            <p>{athlete?.description}</p>

            <table className="table w-100">
              <tbody>
                <tr>
                  <td className="training-details w-50">
                    <p>Hometown</p>
                  </td>
                  <td className="w-50">
                    <p>{athlete?.home_town || "Sao Paolo"}</p>
                  </td>
                </tr>
                <tr>
                  <td className="training-details w-50">
                    <p>Best Time</p>
                  </td>
                  <td className="w-50">
                    <p>{athlete?.best_time}</p>
                  </td>
                </tr>
                <tr>
                  <td className="training-details w-50">
                    <p>Current Location</p>
                  </td>
                  <td>
                    <p>
                      {athlete?.training_location || "Swimming Pool"}
                      <i className="fas fa-map-marker-alt text-primary"></i>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td className="training-details w-50">
                    <p>Accolades</p>
                  </td>
                  <td>
                    <p>{athlete?.accolades}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-lg-5 mt-md-4 mt-3">
          <h1 className="Avalibility">Avalibility</h1>

          <div className="availibility mt-md-4 mt-3 mb-3">
            <div className="">
              <ul
                className="nav nav-pills day-schedule  nav-justified"
                id="pills-tab"
                role="tablist"
              >
                {weekDays?.map((day, i) => {
                  return (
                    <li
                      key={i}
                      className="nav-item  leftargin"
                      role="presentation"
                    >
                      <button
                        className={`nav-link ${
                          i === activeIndex ? "active" : ""
                        }`}
                        id={day.id}
                        onClick={() => {
                          setSelectedDate(day.dates);
                          onDateChange(day.dates);
                        }}
                      >
                        {day.day}
                      </button>
                    </li>
                  );
                })}
                <li className="nav-item  leftargin">
                  <input
                    type="date"
                    name="date"
                    onChange={(e) => {
                      let value = e.target.value;
                      setSelectedDate(value);
                      onDateChange(value);
                    }}
                    id="datepicker"
                    min={today}
                  />
                </li>
              </ul>
            </div>
            {/* <div className="">
              <img
                src="img/calender.svg"
                style={{ width: "61px", marginTop: "5px" }}
                alt=""
              />
            </div> */}
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home1"
              role="tabpanel"
              aria-labelledby="pills-home-tab1"
            >
              <div className="row mt-lg-5 mt-md-4 mt-2">
                <div className="col-6 col-md-5 col-12">
                  <video
                    width="100%"
                    height="100%"
                    src={`${VideoBaseUrl}athletes/${athlete.video}`}
                    controls
                  ></video>{" "}
                </div>
                <div className="col-6 col-md-7 col-12">
                  <div className="row text-center">
                    <div className="col-12  ">
                      <ul className=" nav nav-pills  nav-justified">
                        {filteredSlots.length == 0 ? (
                          <div className="text-center">
                            <h1>No Slots Present</h1>
                          </div>
                        ) : (
                          filteredSlots?.map((item, i) => {
                            return (
                              <li
                                key={i}
                                className={`time nav-item ${
                                  item.bookingdetails.length > 0 && "bg-danger"
                                }`}
                                onClick={() => modalData(item)}
                              >
                                <p
                                  className="nav-link"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  {item.start_time}
                                </p>
                              </li>
                            );
                          })
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{ color: "#009FD8" }}
                id="exampleModalLabel"
              >
                Confirm your lesson
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="w-100">
                <thead></thead>
                <tbody>
                  <tr>
                    <td className="bold">Athlete:</td>
                    <td>{athlete?.name}</td>
                  </tr>
                  <tr>
                    <td className="bold">Time:</td>
                    <td>
                      {modal.start_time} -{modal.end_time}
                    </td>
                  </tr>

                  <tr>
                    <td className="bold">On:</td>
                    <td>{modal.date}</td>
                  </tr>
                  <tr>
                    <td className="bold">Type:</td>
                    <td>Freestyle</td>
                  </tr>

                  <tr>
                    <td className="bold">Language:</td>
                    <td>English</td>
                  </tr>
                  <tr>
                    <td className="bold">Length: 60 min</td>
                    <td>60 min</td>
                  </tr>
                  {/* <tr>
                    <td className="bold">Features:</td>
                    <td>Video analysis, Lesson review packet</td>
                  </tr> */}
                </tbody>
              </table>
              {/* <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-light w-100"
                  data-bs-toggle="dropdown"
                >
                  Select Language
                </button>
                <ul className="dropdown-menu w-100">
                  <li>
                    <p className="dropdown-item">Link 1</p>
                  </li>
                  <li>
                    <p className="dropdown-item">Link 2</p>
                  </li>
                  <li>
                    <p className="dropdown-item">Link 3</p>
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                style={{ color: "#009FD8", fontWeight: "700" }}
                data-bs-dismiss="modal"
                ref={closeModal}
              >
                Change Lesson Time{" "}
              </button>

              <button
                type="button"
                onClick={() => addslotsToCart()}
                className="btn btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
