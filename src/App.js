import "./App.css";
import NavBar from "./Components/Navbar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Users/Login/Login";
import CreateUser from "./Components/CreateUser/CreateUser";
import ForgotPassword from "./Components/Users/Forget/ForgetPassword";
import Register from "./Components/Users/Register/Register";
import ResetPassword from "./Components/Users/Reset/ResetPassword";
import UpdatePassword from "./Components/Users/Update/UpdatePassword";
import About from "./Components/Pages/About";
import Home from "./Components/Pages/Home";
import Profile from "./Components/Users/Profile/Profile";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PublicRoute redirectTo="/login">
                <Home />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/home"
            element={
              <PublicRoute redirectTo="/login">
                <Home />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/about"
            element={
              <PublicRoute redirectTo="/login">
                <About />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/create-post"
            element={
              <PrivateRoute redirectTo="/login">
                <CreateUser />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <PublicRoute redirectTo="/login">
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/forget-password"
            element={
              <PublicRoute redirectTo="/login">
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <PublicRoute redirectTo="/login">
                <Register />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/reset-password"
            element={
              <PublicRoute redirectTo="/">
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/update-password"
            element={
              <PrivateRoute redirectTo="/login">
                <UpdatePassword />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute redirectTo="/login">
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
