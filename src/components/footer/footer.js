import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const FooterMain = () => {
  return (
    <div>
      <div
        className="footer_main"
        style={{
          backgroundImage: `url("img/footer-bg.png")`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="footer_main_inner">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="row gx-sm-5">
                  <div className="col-md-7 mb-4">
                    <h3 className="footer_title">About Us</h3>
                    <p className="footer_pera">
                      Athletes Connected provides instruction & consulting for
                      the sport of swimming to improve your knowledge and
                      ability within the sport. We started this to connect the
                      community of swimming through interactive lessons and
                      inspire each other while doing so. We use simple, yet
                      innovative techniques to teach and provide insight into
                      the sport through virtual lessons. Lessons are open to
                      anyone interested in improving their swimming skills, and
                      we are excited to
                    </p>
                    <Link to="/signup">
                      <button className="footer_btn">Sign Up</button>
                    </Link>
                  </div>
                  <div className="col-md-5 mb-4">
                    <h3 className="footer_title">Explore</h3>
                    <ul className="ps-0 footer_menu">
                      <Link to="/browse-category">
                        <li>Categories</li>
                      </Link>
                      <Link to="/clinics">
                        <li>Clinics</li>
                      </Link>
                      <Link to="/media">
                        <li>Media</li>
                      </Link>
                      <Link to="/my-cart">
                        <li>My Cart</li>
                      </Link>
                      <Link to="/sitemap">
                        <li>Sitemap</li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row gx-sm-5">
                  <div className="col-md-6 mb-4">
                    <h3 className="footer_title">Help</h3>
                    <ul className="ps-0 footer_menu">
                      <Link to="/faqs">
                        <li>FAQ's</li>
                      </Link>
                      <Link to="/lesson-insight">
                        <li>Lesson Insight</li>
                      </Link>
                      <Link to="/contact-us">
                        <li>Contact Us</li>
                      </Link>
                      <Link to="/working-with-us">
                        <li>Interested in Working with Us</li>
                      </Link>
                      <li>Store Policies</li>
                      <Link to="/privacy-policy">
                        <li>Privacy Policy</li>
                      </Link>
                    </ul>
                  </div>
                  <div className="col-md-6 mb-4">
                    <h3 className="footer_title">Follow Us On</h3>
                    <div className="d-inline-flex follow_us">
                      {/* <Link to="/">
                        <img src="img/pin.svg" className="w-100" alt="logo" />
                      </Link> */}
                      <a href="https://www.facebook.com/athconnected">
                        <img
                          src="img/facebook.svg"
                          className="w-100"
                          alt="logo"
                        />
                      </a>

                      <a href="https://www.instagram.com/athconnected/">
                        <img src="img/insta.svg" className="w-100" alt="logo" />
                      </a>
                      {/* <Link to="/">
                        <img
                          src="img/twitter.svg"
                          className="w-100"
                          alt="logo"
                        />
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_bottom ">
        <p>© 2022 Athlete Connection All Rights Reserved</p>
        <a href="https://paklogics.com/">
          <p>Developed by: PakLogics</p>
        </a>
      </div>
    </div>
  );
};

export default FooterMain;
