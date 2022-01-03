import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");

  const [loading, setLoading] = useState();

  const [error, setError] = useState();
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords don't match!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an account!");
    }
  }

  return (
    <Container>
      <h1>register</h1>
      <Row>
        <Col md={{ span: 5, offset: 4 }} className="login">
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Full Name"
                className="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmpassword"
                type="password"
                placeholder="Confirm Password"
                className="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                name="agree"
                label="I agree to the Terms &amp; Conditions"
                value={agree}
                onChange={(e) => setAgree(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="submit"
              disabled={loading}
            >
              Submit
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form>
          <div className="line-1">
            <hr className="line-l" />
          </div>
          <div className="links-1">
            <Link to="/login" style={{ fontSize: "15px", marginLeft: "3rem" }}>
              already have an account? need to signIn
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
