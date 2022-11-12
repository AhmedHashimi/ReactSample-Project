import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { imagesBaseUrl } from "../../util/constants";
import { VideoBaseUrl } from "../../util/constants";
import { useDispatch } from "react-redux";
import { isLoading } from "../../state/actions/spinner";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import { changeCount } from "../../state/actions/cartActions";
import { useSelector } from "react-redux";
import Select from "../../components/Select";
import swal from "sweetalert";
const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [subCategories, setSubCategories] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [weeklyVideos, setweeklyVideos] = useState([]);
  const [timeZones, settimeZones] = useState([]);
  const [timeQuery, settimeQuery] = useState({});
  const [tips, settips] = useState("");
  const [sortFilterQuery, setSortFilterQuery] = useState({
    sort: "sort",
    filter: "filter",
  });
  const selector = useSelector((state) => {
    return state.count;
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    getTimeZones();
    getSubCategories();
    dispatch(changeCount(selector));
    getWeeklyVideo();
  }, []);
  useEffect(() => {
    console.log("sortFilterQuery", sortFilterQuery);
    // if (sortFilterQuery.sort !== "") {
    onchecked();
    // }
  }, [sortFilterQuery]);
  useEffect(() => {
    if (timeQuery) {
      TimeZoneFilter();
    }
  }, [searchQuery, timeQuery]);

  const options = [
    { value: "", option: "Select Time" },
    { value: "12:00 am", option: "12:00 Am " },
    { value: "1:00 am", option: "01:00 Am" },
    { value: "2:00 am", option: "02:00 Am" },
    { value: "3:00 am", option: "03:00 Am" },
    { value: "4:00 am", option: "04:00 Am" },
    { value: "5:00 am", option: "05:00 Am" },
    { value: "6:00 am", option: "06:00 Am" },
    { value: "7:00 am", option: "07:00 Am" },
    { value: "8:00 am", option: "08:00 Am" },
    { value: "9:00 am", option: "09:00 Am" },
    { value: "10:00 am", option: "10:00 Am" },
    { value: "11:00 am", option: "11:00 Am" },
    { value: "12:00 pm", option: "12:00 Pm" },
    { value: "1:00 pm", option: "01:00 Pm" },
    { value: "2:00 pm", option: "02:00 Pm" },
    { value: "3:00 pm", option: "03:00 Pm" },
    { value: "4:00 pm", option: "04:00 Pm" },
    { value: "5:00 pm", option: "05:00 Pm" },
    { value: "6:00 pm", option: "06:00 Pm" },
    { value: "7:00 pm", option: "07:00 Pm" },
    { value: "8:00 pm", option: "08:00 Pm" },
    { value: "9:00 pm", option: "09:00 Pm" },
    { value: "10:00 pm", option: "10:00 Pm" },
    { value: "11:00 pm", option: "11:00 Pm" },
  ];

  const onchecked = async () => {
    const { sort, filter } = sortFilterQuery;
    const body = { [sort]: 1, [filter]: 1, category_id: Number(id) };
    dispatch(isLoading(true));
    try {
      const resp = await axios.post(`/filter`, body);
      let filteredData = resp.data.filteredAthletes || [];

      if (resp?.status) {
        setSubCategories(filteredData);
        dispatch(isLoading(false));
      }
    } catch (error) {
      console.log(error);

      if (error) {
        dispatch(isLoading(false));
      }
    }
  };
  const getSubCategories = async () => {
    dispatch(isLoading(true));
    try {
      const resp = await axios.get(`/getrelatedathletes/${id}`);
      console.log("cateres", resp);
      if (resp) {
        var subCategories = resp?.data?.subcategory;
      }
      console.log("categories", subCategories);
      setSubCategories(subCategories);
      dispatch(isLoading(false));
      dispatch(changeCount(selector));
    } catch (error) {
      console.log(error.response);
      dispatch(isLoading(false));
      dispatch(changeCount(selector));
    }
  };
  const getWeeklyVideo = async () => {
    try {
      const resp = await axios.get(`/getweeklyvideos`);
      // console.log("weeklyVideo", resp?.data?.weeklyVideos[0].video);
      console.log("weeklyVideo", resp);
      const video = resp?.data?.weeklyVideos[0].video;
      const tips = resp?.data?.weeklytips[0]?.description;
      console.log(resp);
      setweeklyVideos(video);
      settips(tips);
    } catch (error) {
      console.log(error.response);
    }
  };
  const SearchAthlete = async (e) => {
    e.preventDefault();
    const body = {
      category_id: id,
      search: searchQuery,
    };
    try {
      const resp = await axios.post("/seachfilter", body);
      console.log(resp.data.athletes);
      let subCategories = resp.data.athletes;
      setSubCategories(subCategories);
      dispatch(changeCount(selector));
    } catch (error) {
      console.log(error.response);
      dispatch(changeCount(selector));
    }
  };
  const getTimeZones = async (e) => {
    try {
      const resp = await axios.get("/gettimezones");
      console.log("TimeZones", resp.data.timezone);
      let timezones = resp.data.timezone;
      timezones.unshift("Time Zone");
      settimeZones(timezones);
    } catch (error) {
      console.log(error.response);
    }
  };
  const TimeZoneFilter = async () => {
    console.log(timeQuery);
    const body = {
      category_id: id,
      timezone: timeQuery.timezone || "",
      from: timeQuery.from || "",
      to: timeQuery.to || "",
    };
    if (!!body.timezone && !!body.from && body.to) {
      const resp = await axios.post("/filtertimezone", body);
      console.log(resp.data.filteredAthletes);
      let filtered = resp.data.filteredAthletes || [];
      filtered?.forEach((element) => {
        if (element.athlete.length !== 0) {
          element.athlete?.forEach((item) => {
            if (item.slotdetails.length !== 0) {
              setSubCategories(filtered);
            }
          });
        } else {
          setSubCategories([]);
        }
      });
      // setSubCategories(filtered);
      if (resp.data.status === 404) {
        swal("Oops", `${resp.data.message}`, "warning");
      }
    }
  };
  return (
    <div>
      <div className="container category_main">
        <div className="row mt-5 ">
          <div className=" col-lg-3 col-md-12 col-sm-12  p-lg-5 p-md-3 p-1">
            <form
              className="example"
              onSubmit={(e) => {
                SearchAthlete(e);
              }}
            >
              <input
                type="text"
                placeholder="Search.."
                className="searchBox"
                name="search"
                onChange={(e) => setsearchQuery(e.target.value)}
              />
            </form>
            <h5 className="heading mt-lg-4 mb-lg-4 mt-md-3 mb-md-3 mt-2 mb-2 ">
              SORT BY
            </h5>

            <form>
              <div className="form-check mt-lg-3 mb-lg-3 mt-2 mb-2">
                <input
                  type="radio"
                  className="form-check-input "
                  id="radio1"
                  name="sort"
                  value="lth"
                  onChange={(e) => {
                    const value = e.target.value;
                    const name = e.target.name;
                    setSortFilterQuery({ ...sortFilterQuery, [name]: value });
                  }}
                />
                <label className="form-check-label " htmlFor="radio1">
                  {" "}
                  Price low to high
                </label>
              </div>
              <div className="form-check mt-lg-3 mb-lg-3 mt-2 mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  id="radio2"
                  name="sort"
                  value="htl"
                  onChange={(e) => {
                    const value = e.target.value;
                    const name = e.target.name;
                    setSortFilterQuery({ ...sortFilterQuery, [name]: value });
                  }}
                />
                <label className="form-check-label" htmlFor="radio2">
                  {" "}
                  Price high to low
                </label>
              </div>
              <div className="form-check mt-lg-3 mb-lg-3 mt-2 mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  id="radio2"
                  name="sort"
                  value="athlete"
                  onChange={(e) => {
                    const value = e.target.value;
                    const name = e.target.name;
                    setSortFilterQuery({ ...sortFilterQuery, [name]: value });
                  }}
                />
                <label className="form-check-label" htmlFor="radio2">
                  {" "}
                  Athlete A-Z
                </label>
              </div>
              <div className="form-check mt-lg-3 mb-lg-3 mt-2 mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  id="radio2"
                  name="sort"
                  value="favourite"
                  onChange={(e) => {
                    const value = e.target.value;
                    const name = e.target.name;
                    setSortFilterQuery({ ...sortFilterQuery, [name]: value });
                  }}
                />
                <label className="form-check-label" htmlFor="radio2">
                  {" "}
                  Most Popular
                </label>
              </div>
              <div className="form-check mt-lg-3 mb-lg-3 mt-2 mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  id="radio2"
                  name="sort"
                  value="age"
                  onChange={(e) => {
                    const value = e.target.value;
                    const name = e.target.name;
                    setSortFilterQuery({ ...sortFilterQuery, [name]: value });
                  }}
                />
                <label className="form-check-label" htmlFor="radio2">
                  {" "}
                  Age
                </label>
              </div>
            </form>

            <h5 className="heading mt-lg-4 mb-lg-4 ">SEARCH BY PREFERENCES</h5>

            <form>
              <div className="form-check mt-lg-3 mb-lg-3 mt-2 mb-2">
                <input
                  type="radio"
                  className="form-check-input "
                  id="radio1"
                  name="filter"
                  value="male"
                  onChange={(e) => {
                    const value = e.target.value;
                    const name = e.target.name;
                    setSortFilterQuery({ ...sortFilterQuery, [name]: value });
                  }}
                />
                <label className="form-check-label " htmlFor="radio1">
                  {" "}
                  Male
                </label>
              </div>
              <div className="form-check mt-lg-3 mb-lg-3 mt-2 mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  id="radio2"
                  name="filter"
                  value="female"
                  onChange={(e) => {
                    const value = e.target.value;
                    const name = e.target.name;
                    setSortFilterQuery({ ...sortFilterQuery, [name]: value });
                  }}
                />
                <label className="form-check-label" htmlFor="radio2">
                  {" "}
                  Female
                </label>
              </div>
            </form>

            <h5 className="heading mt-lg-4 mb-lg-4 ">TIME ZONE</h5>

            <div className="dropdown">
              {/* <button
                type="button"
                className="heading btn btn-light dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Time Zone
              </button> */}
              <select
                className=" btn btn-light w-100"
                name="timezone"
                onChange={(e) => {
                  const value = e.target.value;
                  const name = e.target.name;
                  settimeQuery({ ...timeQuery, [name]: value });
                }}
              >
                {timeZones.map((item, i) => {
                  return (
                    <option key={i} value={item} className="dropdown-item">
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <Formik initialValues={{ to: "", from: "" }}>
              {(formik) => (
                <Form>
                  <div className="row mt-lg-3 mt-md-3 mt-2">
                    <div className="col-lg-6 col-12">
                      <h5 className="heading mt-lg-4 mb-lg-4 ">From</h5>
                      <Field
                        as="select"
                        className="form-control From-to"
                        name={"from"}
                        onChange={(e) => {
                          formik.handleChange(e);
                          const value = e.target.value;
                          const name = e.target.name;
                          console.log("kjdsoisj", value.split(" ")[1]);
                          settimeQuery({ ...timeQuery, [name]: value });
                        }}
                      >
                        {options.map((item, i) => {
                          return (
                            <option key={i} value={item.value}>
                              {item.option}
                            </option>
                          );
                        })}
                      </Field>
                      {/* <input className="form-control From-to" type="text" /> */}
                    </div>
                    <div className="col-lg-6 col-12">
                      <h5 className="heading mt-lg-4 mb-lg-4 ">To</h5>
                      <Field
                        className="form-control From-to"
                        name="to"
                        as="select"
                        onChange={(e) => {
                          formik.handleChange(e);
                          const value = e.target.value;
                          const name = e.target.name;
                          settimeQuery({ ...timeQuery, [name]: value });
                        }}
                      >
                        {options.map((item, i) => {
                          return (
                            <option key={i} value={item.value}>
                              {item.option}
                            </option>
                          );
                        })}
                      </Field>
                      {/* <input className="form-control From-to" type="text" /> */}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className=" col-9 p-lg-5 p-md-3 p-3">
            {subCategories?.length !== 0 ? (
              subCategories?.map((element, i) => {
                const { athlete } = element;
                return (
                  <div key={i}>
                    {athlete.length !== 0 ? (
                      <h5 className="Heading2 mt-2">{element.name}</h5>
                    ) : (
                      ""
                    )}
                    <div className="row text-center mt-lg-5 mt-md-3 mt-2">
                      {athlete.length !== 0
                        ? athlete?.map((item, i) => {
                            return (
                              <div
                                key={i}
                                className="col-lg-4 col-md-6 col-sm-12"
                              >
                                <Link to={`/category-detail/${item.id}`}>
                                  <figure className="figure">
                                    <img
                                      src={`${imagesBaseUrl}athletes/${item?.image}`}
                                      className="figure-img img-fluid rounded"
                                      style={{
                                        height: "199px",
                                        width: "252px",
                                      }}
                                      alt="..."
                                    />
                                    <figcaption className="figure-caption text-center font-18 work_sans_bold">
                                      {item?.name}
                                    </figcaption>
                                  </figure>
                                </Link>
                              </div>
                            );
                          })
                        : // <h1>No Atheletes Found</h1>
                          ""}
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No Atheletes Found</h1>
            )}
            {/* <div>
              <h5 className="Heading2 mt-2">Distance Freestyle</h5>
              <div className="row text-center mt-lg-5 mt-md-3 mt-2">
                <div className="col-lg-4 col-md-6 col-6">
                  <Link to="/category-detail">
                    <figure className="figure">
                      <img
                        src="/img/breaststroke-1.png"
                        className="figure-img img-fluid rounded"
                        alt="..."
                      />
                      <figcaption className="figure-caption text-center font-18 work_sans_bold">
                        Brakestroke
                      </figcaption>
                    </figure>
                  </Link>
                </div>

                <div className="col-lg-4 col-md-6 col-6">
                  <Link to="/category-detail">
                    <figure className="figure">
                      <img
                        src="/img/breaststroke-1.png"
                        className="figure-img img-fluid rounded"
                        alt="..."
                      />
                      <figcaption className="figure-caption text-center font-18 work_sans_bold">
                        Brakestroke
                      </figcaption>
                    </figure>
                  </Link>
                </div>

                <div className="col-lg-4 col-md-6 col-6">
                  <figure className="figure">
                    <img
                      src="/img/breaststroke-1.png"
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                    <figcaption className="figure-caption text-center font-18 work_sans_bold">
                      Brakestroke
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
            <br />
            <div className="mt-lg-3 mt-md-2 mt-2 mb-lg-5 mb-3">
              <h5 className="Heading2 mt-2">Sprint Freestyle</h5>
              <div className="row text-center mt-lg-5 mt-md-3 mt-2">
                <div className="col-lg-4 col-md-6 col-6">
                  <figure className="figure">
                    <img
                      src="/img/breaststroke-1.png"
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                    <figcaption className="figure-caption text-center font-18 work_sans_bold">
                      Brakestroke
                    </figcaption>
                  </figure>
                </div>

                <div className="col-lg-4 col-md-6 col-6">
                  <figure className="figure">
                    <img
                      src="/img/breaststroke-1.png"
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                    <figcaption className="figure-caption text-center font-18 work_sans_bold">
                      Brakestroke
                    </figcaption>
                  </figure>
                </div>

                <div className="col-lg-4 col-md-6 col-6">
                  <figure className="figure">
                    <img
                      src="/img/breaststroke-1.png"
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                    <figcaption className="figure-caption text-center font-18 work_sans_bold">
                      Brakestroke
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div> */}
            <hr />
            <div className="row">
              <div className="col-lg-6 col-12 p-lg-4 p-2">
                <h5 className="Heading2 mt-0">Tip of the week</h5>
                <p className="tips mt-lg-2">
                  {tips}
                  {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolores, amet voluptatibus tempore cumque iusto quos ea
                  obcaecati aperiam officia in commodi corporis? Facere optio
                  provident nobis quam atque temporibus voluptates. */}
                </p>
              </div>
              <div className="col-lg-6 col-12 p-lg-4 p-2">
                <h5 className="Heading2 mt-0">Video of the week</h5>
                <video
                  width="100%"
                  height="100%"
                  src={`${VideoBaseUrl}${weeklyVideos}`}
                  controls
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
