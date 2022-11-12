import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoading } from "../../state/actions/spinner";
import { changeCount } from "../../state/actions/cartActions";
import { useSelector } from "react-redux";
import { VideoBaseUrl } from "../../util/constants";
const MediaDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [video, setVideo] = useState({});
  const selector = useSelector((state) => {
    return state.count;
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    getRelatedVideos();
  }, []);
  useEffect(() => {
    console.log(video);
  }, [video]);

  const getRelatedVideos = async () => {
    dispatch(isLoading(true));
    try {
      const resp = await axios.get(`/getvideo/${id}`);
      const relatedVideos = resp?.data?.relatedVideos;
      let video = {};
      relatedVideos.forEach((element) => {
        if (element?.id == id) {
          video = {
            video: element.video,
            title: element.name,
          };
          setVideo(video);
        }
      });
      console.log(relatedVideos);
      console.log(video);
      dispatch(isLoading(false));
      dispatch(changeCount(selector));

      setRelatedVideos(relatedVideos);
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(changeCount(selector));
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row my-5">
          <div className="col-md-7 mb-5">
            <h3 className="font-20 work_sans_bold mb-4">{video.title}</h3>
            <video
              width="100%"
              height="430px"
              className="img-fluid"
              src={`${VideoBaseUrl}/${video?.video}`}
              controls
            ></video>
          </div>
          <div className="col-md-5">
            <h3 className="font-20 work_sans_bold mb-4 skyblue">
              Related Videos
            </h3>
            {relatedVideos?.map((element, i) => {
              return (
                <div key={i} className="card mb-3 border-0">
                  <div className="row g-0">
                    <div
                      className="col-xl-3 col-lg-4 col-md-5 col-sm-3"
                      onClick={() => {
                        console.log("called");
                        setVideo({
                          video: `${element?.video}`,
                          title: element.name,
                        });
                      }}
                    >
                      <video
                        width="100%"
                        height="95px"
                        className="img-fluid"
                        src={`${VideoBaseUrl}/${element?.video}`}
                      ></video>
                      {/* <img
                    src="img/backstroke.png"
                    height="95px"
                    className="img-fluid"
                    alt="..."
                  /> */}
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-7 col-sm-9 ">
                      <div className="card-body px-sm-3 px-0 py-sm-0 py-2">
                        <h5 className="card-title">{element?.name}</h5>
                        <p className="card-text">{element?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;
