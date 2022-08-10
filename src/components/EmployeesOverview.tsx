import EmployeesOverviewHeader from "./EmployeesOverviewHeader";
import EmployeeList from "./EmployeeList";

const EmployeesOverview = () => {
  return (
    <div className="container mx-auto ">
      <EmployeesOverviewHeader onAddEmployee={() => console.log("onEmployee")} />
      <EmployeeList />
    </div>
  );
};

export default EmployeesOverview;
