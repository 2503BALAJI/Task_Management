import React, { useState } from "react";
import { DeleteTask, FetchAllTask, UpdateTask } from "../api/TaskServices";

const GetAllTask = ({ tasks, setTasks }) => {
  // State to track which task is being edited
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Handle Edit Button Click
  function editHandler(task) {
    setEditTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  }

  // Handle Save after editing
  async function saveEditHandler(taskId) {
    const updatedTask = { title: editTitle, description: editDescription };

    await UpdateTask(taskId, updatedTask);
    const updatedTasks = await FetchAllTask();
    setTasks(updatedTasks);
    setEditTaskId(null);
  }

  // Delete Task Handler
  async function deleteHandler(taskId) {
    await DeleteTask(taskId);
    const updatedTasks = await FetchAllTask();
    setTasks(updatedTasks);
  }


 // Status Toggle Function (Fixed)
  async function StatusHandler(taskId, currentStatus) {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";

    try {
      // Ensure the status update request contains the correct data
      await UpdateTask(taskId, { status: newStatus });

      // ✅ Directly update the UI instead of re-fetching
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }


  return (
    <div>
      {tasks.length === 0 ? (
        <div>
          <p>No Task Is Available</p>
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <ol key={task._id}>
              <li className="m-5">
                {/* Toggle between Edit Mode and View Mode */}
                {editTaskId === task._id ? (
                  <div className="flex flex-col gap-y-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border p-2"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="border p-2"
                    ></textarea>

                    <button
                      onClick={() => saveEditHandler(task._id)}
                      className="bg-green-500 text-white p-2"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl cursor-pointer">{task.title}</h1>
                    <p className="text-sm">{task.description}</p>
                  </div>
                )}

                {/* Buttons section */}
                <div className="flex gap-x-4 mt-3">
                  {/* Edit Button */}
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-md transition-all duration-300 cursor-pointer"
                    onClick={() => editHandler(task)}
                  >
                    ✏️ Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md transition-all duration-300 cursor-pointer"
                    onClick={() => deleteHandler(task._id)}
                  >
                    ❌ Delete
                  </button>

                  {/* Status Toggle Button */}
                  <button
                    className={`py-1 px-3 rounded-md transition-all duration-300 cursor-pointer 
                      ${task.status === "Pending"
                        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                        : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                    onClick={() => StatusHandler(task._id, task.status)}
                  >
                    {task.status === "Pending" ? "⏳ Pending" : "✅ Completed"}
                  </button>
                </div>
              </li>
            </ol>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllTask;
