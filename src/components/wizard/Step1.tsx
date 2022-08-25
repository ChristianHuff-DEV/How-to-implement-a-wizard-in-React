import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validate } from "../../api/ValidationApi";
import { StepProps } from "./AddEmployeeWizard";

export type Step1FormInput = {
  name: string;
};

const Step1 = (props: StepProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Step1FormInput>();

  function addServerErrors<T>(
    errors: { [P in keyof T]?: string[] },
    setError: (
      fieldName: keyof T,
      error: { type: string; message: string },
    ) => void,
  ) {
    return Object.keys(errors).forEach((key) => {
      setError(key as keyof T, {
        type: "server",
        message: errors[key as keyof T]!.join(". "),
      });
    });
  }

  const onSubmit: SubmitHandler<Step1FormInput> = async (data) => {
    console.log(data);
    const validationResult = await validate(data);
    if (!validationResult.success && validationResult.errors) {
      addServerErrors(validationResult.errors, setError);
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
                  required: { value: true, message: "Name must be filled" },
                })}
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
