import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/LandingPage";
import GoogleAuth from "./components/authentication/Auth";
import RoomSelection from "./components/RoomSelection";
import GameScreen from "./components/GameScreen";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<GoogleAuth />}/>
        <Route path="/RoomSelect" element={<RoomSelection/>}/>
        <Route path="/GameScreen" element={<GameScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
