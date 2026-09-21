import { useState } from "react";
import DispatcherDashboard from "./pages/DispatcherDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import "./index.css";

function App() {
  const [role, setRole] = useState("dispatcher");

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>ResQ</h1>
          <span>Real-Time Emergency Resource Allocator</span>
        </div>

        <div className="role-switch">
          <button
            className={role === "dispatcher" ? "active" : ""}
            onClick={() => setRole("dispatcher")}
          >
            Dispatcher
          </button>

          <button
            className={role === "hospital" ? "active" : ""}
            onClick={() => setRole("hospital")}
          >
            Hospital
          </button>
        </div>
      </header>

      <main>
        {role === "dispatcher" ? (
          <DispatcherDashboard />
        ) : (
          <HospitalDashboard />
        )}
      </main>
    </div>
  );
}

export default App;