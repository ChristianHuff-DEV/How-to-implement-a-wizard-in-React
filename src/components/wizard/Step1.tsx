import { useNavigate } from "react-router-dom";
import { StepProps, useAddEmployeeWizardState } from "./AddEmployeeWizard";

const Step1 = (props: StepProps) => {
  const state = useAddEmployeeWizardState((state) => state);

  const navigate = useNavigate();
  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="pt-2 space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Personal Information
          </h3>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4 items-start border-t border-gray-200 pt-5">
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-700 mt-px pt-2"
            >
              Name
            </label>
            <div className="mt-0 col-span-2">
              <input
                type="text"
                name="name"
                id="name"
                value={state.name}
                onChange={(e) => state.updateName(e.currentTarget.value)}
                className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 max-w-xs text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Email
            </label>
            <div className="mt-0 col-span-2">
              <input
                type="email"
                name="email"
                id="email"
                value={state.email}
                onChange={(e) => state.updateEmail(e.currentTarget.value)}
                className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 max-w-xs text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
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

export default Step1;
