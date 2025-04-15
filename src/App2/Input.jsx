import { forwardRef } from "react";

/**
 * Input component for text, textarea, and date inputs.
 * Uses forwardRef to allow parent components to access the input value.
 * Props:
 * - label: Label for the input.
 * - textarea: If true, renders a textarea instead of input.
 * - ...props: Other input props (type, etc.).
 */
const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {textarea ? (
        <textarea ref={ref} className={classes} {...props} />
      ) : (
        <input ref={ref} className={classes} type="text" {...props} />
      )}
    </p>
  );
});

export default Input;