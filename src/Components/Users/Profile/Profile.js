import React from "react";
import { Container, Form, FormLabel, Row, Col } from "react-bootstrap";
import { useAuth } from "../../../Context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { currentUser } = useAuth();
  return (
    <Container>
      <h1>Profile</h1>
      <Row>
        <Col>
          <img src={currentUser.photoURL} alt="user" />
        </Col>
        <Col>
          <Form>
            <FormLabel>Name : {currentUser.displayName}</FormLabel>
            <br />
            <FormLabel>Email : {currentUser.email}</FormLabel>
            <br />
            <FormLabel as={Link} to="/update-password">
              New Password{" "}
            </FormLabel>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
