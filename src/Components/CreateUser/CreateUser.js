import React, { useState } from "react";
import {
  Container,
  Row,
  FloatingLabel,
  Form,
  Col,
  Button,
  FormGroup,
} from "react-bootstrap";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../Utils/Firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const db = getFirestore(app);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const postRef = await addDoc(collection(db, "users"), {
      title,
      post,
    });
    console.log("Document written with ID: ", postRef.id);

    navigate("/");

    //upload images
    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log(downloadURL);
          //upload images to firestore document

          const docRef = await addDoc(collection(db, "users"), {
            imgurl: downloadURL,
          });
          console.log("Document written with ID: ", docRef.id);
        });
      }
    );
  };

  return (
    <Container>
      <h1>Create Post</h1>
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <Form onSubmit={onSubmit}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="text"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="floatingInputCustom">Title</label>
            </Form.Floating>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="Comments"
              className="mb-3"
              onChange={(e) => setPost(e.target.value)}
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
            <FormGroup className="mb-3 ">
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                onChange={(e) => setFile(e.target.value)}
              />
            </FormGroup>
            <Button
              variant="primary"
              type="submit"
              style={{ marginLeft: "30px" }}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateUser;
