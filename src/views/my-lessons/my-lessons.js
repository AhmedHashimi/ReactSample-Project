import React, { useEffect, useState } from "react";
import { imagesBaseUrl } from "../../util/constants";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const MyLessons = () => {
  const [myLesson, setmyLesson] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    getMyLesson(user.id);
  }, []);
  // GET MY LESSON
  const getMyLesson = async (userId) => {
    const resp = await axios.get(`/getmylesson/${userId}`);
    console.log("lesson", resp);
    let lessons = resp?.data?.orderDetails;
    setmyLesson(lessons);
    console.log("GETMYLESSON", lessons);
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="blue_title text-start">My Lessons</h3>
          </div>
          <div className="col-md-12">
            <div className="row mb-md-5 mb-3 pb-md-4 pb-0 gx-sm-5">
              {myLesson?.map((element, i) => {
                const { bookingdetails } = element;
                return (
                  bookingdetails[0].athlete ? 
                  <>
                  <div
                    className="col-md-3 mb-3 text-center"
                    onClick={() => {
                      navigate(
                        `/category-detail/${bookingdetails[0]?.athlete.id}`
                      );
                    }}
                    key={i}
                  >
                    <img
                      src={`${imagesBaseUrl}athletes/${bookingdetails[0]?.athlete?.image}`}
                      className="w-100"
                      alt=""
                    />
                    <p className="work_sans_bold font-18 text-center my-4">
                      {bookingdetails[0]?.athlete?.name}
                    </p>
                  </div>
                  </>:""
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLessons;
