import React from "react";
import { ChangeEventHandler, FocusEventHandler } from "react";

/**
 * The properties that must be provided to the text input.
 */
interface TextInputProps {
	/** Technical name of the input */
  name: string;
	/** Label to indicate the user what data to provide */
  label: string;
	/** Called when the value of the input changes */
  onChange: ChangeEventHandler<HTMLInputElement>;
	/** Called when the input loses focus */
  onBlur: FocusEventHandler<HTMLInputElement>;
	/** If provided the input is pre-filled with this value */
  defaultValue?: string;
	/** If filled the provided string is shown indicating the user why the input is invalid */
  error?: string;
	/** Defines if the value of the input can be edited. */
	readOnly?: boolean;
}

/**
 * A text input that contains not only the input itself but also the label. Can display an error
 * message.
 */
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return (
      <div className="grid grid-cols-3 gap-4 items-start border-t border-gray-200 pt-5">
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {props.label}
        </label>
        <div className="mt-0 col-span-2">
          <input
            ref={ref}
						name={props.name}
            type="text"
            onChange={props.onChange}
            onBlur={props.onBlur}
            defaultValue={props.defaultValue}
						readOnly={props.readOnly}
            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300 rounded-md"
          />
          {props.error && (
            <p className="mt-2 text-sm text-red-600">{props.error}</p>
          )}
        </div>
      </div>
    );
  },
);

export default TextInput;
