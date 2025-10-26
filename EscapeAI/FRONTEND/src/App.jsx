import { Routes, Route } from "react-router-dom";
import Landing from "./components/LandingPage";
import GoogleAuth from "./components/authentication/Auth";
import RoomSelection from "./components/RoomSelection";
import GameScreen from "./components/GameScreen";
import Result from "./components/Result";
import PrivacyPolicy from "./components/authentication/PrivacyPolicy";
import Terms from "./components/authentication/Terms";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<GoogleAuth />} />
        <Route path="/RoomSelect" element={<RoomSelection />} />
        <Route path="/GameScreen" element={<GameScreen />} />
        <Route path="/Result/:sessionId" element={<Result />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
  );
}

export default App;
