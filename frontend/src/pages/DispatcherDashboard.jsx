import EmergencyForm from "../components/EmergencyForm";
import HospitalCard from "../components/HospitalCard";

function DispatcherDashboard() {
  const hospitals = [
    {
      id: 1,
      name: "City Care Hospital",
      location: "Mumbai",
      icu: "6 / 10",
      trauma: "5 / 8",
      ventilator: "4 / 6",
      travelTime: "6 min",
    },
    {
      id: 2,
      name: "Metro General Hospital",
      location: "Navi Mumbai",
      icu: "3 / 8",
      trauma: "N/A",
      ventilator: "2 / 5",
      travelTime: "14 min",
    },
    {
      id: 3,
      name: "Sunrise Medical Center",
      location: "Mumbai",
      icu: "4 / 6",
      trauma: "7 / 10",
      ventilator: "N/A",
      travelTime: "18 min",
    },
  ];

  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow">EMERGENCY CONTROL CENTER</p>

          <h2>Dispatcher Dashboard</h2>

          <p>
            Create an emergency and find suitable hospitals.
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

              <p>
                Enter patient and incident information
              </p>
            </div>
          </div>

          <EmergencyForm />
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Hospital Recommendations</h3>

              <p>
                Hospitals available for emergency allocation
              </p>
            </div>
          </div>

          <div className="hospital-list">
            {hospitals.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DispatcherDashboard;