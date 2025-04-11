import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children, ButtonCaption }, ref) {
	const dialog = useRef(); // Create a ref for the dialog element

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

	return createPortal(
		<dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
			{children}
			<form method='dialog' className="mt-4 text-right">
				<Button>{ButtonCaption}</Button>
			</form>
		</dialog>,
		document.getElementById("modal-root")
	);
});

export default Modal;

<div id='modal-root'></div>;
