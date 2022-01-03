import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

function ForgotPassword() {
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await forgotPassword(email);
      navigate("/");
      alert("email sent successfully");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to reset-password!");
    }
  }

  return (
    <Container>
      <h1>forgot password</h1>
      <Row>
        <Col md={{ span: 6, offset: 2 }}>
          <Form className="loginform" onSubmit={handleSubmit}>
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
            <Button
              variant="primary"
              type="submit"
              className="submit"
              disabled={loading}
            >
              Send
            </Button>
            {error && <p className="error">{error}</p>}
          </Form>
          <div className="links-1">
            <Link to="/login" className="loginsign">
              login
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
