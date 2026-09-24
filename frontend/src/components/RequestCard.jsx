import { useState } from "react";
import {
  acceptRequest,
  rejectRequest,
} from "../services/api";

function RequestCard({ request, onRequestUpdate }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAccept = async () => {
    try {
      setLoading(true);
      setMessage("");

      await acceptRequest(request.id);

      setMessage("Request accepted successfully.");

      if (onRequestUpdate) {
        onRequestUpdate();
      }
    } catch (error) {
      console.error("Failed to accept request:", error);
      setMessage("Failed to accept request.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      setMessage("");

      await rejectRequest(request.id);

      setMessage("Request rejected successfully.");

      if (onRequestUpdate) {
        onRequestUpdate();
      }
    } catch (error) {
      console.error("Failed to reject request:", error);
      setMessage("Failed to reject request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-card">
      <div className="request-header">
        <div>
          <span className="request-label">
            EMERGENCY REQUEST
          </span>

          <h3>Case #{request.case_id}</h3>
        </div>

        <span className="severity-badge">
          {request.status?.toUpperCase()}
        </span>
      </div>

      <div className="request-info">
        <div>
          <span>Required Facility</span>
          <strong>{request.resource_type}</strong>
        </div>

        <div>
          <span>Request ID</span>
          <strong>#{request.id}</strong>
        </div>
      </div>

      <div className="request-status">
        Request waiting for hospital response
      </div>

      <div className="request-actions">
        <button
          onClick={handleAccept}
          disabled={loading}
        >
          {loading ? "Processing..." : "Accept"}
        </button>

        <button
          onClick={handleReject}
          disabled={loading}
        >
          {loading ? "Processing..." : "Reject"}
        </button>
      </div>

      {message && (
        <div className="request-message">
          {message}
        </div>
      )}
    </div>
  );
}

export default RequestCard;