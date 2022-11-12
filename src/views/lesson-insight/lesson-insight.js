import React, { useEffect } from "react";
const LessonInsight = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div
        className="banner_section"
        style={{
          backgroundImage: 'url("img/lesson_banner.png")',
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="row mx-0">
            <div className="col-lg-12 col-md-12">
              <h1 className=" work_sans_bold text-white">Lesson Insight</h1>
              <p className="font-18 work_sans_bold text-white">
                <br />
                We take everything about a typical swim lesson, and make it
                virtual. We take everything you need to know about your goals,
                and provide you with a full plan of how to reach those goals. We
                are redefining how you can get better, and we want you to join
                us.
                <br />
                <br />
                Time. Swimming is a sport measured by time. That’s why we want
                to take the time to get to know you, deliver knowledge about the
                sport in ways you’ve never experienced before, so that you can.
                We equip you with the necessary knowledge that will develop your
                career to reach all your dreams and goals.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-5">
            <h1 className="work_sans_bold skyblue mt-sm-5 mt-3 mb-4">
              Lesson Insight
            </h1>
            <div className="d-flex" style={{ gap: "30px" }}>
              <img src="img/arrow-right.svg" width="7px" alt="" />
              <p className="font-18 wor_sans mt-3 ml-3">
                All lessons are roughly 40-50 minutes long
              </p>
            </div>
            <div className="d-flex" style={{ gap: "30px" }}>
              <img src="img/arrow-right.svg" width="7px" alt="" />
              <p className="font-18 wor_sans mt-3 ml-3">
                All lessons are virtual! After payment, you will receive a zoom
                link via email that is generated for your lesson time.
              </p>
            </div>
            <div className="d-flex" style={{ gap: "30px" }}>
              <img src="img/arrow-right.svg" width="7px" alt="" />
              <p className="font-18 wor_sans mt-3 ml-3">
                You can sign up and create an account for free, and be able to
                save your lessons and access your recorded sessions. Otherwise,
                continue with a guest account.
              </p>
            </div>
          </div>
          <div className="col-md-12 mb-4">
            <div className="lesson_insight_points">
              <div className="points_item">
                <img
                  src="img/lesson_admin.svg"
                  className="mb-sm-5 mb-3"
                  alt=""
                />
                <p className="font-18 work_sans">
                  You can sign up as member, or proceed with a guest account.
                </p>
              </div>
              <div className="points_item">
                <img
                  src="img/lesson_search.svg"
                  className="mb-sm-5 mb-3"
                  alt=""
                />
                <p className="font-18 work_sans">
                  Search for lesson via: Quick lesson search or Browsing athlete
                  pages
                </p>
              </div>
              <div className="points_item">
                <img
                  src="img/lesson_tick.svg"
                  className="mb-sm-5 mb-3"
                  alt=""
                />
                <p className="font-18 work_sans">
                  Pay through website & set your lesson objectives
                </p>
              </div>
              <div className="points_item">
                <img
                  src="img/lesson_mail.svg"
                  className="mb-sm-5 mb-3"
                  alt=""
                />
                <p className="font-18 work_sans">
                  Receives zoom link via email upon confirmation
                </p>
              </div>
              <div className="points_item">
                <img
                  src="img/lesson_delivery.svg"
                  className="mb-sm-5 mb-3"
                  alt=""
                />
                <p className="font-18 work_sans">
                  Lesson provided with deliverables
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="banner_section"
        style={{
          backgroundImage: 'url("img/the_process.png")',
          backgroundSize: "100% 100%",
        }}
      >
        <div className="container">
          <div className="row mx-0">
            <div className="col-lg-12 col-md-12">
              <h1 className=" work_sans_bold text-white">The process</h1>
              <p className="font-18 work_sans_bold text-white">
                <br />
                Search for your favorite athlete, sign up through quick lesson
                search, or use a variety of our filters to find an athlete
                within your parameters and time frame. Upon registering for your
                lesson, you will input up to 3 objectives you aim to accomplish
                during the lesson and input some personal information to help us
                better prepare for the appointment. Then, you will receive an
                email confirmation highlighting all the details to prepare you!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="py-4 gray_background"
        style={{ background: "#F4F4F4", marginTop: "-2px" }}
      >
        <div className="container">
          <div className="col-lg-12 col-md-12 mb-3">
            <h1 className="font-28 work_sans_bold">How do we do it?</h1>
            <p className="font-18 work_sans_bold">
              <br />
              We hire the best athletes the sport has to offer,and provide them
              with the most innovative & engaging processes to learn. This
              combination creates a rare opportunity to gain insight into what
              really goes into the development of a star athlete.
            </p>
          </div>
          <br />
          <br />
          <div className="col-lg-12 col-md-12 mb-3">
            <h1 className="font-28 work_sans_bold">
              Who should sign up for lessons:{" "}
            </h1>
            <p className="font-18 work_sans_bold">
              <br />
              We encourage anyone interested in improving their swimming
              abilities to sign up. Our lesson plans are flexible so that you
              can learn what you need from any caliber of athlete. Our plans are
              inclusive
            </p>
          </div>
          <br />

          <br />
          <div className="col-lg-12 col-md-12 mb-3">
            <h1 className="font-28 work_sans_bold">Our innovation:</h1>
            <p className="font-18 work_sans_bold">
              <br />
              We understand that everybody learns differently. Our client age
              range is from 8-80! Anyone can learn, so anyone can swim! We adapt
              every lesson to be compatible with your objectives.
              <br />
              <br />
              We do the digging for the specific tools that we feel will help
              you before the lesson. Our database has thousands of videos to
              choose from, to find the right clips for you to see.
              <br />
              <br />
              There is no one quick switch to fix, we know that. We use natural
              learning ways to start easing into it.
            </p>
          </div>
          <br />
          <br />
          <div className="col-lg-12 col-md-12 mb-3">
            <h1 className="font-28 work_sans_bold">Deliverables</h1>
            <p className="font-18 work_sans_bold">
              <br />
              Reach your dreams faster with us. Every lesson includes a video
              analysis session (includes your own video if provided), lesson
              handbook, the opportunity to work with one of the worlds finest
              athletes, and a lesson catered towards your needs.
            </p>
          </div>
          <br />
          <br />
          <div className="col-lg-12 col-md-12 mb-3">
            <h1 className="font-28 work_sans_bold">Lesson format: </h1>
            <p className="font-18 work_sans_bold">
              <br />
              <h3 className="skyblue font-18 wor_sans_bold">
                Part 1: Discovering your swimming
              </h3>
              Develop an understanding of your stroke, your strengths &
              weaknesses, and areas for improvement. This is done by
              establishing a connection between your designated athlete your
              working with, and a thorough video analysis.
              <br />
              <br />
              <h3 className="skyblue font-18 wor_sans_bold">
                Part 2: Finding the root causes
              </h3>
              Uncover the invisible forces driving your swimming, and what you
              can do to improve. AFter establishing a feel for your stroke with
              a new perspective, you can now unravel why you swim the way you
              do, and begin to create ways to build upon that through the basics
              of the sport. This is done through innovative teaching skills &
              visual tricks.
              <br />
              <br />
              <h3 className="skyblue font-18 wor_sans_bold">
                Part 3: Taking action
              </h3>
              Now that you have a better understanding of your swimming, you
              will walk through a customized gameplan to use for the next time
              you hit the water. These are complimentary to your training, and
              should be integrated into your practices with ease!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonInsight;
