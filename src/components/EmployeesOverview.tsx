import EmployeesOverviewHeader from "./EmployeesOverviewHeader";
import EmployeeList from "./EmployeeList";
import { Outlet } from "react-router-dom";

const EmployeesOverview = () => {
  return (
    <div className="container mx-auto ">
      <EmployeesOverviewHeader onAddEmployee={() => console.log("onEmployee")} />
      <EmployeeList />
			<Outlet/>
    </div>
  );
};

export default EmployeesOverview;
