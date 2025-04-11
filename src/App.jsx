import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import NewProject from "./components/NewProject.jsx";

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProject: undefined,
		projects: [],
	});

	function handleStartAddProject() {
		setProjectsState(prevState => ({
			...prevState,
			selectedProject: null,
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
				selectedProject: newProject.id,
			};
		});
	}

	let content;
	if (projectsState.selectedProject === null) {
		content = <NewProject onAdd={handleAddProject} />;
	} else if (projectsState.selectedProject === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
	}

	return (
		<main className='h-screen my-8 flex gap-8'>
			<ProjectsSidebar onStartAddProject={handleStartAddProject} />
			<section className='flex-1'>{content}</section>
		</main>
	);
}

export default App;
