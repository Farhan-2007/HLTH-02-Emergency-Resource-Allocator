import RequestCard from "../components/RequestCard";
import { useCallback, useEffect, useState } from "react";
import {
  getHospitalRequests,
  getActiveHospitalRequests,
  getHospitals,
} from "../services/api";

function HospitalDashboard({ hospitalId = 1 }) {
  

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePatients, setActivePatients] = useState([]);
  const [hospital, setHospital] = useState(null);

  const loadHospital = useCallback(async () => {
    try {
      const hospitals = await getHospitals();

      const currentHospital = hospitals.find(
        (hospital) => hospital.id === hospitalId
      );

      setHospital(currentHospital);
    } catch (error) {
      console.error("Failed to load hospital:", error);
    }
  }, [hospitalId]);

  const loadRequests = useCallback(
    async (showLoading = false) => {
      try {
        if (showLoading) {
          setLoading(true);
        }

        const data = await getHospitalRequests(hospitalId);
        setRequests(data);
      } catch (error) {
        console.error("Failed to load requests:", error);
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [hospitalId]
  );

  const loadActivePatients = useCallback(async () => {
    try {
      const data = await getActiveHospitalRequests(hospitalId);
      setActivePatients(data);
    } catch (error) {
      console.error("Failed to load active patients:", error);
    }
  }, [hospitalId]);

const refreshHospitalData = useCallback(async () => {
  await Promise.all([
    loadRequests(),
    loadActivePatients(),
    loadHospital(),
  ]);
}, [loadRequests, loadActivePatients, loadHospital]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadRequests(true);
      loadActivePatients();
      loadHospital();
    }, 0);

    const interval = setInterval(() => {
      loadRequests();
      loadActivePatients();
      loadHospital();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [
    hospitalId,
    loadRequests,
    loadActivePatients,
    loadHospital,
  ]);

  return (
    <div className="dashboard">

      {/* Page heading */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">
            HOSPITAL OPERATIONS
          </p>

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

      {/* Resources */}
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

      {/* Incoming requests */}
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
          <div className="empty-state request-empty-state">

            <div className="empty-icon">
              ✓
            </div>

            <h3>
              No pending requests
            </h3>

            <p>
              All emergency requests have been processed.
            </p>

          </div>
        ) : (
          requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              hospital={hospital}
              onRequestUpdate={refreshHospitalData}
            />
          ))
        )}

      </section>

      {/* Active patients */}
      <section className="panel">

        <div className="panel-header">
          <div>
            <h3>Active Patients</h3>

            <p>
              Patients currently occupying hospital resources
            </p>
          </div>
        </div>

        {activePatients.length === 0 ? (
          <div className="empty-state">

            <div className="empty-icon">
              ✓
            </div>

            <h3>
              No active patients
            </h3>

            <p>
              No patients are currently admitted.
            </p>

          </div>
        ) : (
          activePatients.map((patient) => (
            <RequestCard
              key={patient.id}
              request={patient}
              hospital={hospital}
              onRequestUpdate={refreshHospitalData}
            />
          ))
        )}

      </section>

    </div>
  );
}

export default HospitalDashboard;