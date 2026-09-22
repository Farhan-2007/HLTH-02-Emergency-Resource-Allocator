function HospitalCard({ hospital }) {
  return (
    <div className="hospital-card">
      <div className="hospital-card-top">
        <div>
          <h3>{hospital.name}</h3>
          <p>{hospital.location}</p>
        </div>

        <span className="availability-badge">
          Available
        </span>
      </div>

      <div className="hospital-details">
        <div>
          <span>ICU</span>
          <strong>{hospital.icu}</strong>
        </div>

        <div>
          <span>Trauma</span>
          <strong>{hospital.trauma}</strong>
        </div>

        <div>
          <span>Ventilator</span>
          <strong>{hospital.ventilator}</strong>
        </div>
      </div>

      <div className="hospital-footer">
        <span>Travel time</span>
        <strong>{hospital.travelTime}</strong>
      </div>
    </div>
  );
}

export default HospitalCard;