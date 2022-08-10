import { Route, Routes } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import StepStart from "./StepStart";

const AddEmployeeWizard = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StepStart />} />
        <Route path="step1" element={<Step1 />} />
        <Route path="step2" element={<Step2 />} />
      </Routes>
      <div>Navigation</div>
    </>
  );
};

export default AddEmployeeWizard;