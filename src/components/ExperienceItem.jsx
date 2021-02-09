import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import env from "react-dotenv";
import ImageUploader from "react-images-upload";

const ExperienceItem = (props) => {
  const [isUploadWindowOpen, setIsUploadWindowOpen] = useState(false);
  const [experienceImage, setExperienceImage] = useState();
  const [imageUpload, setImageUpload] = useState();
  const [imageUploadingLoader, setImageUploadingLoader] = useState(false);
  const [experienceID, setExperienceID] = useState(props.experience._id);

  const fetchExperienceImage = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_API_URL}/profile/${props.username}/experiences/${props.experience._id}`
      );
      let data = await response.json();
      setExperienceImage(data.image);
    } catch (er) {
      console.log(er);
    }
  };

  const postProfilePictureHandler = async () => {
    try {
      setImageUploadingLoader(true);
      let formData = new FormData();
      let blob = new Blob([imageUpload[0]], { type: "img/jpeg" });
      formData.append("image", blob);

      await fetch(
        `${process.env.REACT_APP_API_URL}/profile/${props.username}/experiences/${props.experience._id}/picture`,
        {
          method: "POST",
          body: formData,
        }
      );
      setTimeout(() => {
        setImageUploadingLoader(false);
        fetchExperienceImage();
        openUploadWindowHandler();
      }, 1000);
    } catch (er) {
      console.log(er);
    }
  };

  const openUploadWindowHandler = () => {
    setIsUploadWindowOpen(!isUploadWindowOpen);
  };

  const profilePictureUploadHandler = (picture) => {
    setImageUpload(picture);
  };

  useEffect(() => {
    if (props.username !== undefined) {
      fetchExperienceImage();
    }
  }, []);

  useEffect(() => {
    setExperienceImage(experienceImage);
  }, [experienceImage]);

  return (
    <ListGroup.Item variant="light" className="d-flex align-items-center justify-content-between brdr-bottom">
      <div className="d-flex align-items-start">
        <div className="expImgPlace mr-4" style={{ background: `url(${experienceImage})` }}>
          {props.username === props.loggedInUsername && (
            <div className="experience-imgupload-container" onClick={openUploadWindowHandler}>
              <i className="fas fa-upload"></i>
            </div>
          )}
        </div>
        {isUploadWindowOpen && (
          <div className="upload-container swing-in-top-fwd">
            <h5 className="font-weight-normal">Upload Image</h5>
            {imageUploadingLoader ? (
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
                <div className="d-flex justify-content-center align-items-center" style={{ height: 40 }}>
                  <Button
                    variant="outline-secondary"
                    className="rounded-pill mr-2"
                    onClick={openUploadWindowHandler}
                    style={{ width: "40%" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className="rounded-pill"
                    style={{ width: "60%" }}
                    onClick={postProfilePictureHandler}
                  >
                    Save Changes
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
        <div className="d-flex flex-column">
          <h5 className="mb-0 font-weight-normal">{props.experience.role}</h5>
          <p className="mb-0 ">{props.experience.company}</p>
          <p className="mb-0 font-weight-light">
            <Moment format="MMM YYYY">{props.experience.startDate}</Moment> -{" "}
            <Moment format="MMM YYYY">{props.experience.endDate}</Moment>
          </p>
          <small className="font-weight-light">{props.experience.area}</small>
        </div>
      </div>
      <div onClick={() => props.editModal(props.experience)} style={{ cursor: "pointer" }}>
        <i className="fas fa-pen "></i>
      </div>
    </ListGroup.Item>
  );
};

export default ExperienceItem;
