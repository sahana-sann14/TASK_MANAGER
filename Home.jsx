import React from "react";
import "./Home.css";
import backgroundImage from "/task_bkd2.png"; // Import image

const Home = ({ onGetStarted }) => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="home-title">Welcome to the Task Management App</h1>
      <p className="home-text">Task Master Keeps you Organized and Productive</p>
      <button className="button" onClick={onGetStarted}>Get Started</button>
    </div>
  );
};

export default Home;
