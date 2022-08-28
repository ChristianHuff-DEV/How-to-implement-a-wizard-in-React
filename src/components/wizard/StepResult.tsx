import { FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validate, ValidationResult } from "../../api/ValidationApi";
import TextInput from "../TextInput";
import { useAddEmployeeWizardState } from "./AddEmployeeWizard";
import { Step1FormInput } from "./Step1";

const StepResult = () => {
  const navigate = useNavigate();
  const state = useAddEmployeeWizardState((state) => state);
  const {
    handleSubmit,
    setError,
    formState: { errors },
	} = useForm<Step1FormInput>(
		// Initialize using the state
		{ defaultValues: { ...state } });

  /**
   * Map the errors received from the server to th
   */
  const mapErrors = (result: ValidationResult) => {
    if (result.errors?.name) {
      setError("name", { type: "server", message: result.errors.name });
    }
  };

  const onSubmit: SubmitHandler<Step1FormInput> = async (data) => {
		console.log(data)
    const validationResult = await validate(data);
		console.log(validationResult)
    if (!validationResult.isValid && validationResult.errors) {
      mapErrors(validationResult);
    }
  };

  return (
    <form className="container py-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-4 items-start border-t border-gray-200 pt-5">
        <div className="col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mt-px pt-2"
          >
            Name
          </label>
          <div className="mt-0">
            <div className="max-w-lg flex rounded-md shadow-sm">
              <input
                className="flex-1 block w-full text-gray-500 focus:ring-gray-300 focus:border-gray-300 min-w-0 rounded-md sm:text-sm border-gray-300"
                type="text"
                name="name"
                value={state.name}
                readOnly
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>
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
