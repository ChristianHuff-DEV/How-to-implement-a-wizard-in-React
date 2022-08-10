import EmployeesOverviewHeader from "./EmployeesOverviewHeader";
import EmployeeList from "./EmployeeList";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const EmployeesOverview = () => {
  const [isAddEmployeeFormOpen, setAddEmployeeFormOpen] =
    useState<boolean>(false);

  return (
    <div className="container mx-auto ">
      <EmployeesOverviewHeader
        onAddEmployee={() => console.log("onEmployee")}
      />
      <EmployeeList />
      <Outlet />
    </div>
  );
};

export default EmployeesOverview;
