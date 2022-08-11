import { Link, Route, Routes } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import StepResult from "./StepResult";

const steps = [
  {
    id: "Step 1",
    name: "Personal Details",
    to: "/employees/addEmployee/step1",
    element: <Step1 />,
    status: "complete",
  },
  {
    id: "Step 2",
    name: "Job Details",
    to: "/employees/addEmployee/step2",
    element: <Step2 />,
    status: "current",
  },
  {
    id: "Step 3",
    name: "Summary",
    to: "/employees/addEmployee/summary",
    element: <StepResult />,
    status: "upcoming",
  },
];

const AddEmployeeWizard = () => {
  return (
    <>
      {/* The routes defined here will be rendered in the <Outlet /> in the component of the parent path. */}
      <Routes>
        {steps.map((step) => {
          // Get the last part of the url
          const urlParts = step.to.split("/");
          const path = urlParts[urlParts.length - 1];

          return <Route key={path} path={path} element={step.element} />;
        })}
      </Routes>
      <WizardNavigator />
    </>
  );
};

function WizardNavigator() {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.status === "complete" ? (
              <Link
                to={step.to}
                className="group py-2 flex flex-col pl-0 pt-4 border-t-4 border-indigo-600 hover:border-indigo-800 "
              >
                <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </Link>
            ) : step.status === "current" ? (
              <Link
                to={step.to}
                className="group py-2 flex flex-col pl-0 pt-4 border-t-4 border-indigo-400 hover:border-indigo-600 "
                aria-current="step"
              >
                <span className="text-xs text-indigo-400 font-semibold tracking-wide uppercase">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </Link>
            ) : (
              <Link
                to={step.to}
                className="group py-2 flex flex-col pl-0 pt-4 pb-0 border-t-4 border-gray-200 hover:border-gray-300"
              >
                <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default AddEmployeeWizard;
