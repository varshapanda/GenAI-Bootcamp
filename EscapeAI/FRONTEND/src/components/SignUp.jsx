import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  function handleLoginNav(e) {
    e.preventDefault();
    navigate("/login");
  }

  function handleSignup(e) {
    e.preventDefault();
    // TODO: Add backend signup functionality here
    console.log("Signup function placeholder");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleSignup}
            className="bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Sign Up
          </button>
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <button
              onClick={handleLoginNav}
              className="text-pink-500 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
