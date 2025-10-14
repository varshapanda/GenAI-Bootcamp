import React from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  function handleSignUpNav(e) {
    e.preventDefault(); // prevent form submission
    navigate("/signup");
  }

  function handleLogin(e) {
    e.preventDefault();
    // TODO: Add backend login functionality here
    console.log("Login function placeholder");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Game Login
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleLogin}
            className="bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={handleSignUpNav}
              className="text-indigo-500 font-semibold hover:underline"
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

