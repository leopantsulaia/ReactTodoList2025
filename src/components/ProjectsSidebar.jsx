import Button from "./Button.jsx";
import React from "react";

/**
 * ProjectsSidebar component displays the list of all projects and
 * allows the user to select a project or start adding a new one.
 *
 * Props:
 * - onStartAddProject: Function to trigger adding a new project.
 * - projects: Array of all project objects.
 * - onSelectProject: Function to select a project by its id.
 * - selectedProjectId: The id of the currently selected project.
 */
export default function ProjectsSidebar({
    onStartAddProject,
    projects,
    onSelectProject,
    selectedProjectId,
}) {
    return (
        <aside className='w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl'>
            {/* Sidebar header */}
            <h2 className='mb-8 font-bold uppercase md:text-xl text-stone-200'>
                Your Projects
            </h2>
            {/* Button to add a new project */}
            <div>
                <Button onClick={onStartAddProject}>+ Add Project</Button>
            </div>
            {/* List of all projects */}
            <ul className='mt-8'>
                {projects.map(project => {
                    // Style the selected project differently
                    let cssClasses = 'w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800'
                    if (project.id === selectedProjectId) {
                        cssClasses += ' bg-stone-800 text-stone-200'
                    } else {
                        cssClasses += ' text-stone-400'
                    }
                    return (
                        <li key={project.id}>
                            {/* Button to select this project */}
                            <button
                                className={cssClasses}
                                onClick={() => onSelectProject(project.id)}>
                                {project.title}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}