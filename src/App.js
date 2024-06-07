import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import ChecksPage from "./pages/ChecksPage";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navigation";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/checks" element={<ChecksPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
