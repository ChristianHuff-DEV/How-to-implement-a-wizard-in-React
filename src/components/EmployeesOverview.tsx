import { Outlet, useNavigate } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import EmployeesOverviewHeader from "./EmployeesOverviewHeader";

const EmployeesOverview = () => {
	const navigate = useNavigate();

  return (
    <div className="container mx-auto ">
      <EmployeesOverviewHeader
        onAddEmployee={() => navigate("/employees/addEmployee/step1")}
      />
      <Outlet />
      <EmployeeList />
    </div>
  );
};

export default EmployeesOverview;
