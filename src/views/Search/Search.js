import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { imagesBaseUrl } from "../../util/constants";
import { useDispatch } from "react-redux";
import { isLoading } from "../../state/actions/spinner";

const Search = () => {
  //   const {searchResult} = useSelector(state);
  const searchResult = useSelector((state) => state.searchResult);
  const dispatch = useDispatch();
  console.log("checkn state==>", searchResult);
  const { categories, athletes, media } = searchResult;

  return (
    <>
      <div className="container category_main">
        <div className="row mt-5 ">
          {!categories && !athletes && !media && (
            <div style={{ height: "100px" }} className="text-center">
              <h1 style={{ color: "#009fd8" }}>No Data Found....</h1>
            </div>
          )}
          {categories?.length !== 0 && (
            <div className=" col-12 p-lg-5 p-md-3 p-3">
              <div>
                <h5 className="Heading2 mt-2">Categories</h5>
                <div className="row text-center mt-lg-5 mt-md-3 mt-2">
                  {categories &&
                    categories?.map((element, i) => {
                      return (
                        <div key={i} className="col-lg-4 col-md-6 col-6">
                          <Link to={`/category/${element?.id}`}>
                            <figure className="figure">
                              <img
                                src={`${imagesBaseUrl}categories/${element.image}`}
                                className="figure-img img-fluid rounded"
                                style={{ height: "200px" }}
                                alt="..."
                              />
                              <figcaption className="figure-caption text-center font-18 work_sans_bold">
                                {element?.name}
                              </figcaption>
                            </figure>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>

              <hr />
            </div>
          )}
          {athletes?.length !== 0 && (
            <div className=" col-12 p-lg-5 p-md-3 p-3">
              <div>
                <h5 className="Heading2 mt-2">Athletes</h5>
                <div className="row text-center mt-lg-5 mt-md-3 mt-2">
                  {athletes &&
                    athletes?.map((element, i) => {
                      return (
                        <div key={i} className="col-lg-4 col-md-6 col-6">
                          <Link to={`/category-detail/${element?.id}`}>
                            <figure className="figure">
                              <img
                                src={`${imagesBaseUrl}athletes/${element.image}`}
                                className="figure-img  rounded "
                                style={{ height: "200px", width: "300px" }}
                                alt="..."
                              />
                              <figcaption className="figure-caption text-center font-18 work_sans_bold">
                                {element?.name}
                              </figcaption>
                            </figure>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>

              <hr />
            </div>
          )}
          {media?.length !== 0 && (
            <div className=" col-12 p-lg-5 p-md-3 p-3">
              <div>
                <h5 className="Heading2 mt-2">Media</h5>
                <div className="row text-center mt-lg-5 mt-md-3 mt-2">
                  {media &&
                    media?.map((el, i) => {
                      return (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                          <Link to={`/media-details/${el?.id}`}>
                            <video
                              controls
                              className="w-100 mb-2"
                              style={{ height: "200px" }}
                            >
                              <source
                                src={`http://appcrates.net/admin_virtuallesson/public/assets/videos/${el.video}`}
                                type="video/mp4"
                              />
                            </video>
                            {/* <source src={`http://appcrates.net/admin_virtuallesson/public/assets/videos/${el.video}`} type="video/mp4"/> */}
                            {/* <img src={} className="w-100 mb-2" alt="" /> */}
                          </Link>
                          <h3 className="work_sans_bold my-4">{el.name}</h3>
                        </div>
                      );
                    })}
                </div>
              </div>

              <hr />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
