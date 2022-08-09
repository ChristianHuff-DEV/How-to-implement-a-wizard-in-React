import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import JobBoard from "./components/JobBoard";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Home />
      <JobBoard />
    </BrowserRouter>
  );
}

export default App;
