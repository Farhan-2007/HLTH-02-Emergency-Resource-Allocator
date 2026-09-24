import RequestCard from "../components/RequestCard";
import { useEffect, useState } from "react";
import {
  getHospitalRequests,
  getHospitals,
} from "../services/api";

function HospitalDashboard() {
  // Temporary hospital ID for prototype
  const HOSPITAL_ID = 1;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hospital, setHospital] = useState(null);

  const loadHospital = async () => {
    try {
      const hospitals = await getHospitals();

      const currentHospital = hospitals.find(
        (hospital) => hospital.id === HOSPITAL_ID
      );

      setHospital(currentHospital);
    } catch (error) {
      console.error("Failed to load hospital:", error);
    }
  };

  const loadRequests = async () => {
    try {
      setLoading(true);

      const data = await getHospitalRequests(HOSPITAL_ID);
      setRequests(data);
    } catch (error) {
      console.error("Failed to load requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
    loadHospital();
  }, []);

  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow">HOSPITAL OPERATIONS</p>

          <h2>Hospital Dashboard</h2>

          <p>
            Manage emergency requests and available resources.
          </p>
        </div>

        <div className="system-status">
          <span></span>
          Hospital Online
        </div>
      </div>

      <div className="resource-grid">
        <div className="resource-card">
          <span>ICU</span>
          <strong>
            {hospital?.available?.ICU ?? 0} /{" "}
            {hospital?.capacity?.ICU ?? 0}
          </strong>
          <small>Available beds</small>
        </div>

        <div className="resource-card">
          <span>Trauma</span>
          <strong>
            {hospital?.available?.Trauma ?? 0} /{" "}
            {hospital?.capacity?.Trauma ?? 0}
          </strong>
          <small>Available units</small>
        </div>

        <div className="resource-card">
          <span>Ventilator</span>
          <strong>
            {hospital?.available?.Ventilator ?? 0} /{" "}
            {hospital?.capacity?.Ventilator ?? 0}
          </strong>
          <small>Available units</small>
        </div>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Incoming Requests</h3>

            <p>
              Emergency requests requiring hospital response
            </p>
          </div>
        </div>

        {loading ? (
          <p>Loading requests...</p>
        ) : requests.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onRequestUpdate={() => {
                loadRequests();
                loadHospital();
              }}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default HospitalDashboard;