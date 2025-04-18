import React, { useState } from "react";
import { useRole } from "./RoleContext";
import { PieChart, Pie, Cell, Legend } from "recharts";

export default function Dashboard({ tasks }) {
  const { role } = useRole();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const pendingTasks = tasks.filter((task) => task.status === "Pending");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");

  const data = [
    { name: "Completed", value: completedTasks.length },
    { name: "Pending", value: pendingTasks.length },
    { name: "In Progress", value: inProgressTasks.length },
  ];

  const COLORS = ["pink", "blue", "goldenrod"];

  return (
    <div style={styles.container}>
      <h2 style={{ 
        fontSize: "20px",  
        marginBottom: "10px",  
        marginTop: "-15px",  
        color: "#333"
      }}>
        Dashboard ({role})
      </h2>
       
      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "60%", borderRadius: "5px", border: "1px solid grey" }}
        />
        <button 
          style={{ 
            padding: "8px 16px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer" 
          }}
        >
          + Task
        </button>
      </div>

      {/* Box and Chart side by side */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {/* Left - 3 Boxes */}
        <div style={{ display: "flex", gap: "20px", flex: "1" }}>
          <div style={styles.cardAssigned}>
            <h3>📋 Total Assigned Tasks</h3>
            <p>{tasks.length}</p>
          </div>

          <div style={styles.cardCompleted}>
            <h3>✅ Total Completed Tasks</h3>
            <p>{completedTasks.length}</p>
          </div>

          <div style={styles.cardPending}>
            <h3>⏳ Total Pending Tasks</h3>
            <p>{pendingTasks.length}</p>
          </div>
        </div>

        {/* Right - Chart */}
        <div style={styles.chartBox}>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Task List Below */}
      <div style={styles.taskList}>
        <h3>📋 Assigned Task List</h3>
        {tasks.length === 0 ? (
          <p>No tasks assigned.</p>
        ) : (
          <ul>
            {filteredTasks.map((task) => (
              <li key={task.id}>
                <strong>{task.taskName}</strong> - {task.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ✅ Styles defined below
const styles = {
  container: {
    padding: "20px",
  },
   searchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchInput:  {
    width: "65%",
    padding: "9px",
    borderRadius: "18px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    boxShadow: "0px 1px 4px rgba(0,0,0,0.2)",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  cardAssigned:{
    background: "linear-gradient(to bottom,rgb(104, 128, 236),rgb(235, 231, 236))",
    padding: "20px",
    borderRadius: "8px",
    color: "#fff",
    textAlign: "center",
    width: "160px",
    minHeight: "120px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  cardCompleted:  {
    background: "linear-gradient(to bottom,rgb(110, 171, 221),rgb(229, 240, 245))",
    padding: "20px",
    borderRadius: "8px",
    color: "#fff",
    textAlign: "center",
    width: "160px",
    minHeight: "120px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  cardPending: {
    background: "linear-gradient(to bottom,rgb(128, 120, 240),rgb(247, 243, 238))",
    padding: "20px",
    borderRadius: "8px",
    color: "#fff",
    textAlign: "center",
    width: "160px",
    minHeight: "120px",
    height: "150px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  chartBox: {
    background: "#F5F5F5",
    padding: "15px",
    borderRadius: "8px",
    width: "23%",
    textAlign: "center",
    minHeight: "250px",
     height: "380px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
    marginLeft: "30",
    float: "right",
    position: "absolute",
    right: "0",
  },
  taskList: {
    background: "linear-gradient(to left, rgb(231, 236, 241), rgb(135, 162, 211),rgb(101, 136, 233))",
    padding: "35px",
    borderRadius: "8px",
    color: "#fff",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
    width: "59%",
    minHeight: "auto",
    marginTop: "20px", 
    position: "relative",  
    zIndex: 1  
},
};
