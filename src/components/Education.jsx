import React, { Component } from "react";
import { Container, ListGroup } from "react-bootstrap";

export default class Education extends Component {
  render() {
    return (
      <div>
        <div id="education-main-container" className="education-contain mb-3">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="font-weight-normal">Education</h4>

            <i className="fas fa-plus mr-3 "></i>
          </div>
          <ListGroup>
            <ListGroup.Item
              variant="light"
              className="d-flex no-border align-items-center justify-content-between mb-0 brdr-bottom"
            >
              <div className="d-flex align-items-start">
                <div className="imgPlace mr-4"></div>
                <div className="d-flex flex-column">
                  <h5 className="mb-0 font-weight-normal">Experience 1</h5>
                  <p className="mb-0 ">Subtext</p>
                  <p className="mb-0 font-weight-light">Subtext 2</p>
                </div>
              </div>
              <i className="fas fa-pen "></i>
            </ListGroup.Item>
            <ListGroup.Item
              variant="light"
              className="d-flex no-border align-items-center justify-content-between mb-0 brdr-bottom"
            >
              <div className="d-flex align-items-start">
                <div className="imgPlace mr-4"></div>
                <div className="d-flex flex-column">
                  <h5 className="mb-0 font-weight-normal">Education 2</h5>
                  <p className="mb-0 ">Subtext</p>
                  <p className="mb-0 font-weight-light">Subtext 2</p>
                </div>
              </div>
              <i className="fas fa-pen "></i>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    );
  }
}
