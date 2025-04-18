import React, { useState, useEffect } from "react";
import { RoleProvider } from "./RoleContext";
import Dashboard from "./Dashboard";
import TaskManager from "./TaskManager";
import Login from "./Login";
import TaskProgress from "./TaskProgress";
import ChatRoom from "./ChatRoom";
import { Bell } from "lucide-react";
import Home from "./Home";

export default function App() {
  const [showHome, setShowHome] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState(["Task Assigned", "Deadline Approaching"]);

  // ✅ Load tasks from localStorage on mount
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [
      { id: 1, taskName: "Design UI", status: "Completed" },
      { id: 2, taskName: "Develop API", status: "In Progress" },
      { id: 3, taskName: "Write Documentation", status: "Pending" },
    ];
  });

  // ✅ Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActivePage("Dashboard");
  };

  return (
    <RoleProvider>
      {showHome ? (
        <Home onGetStarted={() => setShowHome(false)} />
      ) : !isAuthenticated ? (
        <Login setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <div style={styles.container}>
          {/* ✅ Header */}
          <div style={styles.header}>Task Management</div>

          <div style={styles.sidebar}>
            <h2 style={styles.logo}>Task Manager</h2>

            <div style={styles.notificationIcon} onClick={() => alert("No new notifications!")}>
              <Bell size={24} color="white" />
            </div>

            <button onClick={() => setActivePage("Dashboard")} style={styles.sidebarButton}>🏠 Dashboard </button>
            <button onClick={() => setActivePage("TaskManager")} style={styles.sidebarButton}>📝 Tasks</button>
            <button onClick={() => setActivePage("TaskProgress")} style={styles.sidebarButton}>📊 Task Progress</button>
            <button onClick={() => setActivePage("ChatRoom")} style={styles.sidebarButton}>💬 Chat Room</button>
            <button onClick={handleLogout} style={styles.logoutButton}>🚪 Logout</button>
          </div>

          <div style={styles.mainContent}>
            {activePage === "Dashboard" ? (
              <Dashboard tasks={tasks} />
            ) : activePage === "TaskManager" ? (
              <TaskManager tasks={tasks} setTasks={setTasks} />
            ) : activePage === "TaskProgress" ? (
              <TaskProgress tasks={tasks} />
            ) : (
              <ChatRoom />
            )}
          </div>
        </div>
      )}
    </RoleProvider>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    flexDirection: "column",
  },
  header: {
    width: "100%",
    background: "linear-gradient(to right,rgb(26, 38, 211),rgb(60, 88, 212),rgb(140, 163, 238))",
    padding: "25px",
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "white",
    fontFamily: "Georgia, serif",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: "1",
    position: "relative",
  },
  sidebar: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "230px",
    height: "100vh",
    background: "linear-gradient(to bottom, rgb(26, 38, 211),rgb(60, 88, 212),rgb(140, 163, 238))",
    padding: "20px",
    color: "#fff",
    zIndex: "2", 
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#ffffff",
  },
  notificationContainer: {
    position: "relative",
    marginBottom: "20px",
  },
  sidebarButton: {
    width: "100%",
    padding: "12px",
    background: "rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "10px",
    textAlign: "left",
    fontSize: "16px",
  },
  logoutButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "rgba(260, 255, 255, 0.4) ",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
    textAlign: "left",
    fontSize: "16px",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    marginLeft: "300px",
    background:"rgb(238, 238, 238)",
    overflowY: "auto"
  }
  
};
