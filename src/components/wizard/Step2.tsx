import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validate, ValidationResult } from "../../api/ValidationApi";
import {
  AddEmployeeWizardInput,
  StepProps,
  useAddEmployeeWizardState,
} from "./AddEmployeeWizard";
import TextInput from "./TextInput";

const Step2 = (props: StepProps) => {
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
    if (result.errors?.title) {
      setError("title", { type: "server", message: result.errors.title });
    }
    if (result.errors?.role) {
      setError("role", { type: "server", message: result.errors.role });
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
            Job Details
          </h3>
        </div>
        {/* Title */}
        <div className="space-y-5">
          {/* Title */}
          <TextInput
            label="Title"
            {...register("title", {
              onChange: (event) => {
                state.updateTitle(event.currentTarget.value);
              },
              required: { value: true, message: "Title must be filled" },
            })}
            defaultValue={state.title}
            error={errors.title?.message}
          />
          {/* Role */}
          <TextInput
            label="Role"
            {...register("role", {
              onChange: (event) => {
                state.updateRole(event.currentTarget.value);
              },
              required: { value: true, message: "Role must be filled" },
            })}
            defaultValue={state.role}
            error={errors.role?.message}
          />
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

export default Step2;
