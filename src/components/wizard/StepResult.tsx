import { useNavigate } from "react-router-dom";
import { useAddEmployeeWizardState } from "./AddEmployeeWizard";

const StepResult = () => {
  const navigate = useNavigate();
  const state = useAddEmployeeWizardState((state) => state);

  return (
    <div className="container py-5">
      <div className="grid grid-cols-3 gap-4 items-start border-t border-gray-200 pt-5">
        <TextBox label="Name" value={state.name} />
        <TextBox label="Email" value={state.email} />
        <TextBox label="Title" value={state.title} />
        <TextBox label="Role" value={state.role} />
      </div>
      <div className="py-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {navigate("/employees")}}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={() => {}}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

interface TextBoxProps {
  label: string;
  value: string;
}

const TextBox = (props: TextBoxProps) => {
  return (
    <>
      <label
        htmlFor="name"
        className="block text-md font-medium text-gray-700 mt-px pt-2"
      >
        {props.label}
      </label>
      <div className="mt-0 col-span-2">
        <input
          disabled
          type="text"
          name="name"
          id="name"
          value={props.value}
          className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 max-w-xs text-sm border-gray-300 rounded-md"
        />
      </div>
    </>
  );
};

export default StepResult;
