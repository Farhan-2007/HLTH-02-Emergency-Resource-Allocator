function HospitalDashboard() {
  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow">HOSPITAL OPERATIONS</p>
          <h2>Hospital Dashboard</h2>
          <p>Manage incoming emergency requests and available resources.</p>
        </div>

        <div className="system-status">
          <span></span>
          Hospital Online
        </div>
      </div>

      <div className="resource-grid">
        <div className="resource-card">
          <span>ICU</span>
          <strong>4 / 6</strong>
          <small>Available beds</small>
        </div>

        <div className="resource-card">
          <span>Trauma</span>
          <strong>3 / 5</strong>
          <small>Available units</small>
        </div>

        <div className="resource-card">
          <span>Ventilator</span>
          <strong>7 / 10</strong>
          <small>Available units</small>
        </div>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Incoming Requests</h3>
            <p>Emergency requests requiring your response</p>
          </div>
        </div>

        <div className="empty-state">
          <div className="empty-icon">✓</div>
          <h3>No pending requests</h3>
          <p>New emergency requests will appear here.</p>
        </div>
      </section>
    </div>
  );
}

export default HospitalDashboard;