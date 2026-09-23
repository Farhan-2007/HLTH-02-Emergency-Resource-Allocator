import { useState } from "react";
import EmergencyForm from "../components/EmergencyForm";
import HospitalCard from "../components/HospitalCard";

function DispatcherDashboard() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleResults = (results) => {
    setHospitals(results);
  };

  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow">EMERGENCY CONTROL CENTER</p>
          <h2>Dispatcher Dashboard</h2>
          <p>Find the most suitable hospital for an incoming emergency.</p>
        </div>

        <div className="system-status">
          <span></span>
          System Online
        </div>
      </div>

      <div className="dashboard-grid">

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>New Emergency</h3>
              <p>Enter incident information to find hospitals.</p>
            </div>
          </div>

          <EmergencyForm
            onResults={handleResults}
            onLoading={setLoading}
          />
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Hospital Recommendations</h3>
              <p>Ranked using resource availability and travel time.</p>
            </div>
          </div>

          {loading ? (
            <div className="empty-state">
              <div className="empty-icon">...</div>
              <h3>Finding hospitals</h3>
              <p>Checking hospital resources and travel time.</p>
            </div>
          ) : hospitals.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">+</div>
              <h3>No active emergency</h3>
              <p>
                Enter an emergency on the left to see recommended hospitals.
              </p>
            </div>
          ) : (
            <div className="hospital-list">
              {hospitals.map((hospital, index) => (
                <HospitalCard
                  key={hospital.hospital_id}
                  hospital={hospital}
                  rank={index + 1}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default DispatcherDashboard;