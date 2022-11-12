import React from "react";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "@trendyol-js/react-carousel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLoggedIn } from "../login/loginApi";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { getCategories } from "../browse-category/browseCategoryApi";
import { quickSearch } from "./homeApi";
import RyanMurhphy from "../../assets/RyanMurphy.jpg";
import siobhanhaughey from "../../assets/siobhanhaughey.jpg";
import Ella_Eastin from "../../assets/Ella_Eastin.jpg";
import dustin from "../../assets/dustin.png";
import Select from "../../components/Select.js";
import Sarah from "../../assets/Sarah.jpg";
import PatrickCallan from "../../assets/PatrickCallan.png";
import DestinLasco from "../../assets/DestinLasco.jpg";
import Ken from "../../assets/Ken.jpg";
import banner from "../../assets/banner.png";
import innovativeLesson from "../../assets/innovativeLesson.png";
import talentEngagement from "../../assets/talentEngagement.png";
import questionsBg from "../../assets/questionsBg.png";

// import { Item } from './yourItem';
const Home = () => {
  const [Categories, setCategories] = useState([]);
  const [quickQuery, setQuickQuery] = useState({});
  const [athletes, setAthletes] = useState([]);
  const [athletesId, setAthletesId] = useState("");
  const [isSearch, setisSearch] = useState(true);
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(true);
  const selector = useSelector((state) => {
    console.log(state);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const isAuthenticated = isLoggedIn();
    console.log(isAuthenticated);
    getSelectTypes();
  }, []);

  const getSelectTypes = async () => {
    const resp = await getCategories();
    if (resp) {
      const category = resp?.data.category;
      setCategories(category);
    }
  };

  const initialValues = {
    dateOf: "",
    timeOf: "",
    lessonType: "",
    athletes: "",
  };
  const weekDays = [
    { title: "Monday", value: "Monday" },
    { title: "Tuesday", value: "Tuesday" },
    { title: "Wednesday", value: "Wednesday" },
    { title: "Thursday", value: "Thursday" },
    { title: "Friday", value: "Friday" },
    { title: "Saturday", value: "Saturday" },
    { title: "Sunday", value: "Sunday" },
  ];

  useEffect(() => {
    onChangeHandler();
  }, [quickQuery]);

  const onChangeHandler = async (e) => {
    console.log(quickQuery);
    const resp = await quickSearch(quickQuery);
    const athletes = resp?.data?.quickAthletes;
    if (!!athletes) {
      setAthletes(athletes);
      setIsDisabled(false);
    }
  };
  const selectAthelete = (e) => {
    setAthletesId(e.target.value);
    console.log(athletesId);
    console.log(isSearch);

    if (e.target.value) {
      setisSearch(false);
    }
  };

  const onQuickSearch = () => {
    console.log(athletesId);
    navigate(`/category-detail/${athletesId}`);
  };
  const submitHandler = (values) => {};
  return (
    <div>
      {/******************* 
               Banner Section 
               ******************/}
      <ToastContainer />

      <div
        className="banner_section"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="row mx-0">
            <div className="col-lg-4 col-md-6 ms-auto white">
              <h3>
                Empower Your
                <br />
                Athletic Career
              </h3>
              <p>
                Work with high caliber athletes like never before. We offer
                lessons for all ages & skill level, optimized for you to reach
                your full potential.
              </p>
              <Link to="/browse-category">
                <button className="blue_btn">Start Exploring</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/******************* 
               Search Box section
               ******************/}

      <div className="search_section position-relative">
        <div className="d-flex arrow_main">
          <div className="arrow_back"></div>
          <div className="arrow_container">
            <img src="img/arrow.svg" className="w-100" alt="arrow" />
            <div className="d-flex arrow_text position-absolute">
              <FontAwesomeIcon icon="search" />
              <p>QUICK LESSON SEARCH </p>
            </div>
          </div>
        </div>
        <div className="container">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => submitHandler(values)}
          >
            {(formik) => (
              <Form>
                <div className="row mt-lg-0 mt-5 pt-lg-0 pt-5">
                  <div className="col-lg-2 position-relative"></div>

                  <div className="col-lg-2 mb-3 col-md-6 my-auto">
                    <Field
                      as="select"
                      name="dateof"
                      className="form-select"
                      onChange={(e) => {
                        formik.handleChange(e);
                        const name = e.target.name;
                        const value = e.target.value;
                        setQuickQuery({ ...quickQuery, [name]: value });
                      }}
                    >
                      <option value="" key={100}>
                        Select Day
                      </option>
                      {weekDays?.map((element, i) => {
                        return (
                          <option key={i} value={element.value}>
                            {element.title}
                          </option>
                        );
                      })}
                    </Field>
                    {/* <input
                      type="date"
                      name="dateOf"
                      onChange={async (e) => {
                        formik.handleChange(e);
                        // onChangeHandler(e);
                        const name = e.target.name;
                        const value = e.target.value;
                        setQuickQuery({ ...quickQuery, [name]: value });
                      }}
                      className={"form-control"}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    /> */}
                  </div>
                  <div className="col-lg-2 mb-3 col-md-6 my-auto">
                    {/* <Field
                      type="time"
                      name="timeOf"
                      onChange={async (e) => {
                        formik.handleChange(e);
                        // onChangeHandler(e);
                        const name = e.target.name;
                        let value = e.target.value;

                        setQuickQuery({ ...quickQuery, [name]: value });
                      }}
                      className={"form-control"}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    /> */}
                    <Select
                      name={"timeOf"}
                      onChange={async (e) => {
                        formik.handleChange(e);
                        // onChangeHandler(e);
                        const name = e.target.name;
                        let value = e.target.value;

                        setQuickQuery({ ...quickQuery, [name]: value });
                      }}
                      className={"form-control form-select"}
                    ></Select>
                  </div>
                  <div className="col-lg-2 mb-3 col-md-6 my-auto">
                    <Field
                      as="select"
                      name="lessonType"
                      className="form-select"
                      onChange={(e) => {
                        formik.handleChange(e);
                        const name = e.target.name;
                        const value = e.target.value;
                        setQuickQuery({ ...quickQuery, [name]: value });
                      }}
                    >
                      <option value="default">LESSON TYPE</option>
                      {Categories?.map((element, i) => {
                        return (
                          <option key={i} value={element.id}>
                            {element.name}
                          </option>
                        );
                      })}
                    </Field>
                    {/* <select
                    className="form-select"
                    aria-label="Default select example"
                    name
                  >
                    <option>LESSON TYPE</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select> */}
                  </div>
                  <div className="col-lg-2 mb-3 col-md-6 my-auto">
                    <Field
                      as="select"
                      name="athletes"
                      className="form-select"
                      disabled={isDisabled}
                      onChange={(e) => {
                        formik.handleChange(e);
                        selectAthelete(e);
                      }}
                    >
                      <option value="0">AVAILABLE ATHLETES</option>
                      {athletes?.map((item, i) => {
                        return (
                          <option key={i} value={item?.id}>
                            {item?.name}
                          </option>
                        );
                      })}
                    </Field>
                    {/* <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>AVAILABLE ATHLETES</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select> */}
                  </div>
                  <div className="col-lg-2 mb-3 col-md-12 my-auto">
                    <button
                      className="blue_btn w-100"
                      disabled={isSearch}
                      type="button"
                      onClick={onQuickSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/******************* 
               Innovative Lesson  Section 
               ******************/}
      <div
        className="banner_section Innovative_lesson_section"
        style={{
          backgroundImage: `url(${innovativeLesson})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="container">
          <div className="row mx-0">
            <div className="col-lg-4 col-md-6 white">
              <h3>
                Innovative
                <br />
                lesson design
              </h3>
              <p>
                Our goal is simple. We aim to create the best environment for
                our clients to improve their abilities in the water. All lessons
                and clinics are virtual, take no longer than an hour, and you
                have a ton of options to choose from. Click below to learn more
                about what we have to offer.
              </p>
              <Link to="/lesson-insight">
                <button className="blue_btn">Lesson Info</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/******************* 
               Talent Engagement  Section 
               ******************/}

      <div style={{ padding: "3%" }}></div>
      <div
        className="banner_section"
        style={{
          backgroundImage: `url(${talentEngagement})`,
          backgroundSize: "105% 100%",
        }}
      >
        <div className="container">
          <div className="row mx-0">
            <div className="col-lg-4 col-md-6 ms-auto white">
              <h3>
                Unrivaled Talent
                <br />
                Engagement
              </h3>
              <p>
                Our athletes & coaches will work with you in unconventional ways
                that will enable you to think with a different perspective. We
                have opportunities to work with athletes from all over the world
                and who have competed at almost every level the sport has to
                offer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/******************* 
               Featured Athletes  Section 
               ******************/}

      <div className="future_athlete_main">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="blue_title">Featured Athletes</h3>
            </div>
          </div>
          <div className="row gx-sm-5">
            <div className="col-md-3 text-center">
              <img
                src={RyanMurhphy}
                className="img-fluid h-75 w-100"
                alt="tim"
              />
              <p>Ryan Murphy</p>
            </div>
            <div className="col-md-3 text-center">
              <img
                src={siobhanhaughey}
                className="img-fluid h-75 w-100"
                alt="tim"
              />
              <p>Siobhan Haughey</p>
            </div>
            <div className="col-md-3 text-center">
              <img src={dustin} className="img-fluid h-75 w-100" alt="tim" />
              <p>Destin Lasco</p>
            </div>
            <div className="col-md-3 text-center">
              <img
                src={Ella_Eastin}
                className="img-fluid h-75 w-100"
                alt="tim"
              />
              <p>Ella Eastin</p>
            </div>
          </div>
        </div>
      </div>

      {/******************* 
               have questions  Section 
               ******************/}

      <div style={{ padding: "3%", borderBottom: "2px solid #8080802e" }}></div>
      <div
        className="banner_section questions_section"
        style={{
          backgroundImage: `url(${questionsBg})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="row mx-0">
            <div
              className="col-lg-12 text-center mt-sm-3"
              style={{ padding: "4% 0px 3% 0px" }}
            >
              <p>
                Master your knowledge and understanding of the sport through the
                lens of an elite athlete. Connect with them in ways that will
                fuel your fire for immediate improvement. Click below to view
                some of our frequently asked questions.
              </p>
              <Link to="/faqs">
                <button className="blue_btn">Have Questions?</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "3%" }}></div>

      {/******************* 
               Testimonials  Section 
            ******************/}

      <div className="future_athlete_main carousel_main pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="blue_title">Testimonials</h3>
            </div>
          </div>
          <Carousel
            show={3.5}
            slide={1}
            swipeOn={0}
            infinite={true}
            swiping={true}
            rightArrow={false}
            leftArrow={false}
          >
            <div
              className="col-11 border border-dark text-center p-3"
              style={{ height: "440px" }}
            >
              <img src={PatrickCallan} className="w-100" alt="tim" />
              <p>Patrick Callan</p>
              <span>2021 Olympian</span>
              <p className="testimonial_pera">
                “I wish I had this opportunity earlier in my career to learn
                more about what I can do to improve my technique.”
              </p>
            </div>
            <div
              className="col-11 border border-dark text-center p-3"
              style={{ height: "440px" }}
            >
              <img src={Ken} className="w-100" alt="tim" />
              <p>Ken</p>
              <span>Age group swimmer</span>
              <p className="testimonial_pera">
                “I am really excited to work with high caliber swimmers and
                learn about my swimming from their perspective. I am also
                excited to make new connections with my role models!”
              </p>
            </div>
            <div
              className="col-11 border border-dark text-center p-3"
              style={{ height: "440px" }}
            >
              <img src={DestinLasco} className="w-100" alt="tim" />
              <p>Destin Lasco</p>
              <span>NCAA Swimmer</span>
              <p className="testimonial_pera">
                “What you do outside of the pool dictates what you can do in the
                pool. Equipping yourself with as much knowledge as you can is
                the key to success.”
              </p>
            </div>
            <div
              className="col-11 border border-dark text-center p-3"
              style={{ height: "440px" }}
            >
              <img src={Sarah} className="w-100" alt="tim" />
              <p>Sarah</p>
              <span>Triathlete</span>
              <p className="testimonial_pera">
                “I am very eager to get started working on some lessons to work
                on my open water freestyle technique. I am very grateful for a
                dedicated platform to help my swimming abilities that isn’t
                overpriced.”
              </p>
            </div>
            {/* <div className="col-11 border border-dark text-center p-3">
                <img src="img/test_2.png" className="w-100" alt="tim" />
                <p>Tim Glover</p>
                <span>Director</span>
                <p className="testimonial_pera">
                  "Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s."
                </p>
              </div> */}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;
