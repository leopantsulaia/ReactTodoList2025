import { useState } from "react";
import NewTask from "./NewTask";

/**
 * Tasks component displays the list of tasks for the selected project,
 * allows adding new tasks, and deleting existing ones.
 * Props:
 * - tasks: Array of task objects for the current project.
 * - onAdd: Function to add a new task (called by NewTask).
 * - onDelete: Function to delete a task by its id.
 */
function Tasks({ tasks, onAdd, onDelete }) {
  return (
    <section className="flex-1">
      {/* Section header */}
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      {/* Input for adding a new task */}
      <NewTask onAdd={onAdd} />
      {/* Show message if there are no tasks */}
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet
        </p>
      )}
      {/* Show the list of tasks if there are any */}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              {/* Task text */}
              <span>{task.text}</span>
              {/* Button to delete the task */}
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => onDelete(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Tasks;