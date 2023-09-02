import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { signUp, setAccessToken } from "./authActions";

const mapDispatchToProps = {
  signUp,
};

function SignUpForm(props) {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const { fullname, username, email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await props.signUp(fullname, username, email, password);

      setAccessToken();
      console.log("Sign UP");
    } catch (error) {
      console.error("Error during signUp:", error);
    }
  };
  setInterval(function () {
    setAccessToken();
  }, 300000);

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Form onSubmit={handleSubmit} className="w-75">
          <h2 className="text-center mb-4">Sign Up</h2>

          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              name="fullname"
              value={fullname}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={(response) =>
                console.log("reCAPTCHA response:", response)
              }
            />
          </Form.Group>

          <Button
            variant="outline-primary"
            className="btn text-white btn-outline-primary m-1"
            type="submit">
            Sign up
          </Button>

          <a
            href="/api/auth/google"
            className="btn text-white btn-outline-secondary m-1"
            onClick={setAccessToken()}>
            Login with Google
          </a>

          <div className="text-center mt-3">
            <p>
              Already a member? <a href="/login">Login!</a>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
}

export default connect(null, mapDispatchToProps)(SignUpForm);
