import EmployeesOverviewHeader from "./EmployeesOverviewHeader";
import EmployeeList from "./EmployeeList";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import AddEmployeeWizard from "./wizard/AddEmployeeWizard";

const EmployeesOverview = () => {
  const [isAddEmployeeFormOpen, setAddEmployeeFormOpen] =
    useState<boolean>(false);

  return (
    <div className="container mx-auto ">
      <EmployeesOverviewHeader
        onAddEmployee={() => setAddEmployeeFormOpen(!isAddEmployeeFormOpen)}
      />
      {isAddEmployeeFormOpen && <AddEmployeeWizard />}
      <EmployeeList />
      <Outlet />
    </div>
  );
};

export default EmployeesOverview;
