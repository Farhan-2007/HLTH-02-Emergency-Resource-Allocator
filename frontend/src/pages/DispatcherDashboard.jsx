function DispatcherDashboard() {
  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow">EMERGENCY CONTROL CENTER</p>
          <h2>Dispatcher Dashboard</h2>
          <p>
            Find the most suitable hospital for an incoming emergency.
          </p>
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
              <p>Enter patient and incident information</p>
            </div>
          </div>

          <div className="empty-form">
            Emergency form coming next.
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Hospital Recommendations</h3>
              <p>Ranked using availability and travel time</p>
            </div>
          </div>

          <div className="empty-state">
            <div className="empty-icon">+</div>
            <h3>No active emergency</h3>
            <p>
              Enter an emergency on the left to see recommended hospitals.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DispatcherDashboard;