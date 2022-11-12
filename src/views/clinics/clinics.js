import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeCount } from "../../state/actions/cartActions";
import { imagesBaseUrl } from "../../util/constants";
import { addClinicToCart } from "./clinicApi";
import swal from "sweetalert";
import { isLoading } from "../../state/actions/spinner";
import { useSelector } from "react-redux";
import axios from "axios";

const Clinics = () => {
  const [clinics, setClinics] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [user, setUser] = useState("");
  const [browserId, setBrowserId] = useState("");
  const [showMore, setshowMore] = useState(false);
  const disptach = useDispatch();
  const selector = useSelector((state) => {
    return state.count;
  });
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let sessionId = sessionStorage.getItem("sessionId");
    getClinics();
    getUpcomingClinics();
    setBrowserId(sessionId);
    setUser(user);
  }, []);
  useEffect(() => {}, [showMore]);

  const getClinics = async () => {
    disptach(isLoading(true));
    axios
      .get("/getclinics")
      .then((res) => {
        console.log(res.data);
        const clinicsArray = res.data;
        const { clinics } = clinicsArray;
        let isMoreClinic = clinics.map((clinic) => {
          return {
            ...clinic,
            isMore: false,
          };
        });
        setClinics(isMoreClinic);
        disptach(isLoading(false));
        console.log(isMoreClinic);
      })
      .catch((error) => {
        console.error(error.response);
        disptach(isLoading(false));
      });
  };
  const getUpcomingClinics = async () => {
    axios
      .get("/getupcomingclinics", {})
      .then((res) => {
        console.log(res.data);
        const clinicsArray = res.data;
        const { upcomingClininc } = clinicsArray;
        setUpcoming(upcomingClininc);
        // console.log(upcomingClininc);
      })
      .catch((error) => {
        console.error(error.response);
      });
  };
  const addToCart = async (id, price) => {
    let body = { clinic_id: id, price: price };
    if (!user) {
      body = {
        browser_id: browserId,
        clinic_id: id,
        price: price,
        // user_id: user?.id ? user?.id : "",
      };
    } else {
      body = {
        // browser_id: user ? "" : browserId,
        clinic_id: id,
        price: price,
        user_id: user?.id ? user?.id : "",
      };
    }
    const resp = await addClinicToCart(body);
    console.log(resp);
    if (resp && resp.data.status === 200) {
      swal("Successful", "Product Has Been Added To Cart", "success");
      // console.log("close", closeModal.current.click())
      let count = resp.data.count;
      disptach(changeCount(count));
    }
    if (resp && resp.data.status === 404) {
      swal("Oops", "Slot is Already Booked", "warning");
      // console.log("close", closeModal.current.click())
    }
  };
  const getShortDescr = (ismore) => {
    ismore = !ismore;
    console.log(ismore);
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="blue_title text-start">Available Clinics</h3>
            <p className="work_sans font-18 mb-md-5 mb-3">
              Clinics are opportunities to engage in larger group settings.
              Still via zoom, we set it up so you are able to engage differently
              with multiple professionals in the sport at once. Sign up
              individually, with a friend, or your whole team! We offer a
              plethora of clinics for you to choose from!
            </p>
          </div>
          <div className="col-md-12">
            <div className="row clinics_list gx-sm-5">
              {clinics?.map((el, i) => {
                return (
                  <div className="col-lg-4 col-md-6 col-sm-6" key={i}>
                    <img
                      src={`${imagesBaseUrl}/clinics/${el.image}`}
                      className="w-100 mb-2"
                      style={{ height: "200px" }}
                      alt=""
                    />
                    <h3 className="work_sans_bold my-4">
                      {el.name || "Clinic - 1"}
                    </h3>
                    <p className="work_sans font-18">
                      {el.isMore
                        ? el.description
                        : `${el.description.substring(0, 25)}`}
                      {el.description.length >= 25 ? (
                        <span
                          style={{ color: "#009fd8", marginLeft: "5px" }}
                          onClick={() => {
                            setshowMore(!showMore);
                            el.isMore = !el.isMore;
                          }}
                        >
                          {el.isMore ? "Show Less..." : "Show More..."}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    <div className="text-center my-4">
                      <button
                        className="blue_btn py-3"
                        onClick={() => {
                          addToCart(el.id, el.price);
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                );
              })}
              {/* <div className="col-lg-4 col-md-6 col-sm-6">
                                <img src="img/clinic_1.png" className="w-100 mb-2" alt="" />
                                <h3 className="work_sans_bold my-4">Clinic - 1</h3>
                                <p className="work_sans font-18">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <img src="img/clinic_2.png" className="w-100 mb-2" alt="" />
                                <h3 className="work_sans_bold my-4">Clinic - 2</h3>
                                <p className="work_sans font-18">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <img src="img/backstroke.png" className="w-100 mb-2" alt="" />
                                <h3 className="work_sans_bold my-4">Clinic - 3</h3>
                                <p className="work_sans font-18">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div> */}
            </div>
          </div>
          <div className="col-md-12 mt-5">
            <hr className="mb-0" />
          </div>
          <div className="col-md-12">
            {upcoming && (
              <h3 className="blue_title text-start">Upcoming Clinics</h3>
            )}
          </div>
          <div className="col-md-12">
            <div className="row clinics_list gx-sm-5">
              {upcoming?.map((item, i) => {
                return (
                  <div key={i} className="col-lg-4 col-md-4 col-sm-6">
                    <img
                      src={`http://appcrates.net/admin_virtuallesson/public/assets/images/clinics/${item.image}`}
                      className="w-100 mb-2"
                      alt=""
                    />
                    <h3 className="work_sans_bold my-4">
                      {item.name || "Clinic - 1"}
                    </h3>
                    <p className="work_sans font-18">
                      {item.description ||
                        `
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clinics;
