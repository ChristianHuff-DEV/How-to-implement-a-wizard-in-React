import { ChangeEventHandler, FocusEventHandler } from "react";

interface TextInputProps {
  /** Identifies the input */
  name: string;
  /** Label is what indicates the user what to input into the text input */
  label: string;
  /**
   * Value of the input.
   *
   * To update it the onChange method must be used
   */
  value: string;
  /** Called anytime the value of the input changes */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Called anytime the input loses focus */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string;
  readOnly?: boolean;
  className?: string;
}

const TextInput = (props: TextInputProps) => {
  return (
    <div
      className={`grid grid-cols-3 gap-4 items-start border-t border-gray-200 pt-5 ${props.className}`}
    >
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700 mt-px pt-2"
      >
        {props.label}
      </label>
      <div className="mt-0 col-span-2">
        <div className="max-w-lg flex rounded-md shadow-sm">
          <input
            className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
            type="text"
            name={props.name}
            id={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            readOnly={props.readOnly}
          />
        </div>
        {props.error && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {props.error}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextInput;
