import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import NewProject from "./components/NewProject.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [], // Add tasks array
    });

    function handleAddTask(text) {
        setProjectsState(prevState => {
            const taskId = Math.random();
            const newTask = {
                text: text,
                projectId: prevState.selectedProjectId, // Associate task with the selected project
                id: taskId,
            };
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks], // Add the new task to the tasks array
            };
        });
    }

    function handleDeleteTask(taskId) {
        setProjectsState(prevState => ({
            ...prevState,
            tasks: prevState.tasks.filter(task => task.id !== taskId), // Remove the task with the matching ID
        }));
    }

    function handleSelectProject(id) {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: id,
        }));
    }

    function handleStartAddProject() {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: null,
        }));
    }

    function handleCancelAddProject() {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: undefined,
        }));
    }

    function handleAddProject(projectData) {
        setProjectsState(prevState => {
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId,
            };
            return {
                ...prevState,
                projects: [...prevState.projects, newProject],
                selectedProjectId: newProject.id,
            };
        });
    }

    function handleDeleteProject(id) {
        setProjectsState(prevState => ({
            ...prevState,
            projects: prevState.projects.filter(project => project.id !== id),
            selectedProjectId: undefined,
        }));
    }

    const selectedProject = projectsState.projects.find(
        project => project.id === projectsState.selectedProjectId
    );

    let content = (
        <SelectedProject
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks={projectsState.tasks.filter(
                task => task.projectId === projectsState.selectedProjectId // Filter tasks by projectId
            )}
        />
    );
    if (projectsState.selectedProjectId === null) {
        content = (
            <NewProject
                onAdd={handleAddProject}
                onCancel={handleCancelAddProject}
            />
        );
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
    }

    return (
        <main className='h-screen my-8 flex gap-8'>
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
            />
            <section className='flex-1'>{content}</section>
        </main>
    );
}

export default App;