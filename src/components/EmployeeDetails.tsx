import { useParams } from "react-router-dom";

/**
 *  Displays details about a single employee.
 */
const EmployeeDetails = () => {
  const params = useParams();
  return <div>Employee: {params.employeeID}</div>;
};

export default EmployeeDetails;
