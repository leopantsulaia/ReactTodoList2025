import { useRef, forwardRef, useImperativeHandle } from "react";

/**
 * Modal component for displaying dialogs.
 * Uses forwardRef and useImperativeHandle to expose open/close methods.
 * Props:
 * - children: Modal content.
 * - ButtonCaption: Text for the close button.
 */
const Modal = forwardRef(function Modal({ children, ButtonCaption }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      if (dialog.current) {
        dialog.current.showModal();
      }
    },
    close() {
      if (dialog.current) {
        dialog.current.close();
      }
    },
  }));

  // Modal portal root must exist in public/index.html as <div id="modal-root"></div>
  return (
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{ButtonCaption}</Button>
      </form>
    </dialog>
  );
});

export default Modal;