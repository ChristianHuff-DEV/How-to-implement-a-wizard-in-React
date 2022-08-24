import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../TextInput";
import { useAddEmployeeWizardState } from "./AddEmployeeWizard";

const StepResult = () => {
  const navigate = useNavigate();
  const state = useAddEmployeeWizardState((state) => state);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="container py-5" onSubmit={onSubmit}>
      <div className="grid grid-cols-3 gap-4 items-start border-t border-gray-200 pt-5">
        <TextInput
          className="col-span-2"
          name="name"
          label="Name"
          value={state.name}
          error={state.errors.name}
          readOnly
        />
        <TextInput
          className="col-span-2"
          name="email"
          label="Email"
          value={state.email}
          error={state.errors.email}
          readOnly
        />
        <TextInput
          className="col-span-2"
          name="title"
          label="Title"
          value={state.title}
          error={state.errors.title}
          readOnly
        />
        <TextInput
          className="col-span-2"
          name="role"
          label="Role"
          value={state.role}
          error={state.errors.role}
          readOnly
        />
      </div>
      <div className="py-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              state.reset();
              navigate("/employees");
            }}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default StepResult;
