import { ButtonHTMLAttributes, MouseEventHandler } from "react";

interface ButtonProps {
  /** Text display on the button */
  text: string;
  /**
   * The action to perform when the button is clicked. Is optional since if the type is "submit"
   * the onClick is not needed.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** If the button is styled to indicate a primary action */
  primary?: boolean;
  /** Define the type of button. (Defaults to "button".) */
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

/**
 * Simple button that pre styled.
 */
const Button = (props: ButtonProps) => {
  // Set the default value for optional props
  const { type = "button" } = props;

  return (
    <button
      type={type}
      onClick={props.onClick}
      className={`${
        props.primary
          ? "ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          : "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      }`}
    >
      {props.text}
    </button>
  );
};

export default Button;
