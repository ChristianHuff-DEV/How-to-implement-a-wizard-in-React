import {
  Path,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { StepProps, useAddEmployeeWizardState } from "./AddEmployeeWizard";

/**
 * Defines the values handles by the form
 */
interface Step1Inputs {
  name: string;
  email: string;
}
type InputProps<T> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  validate?: RegisterOptions<T>["validate"];
  // onChange?: (value: string) => void;
};

// The following component is an example of your existing Input Component
const Input = <T,>({
  label,
  name,
  register,
  required,
  validate,
}: // onChange,
InputProps<T>) => (
  <>
    <label className="block text-md font-medium text-gray-700 mt-px pt-2">
      {label}
    </label>
    <input
      {...register(name, {
        required,
        validate,
        // onChange: (e) => {
        //   if (e.currentTarget) {
        //     console.log(e.currentTarget.value);
        //   }
        // },
      })}
      type="text"
      className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 max-w-xs text-sm border-gray-300 rounded-md"
    />
  </>
);
const Step1 = (props: StepProps) => {
  const navigate = useNavigate();
  const state = useAddEmployeeWizardState((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Step1Inputs> = (data) => {
    console.log("submitting");
    if (props.nextStepPath) {
      navigate(props.nextStepPath);
    }

    if (data.name) {
      state.updateName(data.name);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="pt-2 space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Personal Information
          </h3>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4 items-start border-t border-gray-200 pt-5">
            <Input
              name="name"
              label="Name"
              register={register}
              required
              validate={{
                notFail: (v) => v !== "fail" || "invalid value",
              }}
            />

            {/* <label
              htmlFor="name"
              className="block text-md font-medium text-gray-700 mt-px pt-2"
            >
              Name
            </label>
            <div className="mt-0 col-span-2">
              <input
                {...register("name", {
                  validate: {
                    first: (v) => v !== "fail" || "fail if input is 'fail'",
                  },
                })}
                type="text"
                defaultValue={state.name}
                className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 max-w-xs text-sm border-gray-300 rounded-md"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.name.message}
                </p>
              )}
            </div> */}
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
