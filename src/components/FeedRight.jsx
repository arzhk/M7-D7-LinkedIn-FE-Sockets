import React from "react";
import FeedAddToYourFeed from "./FeedAddToYourFeed";
import FeedMostViewedCourses from "./FeedMostViewedCourses";
import FeedNews from "./FeedNews";
import FeedRightFooter from "./FeedRightFooter";

function FeedRight() {
  return (
    <>
      <FeedNews />
      <FeedMostViewedCourses />
      <FeedAddToYourFeed />
      <FeedRightFooter />
    </>
  );
}

export default FeedRight;
