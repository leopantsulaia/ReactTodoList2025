import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProject: undefined,
		projects: [],
	});

	function handleStartAddProject() {
		setProjectsState(prevState => {
			return {
				...prevState,
				selectedProject: null,
			};
		});
		function handleAddProject(projectData) {
			setProjectsState(prevState => {
				const newProject = {
					...projectData,
					id: Math.random().toString(),
				};
				return {
					...prevState,
					projects: [...prevState.projects, newProject],
				};
			});
		}
		console.log(projectsState);

		let content;
		if (projectsState.selectedProject) {
			content = <NewProject onAdd={handleAddProject} />;
		} else if (projectsState.selectedProject === undefined) {
			content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
		}
	}

	return (
		<main className='h-screen my-8 flex gap-8 '>
			<ProjectsSidebar onStartAddProject={handleStartAddProject} />{" "}
			{/* Fixed typo */}
			{content}
		</main>
	);
}

export default App;
