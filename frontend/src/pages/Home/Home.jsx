import React from "react";
import "./Home.css";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Navbar = ({ onSearch, onRequests, onLogout, isLoading }) => (
  <nav className="navbar">
    <div className="navbar-content">
      <h1 className="app-title">BubbleTalk</h1>
      <div className="nav-options">
        <button className="nav-button" onClick={onSearch} aria-label="Search">
          Search
        </button>
        <button className="nav-button" onClick={onRequests} aria-label="Requests">
          Requests
        </button>
        <button
          className="logout-button"
          onClick={onLogout}
          disabled={isLoading}
          aria-label="Logout"
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  </nav>
);

const MainContent = () => (
  <div className="main-content">
    <Sidebar />
    <MessageContainer />
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const { logout, loading } = useLogout();

  const handleLogout = async () => {
    await logout();
    if (!loading) navigate("/login");
  };

  return (
    <div className="chat-app">
      <Navbar
        onSearch={() => navigate("/search")}
        onRequests={() => navigate("/requests")}
        onLogout={handleLogout}
        isLoading={loading}
      />
      <MainContent />
    </div>
  );
};

export default Home;
