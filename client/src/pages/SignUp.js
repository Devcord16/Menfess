import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { Helmet } from "react-helmet";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
  });
  const { username, password, email, fullname, about } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Login Handle
  };

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

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>About</Form.Label>
            <Form.Control
              name="about"
              value={about}
              onChange={handleInputChange}
              placeholder="About Me"
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
            Sign up
          </Button>

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

export default SignUpForm;
