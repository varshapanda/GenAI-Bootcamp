import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/LandingPage";
import GoogleAuth from "./components/authentication/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<GoogleAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
