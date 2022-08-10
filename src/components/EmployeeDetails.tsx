import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const params = useParams();
  return <div>Employee: {params.employeeID}</div>;
};

export default EmployeeDetails;
