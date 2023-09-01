import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { Helmet } from "react-helmet";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA

import { connect } from "react-redux";
import { login } from "./authActions";

const mapDispatchToProps = {
  login,
};

function LoginForm(props) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.login(email, password);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Form onSubmit={handleSubmit} className="w-75">
          <h2 className="text-center mb-4">Sign In</h2>

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

          <Form.Group className="mb-3">
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={(response) =>
                console.log("reCAPTCHA response:", response)
              }
            />
          </Form.Group>

          <Button variant="primary" type="submit" block>
            Sign in
          </Button>

          <a
            href="/api/auth/google"
            className="btn text-white btn-outline-secondary m-1">
            Login with Google
          </a>

          <div className="text-center mt-3">
            <p>
              Not a member? <a href="/register">Register</a>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
}

export default connect(null, mapDispatchToProps)(LoginForm);
