import React from "react"
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MainMenu() {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    difficulty: "",
    theme: "",
    roomType: "",
    numberOfRooms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending to backend:", formData);
    navigate("/GameScreen")
    //Add backend / AI integration here
  };

  return (
    <div className="min-h-screen flex bg-[url('assets/robo2.png')] bg-cover bg-center text-white overflow-hidden">
      
      {/*panel*/}
      <div className="w-full md:w-1/3 bg-black/70 backdrop-blur-md p-8 flex flex-col justify-center animate-slideInLeft shadow-2xl border-r border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center tracking-wider glow-text">
           Escape Room Setup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
        {/*Difficulty*/}
          <div>
            <label className="block mb-2 text-sm font-semibold uppercase tracking-wider">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800/60 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            >
              <option value="">Select</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/*Theme*/}
          <div>
            <label className="block mb-2 text-sm font-semibold uppercase tracking-wider">
              Theme
            </label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800/60 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            >
              <option value="">Select</option>
              <option value="Ancient Temple">Ancient Temple</option>
              <option value="Haunted Mansion">Haunted Mansion</option>
              <option value="Detective Mystery">Detective Mystery</option>
              <option value="Fantasy Dungeon">Fantasy Dungeon</option>
              <option value="Post-Apocalyptic Lab">Post-Apocalyptic Lab</option>
              <option value="Futuristic">Futuristic</option>
            </select>
          </div>

          {/*Room Type*/}
          <div>
            <label className="block mb-2 text-sm font-semibold uppercase tracking-wider">
              Room Type
            </label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800/60 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            >
              <option value="">Select</option>
              <option value="Logic & Riddles">Logic & Riddles</option>
              <option value="Observation based">Observation based</option>
              <option value="Pattern recognition">Pattern recognition</option>
              <option value="Story deduction">Story deduction</option>
              <option value="Mixed">Mixed (random combo)</option>
            </select>
          </div>

          {/*Number of Rooms*/}
          <div>
            <label className="block mb-2 text-sm font-semibold uppercase tracking-wider">
              Number of Rooms
            </label>
            <select
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800/60 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            >
              <option value="">Select</option>
              <option value="2">2</option>
              <option value="3-4">3-4</option>
              <option value="5+">5+</option>
            </select>
          </div>

          {/*Submit*/}
          <button
            type="submit"
            className="w-full mt-4 bg-red-600 hover:bg-red-700 active:bg-indigo-800 transition-colors p-3 rounded-md font-semibold text-lg tracking-wider shadow-lg hover:shadow-indigo-500/30 animate-pulseSlow"
          >
            Generate Adventure
          </button>
        </form>
      </div>

      {/*Decorative / Atmosphere*/}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center relative animate-slideInRight">
        <div className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 text-center max-w-md animate-float">
          <h2 className="text-4xl font-bold mb-4 tracking-widest glow-text">
            Escape Awaits...
          </h2>
          <p className="text-gray-300 text-sm">
            Select your parameters on the left to craft a unique and immersive escape room scenario powered by AI.
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-60px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(60px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
          @keyframes pulseSlow {
            0%, 100% { box-shadow: 0 0 0px rgba(99, 102, 241, 0.6); }
            50% { box-shadow: 0 0 15px rgba(99, 102, 241, 0.6); }
          }
          .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
          .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
          .animate-float { animation: float 4s ease-in-out infinite; }
          .animate-pulseSlow { animation: pulseSlow 2s infinite; }
          .glow-text { text-shadow: 0 0 10px rgba(99, 102, 241, 0.7); }
        `}
      </style>
    </div>
  );
}

export default MainMenu;


