import "./App.css";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import Profile from "../profile/Profile";
import React from "react";
import Feed from "../feed/Feed";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route
        path="/posts"
        element={
          <Feed
            navigate={useNavigate()}
            // user={user}
            // token={token}
            // setToken={setToken}
          />
        }
      />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
      <Route path="/profile" element={<Profile navigate={useNavigate()} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
