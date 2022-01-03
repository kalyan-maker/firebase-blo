import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function googlesubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      signInWithGoogle();
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to login!");
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to login!");
    }
  }
  return (
    <Container>
      <h1>Login</h1>
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="login">
          <Form onSubmit={submit} className="loginform">
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
            <Button
              variant="primary"
              type="submit"
              className="submit"
              disabled={loading}
            >
              Submit
            </Button>
          </Form>
          {error && <p className="error">{error}</p>}
          <div className="line-1">
            <hr className="line-l" />
          </div>
          <div className="links-1">
            <Link to="/forget-password" className="forgot">
              Forgot Password ?
            </Link>
            <Link to="/register" className="register">
              Create New Account
            </Link>
          </div>
          <span style={{ marginLeft: "8rem" }}>( OR )</span>
          <Button
            className="google"
            style={{
              margin: "20px 30px",
            }}
            onClick={googlesubmit}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="google"
              style={{ height: "20px", width: "20px", marginRight: "10px" }}
            />
            Sign in With Google Account
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
