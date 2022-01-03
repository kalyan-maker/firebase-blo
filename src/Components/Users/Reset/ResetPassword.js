import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const navigate = useNavigate();

  const query = useQuery();

  const { resetPassword } = useAuth();

  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(query.get("oobCode"), password, confirmPassword);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to reset-password!");
    }
  }
  return (
    <Container>
      <h1>reset-password</h1>
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="login">
          <Form className="loginform" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
                type="password"
                placeholder="Confirm Password"
                className="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {error && <p className="error">{error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
