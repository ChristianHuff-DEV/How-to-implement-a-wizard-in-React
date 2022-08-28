import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validate, ValidationResult } from "../../api/ValidationApi";
import {
  AddEmployeeWizardInput,
  StepProps,
  useAddEmployeeWizardState,
} from "./AddEmployeeWizard";

const Step1 = (props: StepProps) => {
  const navigate = useNavigate();
  const state = useAddEmployeeWizardState((state) => state);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddEmployeeWizardInput>();

  /**
   * Map the errors received from the server to th
   */
  const mapErrors = (result: ValidationResult) => {
    if (result.errors?.name) {
      setError("name", { type: "server", message: result.errors.name });
    }
  };

  const onSubmit: SubmitHandler<AddEmployeeWizardInput> = async (data) => {
    const validationResult = await validate(data);
    if (!validationResult.isValid && validationResult.errors) {
      mapErrors(validationResult);
    } else if (props.nextStepPath) {
      // Send the user to the next step if the validation succeeded
      navigate(props.nextStepPath);
    }
  };

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="pt-10 space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Personal Information
          </h3>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4 items-start border-t border-gray-200 pt-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Name
            </label>
            <div className="mt-0 col-span-2">
              <input
                type="text"
                {...register("name", {
                  // react-hook-form doesn't provide a type for the event (see https://github.com/react-hook-form/react-hook-form/issues/6018#issuecomment-884098167)
                  onChange: (event) => {
                    state.updateName(event.currentTarget.value);
                  },
                  required: { value: true, message: "Name must be filled" },
                })}
                defaultValue={state.name}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300 rounded-md"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          {/* Add additional fields here*/}
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
