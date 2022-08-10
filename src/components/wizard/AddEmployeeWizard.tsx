import { Route, Routes } from "react-router-dom";
import Step1 from "./Step1";

const AddEmployeeWizard = () => {
  return (
    <Routes>
      <Route path="/" element={<Step1 />} />
    </Routes>
  );
};

export default AddEmployeeWizard;
