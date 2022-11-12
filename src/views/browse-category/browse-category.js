import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { imagesBaseUrl } from "../../util/constants";
import { useDispatch } from "react-redux";
import { isLoading } from "../../state/actions/spinner";
import { changeCount } from "../../state/actions/cartActions";
import { useSelector } from "react-redux";
const BrowseCategory = () => {
  const [categories, setCategory] = useState(null);
  const dispatch = useDispatch();
  const selector = useSelector((state) => {
    return state.count;
  });
  const ref = useRef();
  const getCategories = async () => {
    const accessToken = localStorage.getItem("token");
    dispatch(isLoading(true));
    axios
      .get("/getCategory", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const categoryArray = res.data;
        const { category } = categoryArray;
        dispatch(isLoading(false));

        setCategory(category || []);
      })
      .catch((error) => {
        if (error) {
          dispatch(isLoading(false));
        }
      });
  };
  useEffect(() => {
    getCategories();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="container browse_category">
        <div className="d-flex align-items-start">
          <div
            className="nav flex-column nav-pills me-3"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              ref={ref}
              className="nav-link w-50 font-18 work_sans"
              id="v-pills-settings-tab4"
              type="button"
              role="tab"
              aria-controls="v-pills-settings"
              aria-selected="false"
              style={{
                fontWeight: "700",
                color: "black",
                borderBottom: "none",
              }}
            >
              BROWSE
            </button>
            {categories?.map((el, i) => {
              return (
                <Link
                  key={i}
                  to={`/category/${el?.id}`}
                  className="browse_category-link"
                >
                  <button
                    className="nav-link font-18 work_sans"
                    id="v-pills-settings-tab4"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings4"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                    style={{
                      fontWeight: "700",
                      color: "black",
                      borderBottom: "none",
                    }}
                  >
                    {el.name}
                  </button>
                </Link>
              );
            })}
            {/* <button className="nav-link font-18 work_sans" id="v-pills-settings-tab4" data-bs-toggle="pill" data-bs-target="#v-pills-settings4" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false" style={{fontWeight: '700', color: 'black', borderBottom: 'none'}}>BROWSE</button>
                        <button className="nav-link font-18 work_sans active" id="" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Backstroke</button>
                        <button className="nav-link font-18 work_sans" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Breakstroke</button>
                        <button className="nav-link font-18 work_sans" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Butterfly</button>
                        <button className="nav-link font-18 work_sans" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Injury Rehab</button>
                        <button className="nav-link font-18 work_sans" id="v-pills-settings-tab2" data-bs-toggle="pill" data-bs-target="#v-pills-settings2" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Mentorship</button>
                        <button className="nav-link font-18 work_sans" id="v-pills-settings-tab3" data-bs-toggle="pill" data-bs-target="#v-pills-settings3" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Coaches corner</button>
                        <button className="nav-link font-18 work_sans" id="v-pills-settings-tab4" data-bs-toggle="pill" data-bs-target="#v-pills-settings4" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false" style={{borderBottom:'none'}}>Freestyle</button> */}
          </div>
          <div
            className="tab-content p-lg-4 p-md-2 p-2 "
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <div>
                {/* <img src="/img/head1.png " width="100%" alt="head" /> DISCOUNT */}
                <h4 className="Catagories">Browse Catagories</h4>
                <div className="row">
                  {categories?.map((element, i) => {
                    return (
                      <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                        <Link to={`/category/${element?.id}`}>
                          <figure className="figure">
                            <img
                              src={`${imagesBaseUrl}categories/${element.image}`}
                              className="figure-img img-fluid rounded "
                              alt="..."
                              style={{ height: "199px", width: "252px" }}
                            />
                            <figcaption
                              className="figure-caption text-center font-18 work_sans"
                              style={{ color: "black" }}
                            >
                              {element?.name}
                            </figcaption>
                          </figure>
                        </Link>
                      </div>
                    );
                  })}

                  {/* <div className="col-lg-4 col-md-6 col-6">
                    <Link to="/category">
                      <figure className="figure">
                        <img
                          src="/img/breaststroke-1.png"
                          className="figure-img img-fluid rounded"
                          alt="..."
                        />
                        <figcaption
                          className="figure-caption text-center font-18 work_sans"
                          style={{ color: "black" }}
                        >
                          Brakestroke
                        </figcaption>
                      </figure>
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-6 col-6">
                    <Link to="/category">
                      <figure className="figure">
                        <img
                          src="/img/butterFly.png"
                          className="figure-img img-fluid rounded"
                          alt="..."
                        />
                        <figcaption
                          className="figure-caption text-center font-18 work_sans"
                          style={{ color: "black" }}
                        >
                          Butterfly
                        </figcaption>
                      </figure>
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-6 col-6">
                    <Link to="/category">
                      <figure className="figure">
                        <img
                          src="/img/inJury.png"
                          className="figure-img img-fluid rounded"
                          alt="..."
                        />
                        <figcaption
                          className="figure-caption text-center font-18 work_sans"
                          style={{ color: "black" }}
                        >
                          Injury Rehab
                        </figcaption>
                      </figure>
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-6 col-6">
                    <Link to="/category">
                      <figure className="figure">
                        <img
                          src="/img/Mentore.png"
                          className="figure-img img-fluid rounded"
                          alt="..."
                        />
                        <figcaption
                          className="figure-caption text-center font-18 work_sans"
                          style={{ color: "black" }}
                        >
                          Mentorship
                        </figcaption>
                      </figure>
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-6 col-6">
                    <Link to="/category">
                      <figure className="figure">
                        <img
                          src="/img/coaches.png"
                          className="figure-img img-fluid rounded"
                          alt="..."
                        />
                        <figcaption
                          className="figure-caption text-center font-18 work_sans"
                          style={{ color: "black" }}
                        >
                          Coaches Corner
                        </figcaption>
                      </figure>
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-6 col-6">
                    <Link to="/category">
                      <figure className="figure">
                        <img
                          src="/img/Freestyle.png"
                          className="figure-img img-fluid rounded"
                          alt="..."
                        />
                        <figcaption
                          className="figure-caption text-center font-18 work_sans"
                          style={{ color: "black" }}
                        >
                          Freestyle
                        </figcaption>
                      </figure>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In
              tempore ad exercitationem magni, modi hic vitae, dolorem id
              quaerat adipisci vel beatae totam! Animi consequuntur reiciendis
              sunt illum nostrum fugit? Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Doloribus debitis veritatis sequi. Ullam ipsa,
              molestias culpa veritatis nemo cum amet magni animi aspernatur
              blanditiis! Alias labore consectetur iure aspernatur
              exercitationem!
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-messages"
              role="tabpanel"
              aria-labelledby="v-pills-messages-tab"
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, facere earum. Voluptatibus doloremque cumque
              accusantium delectus, molestiae perspiciatis alias dolore
              reiciendis ipsa iure, rem impedit modi hic earum! Sequi, debitis.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              numquam, veritatis suscipit tempore corrupti enim qui?
              Necessitatibus, modi assumenda, dolor reiciendis amet numquam
              recusandae cupiditate, sit et ipsam ut iure.
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-settings"
              role="tabpanel"
              aria-labelledby="v-pills-settings-tab"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
              perspiciatis eveniet. Eos labore, deleniti aperiam repellendus
              voluptatem eius praesentium porro obcaecati, blanditiis error
              molestiae perspiciatis dolore perferendis veniam hic fugit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Quod, non alias
              harum facilis culpa velit minus saepe ea dolorum odio possimus
              incidunt nam illo reprehenderit cupiditate maxime consequuntur
              tempora corporis.
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-settings2"
              role="tabpanel"
              aria-labelledby="v-pills-settings-tab2"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
              explicabo atque incidunt alias distinctio, labore aliquam in eaque
              et, minima tenetur ut earum illum amet tempore provident impedit
              doloremque eligendi?
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-settings3"
              role="tabpanel"
              aria-labelledby="v-pills-settings-tab3"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              provident quod modi placeat. Laboriosam culpa modi nisi blanditiis
              corrupti, quis eum veritatis cum eaque quibusdam dolores inventore
              rem alias consectetur.
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-settings4"
              role="tabpanel"
              aria-labelledby="v-pills-settings-tab4"
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla
              perferendis dolore molestiae debitis corporis, reprehenderit
              repellat harum error nostrum voluptates, obcaecati nihil eligendi
              dicta neque ipsum architecto aliquam perspiciatis quod.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCategory;
