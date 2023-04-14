import React from "react";

function About() {
  return (
    <>
      <div className="container">
        <div className="accordion" id="accordionExample">
          <h1 className="my-3 mb-5">About this website and me</h1>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <b>About this website</b>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>myNotes</strong> is a personal notes repository where
                you can create, display, edit or delete your personal notes. The
                backend is implemented using ExpressJS along with the
                application of Node.js and the database is supported using
                MongoDB and mongoose. The frontend is developed using ReactJS
                along with the Bootstrap CSS Framework. In addition to this, the
                authentication is strengthened using BcryptJS and JSON Web
                Tokens (JWT)
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <b>About the developer</b>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Hey!! I am Jugal Pumbhadia, developer of <strong>iNotes</strong>
                . I am just a curious person who loves to design and develop
                websites. Currently, I am learning about full stack development
                using MongoDB, ExpessJS, React JS and Node.js (MERN Stack).
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
