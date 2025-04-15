import { useRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

/**
 * NewProject component displays a form to create a new project.
 * It validates input and shows a modal if any field is empty.
 * Props:
 * - onAdd: Function to add the new project (called with project data).
 * - onCancel: Function to cancel adding a new project.
 */
const NewProject = forwardRef(function NewProject({ onAdd, onCancel }, ref) {
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
});

export default NewProject;