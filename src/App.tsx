import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import JobBoard from "./components/JobBoard";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
