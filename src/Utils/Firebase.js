// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVH9u-8Ju4H0E5EryYCpUGrLU9C7rqSPk",
  authDomain: "myblog-c7776.firebaseapp.com",
  projectId: "myblog-c7776",
  storageBucket: "myblog-c7776.appspot.com",
  messagingSenderId: "178034944620",
  appId: "1:178034944620:web:cdfd3e4fb577d80f48c649"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
