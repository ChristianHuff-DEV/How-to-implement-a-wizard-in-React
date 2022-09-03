import { Outlet } from "react-router-dom";
import NavigationBar from "./components/base/NavigationBar";

/**
 * Renders the navigation bar and the component defined for that route.
 */
function App() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default App;
