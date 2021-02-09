import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import env from "react-dotenv";
import { Alert } from "react-bootstrap";
import FullPageLoader from "./loaders/FullPageLoader";

function Login(props) {
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  let history = useHistory();

  const inputHandler = (event) => {
    setLoginInput({ ...loginInput, [event.target.id]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login/`, {
        method: "POST",
        body: JSON.stringify(loginInput),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.isSuccess) {
        setShowSuccess(true);
        props.setUserData(data);
        setTimeout(() => {
          history.push("/feed");
        }, 3000);
      } else {
        setLoginInput({
          username: loginInput.username,
          password: "",
        });
        setErrors(data.Errors);
        setShowErrors(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="login-main-container" className="d-flex flex-column justify-content-center align-items-center">
      <div>
        <div className="login-top-container d-flex align-items-center justify-content-start">
          <div className="login-title d-flex mb-3">
            <h4>Linked</h4>
            <i className="fab fa-linkedin ml-1"></i>
          </div>
        </div>
        <div className="login-content-container mb-5">
          <div className="mb-3">
            <h2 className="mb-1">Sign in</h2>
            <p className="mb-0">Stay updated on your professional world</p>
            {showErrors &&
              errors.map((error, index) => (
                <small key={index} className="text-danger">
                  {error.value.msg}
                </small>
              ))}
          </div>
          <div className="d-flex flex-column">
            <div className="login-input-wrap mb-4">
              <p className="login-label mb-0">Username</p>
              <input
                id="username"
                type="text"
                onChange={(event) => inputHandler(event)}
                value={loginInput.username}
                className={showErrors ? "red-border" : undefined}
              ></input>
            </div>
            <div className="login-input-wrap mb-2">
              <p className="login-label mb-0">Password</p>
              <input
                id="password"
                type="password"
                onChange={(event) => inputHandler(event)}
                value={loginInput.password}
                className={showErrors ? "red-border" : undefined}
              ></input>
            </div>
            <Link className="forgot-password mb-4" to="/login/forgotpassword">
              Forgot Password?
            </Link>
            <button className="sign-in-btn" onClick={loginHandler}>
              Sign in
            </button>
          </div>
        </div>
        <div className="text-center">
          {showSuccess && (
            <Alert variant="success" className="swing-in-top-fwd">
              Success! Logging In...
            </Alert>
          )}
          <p>
            New to LinkedIn?{" "}
            <Link to="/register" className="font-weight-bold">
              Join now
            </Link>
          </p>
          <small className="grey-text">This is a dummy login page/project, please don't sue us.</small>
        </div>
      </div>
    </div>
  );
}

export default Login;
