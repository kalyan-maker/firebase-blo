import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  signOut,
  confirmPasswordReset,
  signInWithPopup,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { app } from "../Utils/Firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // signup function
  async function signup(email, password, username) {
    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password);

    // update profile
    const user = auth.currentUser;
    await updateProfile(auth.currentUser, {
      displayName: username,
      email: user.email,
      PhotoURL: user.photoURL,
    });

    setCurrentUser({
      ...user,
    });
  }

  //google signup
  async function signInWithGoogle() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider(auth);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const profile = {
          displayName: user.displayName, //get user display name
          email: user.email,
          PhotoURL: user.photoURL,
        };

        //create session storage
        sessionStorage.setItem("blog", token);
        sessionStorage.setItem("blog-user", JSON.stringify(profile));
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  //reset password
  function resetPassword(oobCode, newPassword, confirmPassword) {
    const auth = getAuth(app);
    return confirmPasswordReset(auth, oobCode, newPassword, confirmPassword);
  }

  //forget
  function forgotPassword(email) {
    const auth = getAuth(app);
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/`,
    });
  }

  // login function
  function login(email, password) {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userdetails = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        sessionStorage.setItem("blog-user", JSON.stringify(userdetails));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  }

  // logout function
  function logout() {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("blog-user");
        sessionStorage.removeItem("blog");
        console.log("signout successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log("error");
      });
  }

  //update function
  function update(newPassword) {
    const auth = getAuth(app);
    const user = auth.currentUser;
    updatePassword(user, newPassword)
      .then(() => {
        // Update successful.
        console.log("Update successful");
      })
      .catch((error) => {
        // An error ocurred
        console.log(error);
        alert("an error ocurred");
      });
  }

  const value = {
    currentUser,
    signup,
    signInWithGoogle,
    resetPassword,
    forgotPassword,
    logout,
    login,
    update,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
