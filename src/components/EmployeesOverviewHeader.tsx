interface EmployeesOverviewHeaderProps {
  onAddEmployee: () => void;
}

const EmployeesOverviewHeader = (props: EmployeesOverviewHeaderProps) => {
  return (
    <div className="border-2 rounded-xl p-4 border-indigo-500 my-10 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900">Employees</h2>
      </div>
      <div className="flex mt-0">
        <button
          type="button"
					onClick={props.onAddEmployee}
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default EmployeesOverviewHeader;
