import Tasks from "./Tasks";

/**
 * SelectedProject component displays the details of the selected project,
 * and its associated tasks. Also allows deleting the project.
 *
 * Props:
 * - project: The currently selected project object.
 * - onDelete: Function to delete the project (called with project id).
 * - onAddTask: Function to add a new task to this project.
 * - onDeleteTask: Function to delete a task from this project.
 * - tasks: Array of task objects for this project.
 */
export default function SelectedProject({
    project,
    onDelete,
    onAddTask,
    onDeleteTask,
    tasks
}) {
    // Format the due date for display
    const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div className='w-[35rem] mt-16'>
            {/* Project header with title and delete button */}
            <header className='pb-4 mb-4 border-b-2 border-stone-300'>
                <div className='flex items-center justify-between'>
                    {/* Project title */}
                    <h1 className='text-3xl font-bold text-stone-600 mb-2'>
                        {project.title}
                    </h1>
                    {/* Button to delete the project */}
                    <button
                        className='text-stone-600 hover:text-stone-950'
                        onClick={() => onDelete(project.id)} // Pass the project ID
                    >
                        Delete
                    </button>
                </div>
                {/* Project due date */}
                <p className='mb-4 text-stone-400'>{formattedDate}</p>
                {/* Project description */}
                <p className='text-stone-600 whitespace-pre-wrap'>
                    {project.description}
                </p>
            </header>
            {/* Tasks list for this project */}
            <Tasks
                onAdd={onAddTask}
                onDelete={onDeleteTask}
                tasks={tasks}
            />
        </div>
    );
}
