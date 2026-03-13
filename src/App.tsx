import { Outlet} from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return (
    <div className="w-full h-full min-h-screen">
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
