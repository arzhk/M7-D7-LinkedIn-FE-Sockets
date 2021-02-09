import React, { Component } from "react";
import env from "react-dotenv";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Interests from "./Interests";

export default class Main extends Component {
  state = { profile: {} };

  dataFetcher = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/${this.props.userID}`);
      const result = await response.json();
      if (response.ok) {
        this.setState({ profile: result });
      }
    } catch (e) {}
  };

  componentDidMount = async () => {
    await this.dataFetcher();
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.userID !== this.props.userID) {
      await this.dataFetcher();
    }
  };

  render() {
    return (
      <div>
        <Experience
          userID={this.props.userID}
          username={this.state.profile.username}
          loggedInUserData={this.props.loggedInUserData}
          experiences={this.state.profile.experiences}
          dataFetcher={this.dataFetcher}
        />
        <Education />
        <Skills />
        <Interests />
      </div>
    );
  }
}
