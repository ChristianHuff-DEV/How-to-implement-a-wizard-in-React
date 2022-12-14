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
 * First step of the wizard allowing the user to define the name and email of a new employee.
 */
const Step1 = (props: WizardStepProps) => {
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
    if (result.errors?.name) {
      setError("name", { message: result.errors.name });
    }
    if (result.errors?.email) {
      setError("email", { message: result.errors.email });
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
            Personal Information
          </h3>
        </div>
        <div className="space-y-5">
          {/* Name */}
          <TextInput
            label="Name"
            {...register("name", {
              // react-hook-form doesn't provide a type for the event (see https://github.com/react-hook-form/react-hook-form/issues/6018#issuecomment-884098167)
              onChange: (event) => {
                state.updateName(event.currentTarget.value);
              },
              required: { value: true, message: "Name must be filled" },
            })}
            defaultValue={state.name}
            error={errors.name?.message}
          />
          {/* Email */}
          <TextInput
            label="Email"
            {...register("email", {
              onChange: (event) => {
                state.updateEmail(event.currentTarget.value);
              },
              required: { value: true, message: "Email must be filled" },
            })}
            defaultValue={state.email}
            error={errors.email?.message}
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

export default Step1;
