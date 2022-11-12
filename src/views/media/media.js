import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoading } from "../../state/actions/spinner";
import { VideoBaseUrl } from "../../util/constants";
import axios from "axios";
import { changeCount } from "../../state/actions/cartActions";
import { useSelector } from "react-redux";
const Media = () => {
  const [mediaVideo, setVideos] = useState(null);
  const [showMore, setshowMore] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector((state) => {
    return state.count;
  });

  const getVideos = async () => {
    dispatch(isLoading(true));

    const accessToken = localStorage.getItem("token");
    axios
      .get("/getmediaVideo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const videosArray = res.data;
        const { mediaVideo } = videosArray;
        let mediaShowMore = mediaVideo.map((media) => {
          return {
            ...media,
            isMore: false,
          };
        });
        setVideos(mediaShowMore);
        dispatch(isLoading(false));
        dispatch(changeCount(selector));

        console.log(mediaShowMore);
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(isLoading(false));
        dispatch(changeCount(selector));
      });
  };
  useEffect(() => {
    getVideos();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="blue_title text-start">Media</h3>
          </div>
          <div className="col-md-12">
            <div className="row clinics_list gx-sm-5">
              {mediaVideo?.map((el, i) => {
                return (
                  <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                    <Link to={`/media-details/${el?.id}`}>
                      <video className="w-100 mb-2">
                        <source
                          src={`${VideoBaseUrl}${el.video}`}
                          type="video/mp4"
                        />
                      </video>
                      {/* <source src={`http://appcrates.net/admin_virtuallesson/public/assets/videos/${el.video}`} type="video/mp4"/> */}
                      {/* <img src={} className="w-100 mb-2" alt="" /> */}
                    </Link>
                    <h3 className="work_sans_bold my-4">{el.name}</h3>
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
                  </div>
                );
              })}
              {/* <div className="col-lg-4 col-md-6 col-sm-6">
                <Link to="/media-details">
                  <img src="img/clinic_1.png" className="w-100 mb-2" alt="" />
                </Link>
                <h3 className="work_sans_bold my-4">Video - 1</h3>
                <p className="work_sans font-18">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <Link to="/media-details">
                  <img src="img/clinic_2.png" className="w-100 mb-2" alt="" />
                </Link>
                <h3 className="work_sans_bold my-4">Video - 2</h3>
                <p className="work_sans font-18">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <Link to="/media-details">
                  <img src="img/backstroke.png" className="w-100 mb-2" alt="" />
                </Link>
                <h3 className="work_sans_bold my-4">Video - 3</h3>
                <p className="work_sans font-18">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <Link to="/media-details">
                  <img src="img/clinic_1.png" className="w-100 mb-2" alt="" />
                </Link>
                <h3 className="work_sans_bold my-4">Video - 1</h3>
                <p className="work_sans font-18">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <Link to="/media-details">
                  <img src="img/clinic_2.png" className="w-100 mb-2" alt="" />
                </Link>
                <h3 className="work_sans_bold my-4">Video - 2</h3>
                <p className="work_sans font-18">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <Link to="/media-details">
                  <img src="img/backstroke.png" className="w-100 mb-2" alt="" />
                </Link>
                <h3 className="work_sans_bold my-4">Video - 3</h3>
                <p className="work_sans font-18">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
