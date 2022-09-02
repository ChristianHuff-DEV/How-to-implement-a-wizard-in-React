import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validate, ValidationResult } from "../../api/ValidationApi";
import { addEmployee } from "../../data";
import {
  AddEmployeeWizardInput,
  useAddEmployeeWizardState,
} from "./AddEmployeeWizard";
import TextInput from "./TextInput";

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
   * Map the errors received from the server to th
   */
  const mapErrors = (result: ValidationResult) => {
    if (result.errors?.name) {
      setError("name", { type: "server", message: result.errors.name });
    }
    if (result.errors?.email) {
      setError("email", { type: "server", message: result.errors.email });
    }
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
