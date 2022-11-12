import React, { useEffect } from "react";

const Faqs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="faq_main">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="blue_title text-start">
                Frequently Asked Questions
              </h3>
            </div>
            {/*******************
                            Lessons Start 
                            ********************/}
            <div className="col-md-12 mb-5">
              <h4 className="mb-3">Lessons</h4>
              <div
                className="accordion accordion-flush"
                id="accordionflushExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      What can I expect from a lesson or clinic?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Explore or lesson insight page
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      Can this be taken simultaneously during my season?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Yes! We encourage you to sign up whenever you have time
                      and want to improve aspects of your swimming. Our lesson
                      plan is complimentary to your practices, and designed so
                      that you can use our tips and insight to enhance your
                      practices
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      Are languages available in different languages?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Yes, we have a wide variety of athletes who speak
                      different languages. Those athletes can offer the multiple
                      languages they speak.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*******************
                            Payment Start 
                            ********************/}
            <div className="col-md-12 mb-5">
              <h4 className="mb-3">Payment</h4>
              <div className="accordion accordion-flush">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="payment-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#payment-collapseOne"
                      aria-expanded="false"
                      aria-controls="payment-collapseOne"
                    >
                      How do I tip for my lesson?
                    </button>
                  </h2>
                  <div
                    id="payment-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="payment-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      You will pay for the lesson when you sign up. You are
                      allowed to tip the athlete after the lesson through your
                      account.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="payment-headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#payment-collapseTwo"
                      aria-expanded="false"
                      aria-controls="payment-collapseTwo"
                    >
                      What payment methods do you accept?
                    </button>
                  </h2>
                  <div
                    id="payment-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="payment-headingTwo"
                    data-bs-parent="#accordionpaymentExample"
                  >
                    <div className="accordion-body">
                      All major credit cards and paypal
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="payment-headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#payment-collapseThree"
                      aria-expanded="false"
                      aria-controls="payment-collapseThree"
                    >
                      Why are some athletes charged more?
                    </button>
                  </h2>
                  <div
                    id="payment-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="payment-headingThree"
                    data-bs-parent="#accordionpaymentExample"
                  >
                    <div className="accordion-body">
                      Other athletes with higher accolades and higher demand
                      have higher costs. Some athletes have chosen to decrease
                      their costs, in hopes to give more access to swimmers
                      across the world.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*******************
                            Refunds Start 
                            ********************/}
            <div className="col-md-12 mb-5">
              <h4 className="mb-3">Returns & Refunds</h4>
              <div className="accordion accordion-flush">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="refunds-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#refunds-collapseOne"
                      aria-expanded="false"
                      aria-controls="refunds-collapseOne"
                    >
                      What do I do if I am not satisfied with my lesson?
                    </button>
                  </h2>
                  <div
                    id="refunds-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="refunds-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      If you are not 100% satisfied with your purchase from
                      Athlete Connected, you can receive a refund. Please reach
                      out to our support email and explain why you would like a
                      refund and why you weren't satisfied, and we will
                      reimburse you!
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="refunds-headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#refunds-collapseTwo"
                      aria-expanded="false"
                      aria-controls="refunds-collapseTwo"
                    >
                      Can I exchange a refund for a different lesson?
                    </button>
                  </h2>
                  <div
                    id="refunds-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="refunds-headingTwo"
                    data-bs-parent="#accordionrefundsExample"
                  >
                    <div className="accordion-body">
                      Unfortunately, we cannot. If you feel as though your
                      contractor wasn’t fulfilling the desired requirements, you
                      can issue a recommendation to the company as to why you
                      weren't satisfied.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*******************
                            Technical Start 
                            ********************/}
            <div className="col-md-12 mb-5">
              <h4 className="mb-3">Technical</h4>
              <div className="accordion accordion-flush">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="technical-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#technical-collapseOne"
                      aria-expanded="false"
                      aria-controls="technical-collapseOne"
                    >
                      Do I need to sign up as a member to sign up for lessons?
                    </button>
                  </h2>
                  <div
                    id="technical-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="technical-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      You can complete lessons by signing up through your google
                      account or even as a guest. As a guest, you won’t be able
                      to see previous lessons you enrolled in though.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="technical-headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#technical-collapseTwo"
                      aria-expanded="false"
                      aria-controls="technical-collapseTwo"
                    >
                      What do I receive as a member?
                    </button>
                  </h2>
                  <div
                    id="technical-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="technical-headingTwo"
                    data-bs-parent="#accordiontechnicalExample"
                  >
                    <div className="accordion-body">
                      As a member, you are part of a weekly email list that
                      sends updates & weekly thoughts regarding swimming. You
                      will also have access to your previous lessons and
                      recommendations per athlete.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="technical-headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#technical-collapseThree"
                      aria-expanded="false"
                      aria-controls="technical-collapseThree"
                    >
                      How do I login for my lesson at my scheduled time?
                    </button>
                  </h2>
                  <div
                    id="technical-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="technical-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Upon sign up, you will receive an email confirmation link
                      with a zoom lin that you will use
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="technical-headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#technical-collapseFour"
                      aria-expanded="false"
                      aria-controls="technical-collapseFour"
                    >
                      What if I don’t have a zoom account
                    </button>
                  </h2>
                  <div
                    id="technical-collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="technical-headingFour"
                    data-bs-parent="#accordiontechnicalExample"
                  >
                    <div className="accordion-body">
                      As a participant, you don’t need a zoom account. You will
                      simply be able to type in the Zoom ID & meeting password
                      to login.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="technical-headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#technical-collapseFive"
                      aria-expanded="false"
                      aria-controls="technical-collapseFive"
                    >
                      What if I don’t have access to a zoom account?
                    </button>
                  </h2>
                  <div
                    id="technical-collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="technical-headingFive"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      We can temporarily issue you a zoom account. You will need
                      your own tablet or computer.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="technical-headingSix">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#technical-collapseSix"
                      aria-expanded="false"
                      aria-controls="technical-collapseSix"
                    >
                      What if my athlete never showed up?
                    </button>
                  </h2>
                  <div
                    id="technical-collapseSix"
                    className="accordion-collapse collapse"
                    aria-labelledby="technical-headingSix"
                    data-bs-parent="#accordiontechnicalExample"
                  >
                    <div className="accordion-body">
                      While we never expect this, Full refund and free lessons
                      will be provided.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="technical-headingSeven">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#technical-collapseSeven"
                      aria-expanded="false"
                      aria-controls="technical-collapseSeven"
                    >
                      How do I upload videos?
                    </button>
                  </h2>
                  <div
                    id="technical-collapseSeven"
                    className="accordion-collapse collapse"
                    aria-labelledby="technical-headingSeven"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      All you will need to do is have your video you’d like
                      downloaded on your computer or tablet, and screen share
                      with your athlete during your meeting.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
