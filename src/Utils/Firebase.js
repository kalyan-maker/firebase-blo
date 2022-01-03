// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS9_nhhVT-0_v3iKC3DbjwuttyUQSyLHA",
  authDomain: "blog-5da4c.firebaseapp.com",
  databaseURL: "https://blog-5da4c-default-rtdb.firebaseio.com",
  projectId: "blog-5da4c",
  storageBucket: "blog-5da4c.appspot.com",
  messagingSenderId: "917031802538",
  appId: "1:917031802538:web:1b61ddd47cdb337c58e2d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
