import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Error404 from "./components/Error404";
import Home from "./components/Home";
import EmployeesOverview from "./components/EmployeesOverview";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import EmployeeDetails from "./components/EmployeeDetails";
import AddEmployeeWizard from "./components/wizard/AddEmployeeWizard";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* All routes on this level will be rendered in the <Outlet /> of the App component */}
          <Route path="/" element={<Home />} />
          <Route path="employees/*" element={<EmployeesOverview />}>
            {/*
             * This route and all routes defined in the children will be rendered in the <Outlet/>
             * of the parent component, here <EmployeeOverview/>
             */}
            <Route path="addEmployee/*" element={<AddEmployeeWizard />} />
          </Route>
          <Route path="employees/:employeeID" element={<EmployeeDetails />} />
          {/* Catch all route if no other route matches */}
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
