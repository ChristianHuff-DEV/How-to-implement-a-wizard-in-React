import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validate, ValidationResult } from "../../api/ValidationApi";
import Button from "../base/Button";
import {
	AddEmployeeWizardInput,
	useAddEmployeeWizardState,
	WizardStepProps
} from "./AddEmployeeWizard";
import TextInput from "./TextInput";

/**
 * Second step of the wizard allowing the user to define the title and role of a new employee.
 */
const Step2 = (props: WizardStepProps) => {
  const navigate = useNavigate();
  const state = useAddEmployeeWizardState((state) => state);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddEmployeeWizardInput>();

  /**
   * Map the validation result to the error state of the form.
   */
  const mapErrors = (result: ValidationResult) => {
    if (result.errors?.title) {
      setError("title", { type: "server", message: result.errors.title });
    }
    if (result.errors?.role) {
      setError("role", { type: "server", message: result.errors.role });
    }
  };

  /**
   * Handle the submit of the form.
   *
   * Triggers the server side validation. If the validation succeeds the user is forwarded to the
   * next step. If it fails the user is shown the error messages.
   */
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
          <Button
            text="Cancel"
            onClick={() => {
              state.reset();
              navigate("/employees");
            }}
          />
          {props.nextStepPath && <Button primary text="Next" type="submit" />}
        </div>
      </div>
    </form>
  );
};

export default Step2;
