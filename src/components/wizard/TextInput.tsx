import React from "react";
import { ChangeEventHandler, FocusEventHandler } from "react";

interface TextInputProps {
  name: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  defaultValue?: string;
  error?: string;
}

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
            type="text"
            onChange={(event) => {
              console.log("TextInput.onChange");
              props.onChange(event);
            }}
            onBlur={props.onBlur}
            defaultValue={props.defaultValue}
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
