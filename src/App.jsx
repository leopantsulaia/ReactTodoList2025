import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import NewProject from "./components/NewProject.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
	});

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
			const newProject = {
				...projectData,
				id: Math.random().toString(),
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
