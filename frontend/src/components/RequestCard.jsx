function RequestCard({ request }) {
  return (
    <div className="request-card">
      <div className="request-header">
        <div>
          <span className="request-label">EMERGENCY REQUEST</span>
          <h3>Case #{request.caseId}</h3>
        </div>

        <span className="severity-badge">
          {request.severity}
        </span>
      </div>

      <div className="request-info">
        <div>
          <span>Required Facility</span>
          <strong>{request.facility}</strong>
        </div>

        <div>
          <span>Location</span>
          <strong>{request.location}</strong>
        </div>
      </div>

      <div className="request-status">
        Request waiting for hospital response
      </div>
    </div>
  );
}

export default RequestCard;