import React from "react";
import { useNavigate } from "react-router-dom";
import {useState} from 'react'

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUpNav(e) {
    e.preventDefault(); // prevent form submission
    navigate("/signup");
  }

  function handleLogin(e) {
    e.preventDefault();
    // TODO: Add backend login functionality here
    console.log("Login function placeholder");
  }
  function handleLogin2(e) {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

     if (!storedUser) {
      alert("No user found. Please sign up first.");
      return;
    }

    if (username === storedUser.username && password === storedUser.password) {
      alert("Login successful!");
      navigate("/Menu");
    } else {
      alert("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('assets/brick.jpg')] bg-cover bg-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Game Login
        </h2>
        <form onSubmit={handleLogin2}className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin2}
            className="bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={handleSignUpNav}
              className="text-red-500 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
