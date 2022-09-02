import { Outlet, useNavigate } from "react-router-dom";
import EmployeeList from "./EmployeeList";

/**
 * Renders an overview of all employees and the action to add a new employee.
 *
 * Contains the <Outlet /> in which the wizard is rendered into to add a new employee.
 */
const EmployeesOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <div className="border-2 rounded-xl p-4 border-indigo-500 mt-10 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            Employees
          </h2>
        </div>
        <div className="flex mt-0">
          <button
            type="button"
						// This is what "opens" the wizard by forwarding the user to the endpoint under which it is rendered.
            onClick={() => navigate("/employees/addEmployee/step1")}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Employee
          </button>
        </div>
      </div>
			{/* In this outlet react-router will render the wizard. */}
      <Outlet />
      <EmployeeList />
    </div>
  );
};

export default EmployeesOverview;
