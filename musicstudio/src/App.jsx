import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { PlayerProvider } from "./context/PlayerContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import YourPlaylist from "./pages/YourPlaylist";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CreateYourPlaylist from "./pages/CreateYourPlaylist";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
        />
        <Routes>

          {/* Default Route */}

          <Route
            path="/"
            element={<Navigate to="/login" />}
          />

          {/* Public Routes */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<SignUp />}
          />

          {/* Protected Routes */}

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />

          <Route
            path="/yourplaylist"
            element={
              <PrivateRoute>
                <YourPlaylist />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/createyourplaylist"
            element={
              <PrivateRoute>
                <CreateYourPlaylist />
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}