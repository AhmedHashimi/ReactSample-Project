import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Sitemap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="blue_title text-start">Site Map</h3>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <h3 className="subtitle">Home</h3>
                <ul className="sitemap_ul">
                  <Link to="#">
                    <li>Home</li>
                  </Link>
                  <Link to="#">
                    <li>Browse Categories</li>
                  </Link>
                  <Link to="#">
                    <li>Clinics</li>
                  </Link>
                  <Link to="#">
                    <li>My Lessons</li>
                  </Link>
                  <Link to="#">
                    <li>Media Section</li>
                  </Link>
                </ul>
              </div>
              <div className="col-md-4">
                <h3 className="subtitle">Explore</h3>
                <ul className="sitemap_ul">
                  <Link to="#">
                    <li>Categories</li>
                  </Link>
                  <Link to="#">
                    <li>Clinics</li>
                  </Link>
                  <Link to="#">
                    <li>Media</li>
                  </Link>
                  <Link to="#">
                    <li>My Cart</li>
                  </Link>
                  <Link to="#">
                    <li>Sitemap</li>
                  </Link>
                </ul>
              </div>
              <div className="col-md-4">
                <h3 className="subtitle">Explore</h3>
                <ul className="sitemap_ul">
                  <Link to="#">
                    <li>FAQ's</li>
                  </Link>
                  <Link to="#">
                    <li>Lesson Insight</li>
                  </Link>
                  <Link to="#">
                    <li>Contact Us</li>
                  </Link>
                  <Link to="#">
                    <li>Interested in Working with Us</li>
                  </Link>
                  <Link to="#">
                    <li>Store Policies</li>
                  </Link>
                  <Link to="#">
                    <li>Privacy Policy</li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
