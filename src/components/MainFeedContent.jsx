import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import FeedLeft from "./FeedLeft";
import FeedMiddle from "./FeedMiddle";
import FeedRight from "./FeedRight";
import StickyBox from "react-sticky-box";
import FullPageLoader from "./loaders/FullPageLoader";

function MainFeedContent(props) {
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    if (props.userData.isSuccess) {
      setIsLoading(false);
    } else {
      history.push("/login");
    }
  }, [props.userData._id]);

  return (
    <>
      <FullPageLoader />
      {!isLoading && (
        <Container className="pt-5">
          <Row className="mt-5">
            <Col xs={3}>
              <StickyBox offsetTop={65} offsetBottom={20}>
                <FeedLeft userData={props.userData} />
              </StickyBox>
            </Col>
            <Col xs={5} className="pb-5" style={{ zIndex: 10 }}>
              <FeedMiddle userData={props.userData} />
            </Col>
            <Col xs={4}>
              <StickyBox offsetTop={65} offsetBottom={20}>
                <FeedRight />
              </StickyBox>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default MainFeedContent;
