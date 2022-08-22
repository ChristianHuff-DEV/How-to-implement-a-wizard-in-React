import { Link, Route, Routes, useLocation } from "react-router-dom";
import create from "zustand";
import Step1 from "./Step1";
import Step2 from "./Step2";
import StepResult from "./StepResult";

export interface AddEmployeeWizardInput {
  name: string;
  email: string;
  title: string;
  role: string;
}

interface AddEmployeeWizardState extends AddEmployeeWizardInput {
  errors: AddEmployeeWizardInput;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  updateTitle: (title: string) => void;
  updateRole: (role: string) => void;
  reset: () => void;
}

const initialState: AddEmployeeWizardInput = {
  name: "",
  email: "",
  title: "",
  role: "",
};

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
      set(() => ({ ...initialState }));
    },
  }),
);

interface Step {
  id: string;
  name: string;
  to: string;
  element: JSX.Element;
}

export interface StepProps {
  /**Path to the next step (if there is one)*/
  nextStepPath?: string;
}

const steps: Step[] = [
  {
    id: "Step 1",
    name: "Personal Details",
    to: "/employees/addEmployee/step1",
    element: <Step1 nextStepPath="/employees/addEmployee/step2" />,
  },
  {
    id: "Step 2",
    name: "Job Details",
    to: "/employees/addEmployee/step2",
    element: <Step2 nextStepPath="/employees/addEmployee/summary" />,
  },
  {
    id: "Step 3",
    name: "Summary",
    to: "/employees/addEmployee/summary",
    element: <StepResult />,
  },
];

const AddEmployeeWizard = () => {
  return (
    <>
      {/* The routes defined here will be rendered in the <Outlet /> in the component of the parent path. */}
      <Routes>
        {steps.map((step) => {
          // Get the last part of the url. This is the relative url for the steps path
          const urlParts = step.to.split("/");
          const path = urlParts[urlParts.length - 1];

          return <Route key={path} path={path} element={step.element} />;
        })}
      </Routes>
      <WizardProgress />
    </>
  );
};

function WizardProgress() {
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
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default AddEmployeeWizard;
