import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { app } from "../../Utils/Firebase";
import { useAuth } from "../../Context/AuthContext";

function Home() {
  const [postLists, setPostList] = useState([]);

  const currentUser = useAuth();
  const db = getFirestore(app);

  const docRef = collection(db, "users");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(docRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  const deletePost = async (id) => {
    const postDoc = doc(db, "users", id);
    await deleteDoc(postDoc);
  };

  return (
    <Container>
      <Row>
        {postLists.map((post) => {
          return (
            <div className="post">
              <div className="postHeader">
                <div className="title">
                  <h1 style={{ fontSize: "10px" }}> {post.title}</h1>
                  <div className="postTextContainer"> {post.post} </div>
                </div>
                <div className="deletePost" style={{ marginLeft: "auto" }}>
                 {currentUser ? (
                    <button
                      type="button"
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      &#128465;
                    </button>
                  ) : (
                    <button type="button" disabled>
                      &#128465;
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Row>
    </Container>
  );
}

export default Home;
