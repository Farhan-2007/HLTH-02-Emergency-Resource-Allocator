import RequestCard from "../components/RequestCard";
import { useCallback, useEffect, useState } from "react";
import {
  getHospitalRequests,
  getActiveHospitalRequests,
  getHospitals,
} from "../services/api";

function HospitalDashboard() {
  const [hospitals, setHospitals] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);

  const [requests, setRequests] = useState([]);
  const [activePatients, setActivePatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // The selected hospital is derived from the list, so its ICU / Trauma /
  // Ventilator numbers stay fresh every time the list refreshes.
  const hospital = hospitals.find((h) => h.id === hospitalId) || null;

  const loadHospitals = useCallback(async () => {
    try {
      const data = await getHospitals();
      setHospitals(data);

      // Pick the first hospital on first load, or if the current id
      // no longer exists (e.g. after re-seeding the database).
      setHospitalId((current) =>
        data.some((h) => h.id === current)
          ? current
          : data[0]?.id ?? null
      );
    } catch (error) {
      console.error("Failed to load hospitals:", error);
    }
  }, []);

  // Refresh everything (used after Accept / Reject / Discharge)
  const refreshHospitalData = useCallback(async () => {
    if (hospitalId === null) return;

    try {
      const [pending, active] = await Promise.all([
        getHospitalRequests(hospitalId),
        getActiveHospitalRequests(hospitalId),
      ]);

      setRequests(pending);
      setActivePatients(active);
      await loadHospitals();
    } catch (error) {
      console.error("Failed to refresh hospital data:", error);
    }
  }, [hospitalId, loadHospitals]);

  const handleHospitalChange = (event) => {
    setHospitalId(Number(event.target.value));

    // Clear the previous hospital's data straight away
    setRequests([]);
    setActivePatients([]);
    setLoading(true);
  };

  // Load the hospital list and keep it fresh
  useEffect(() => {
    loadHospitals();

    const interval = setInterval(loadHospitals, 3000);
    return () => clearInterval(interval);
  }, [loadHospitals]);

  // Load requests + active patients for the selected hospital
  useEffect(() => {
    if (hospitalId === null) return;

    // Ignore responses that arrive after the user switched hospital
    let cancelled = false;

    const load = async (isInitial) => {
      try {
        const [pending, active] = await Promise.all([
          getHospitalRequests(hospitalId),
          getActiveHospitalRequests(hospitalId),
        ]);

        if (cancelled) return;

        setRequests(pending);
        setActivePatients(active);
      } catch (error) {
        console.error("Failed to load hospital data:", error);
      } finally {
        if (!cancelled && isInitial) {
          setLoading(false);
        }
      }
    };

    load(true);

    const interval = setInterval(() => load(false), 3000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [hospitalId]);

  return (
    <div className="dashboard">

      {/* Page heading */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">
            HOSPITAL OPERATIONS
          </p>

          <h2>{hospital ? hospital.name : "Hospital Dashboard"}</h2>

          <p>
            Manage emergency requests and available resources.
          </p>
        </div>

        <div className="form-group" style={{ minWidth: 240 }}>
          <label htmlFor="hospital-select">
            Viewing as hospital
          </label>

          <select
            id="hospital-select"
            value={hospitalId ?? ""}
            onChange={handleHospitalChange}
          >
            {hospitals.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
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