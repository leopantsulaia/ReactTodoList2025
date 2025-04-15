import ProjectsSidebar from "./ProjectsSidebar";
import SelectedProject from "./SelectedProject";
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import useProjects from "./useProjects";

export default function MainApp() {
  const {
    projectsState,
    handleAddTask,
    handleDeleteTask,
    handleSelectProject,
    handleStartAddProject,
    handleCancelAddProject,
    handleAddProject,
    handleDeleteProject,
  } = useProjects();

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = null;
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAdd={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (selectedProject) {
    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectsState.tasks.filter(
          (task) => task.projectId === projectsState.selectedProjectId
        )}
      />
    );
  }

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