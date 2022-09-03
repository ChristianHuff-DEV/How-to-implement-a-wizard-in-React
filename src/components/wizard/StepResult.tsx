import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validate, ValidationResult } from "../../api/ValidationApi";
import { addEmployee } from "../../data";
import Button from "../Button";
import {
	AddEmployeeWizardInput,
	useAddEmployeeWizardState
} from "./AddEmployeeWizard";
import TextInput from "./TextInput";

/**
 * The final step of the wizard showing the data entered in the previous steps and handling the
 * submission of the form to persist the data.
 */
const StepResult = () => {
  const navigate = useNavigate();
  const state = useAddEmployeeWizardState((state) => state);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddEmployeeWizardInput>(
    // Initialize using the state
    { defaultValues: { ...state } },
  );

  /**
   * Map the errors received from the server to the form state.
   */
  const mapErrors = (result: ValidationResult) => {
    if (result.errors?.name) {
      setError("name", { message: result.errors.name });
    }
    if (result.errors?.email) {
      setError("email", { message: result.errors.email });
    }
    if (result.errors?.title) {
      setError("title", { message: result.errors.title });
    }
    if (result.errors?.role) {
      setError("role", { message: result.errors.role });
    }
  };

  /**
   * Submits the form.
   *
   * First triggers the server side validation. If it succeeds the data is saved, the form wide
   * state reset and the user forwarded to the employees overview.
   */
  const onSubmit: SubmitHandler<AddEmployeeWizardInput> = async (data) => {
    const validationResult = await validate(data);
    if (!validationResult.isValid && validationResult.errors) {
      mapErrors(validationResult);
    } else {
      // Save the data
      addEmployee(data.name, data.title, data.email, data.role);
      state.reset();

      navigate("/employees");
    }
  };

  return (
    <form className="container py-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-4 items-start border-t border-gray-200 pt-5">
        <div className="col-span-2">
          <TextInput
            readOnly
            label="Name"
            {...register("name", {
              required: { value: true, message: "Name must be filled" },
            })}
            error={errors.name?.message}
          />
        </div>
        <div className="col-span-2">
          <TextInput
            readOnly
            label="Email"
            {...register("email", {
              required: { value: true, message: "Email must be filled" },
            })}
            error={errors.email?.message}
          />
        </div>
        <div className="col-span-2">
          <TextInput
            readOnly
            label="Title"
            {...register("title", {
              required: { value: true, message: "Title must be filled" },
            })}
            error={errors.title?.message}
          />
        </div>
        <div className="col-span-2">
          <TextInput
            readOnly
            label="Role"
            {...register("role", {
              required: { value: true, message: "Role must be filled" },
            })}
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
          <Button primary type="submit" text="Save" />
        </div>
      </div>
    </form>
  );
};

export default StepResult;
