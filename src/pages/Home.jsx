import React, { useState, useEffect } from "react";
import AddTask from "../components/AddTask";
import GetAllTask from "../components/GetAllTask";
import { FetchAllTask, addTask } from "../api/TaskServices";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      const data = await FetchAllTask();
      setTasks(data || []);
    }
    getTasks();
  }, []);

  // Function to handle adding a new task
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await addTask(taskData);
      console.log("Recently Updated Task:", newTask);
      const updatedTasks = await FetchAllTask();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📝 Task Management</h1>

        {/* Add Task Section */}
        <div className="bg-gray-400 text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-3">➕ Add New Task</h2>
          <AddTask onTaskAdded={handleAddTask} />
        </div>

        {/* All Tasks Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3 text-center"> All Tasks Are Here ! </h2>
          <GetAllTask tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
};

export default Home;
