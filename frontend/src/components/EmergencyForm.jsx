import { useState } from "react";

function EmergencyForm() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [severity, setSeverity] = useState("high");
  const [facility, setFacility] = useState("ICU");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Emergency details entered successfully.");
  };

  return (
    <form className="emergency-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Incident Latitude</label>
        <input
          type="number"
          step="any"
          placeholder="19.0760"
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
          placeholder="72.8777"
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

      <button className="primary-button" type="submit">
        Create Emergency
      </button>
    </form>
  );
}

export default EmergencyForm;