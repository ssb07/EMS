
import React from "react";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Welcome! You are logged in 🎉</p>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;