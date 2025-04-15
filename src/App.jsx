import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import NewProject from "./components/NewProject.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

// The main App component that manages all state and renders the UI
function App() {
    // State for all projects, tasks, and which project is currently selected
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined, // undefined: nothing selected, null: adding new, string/number: selected project
        projects: [], // Array of all project objects
        tasks: [],   // Array of all task objects, each linked to a project by projectId
    });

    // Adds a new task to the currently selected project
    function handleAddTask(text) {
        setProjectsState(prevState => {
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
        setProjectsState(prevState => ({
            ...prevState,
            tasks: prevState.tasks.filter(task => task.id !== id), // Remove the task with the given id
        }));
    }

    // Sets the selected project by id (when user clicks a project in the sidebar)
    function handleSelectProject(id) {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: id, // Set the selected project
        }));
    }

    // Starts the process of adding a new project (shows the NewProject form)
    function handleStartAddProject() {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: null, // null means we're adding a new project
        }));
    }

    // Cancels adding a new project (returns to no project selected)
    function handleCancelAddProject() {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: undefined, // undefined means nothing is selected
        }));
    }

    // Adds a new project to the list and selects it
    function handleAddProject(projectData) {
        setProjectsState(prevState => {
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
        setProjectsState(prevState => ({
            ...prevState,
            projects: prevState.projects.filter(project => project.id !== id), // Remove the project
            selectedProjectId: undefined, // Deselect project
        }));
    }

    // Find the currently selected project object (if any)
    const selectedProject = projectsState.projects.find(
        project => project.id === projectsState.selectedProjectId
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
                    task => task.projectId === projectsState.selectedProjectId
                )}
            />
        );
    }

    // Render the sidebar and the main content area
    return (
        <main className='h-screen my-8 flex gap-8'>
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            <section className='flex-1'>{content}</section>
        </main>
    );
}

export default App;
