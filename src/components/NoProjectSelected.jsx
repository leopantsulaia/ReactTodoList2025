import noProjectImage from "../assets/no-projects.png";
import React from "react";
import Button from "./Button";

/**
 * NoProjectSelected component displays a message and button
 * when no project is currently selected.
 *
 * Props:
 * - onStartAddProject: Function to start adding a new project.
 */
export default function NoProjectSelected({onStartAddProject}) {
    return (
        <div className='mt-24 text-center w-2/3'>
            {/* Image to visually indicate no projects */}
            <img
                src={noProjectImage}
                alt='An empty task list'
                className="w-16 h-16 object-contain mx-auto"
            />
            {/* Main heading */}
            <h2 className='text-xl font-bold text-stone-500 my-4'>
                No Project Selected
            </h2>
            {/* Subtext for guidance */}
            <p className="text-stone-400">
                Select a project or get started with a new one
            </p>
            {/* Button to create a new project */}
            <p>
                <Button onClick={onStartAddProject}>
                    create new project
                </Button>
            </p>
        </div>
    );
}
