import React, { useState, useEffect } from "react";
import { useRole } from "./RoleContext";

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("User");
  const { setRole } = useRole();
  const [fadeBackground, setFadeBackground] = useState(false); // ✅ Background fade effect

  useEffect(() => {
    setFadeBackground(true); // ✅ Activate background fade when component mounts
  }, []);

  const handleLogin = () => {
    setRole(selectedRole);
    alert(`Welcome, ${selectedRole} ${username || "Guest"}!`);
    setIsAuthenticated(true);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Background Layer */}
      <div style={{ 
        ...styles.background, 
        opacity: fadeBackground ? 0.5 : 1, // ✅ Background fade effect only
        transition: "opacity 0.5s ease"
      }} />

      {/* Login Box */}
      <div style={styles.container}>
        <h2>Task Management App</h2>
        <h3>Login Page</h3>

        <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />

        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} style={styles.input}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button onClick={handleLogin} style={styles.button}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('/task_bkd2.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 1, // ✅ Background is behind everything
  },
  container: {
    maxWidth: "400px",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(101, 154, 216, 0.45)",
    backgroundColor: "#ffffff",
    textAlign: "center",
    position: "relative",
    zIndex: 2, // ✅ Login box stays clear
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1877F2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
};

export default Login;
