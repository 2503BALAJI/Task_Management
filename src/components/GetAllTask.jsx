import React, { useState } from "react";
import { DeleteTask, FetchAllTask, UpdateTask } from "../api/TaskServices";

const GetAllTask = ({ tasks, setTasks }) => {

  // State to track which task is being edited
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Handle Edit Button Click
  function editHandler(task) {
    setEditTaskId(task._id); // Set the ID of the task being edited
    setEditTitle(task.title); // Pre-fill title
    setEditDescription(task.description); // Pre-fill description
  }

  // Handle Save after editing
  async function saveEditHandler(taskId) {
    const updatedTask = { title: editTitle, description: editDescription };
    
    await UpdateTask(taskId, updatedTask);
    const updatedTasks = await FetchAllTask();
    setTasks(updatedTasks); // Update the UI

    setEditTaskId(null); // Exit edit mode
  }

  // Delete Task Handler
  async function deleteHandler(taskId) {
    await DeleteTask(taskId);
    const updatedTasks = await FetchAllTask();
    setTasks(updatedTasks);
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
