import React, { Component } from "react";
import { ListGroup, Alert } from "react-bootstrap";
import env from "react-dotenv";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import ExperienceItem from "./ExperienceItem";
import ExpEducationLoaders from "./loaders/ExpEducationLoaders";

class Experience extends Component {
  state = {
    editShow: false,
    addShow: false,
    experiences: [],
    currentexperience: {},
    loaded: false,
    username: this.props.username,
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 2000);
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.userID !== this.props.userID) {
      this.setState({ username: this.props.username });
      this.setState({ loaded: false });
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 1000);
    }
  };

  editExperiencePut = async (experience, experienceId) => {
    this.setState({ editShow: false });
    this.setState({ loaded: false });
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/profile/${this.props.loggedInUserData.username}/experiences/${experienceId}`,
        {
          method: "PUT",
          body: JSON.stringify(experience),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );

      this.props.dataFetcher();
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  addExperiencePost = async (exp, experienceId) => {
    this.setState({ addShow: false });
    this.setState({ loaded: false });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/profile/${this.props.loggedInUserData.username}/experiences/`,
        {
          method: "POST",
          body: JSON.stringify(exp),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      this.props.dataFetcher();
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };
  deleteExperience = async (id) => {
    this.setState({ editShow: false });
    this.setState({ loaded: false });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/profile/${this.props.loggedInUserData.username}/experiences/${id}`,
        {
          method: "DELETE",
        }
      );
      this.props.dataFetcher();
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  addModalToggleHandler = () => {
    this.state.addShow ? this.setState({ addShow: false }) : this.setState({ addShow: true });
  };
  editModalToggleHandler = (e) => {
    this.state.editShow ? this.setState({ editShow: false }) : this.setState({ editShow: true, currentexperience: e });
  };

  render() {
    return (
      <div>
        <div id="experience-main-container" className="experience-contain mb-0">
          <div className="d-flex align-items-center justify-content-between mr-2">
            <h4 className="font-weight-normal">Experience</h4>
            {this.props.userID === this.props.loggedInUserData._id && (
              <div onClick={() => this.addModalToggleHandler()} style={{ cursor: "pointer" }}>
                <i className="fas fa-plus"></i>
              </div>
            )}
          </div>
          <ListGroup>
            {!this.state.isSpinnerLoading && this.state.loaded
              ? this.props.experiences.length > 0 &&
                this.props.experiences.map((exp, key) => (
                  <ExperienceItem
                    key={key}
                    experience={exp}
                    editModal={this.editModalToggleHandler}
                    username={this.props.username}
                    loggedInUsername={this.props.loggedInUserData.username}
                  />
                ))
              : Array.from(
                  { length: this.props.experiences && this.props.experiences.length },
                  (_, i) => i + 1
                ).map((e, n) => <ExpEducationLoaders key={n} />)}
            {this.props.experiences && this.props.experiences.length === 0 && (
              <Alert variant="light" className="pl-0">
                No data to display.
              </Alert>
            )}
          </ListGroup>
        </div>

        {this.state.addShow && (
          <AddModal
            show={true}
            addExperiencePost={this.addExperiencePost}
            addModalToggleHandler={() => this.addModalToggleHandler()}
          />
        )}
        {this.state.editShow && (
          <EditModal
            show={true}
            deleteExperience={this.deleteExperience}
            editModalToggleHandler={() => this.editModalToggleHandler()}
            experience={this.state.currentexperience}
            editExperiencePut={this.editExperiencePut}
          />
        )}
      </div>
    );
  }
}

export default Experience;
