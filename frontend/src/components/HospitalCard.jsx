function HospitalCard({
  hospital,
  rank,
  onSendRequest,
  requestSent,
}) {
  return (
    <div className="hospital-card">

      <div className="hospital-card-top">
        <div>
          <span className="hospital-rank">
            #{rank}
          </span>

          <h3>{hospital.hospital_name}</h3>

          <p>Recommended hospital</p>
        </div>

        <span className="availability-badge">
          Resource Available
        </span>
      </div>

      <div className="hospital-details">

        <div>
          <span>Distance</span>
          <strong>
            {hospital.distance_km.toFixed(2)} km
          </strong>
        </div>

        <div>
          <span>Travel Time</span>
          <strong>
            {hospital.estimated_travel_time_minutes.toFixed(1)} min
          </strong>
        </div>

      </div>

      <div className="ranking-reason">
        <span>Why recommended?</span>

        <p>
          {hospital.reason}
        </p>
      </div>

      <button
        className="request-button"
        onClick={() => onSendRequest(hospital)}
        disabled={requestSent}
      >
        {requestSent ? "Request Sent" : "Send Request"}
      </button>

    </div>
  );
}

export default HospitalCard;