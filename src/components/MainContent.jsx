import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import MainProfileBlock from "./MainProfileBlock";
import Main from "./Main";
import SideBar from "./SideBar";
import FullPageLoader from "./loaders/FullPageLoader";

function MainContent(props) {
  let { id } = useParams();
  const [currentUserID, setCurrentUserID] = useState(id);
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    if (props.userData.isSuccess) {
      setIsLoading(false);
    } else {
      history.push("/login");
    }
  }, [props.userData._id]);

  React.useEffect(() => {
    setCurrentUserID(id);
  }, [id]);
  return (
    <>
      <FullPageLoader />
      {!isLoading && (
        <Container>
          <Row>
            <Col xs={8}>
              <MainProfileBlock
                userID={currentUserID}
                loggedInUserData={props.userData}
                contactInfoHandler={props.contactInfoHandler}
                setUserDataHandler={props.setUserDataHandler}
              />
              <Main
                userID={currentUserID}
                loggedInUserData={props.userData}
                setUserDataHandler={props.setUserDataHandler}
              />
            </Col>
            <Col xs={4}>
              <SideBar />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default MainContent;
