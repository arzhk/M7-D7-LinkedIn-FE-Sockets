import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Image, Spinner } from "react-bootstrap";

import "./StartPost.css";

class StartPost extends React.Component {
  state = {
    myPost: "",
    modalShow: false,
    isModalLoading: false,
  };

  updateInputValue = (evt) => {
    this.setState({
      myPost: evt.target.value,
    });
  };
  handlePost = () => {
    this.setState({ isModalLoading: true });

    setTimeout(() => {
      this.setState({ isModalLoading: false });
      this.props.sendPosts(this.state.myPost, "", "startPost");
      this.setState({ myPost: "" });
    }, 2000);
  };
  render() {
    const { show, name, onHide, inputImage } = this.props;
    return (
      <div className="mt-4">
        <Modal id="startPost" show={show} onHide={() => onHide("startPost")} dialogClassName="custom-dialog">
          <Modal.Header closeButton style={{ border: "none" }}>
            <Modal.Title className="font-weight-normal">Create a post</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ border: "none" }}>
            {this.state.isModalLoading ? (
              <div className="w-100 mx-auto py-2 d-flex align-items-center justify-content-center">
                <small
                  className="font-weight-bold mr-2 mb-0"
                  style={{ backgroundColor: "#f2f2f2", padding: "14px 20px", borderRadius: "0.5rem" }}
                >
                  Posting... <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                  <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                  <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                </small>
              </div>
            ) : (
              <div className="d-flex flex-column">
                <div className="d-flex">
                  <img
                    src="https://mpng.subpng.com/20180802/icj/kisspng-user-profile-default-computer-icons-network-video-the-foot-problems-of-the-disinall-foot-care-founde-5b6346121ec769.0929994515332326581261.jpg"
                    alt=""
                    id="myImg"
                  />
                  <div className="d-flex flex-column mb-4">
                    <h6>{name}</h6>
                    <Button className="anyone-button text-secondary shadow-none">
                      <i className="fas fa-globe-americas"></i>
                      <p className="mx-2 m-0">Anyone</p>
                      <i className="fas fa-caret-down"></i>
                    </Button>
                  </div>
                </div>
                <textarea
                  rows="6"
                  id="myInput"
                  type="text"
                  className="bg-transparent my-0 d-flex justify-content-start align-items-start"
                  value={this.state.myPost}
                  placeholder={"What do you want to talk about?"}
                  onChange={(evt) => this.updateInputValue(evt)}
                />
                {/*      {inputImage != null && (
                  <div>
                    <Image src={inputImage} fluid />
                  </div>
                )} */}
                <div className="d-flex align-items-center">
                  <Button className="hashtag-button shadow-none">Add hashtag</Button>
                  <p className="m-0 p-0" id="myP">
                    Help the right people to see your post
                  </p>
                </div>
                <div className="d-flex justify-content-between mt-2 align-items-center">
                  <div className="d-flex icons">
                    <Link to="#" className="d-flex align-items-center justify-content-center" id="plus">
                      <i className="fas fa-plus text-primary"></i>
                    </Link>
                    <Button
                      variant="link"
                      className="d-flex align-items-center justify-content-center"
                      /*    onClick={() => onHide("photo", true)} */
                      disabled
                    >
                      <i className="far fa-image"></i>
                    </Button>
                    <Link to="#" className="d-flex align-items-center justify-content-center">
                      <i className="fab fa-youtube"></i>
                    </Link>
                    <Link to="#" className="d-flex align-items-center justify-content-center">
                      <i className="fas fa-sticky-note"></i>
                    </Link>
                  </div>
                  <Button
                    variant="primary"
                    onClick={this.handlePost}
                    disabled={this.state.myPost.length < 1}
                    className="rounded-pill px-4"
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center align-items-center" id="my-footer">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Link to="#">celebrate an occasion</Link>
              <Link to="#">celebrate an occasion</Link>
              <Link to="#">celebrate an occasion</Link>
            </div>
            <div className="d-flex flex-column">
              <Link to="#">celebrate an occasion</Link>
              <Link to="#">celebrate an occasion</Link>
              <Link to="#">celebrate an occasion</Link>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default StartPost;
