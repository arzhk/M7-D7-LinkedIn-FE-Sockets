import React from "react";
import { Link } from "react-router-dom";

function FeedNews() {
  return (
    <>
      <div className="feed-right-container mb-3 py-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="mb-0 ml-3">LinkedIn News</p>
          <div className="infoicon-container d-flex justify-content-center align-items-center mr-3">
            <i className="d-flex align-items-center justify-content-center fas fa-info"></i>
          </div>
        </div>
        <Link className="profile-link mb-2" to="/">
          <div className="news-post d-flex flex-column px-3">
            <div className="d-flex align-items-center">
              <div
                className="mr-2"
                style={{ height: 8, width: 8, backgroundColor: "rgb(112, 181, 249)", borderRadius: 4 }}
              ></div>
              <p className="font-weight-bold mb-0">Dogecoin to the moon!</p>
            </div>
            <p className="d-block ml-3 mb-0 grey-text">12h ago - 105,355,203 readers</p>
          </div>
        </Link>
        <Link className="profile-link mb-2" to="/">
          <div className="news-post d-flex flex-column px-3">
            <div className="d-flex align-items-center">
              <div
                className="mr-2"
                style={{ height: 8, width: 8, backgroundColor: "rgb(112, 181, 249)", borderRadius: 4 }}
              ></div>
              <p className="font-weight-bold mb-0">$GME Short squeeze continues</p>
            </div>
            <p className="ml-3 grey-text mb-0">1d ago - 117,748 readers</p>
          </div>
        </Link>
        <Link className="profile-link mb-2" to="/">
          <div className="news-post d-flex flex-column px-3">
            <div className="d-flex align-items-center">
              <div
                className="mr-2"
                style={{ height: 8, width: 8, backgroundColor: "rgb(112, 181, 249)", borderRadius: 4 }}
              ></div>
              <p className="font-weight-bold mb-0">$1 Dogecoin trending on Twitter</p>
            </div>
            <p className="ml-3 grey-text mb-0">10h ago - 63,687 readers</p>
          </div>
        </Link>
        <Link className="profile-link mb-2" to="/">
          <div className="news-post d-flex flex-column px-3">
            <div className="d-flex align-items-center">
              <div
                className="mr-2"
                style={{ height: 8, width: 8, backgroundColor: "rgb(112, 181, 249)", borderRadius: 4 }}
              ></div>
              <p className="font-weight-bold mb-0">Tesla set to enter a roaring market</p>
            </div>
            <p className="ml-3 grey-text mb-0">21h ago - 295,779 readers</p>
          </div>
        </Link>
        <Link className="profile-link mb-2" to="/">
          <div className="news-post d-flex flex-column px-3">
            <div className="d-flex align-items-center">
              <div
                className="mr-2"
                style={{ height: 8, width: 8, backgroundColor: "rgb(112, 181, 249)", borderRadius: 4 }}
              ></div>
              <p className="font-weight-bold mb-0">Amazon is adding 2.8K workers a day</p>
            </div>
            <p className="ml-3 grey-text mb-0">1d ago - 149,634 readers</p>
          </div>
        </Link>
        <Link className="profile-link d-inline-block ml-4 py-0" style={{ borderRadius: 4 }} to="/">
          <p className="grey-text px-2 mb-0">
            Show more <i className="fas fa-angle-down"></i>
          </p>
        </Link>
      </div>
    </>
  );
}

export default FeedNews;
