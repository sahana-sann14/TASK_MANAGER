import React, { useState } from "react";
import { useRole } from "./RoleContext";

export default function TaskManager({ tasks, setTasks }) {
  const { role } = useRole();
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Add new task
  const handleAddTask = () => {
    if (!taskName || !deadline) {
      alert("Please fill all fields");
      return;
    }
    const newTask = { id: Date.now(), taskName, priority, deadline, status };
    setTasks([...tasks, newTask]);
    resetForm();
  };
  //inprogress
  const handleInProgressTask = (id) => {
  setTasks(tasks.map((task) =>
    task.id === id ? { ...task, status: "In Progress" } : task
  ));
};

  // Delete task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Complete task
  const handleCompleteTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: "Completed" } : task)));
  };

  // Start editing task
  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setTaskName(task.taskName);
    setPriority(task.priority);
    setDeadline(task.deadline);
    setStatus(task.status);
  };

  // Update task
  const handleUpdateTask = () => {
    setTasks(tasks.map((task) =>
      task.id === editingTaskId ? { ...task, taskName, priority, deadline, status } : task
    ));
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setTaskName("");
    setPriority("Low");
    setDeadline("");
    setStatus("Pending");
    setEditingTaskId(null);
  };

  return (
    <div style={styles.container}>
  
      {/* ADD FLEX BOX FOR LEFT & RIGHT SIDE */}
      <div style={{ display: "flex", gap: "30px", justifyContent: "space-between" }}>
  
        {/* LEFT SIDE - TASK ASSIGN */}
        {role === "Admin" && (
          <div style={{ flex: 1, ...styles.taskForm }}>
            <h3>Task Assign</h3>
  
            <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} style={styles.input} />
  
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.input}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
  
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={styles.input} />
  
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.input}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
  
            {editingTaskId ? (
              <button onClick={handleUpdateTask} style={styles.updateButton}>🔄 Update Task</button>
            ) : (
              <button onClick={handleAddTask} style={styles.addButton}>➕ Add Task</button>
            )}
          </div>
        )}
  
        {/* RIGHT SIDE - TASK LIST */}
       
        <div style={{ flex: 1 }}>
  <h3>Task List</h3>
  {tasks.length === 0 ? (
    <p style={styles.noTask}>No tasks found.</p>
  ) : (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={styles.tableHeader}>Title</th>
          <th style={styles.tableHeader}>Priority</th>
          <th style={styles.tableHeader}>Deadline</th>
          <th style={styles.tableHeader}>Action</th>
          <th style={styles.tableHeader}>Result</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} style={styles.tableRow}>
            <td style={styles.tableCell}>{task.taskName}</td>
            <td style={styles.tableCell}>{task.priority}</td>
            <td style={styles.tableCell}>{task.deadline}</td>
            {/* ACTION COLUMN */}
            <td style={styles.tableCell}>
              {role === "User" && (
                <button onClick={() => handleDeleteTask(task.id)} style={styles.deleteBtn}>
                  Delete
                </button>
              )}
              {role === "Admin" && (
                <>
                  <button onClick={() => handleEditTask(task)} style={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </>
              )}
            </td>
            {/* RESULT COLUMN */}
            <td style={styles.tableCell}>
  {role === "User" && (
    <div style={{ display: "flex", gap: "8px" }}>
      {task.status === "Pending" && (
        <>
          <button onClick={() => handleInProgressTask(task.id)} style={styles.inProgressBtn}>
            In Progress
          </button>
          <button onClick={() => handleCompleteTask(task.id)} style={styles.completeBtn}>
            Complete
          </button>
        </>
      )}
      {task.status === "In Progress" && (
        <>
          <span style={{ marginRight: "8px" }}>In Progress</span>
          <button onClick={() => handleCompleteTask(task.id)} style={styles.completeBtn}>
            Complete
          </button>
        </>
      )}
      {task.status === "Completed" && <span>Completed</span>}
    </div>
  )}
  {role === "Admin" && <span>{task.status}</span>}
</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>           
            </div>
        </div>
  );
}

// Function to return a linear gradient for different statuses
const getStatusGradient = (status) => {
  switch (status) {
    case "Completed":
      return "linear-gradient(to right,rgb(146, 187, 233))";
    case "In Progress":
      return "linear-gradient(to right,#a0c4ff,rgb(167, 198, 233))";
    case "Pending":
      return "linear-gradient(to right,#a0c4ff,rgb(130, 176, 228))";
    default:
      return "#ffffff";
  }
};

const styles = {
  container: {
    maxWidth: "50%",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    borderRadius: "10px",
    color: "black",
    textAlign: "left",
    
   
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  taskForm: {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  flex: 1,
  minWidth: "350px",
  marginLeft: "-250px",
},

input: {
  padding: "10px 15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
  outline: "none",
},

updateButton: {
  background: "#4CAF50",
  color: "#fff",
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s",
},

addButton: {
  background: "#007bff",
  color: "#fff",
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s",
},

  taskGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",

  },
  taskItem: {
    padding: "15px",
    borderRadius: "10px",
    textAlign: "left",
    transition: "0.3s",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    color: "black",
   
  },
  taskName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  details: {
    fontSize: "14px",
    margin: "5px 0",
  },
  taskActions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  editButton: {
    backgroundColor: "#3498db", // Professional blue
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  deleteButton: {
    backgroundColor: "#e74c3c", // Professional red
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(5, 5, 5, 0.1)",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  completeButton: {
    padding: "6px",
    backgroundColor: "#28a745",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    transition: "0.3s",
  },
  noTask: {
    fontSize: "18px",
    color: "#fff",
  },
  tableHeader: {
  border: "1px solid #ddd",
  padding:"10px",
  textAlign: "left",
  background: "linear-gradient(to right,rgb(97, 132, 247))",
},

tableRow: {
  borderBottom: "1px solid #ddd",
  background: "linear-gradient(to bottom,rgb(232, 232, 243),rgb(179, 191, 224))",
},

tableCell: {
  border: "1px solid #ddd",
  padding: "10px",
},
inProgress: {
  background: "orange",
  color: "white",
  border: "none",
  padding: "5px 8px",
  margin: "2px",
  borderRadius: "4px",
  cursor: "pointer",
},

}; 