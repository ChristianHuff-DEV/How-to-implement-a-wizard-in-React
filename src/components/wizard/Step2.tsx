import { useNavigate } from "react-router-dom";
import TextInput from "../TextInput";
import { StepProps, useAddEmployeeWizardState } from "./AddEmployeeWizard";

const Step2 = (props: StepProps) => {
  const navigate = useNavigate();
  const state = useAddEmployeeWizardState((state) => state);

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="pt-2 space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Personal Information
          </h3>
        </div>
        <div className="space-y-5">
          {/* Title */}
          <TextInput
            name="title"
            label="Title"
            value={state.title}
            onChange={(event) => {
              console.log(event);
            }}
            onBlur={(event) => {
              console.log(event);
            }}
            error="Test error"
          />
          {/* Role */}
          <TextInput
            name="role"
            label="Role"
            value={state.role}
            onChange={(event) => {
							state.updateRole(event.currentTarget.value)
            }}
            onBlur={(event) => {
              console.log(event);
            }}
          />
        </div>
      </div>

      <div className="py-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              navigate("/employees");
            }}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          {props.nextStepPath && (
            <button
              onClick={() => navigate(props.nextStepPath!)}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Step2;
