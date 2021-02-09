import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import env from "react-dotenv";

function Registration() {
  const [registrationInput, setRegistrationInput] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  let history = useHistory();

  const inputHandler = (event) => {
    setRegistrationInput({ ...registrationInput, [event.target.id]: event.target.value });
  };

  const registrationHandler = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/`, {
        method: "POST",
        body: JSON.stringify(registrationInput),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.isSuccess) {
        setRegistrationInput({
          name: "",
          surname: "",
          email: "",
          username: "",
          password: "",
        });
        setShowSuccessMessage(true);
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      } else {
        setErrors(data.Errors);
        setShowErrors(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        id="registration-main-container"
        className="d-flex flex-column justify-content-start align-items-center pt-5"
      >
        <div className="text-center">
          <div className="login-top-container d-flex align-items-center justify-content-center">
            <div className=" d-flex flex-column align-items-center mb-3">
              <div className="login-title d-flex align-items-center mb-3">
                <h3 className="font-weight-bold mb-0">Linked</h3>
                <i className="fab fa-linkedin ml-1"></i>
              </div>
              <h3 className="font-weight-normal">Make the most of your professional life</h3>
            </div>
          </div>
          {showErrors && (
            <div className="mb-4">
              {errors.map((error, index) => (
                <small key={index} className="text-danger d-block">
                  {error.msg}
                </small>
              ))}
            </div>
          )}
          {showSuccessMessage && (
            <Alert variant="success" className="mb-2 swing-in-top-fwd">
              You have successfully registered! Redirecting you to the login page...
            </Alert>
          )}
          <div className="login-content-container d-flex justify-content-center w-75 mb-5">
            <div className="d-flex flex-column align-items-center">
              <div className="login-input-wrap mb-2">
                <p className="login-label mb-0">First Name</p>
                <input
                  id="name"
                  type="text"
                  onChange={(event) => inputHandler(event)}
                  value={registrationInput.name}
                  className={showErrors && "red-border"}
                ></input>
              </div>
              <div className="login-input-wrap mb-2">
                <p className="login-label mb-0">Surname</p>
                <input
                  id="surname"
                  type="text"
                  onChange={(event) => inputHandler(event)}
                  value={registrationInput.surname}
                  className={showErrors && "red-border"}
                ></input>
              </div>
              <div className="login-input-wrap mb-2">
                <p className="login-label mb-0">Email Address</p>
                <input
                  id="email"
                  type="email"
                  onChange={(event) => inputHandler(event)}
                  value={registrationInput.email}
                  className={showErrors && "red-border"}
                ></input>
              </div>
              <div className="login-input-wrap mb-2">
                <p className="login-label mb-0">Username</p>
                <input
                  id="username"
                  type="text"
                  onChange={(event) => inputHandler(event)}
                  value={registrationInput.username}
                  className={showErrors && "red-border"}
                ></input>
              </div>
              <div className="login-input-wrap mb-2">
                <p className="login-label mb-0">Password (8 or more characters)</p>
                <input
                  id="password"
                  type="password"
                  onChange={(event) => inputHandler(event)}
                  value={registrationInput.password}
                  className={showErrors && "red-border"}
                ></input>
              </div>
              <small className="d-block my-3" style={{ color: "rgba(0,0,0,0.6)" }}>
                By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.
              </small>
              <button className="sign-in-btn font-weight-normal mb-3" onClick={registrationHandler}>
                Agree & Join
              </button>
              <p className="mb-0">
                Already on LinkedIn?{" "}
                <Link to="/login" className="font-weight-bold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
          <div className="text-center">
            <small className="grey-text">This is a dummy project, please don't sue us.</small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
