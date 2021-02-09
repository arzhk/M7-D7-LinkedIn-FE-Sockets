import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Jobs from "./components/Jobs";
import Learning from "./components/Learning";
import MainContent from "./components/MainContent";
import ContactInfoPopup from "./components/ContactInfoPopup";
import MainFeedContent from "./components/MainFeedContent";
import Login from "./components/Login";
import Registration from "./components/Registration";
import MyNetwork from "./components/MyNetwork";
import SignOut from "./components/SignOut";

function App() {
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState({});

  const contactInfoHandler = () => {
    setIsContactInfoOpen(!isContactInfoOpen);
  };

  const setUserDataHandler = (data) => {
    setLoggedInUserData(data);
  };

  useEffect(() => {
    setLoggedInUserData(loggedInUserData);
  }, [loggedInUserData]);

  return (
    <Router>
      <Route path="/" exact>
        <Login setUserData={setUserDataHandler} />
      </Route>
      <Route path="/login" exact>
        <Login setUserData={setUserDataHandler} />
      </Route>
      <Route path="/register" exact>
        <Registration />
      </Route>
      {loggedInUserData.isSuccess && (
        <Route path="/">
          <NavBar userData={loggedInUserData} setUserData={setUserDataHandler} />
        </Route>
      )}
      <Route path="/feed" exact>
        <MainFeedContent userData={loggedInUserData} />
      </Route>
      <Route path="/profile/:id" exact>
        <MainContent
          userData={loggedInUserData}
          contactInfoHandler={contactInfoHandler}
          setUserDataHandler={setUserDataHandler}
        />
      </Route>
      <Route path="/network" exact>
        <MyNetwork />
      </Route>
      {isContactInfoOpen && <ContactInfoPopup contactInfoHandler={contactInfoHandler} />}
      <Route path="/learning" exact component={Learning} />
      <Route path="/jobs" exact component={Jobs} />
      {loggedInUserData.isSuccess && <Route path="/" component={Footer} />}
      <Route path="/signout" exact component={SignOut} />
    </Router>
  );
}

export default App;
