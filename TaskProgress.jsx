import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const TaskProgress = ({ tasks }) => {

  const statusData = [
    { name: 'Completed', value: tasks.filter(task => task.status === 'Completed').length },
    { name: 'In Progress', value: tasks.filter(task => task.status === 'In Progress').length },
    { name: 'Pending', value: tasks.filter(task => task.status === 'Pending').length },
  ];

  const priorityData = [
    { name: 'High', value: tasks.filter(task => task.priority === 'High').length },
    { name: 'Medium', value: tasks.filter(task => task.priority === 'Medium').length },
    { name: 'Low', value: tasks.filter(task => task.priority === 'Low').length },
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Task Progress</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        
        {/* Left - Bar Chart */}
        <div>
          <h3 style={{ textAlign: 'center' }}>Task Status</h3>
          <BarChart width={400} height={300} data={statusData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Right - Pie Chart */}
        <div>
          <h3 style={{ textAlign: 'center' }}>Task Priority</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={priorityData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>

      </div>
    </div>
  );
};

export default TaskProgress;
