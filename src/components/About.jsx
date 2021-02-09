import React from "react";
import { Alert } from "react-bootstrap";
import AboutLoader from "./AboutLoader";

function About({ aboutData, isFinishedLoading }) {
  return (
    <div id="about-container">
      <h4 className="font-weight-normal d-block">About</h4>
      {isFinishedLoading ? (
        aboutData.length !== 0 ? (
          <p className="mb-0">{aboutData}</p>
        ) : (
          <Alert variant="light" className="pl-0">
            No data to display.
          </Alert>
        )
      ) : (
        <AboutLoader />
      )}
    </div>
  );
}

export default About;
