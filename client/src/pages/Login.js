import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Card, Col, Row } from "react-bootstrap";
import { useLoaderData } from "react-router";
import { Helmet } from "react-helmet";

function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { username, password } = formData;

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
        <title>Login</title>
      </Helmet>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Form onSubmit={handleSubmit} className="w-75">
          <h2 className="text-center mb-4">Sign In</h2>

          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="username"
              value={username}
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

          <Form.Group controlId="formBasicCheckbox" className="mb-3">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button variant="primary" type="submit" block>
            Sign in
          </Button>

          <div className="text-center mt-3">
            <p>
              Not a member? <a href="#!">Register</a>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
}

export default LoginForm();
