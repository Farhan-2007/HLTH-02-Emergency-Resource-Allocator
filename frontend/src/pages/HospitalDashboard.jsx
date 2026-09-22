import RequestCard from "../components/RequestCard";

function HospitalDashboard() {
  const request = {
    caseId: 1,
    severity: "HIGH",
    facility: "ICU",
    location: "19.0760, 72.8777",
  };

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
          <strong>6 / 10</strong>
          <small>Available beds</small>
        </div>

        <div className="resource-card">
          <span>Trauma</span>
          <strong>5 / 8</strong>
          <small>Available units</small>
        </div>

        <div className="resource-card">
          <span>Ventilator</span>
          <strong>4 / 6</strong>
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

        <RequestCard request={request} />
      </section>
    </div>
  );
}

export default HospitalDashboard;