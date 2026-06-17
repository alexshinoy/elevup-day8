import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Feed from "./pages/Feed";
import VideoDetail from "./pages/VideoDetail";
import "./App.css"; 

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router basename="/elevup-day8">
      <div className="app-container">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="main-content">
          <Sidebar />
          <div className="page-content">
            <Routes>
              {/* Pass a 'view' prop so the Feed knows what data to load */}
              <Route path="/" element={<Feed view="home" searchTerm={searchTerm} />} />
              <Route path="/explore" element={<Feed view="explore" searchTerm={searchTerm} />} />
              <Route path="/subscriptions" element={<Feed view="subscriptions" searchTerm={searchTerm} />} />
              <Route path="/history" element={<Feed view="history" searchTerm={searchTerm} />} />
              <Route path="/video/:id" element={<VideoDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;