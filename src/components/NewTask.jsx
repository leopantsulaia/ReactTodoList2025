import { useState } from "react";

/**
 * NewTask component provides an input and button to add a new task.
 *
 * Props:
 * - onAdd: Function to add a new task (called with the entered text).
 */
export default function NewTask({ onAdd }) { 
    // Local state to store the current value of the input field
    const [enteredTask, setEnteredTask] = useState("");

    // Updates the local state as the user types in the input
    function handleChange(event) {
        setEnteredTask(event.target.value);
    }

    // Handles the Add Task button click
    function handleClick() {
        // Prevent adding empty tasks
        if (enteredTask.trim().length === 0) return; 
        // Call the onAdd prop with the entered task text
        onAdd(enteredTask);
        // Clear the input field after adding
        setEnteredTask("");
    }

    return (
        <div className='flex items-center gap-4'>
            {/* Input for entering the task text */}
            <input
                type='text'
                className='w-64 px-2 py-1 rounded-sm bg-stone-200'
                onChange={handleChange}
                value={enteredTask}
            />
            {/* Button to add the task */}
            <button
                className='text-stone-700 hover:text-stone-950'
                onClick={handleClick}>
                Add Task
            </button>
        </div>
    );
}
