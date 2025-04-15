import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import noProjectImage from "./assets/no-projects.png";

/**
 * Button component for consistent styling of all buttons.
 * Props:
 * - children: Button label/content.
 * - ...props: Any other props for the button element.
 */
function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Input component for text, textarea, and date inputs.
 * Uses forwardRef to allow parent components to access the input value.
 * Props:
 * - label: Label for the input.
 * - textarea: If true, renders a textarea instead of input.
 * - ...props: Other input props (type, etc.).
 */
const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {textarea ? (
        <textarea ref={ref} className={classes} {...props} />
      ) : (
        <input ref={ref} className={classes} type="text" {...props} />
      )}
    </p>
  );
});

/**
 * Modal component for displaying dialogs.
 * Uses forwardRef and useImperativeHandle to expose open/close methods.
 * Props:
 * - children: Modal content.
 * - ButtonCaption: Text for the close button.
 */
const Modal = forwardRef(function Modal({ children, ButtonCaption }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      if (dialog.current) {
        dialog.current.showModal();
      }
    },
    close() {
      if (dialog.current) {
        dialog.current.close();
      }
    },
  }));

  // Modal portal root must exist in public/index.html as <div id="modal-root"></div>
  return (
    dialog.current
      ? null
      : (
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
          {children}
          <form method="dialog" className="mt-4 text-right">
            <Button>{ButtonCaption}</Button>
          </form>
        </dialog>
      )
  );
});

/**
 * NewTask component provides an input and button to add a new task.
 * Props:
 * - onAdd: Function to add a new task (called with the entered text).
 */
function NewTask({ onAdd }) {
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
    <div className="flex items-center gap-4">
      {/* Input for entering the task text */}
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      {/* Button to add the task */}
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}

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

/**
 * ProjectsSidebar component displays the list of all projects and
 * allows the user to select a project or start adding a new one.
 * Props:
 * - onStartAddProject: Function to trigger adding a new project.
 * - projects: Array of all project objects.
 * - onSelectProject: Function to select a project by its id.
 * - selectedProjectId: The id of the currently selected project.
 */
function ProjectsSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      {/* Sidebar header */}
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      {/* Button to add a new project */}
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      {/* List of all projects */}
      <ul className="mt-8">
        {projects.map((project) => {
          // Style the selected project differently
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
          if (project.id === selectedProjectId) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400";
          }
          return (
            <li key={project.id}>
              {/* Button to select this project */}
              <button
                className={cssClasses}
                onClick={() => onSelectProject(project.id)}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/**
 * NoProjectSelected component displays a message and button
 * when no project is currently selected.
 * Props:
 * - onStartAddProject: Function to start adding a new project.
 */
function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-24 text-center w-2/3">
      {/* Image to visually indicate no projects */}
      {/* You can replace the src below with your own image path or remove the img if not needed */}
      <img
        src={noProjectImage}
        alt="An empty task list"
        className="w-16 h-16 object-contain mx-auto"
      />
      {/* Main heading */}
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>
      {/* Subtext for guidance */}
      <p className="text-stone-400">
        Select a project or get started with a new one
      </p>
      {/* Button to create a new project */}
      <p>
        <Button onClick={onStartAddProject}>create new project</Button>
      </p>
    </div>
  );
}

/**
 * NewProject component displays a form to create a new project.
 * It validates input and shows a modal if any field is empty.
 * Props:
 * - onAdd: Function to add the new project (called with project data).
 * - onCancel: Function to cancel adding a new project.
 */
function NewProject({ onAdd, onCancel }) {
  const modal = useRef(); // Ref for the modal dialog
  const title = useRef(); // Ref for the title input
  const description = useRef(); // Ref for the description input
  const dueDate = useRef(); // Ref for the due date input

  // Handles the save button click: validates and submits the form
  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    // If any field is empty, show the modal and abort
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredDueDate.trim().length === 0
    ) {
      if (modal.current && modal.current.open) modal.current.open();
      return;
    }

    // Call the onAdd prop with the new project data
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      {/* Modal for invalid input */}
      <Modal ref={modal} ButtonCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">
          Invalid Input
        </h2>
        <p className="text-stone-600 mb-4">
          Ooops... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      {/* Main form for new project */}
      <div className="w-[35rem] mt-16 ">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            {/* Cancel button */}
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            {/* Save button */}
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          {/* Title input */}
          <Input type="text" ref={title} label="Title" />
          {/* Description input (textarea) */}
          <Input ref={description} label="Description" textarea />
          {/* Due date input */}
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}

/**
 * SelectedProject component displays the details of the selected project,
 * and its associated tasks. Also allows deleting the project.
 * Props:
 * - project: The currently selected project object.
 * - onDelete: Function to delete the project (called with project id).
 * - onAddTask: Function to add a new task to this project.
 * - onDeleteTask: Function to delete a task from this project.
 * - tasks: Array of task objects for this project.
 */
function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
}) {
  // Format the due date for display
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-[35rem] mt-16">
      {/* Project header with title and delete button */}
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          {/* Project title */}
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          {/* Button to delete the project */}
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onDelete(project.id)} // Pass the project ID
          >
            Delete
          </button>
        </div>
        {/* Project due date */}
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        {/* Project description */}
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      {/* Tasks list for this project */}
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}

// The main App component that manages all state and renders the UI
function App() {
  // State for all projects, tasks, and which project is currently selected
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, // undefined: nothing selected, null: adding new, string/number: selected project
    projects: [], // Array of all project objects
    tasks: [], // Array of all task objects, each linked to a project by projectId
  });

  // Adds a new task to the currently selected project
  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random(); // Generate a unique id for the task
      const newTask = {
        text: text, // The task description
        projectId: prevState.selectedProjectId, // Link to the current project
        id: taskId, // Unique id
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks], // Add new task to the beginning of the array
      };
    });
  }

  // Deletes a task by its id
  function handleDeleteTask(id) {
    setProjectsState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id), // Remove the task with the given id
    }));
  }

  // Sets the selected project by id (when user clicks a project in the sidebar)
  function handleSelectProject(id) {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: id, // Set the selected project
    }));
  }

  // Starts the process of adding a new project (shows the NewProject form)
  function handleStartAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: null, // null means we're adding a new project
    }));
  }

  // Cancels adding a new project (returns to no project selected)
  function handleCancelAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined, // undefined means nothing is selected
    }));
  }

  // Adds a new project to the list and selects it
  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random(); // Generate a unique id for the project
      const newProject = {
        ...projectData, // title, description, dueDate
        id: projectId,
      };
      return {
        ...prevState,
        projects: [...prevState.projects, newProject], // Add new project to the array
        selectedProjectId: newProject.id, // Select the new project
      };
    });
  }

  // Deletes a project by id and deselects any selected project
  function handleDeleteProject(id) {
    setProjectsState((prevState) => ({
      ...prevState,
      projects: prevState.projects.filter((project) => project.id !== id), // Remove the project
      selectedProjectId: undefined, // Deselect project
    }));
  }

  // Find the currently selected project object (if any)
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  // Decide what to show in the main area based on the current state
  let content = null;
  if (projectsState.selectedProjectId === null) {
    // Show the form to add a new project
    content = (
      <NewProject
        onAdd={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    // Show the "no project selected" screen
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (selectedProject) {
    // Show the details of the selected project and its tasks
    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        // Only show tasks for the selected project
        tasks={projectsState.tasks.filter(
          (task) => task.projectId === projectsState.selectedProjectId
        )}
      />
    );
  }

  // Render the sidebar and the main content area
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      <section className="flex-1">{content}</section>
    </main>
  );
}

export default App;