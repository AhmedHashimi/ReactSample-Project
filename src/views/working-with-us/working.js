import React, { useEffect } from "react";
// import { Item } from './yourItem';
const Working = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div
        className="banner_section"
        style={{
          backgroundImage: 'url("img/working.png")',
          backgroundSize: "cover",
          padding: "15% 0px 15% 0px",
        }}
      >
        <div className="container">
          <div className="row mx-0">
            <div className="col-lg-4 col-md-6 ms-auto white">
              <h3>
                Looking to make
                <br />a difference
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <h2 className="skyblue work_sans_bold mb-4">
              Interested in working with us?
            </h2>
            <p className="font-18 wor_sans mt-3">
              Are you a collegiate or professional swimmer who wants to give
              back to their sport? Then you're in the right place! We are
              committed to helping athletes make it as easy as possible to teach
              the lessons, and work with you throughout your school year or your
              professional job.
            </p>
            <h2 className="font-28 skyblue work_sans_bold mt-5 mb-4">
              Contractor perks
            </h2>
            <div className="d-flex" style={{ gap: "30px" }}>
              <img src="img/arrow-right.svg" width="7px" alt="" />
              <p className="font-18 wor_sans mt-3 ml-3">
                Choose your own hours
              </p>
            </div>
            <div className="d-flex" style={{ gap: "30px" }}>
              <img src="img/arrow-right.svg" width="7px" alt="" />
              <p className="font-18 wor_sans mt-3 ml-3">
                Choose the lessons you teach
              </p>
            </div>
            <div className="d-flex" style={{ gap: "30px" }}>
              <img src="img/arrow-right.svg" width="7px" alt="" />
              <p className="font-18 wor_sans mt-3 ml-3">
                Make money in your free time
              </p>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            <p className="font-18 work_sans">
              Please email{" "}
              <span className="font-18 work_sans_bold skyblue">
                johndoe@gmail.com
              </span>{" "}
              for more information!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;
