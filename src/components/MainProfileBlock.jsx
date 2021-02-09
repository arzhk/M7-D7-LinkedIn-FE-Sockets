import React, { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import env from "react-dotenv";
import ProfilePicture from "../assets/profilepicture.PNG";
import Highlights from "./Highlights";
import LatestEducation from "./LatestEducation";
import LatestExperience from "./LatestExperience";
import About from "./About";
import MyLoader from "./ContentLoader";
import ImageUploader from "react-images-upload";

function MainProfileBlock(props) {
  const [isMoreClicked, setIsMoreClicked] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUserID, setCurrentUserID] = useState(props.userID);
  const [isFinishedLoading, setIsFinishedLoading] = useState(false);
  const [showProfilePictureUpload, setShowProfilePictureUpload] = useState(false);
  const [profilePictureUploadImg, setProfilePictureUploadImg] = useState([]);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [showUpdateInfoWindow, setShowUpdateInfoWindow] = useState(false);
  const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);
  const [updatedDataInput, setUpdatedDataInput] = useState({
    name: props.loggedInUserData.name,
    surname: props.loggedInUserData.surname,
    title: userData.title,
    area: userData.area,
    bio: userData.bio,
  });

  const fetchUserDataHandler = async (id) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/profile/${id}`);
      let data = await response.json();
      setUserData(data);
      setUpdatedDataInput({
        name: props.loggedInUserData.name,
        surname: props.loggedInUserData.surname,
        title: userData.title,
        area: userData.area,
        bio: userData.bio,
      });
      setTimeout(() => {
        setIsFinishedLoading(true);
      }, 1000);
    } catch (er) {
      console.log(er);
    }
  };

  const postProfilePictureHandler = async () => {
    try {
      setIsImageUploading(true);
      let formData = new FormData();
      let blob = new Blob([profilePictureUploadImg.pictures[0]], { type: "img/jpeg" });
      formData.append("image", blob);
      await fetch(`${process.env.REACT_APP_API_URL}/profile/${props.loggedInUserData._id}/upload/profilepicture`, {
        method: "POST",
        body: formData,
      });
      setTimeout(() => {
        setIsImageUploading(false);
        setShowProfilePictureUpload(!showProfilePictureUpload);
        fetchUserDataHandler(currentUserID);
      }, 1000);
    } catch (er) {
      console.log(er);
    }
  };

  const submitChangesHandler = async () => {
    try {
      setIsSpinnerLoading(true);
      toggleUpdateInfoHandler();
      await fetch(`${process.env.REACT_APP_API_URL}/profile/${props.loggedInUserData._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedDataInput),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTimeout(() => {
        setIsSpinnerLoading(false);
        setShowUpdateInfoWindow(false);
        fetchUserDataHandler(currentUserID);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadCVHandler = async () => {
    try {
      window.open(`${process.env.REACT_APP_API_URL}/profile/${props.loggedInUserData._id}/CV`, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleUpdateInfoHandler = () => {
    fetchUserDataHandler(currentUserID);
    setShowUpdateInfoWindow(!showUpdateInfoWindow);
  };

  const moreMenuHandler = () => {
    setIsMoreClicked(!isMoreClicked);
  };

  const showProfilePictureUploadHandler = () => {
    setShowProfilePictureUpload(!showProfilePictureUpload);
  };

  const profilePictureUploadHandler = (picture) => {
    setProfilePictureUploadImg({ pictures: picture });
  };

  const inputHandler = (event) => {
    setUpdatedDataInput({ ...updatedDataInput, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    setCurrentUserID(props.userID);
    fetchUserDataHandler(currentUserID);
    setIsFinishedLoading(true);
  }, []);

  useEffect(() => {
    setIsFinishedLoading(false);
    setCurrentUserID(props.userID);
    fetchUserDataHandler(props.userID);
  }, [props.userID]);

  useEffect(() => {
    setUserData(userData);
    if (userData._id === props.loggedInUserData._id) {
      props.setUserDataHandler({ ...props.loggedInUserData, title: userData.title, image: userData.image });
    }
  }, [userData]);

  return (
    <>
      <div
        className="pt-5 pb-3"
        onClick={() => {
          isMoreClicked && setIsMoreClicked(false);
        }}
      >
        <Card id="profile-main" className="mt-5">
          <div className="profile-background-container">
            <div
              className="profile-background-picture"
              style={{
                background: `url(${ProfilePicture})`,
              }}
            ></div>
          </div>
          {showProfilePictureUpload && (
            <div className="profile-picture-upload-container swing-in-top-fwd">
              <h4 className="font-weight-normal">Upload Image</h4>
              {isImageUploading ? (
                <div className="w-100 py-2 d-flex align-items-start justify-content-start mt-3 mb-2">
                  <small
                    className="font-weight-bold mr-2 mb-0"
                    style={{ backgroundColor: "#f2f2f2", padding: "14px 20px", borderRadius: "0.5rem" }}
                  >
                    Uploading Image...{" "}
                    <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                    <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                    <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                  </small>
                </div>
              ) : (
                <>
                  <ImageUploader
                    withIcon={true}
                    buttonText="Upload image"
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    singleImage={true}
                    withPreview={true}
                    withLabel={false}
                    onChange={profilePictureUploadHandler}
                  />
                  <div className="d-flex justify-content-end align-items-center" style={{ height: 40 }}>
                    <Button
                      variant="outline-secondary"
                      className="rounded-pill mr-2"
                      onClick={showProfilePictureUploadHandler}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      className="rounded-pill"
                      style={{ width: 160 }}
                      onClick={postProfilePictureHandler}
                    >
                      Save Changes
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
          <Card.Body className="d-flex justify-content-between px-4 py-3 mb-3">
            {isFinishedLoading ? (
              <>
                <div className="profile-left w-75">
                  <div
                    className="profile-photo d-flex align-items-end justify-content-center"
                    style={{ background: `url(${userData.image})` }}
                  >
                    {props.loggedInUserData._id === currentUserID && (
                      <div className="profile-picture-edit-btn" onClick={showProfilePictureUploadHandler}>
                        <i className="fas fa-pen"></i>
                      </div>
                    )}
                  </div>

                  <h3 className="d-inline-block mr-2">
                    {userData.name} {userData.surname}
                  </h3>
                  <h4 className="d-inline-block mb-0 font-weight-light"> - 1st</h4>
                  <h4 className="font-weight-light">{userData.title}</h4>
                  <Card.Text>
                    {userData.area} - 500+ connections -{" "}
                    <a href="#!" className="font-weight-bold" onClick={props.contactInfoHandler}>
                      Contact info
                    </a>
                    {props.loggedInUserData._id === currentUserID && !showUpdateInfoWindow && !isSpinnerLoading && (
                      <div className="profile-button-container d-flex align-items-center justify-content-start mt-3">
                        <Button
                          variant="outline-primary"
                          className="rounded-pill w-50 py-1 px-0 font-weight-bold "
                          style={{ fontSize: 12 }}
                          onClick={toggleUpdateInfoHandler}
                        >
                          Update Information
                        </Button>
                      </div>
                    )}
                    {isSpinnerLoading && (
                      <div className="w-100 py-2 d-flex align-items-start justify-content-start mt-3 mb-0">
                        <small
                          className="font-weight-bold mr-2 mb-0"
                          style={{ backgroundColor: "#f2f2f2", padding: "14px 20px", borderRadius: "0.5rem" }}
                        >
                          Updating Information...{" "}
                          <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                          <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                          <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                        </small>
                      </div>
                    )}
                    {showUpdateInfoWindow && (
                      <div className="w-75 mt-3 swing-in-top-fwd">
                        <p className="login-label mb-0">First Name</p>
                        <input
                          id="name"
                          type="text"
                          className="mb-2"
                          value={updatedDataInput.name || ""}
                          disabled
                          onChange={(event) => inputHandler(event)}
                        />
                        <p className="login-label mb-0">Surname</p>
                        <input
                          id="surname"
                          type="text"
                          className="mb-2"
                          value={updatedDataInput.surname || ""}
                          disabled
                          onChange={(event) => inputHandler(event)}
                        />
                        <p className="login-label mb-0">Title</p>
                        <input
                          id="title"
                          type="text"
                          className="mb-2"
                          value={updatedDataInput.title || ""}
                          onChange={(event) => inputHandler(event)}
                        />
                        <p className="login-label mb-0">Area</p>
                        <input
                          id="area"
                          type="text"
                          className="mb-2"
                          value={updatedDataInput.area || ""}
                          onChange={(event) => inputHandler(event)}
                        />
                        <p className="login-label mb-0">Bio</p>
                        <textarea
                          id="bio"
                          type="text"
                          className="mb-2"
                          value={updatedDataInput.bio || ""}
                          onChange={(event) => inputHandler(event)}
                        />

                        <Button
                          variant="primary"
                          className="rounded-pill w-50 py-1 px-0 font-weight-bold mt-3 mr-2 "
                          style={{ fontSize: 12 }}
                          onClick={submitChangesHandler}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outline-secondary"
                          className="rounded-pill w-25 py-1 px-0 font-weight-bold mt-3 "
                          style={{ fontSize: 12 }}
                          onClick={toggleUpdateInfoHandler}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Card.Text>
                </div>
                <div className="profile-right w-50 text-right">
                  <div className="profile-button-container d-flex align-items-center justify-content-end mb-4">
                    <Button className="mr-2 px-4 rounded-pill font-weight-bold" variant="primary">
                      Connect
                    </Button>
                    <Button className="mr-2 px-4 rounded-pill font-weight-bold" variant="outline-primary">
                      Message
                    </Button>
                    <Button
                      className="px-4 rounded-pill font-weight-bold"
                      variant="outline-secondary"
                      onClick={moreMenuHandler}
                    >
                      More...
                    </Button>
                    {isMoreClicked && (
                      <div className="profile-more-menu">
                        <ul>
                          <li>
                            <a href="#!">
                              <i className="fas fa-paper-plane mr-4"></i>Share profile in a message
                            </a>
                          </li>
                          <li>
                            <a href="" onClick={downloadCVHandler}>
                              <i className="fas fa-download mr-4"></i>Save to PDF
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              <i className="fas fa-plus mr-4"></i>Follow
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              <i className="fas fa-flag mr-4"></i>Report/Block
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="d-flex flex-column align-items-end text-left">
                    <LatestExperience />
                    <LatestEducation />
                    <div className="latest-experience"></div>
                  </div>
                </div>
              </>
            ) : (
              <MyLoader />
            )}
          </Card.Body>
        </Card>
        <Highlights />
        <About aboutData={userData.bio} isFinishedLoading={isFinishedLoading} />
      </div>
    </>
  );
}

export default MainProfileBlock;
