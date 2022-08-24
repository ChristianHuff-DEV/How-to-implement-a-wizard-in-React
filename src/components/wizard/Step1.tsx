import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../TextInput";
import { StepProps, useAddEmployeeWizardState } from "./AddEmployeeWizard";

const Step1 = (props: StepProps) => {
  const navigate = useNavigate();
  const state = useAddEmployeeWizardState((state) => state);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const isValid = await state.validate();

    if (isValid && props.nextStepPath) {
      navigate(props.nextStepPath);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="pt-2 space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Personal Information
          </h3>
        </div>
        <div className="space-y-5">
          <TextInput
            name="name"
            label="Name"
            value={state.name}
            error={state.errors.name}
            onChange={(event) => {
              state.updateName(event.currentTarget.value);
            }}
            onBlur={() => {
							state.validate()
            }}
          />
          <TextInput
            name="email"
            label="Email"
            value={state.email}
            error={state.errors.email}
            onChange={(event) => {
              state.updateEmail(event.currentTarget.value);
            }}
            onBlur={() => {
							state.validate()
            }}
          />
        </div>
      </div>

      <div className="py-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
							state.reset()
              navigate("/employees");
            }}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          {props.nextStepPath && (
            <button
              type="submit"
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

export default Step1;
