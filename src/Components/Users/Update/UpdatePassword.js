import React, { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const navigate = useNavigate();

  //useAuth
  const { update } = useAuth();

  //use state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //error
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  //submit
  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords don't match!");
    }

    try {
      setError("");
      setLoading(true);
      await update(password, confirmPassword);
      navigate("/profile");
      alert("Password Update Successfully");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to set new-password!");
    }
  }
  return (
    <Container>
      <h1>update-password</h1>
      <Row>
        <Col
          md={{ span: 4, offset: 4 }}
          className="login"
          onSubmit={handleSubmit}
        >
          <Form className="loginform">
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
              Update
            </Button>
            {error && <p className="error">{error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdatePassword;
