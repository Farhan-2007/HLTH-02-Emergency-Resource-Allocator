import { useState } from "react";
import {
  createCase,
  rankHospitals,
} from "../services/api";

function EmergencyForm({ onEmergencyCreated, onLoading }) {
  const [latitude, setLatitude] = useState("19.0760");
  const [longitude, setLongitude] = useState("72.8777");
  const [severity, setSeverity] = useState("high");
  const [facility, setFacility] = useState("ICU");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    onLoading(true);

    try {
      const caseData = {
        incident_latitude: Number(latitude),
        incident_longitude: Number(longitude),
        required_facilities: [facility],
        severity: severity,
      };

      const newCase = await createCase(caseData);

      const rankingData = {
        incident_latitude: Number(latitude),
        incident_longitude: Number(longitude),
        required_facilities: [facility],
      };

      const hospitals = await rankHospitals(rankingData);

      onEmergencyCreated({
        case: newCase,
        hospitals: hospitals,
        facility: facility,
      });
    } catch (err) {
      console.error(err);
      setError("Could not create emergency or connect to backend.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <form className="emergency-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Incident Latitude</label>
        <input
          type="number"
          step="any"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Incident Longitude</label>
        <input
          type="number"
          step="any"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Severity</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div className="form-group">
        <label>Required Facility</label>
        <select
          value={facility}
          onChange={(e) => setFacility(e.target.value)}
        >
          <option value="ICU">ICU</option>
          <option value="Trauma">Trauma</option>
          <option value="Ventilator">Ventilator</option>
          <option value="Blood Bank">Blood Bank</option>
        </select>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <button className="primary-button" type="submit">
        Find Hospitals
      </button>
    </form>
  );
}

export default EmergencyForm;