# Project Title: Task Management App

## Overview
This project is a task management application that allows users to create and manage projects and tasks. Users can add new projects, view project details, and manage tasks associated with each project.

## File Structure
The project is organized into the following structure:

```
01-starting-project
├── src
│   ├── App2
│   │   ├── App.jsx
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── NewProject.jsx
│   │   ├── NewTask.jsx
│   │   ├── NoProjectSelected.jsx
│   │   ├── ProjectsSidebar.jsx
│   │   ├── SelectedProject.jsx
│   │   └── Tasks.jsx
│   ├── assets
│   │   └── no-projects.png
│   ├── index.js
│   └── README.md
```

## Components
- **App.jsx**: The main application component that renders the overall structure of the app.
- **Button.jsx**: A reusable button component with consistent styling.
- **Input.jsx**: A versatile input component that can render text inputs or textareas.
- **Modal.jsx**: A modal component for displaying dialogs and forms.
- **NewProject.jsx**: A form component for creating new projects with validation.
- **NewTask.jsx**: A component for adding new tasks to a selected project.
- **NoProjectSelected.jsx**: A component that displays a message when no project is selected.
- **ProjectsSidebar.jsx**: A sidebar component that lists all projects and allows project selection.
- **SelectedProject.jsx**: A component that displays details of the selected project and its tasks.
- **Tasks.jsx**: A component that manages and displays tasks for the selected project.

## Assets
- **no-projects.png**: An image displayed when no projects are available.

## Getting Started
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the application with `npm start`.

## License
This project is licensed under the MIT License.