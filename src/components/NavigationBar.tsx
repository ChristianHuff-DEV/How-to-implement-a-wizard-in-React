import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="px-2 border-transparent border-b-2 border-gray-300">
      <div className="relative flex justify-between h-16">
        <div className="flex-1 flex items-stretch justify-start">
          <div className="ml-6 flex space-x-8">
            <Link
              to="/"
              className="border-transparent text-gray-800 hover:border-indigo-600 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
            >
              Home
            </Link>
            <Link
              to="employees"
              className="border-transparent text-gray-800 hover:border-indigo-600 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
            >
              Employees
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
