import { Link, Route, Routes, useLocation } from "react-router-dom";
import create from "zustand";
import Step1 from "./Step1";
import Step2 from "./Step2";
import StepResult from "./StepResult";

/**
 * Defines the input the form captures.
 */
export interface AddEmployeeWizardInput {
  name: string;
  email: string;
  title: string;
  role: string;
}

/**
 * Defines the state which tracks the input for all steps of the wizard.
 */
interface AddEmployeeWizardState extends AddEmployeeWizardInput {
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  updateTitle: (title: string) => void;
  updateRole: (role: string) => void;
  /**
   * Reset the state to its initial state.
   */
  reset: () => void;
}

/**
 * The initial value of the state.
 */
const initialState: AddEmployeeWizardInput = {
  name: "",
  email: "",
  title: "",
  role: "",
};

/**
 * Create the state and implement its logic.
 */
export const useAddEmployeeWizardState = create<AddEmployeeWizardState>(
  (set) => ({
    ...initialState,
    errors: { ...initialState },
    updateName: (name) => {
      set(() => ({ name: name }));
    },
    updateEmail: (email) => {
      set(() => ({ email: email }));
    },
    updateTitle: (title) => {
      set(() => ({ title: title }));
    },
    updateRole: (role) => {
      set(() => ({ role: role }));
    },
    reset: () => {
      set({ ...initialState });
    },
  }),
);

/**
 * The properties each step gets passed.
 */
export interface WizardStepProps {
  /**Path to the next step (if there is one)*/
  nextStepPath?: string;
}

/**
 * Defines a step
 */
interface Step {
  /**
   * Name that identifies a step in the navigation bar
   */
  name: string;
  /**
   * The route of the step
   */
  to: string;
  /**
   * The element rendered to be the step
   */
  element: JSX.Element;
}

/**
 * Defines the steps the wizard consists out of.
 *
 * The steps will be shown in the order they are defined here.
 */
const steps: Step[] = [
  {
    name: "Personal Details",
    to: "/employees/addEmployee/step1",
    element: <Step1 nextStepPath="/employees/addEmployee/step2" />,
  },
  {
    name: "Job Details",
    to: "/employees/addEmployee/step2",
    element: <Step2 nextStepPath="/employees/addEmployee/summary" />,
  },
  {
    name: "Summary",
    to: "/employees/addEmployee/summary",
    element: <StepResult />,
  },
];

/**
 * Component responsible to render the individual steps and navigation of the wizard
 */
const AddEmployeeWizard = () => {
  return (
    <>
      {/* The routes defined here will be rendered in the <Outlet /> in the component of the parent path.
			    In this case the EmployeesOverview component. */}
      <Routes>
        {steps.map((step) => {
          // Extract the last (relative) part of the url of the step.
          const urlParts = step.to.split("/");
          const path = urlParts[urlParts.length - 1];
          // Since the routing is already aware of the full url
          // we must only add the relative part when creating the Route component.
          return <Route key={path} path={path} element={step.element} />;
        })}
      </Routes>
      <WizardProgress />
    </>
  );
};

/**
 * Component indicating the step of the form the user is in. Allows to freely navigate between
 * the different steps.
 */
const WizardProgress = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      <ol className="flex space-y-0 space-x-8">
        {steps.map((step) => {
          return (
            <li key={step.name} className="flex-1">
              <Link
                to={step.to}
                className={`group py-2 flex flex-col pl-0 pt-4 border-t-4 ${
                  pathname === step.to
                    ? "border-indigo-600 hover:border-indigo-800 "
                    : "border-indigo-200 hover:border-indigo-400"
                } `}
              >
                <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800">
                  {step.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default AddEmployeeWizard;
