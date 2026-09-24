import { useState } from "react";
import {
  acceptRequest,
  rejectRequest,
  dischargeRequest,
} from "../services/api";

function RequestCard({ request, onRequestUpdate }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleAccept = async () => {
    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      await acceptRequest(request.id);

      setMessage("Request accepted successfully.");
      setMessageType("success");

      if (onRequestUpdate) {
        setTimeout(() => {
          onRequestUpdate();
        }, 500);
      }
    } catch (error) {
      console.error("Failed to accept request:", error);

      setMessage(
        error?.message || "Unable to accept this request."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      await rejectRequest(request.id);

      setMessage("Request rejected successfully.");
      setMessageType("success");

      if (onRequestUpdate) {
        setTimeout(() => {
          onRequestUpdate();
        }, 500);
      }
    } catch (error) {
      console.error("Failed to reject request:", error);

      setMessage(
        error?.message || "Unable to reject this request."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDischarge = async () => {
    try {
      setLoading(true);
      setMessage("");

      await dischargeRequest(request.id);

      setMessage("Patient discharged successfully.");

      if (onRequestUpdate) {
        onRequestUpdate();
      }
    } catch (error) {
      console.error("Failed to discharge request:", error);
      setMessage("Failed to discharge patient.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-card">

      {/* Header */}
      <div className="request-header">

        <div>
          <span className="request-label">
            EMERGENCY REQUEST
          </span>

          <h3>
            Case #{request.case_id}
          </h3>
        </div>

        <span className="severity-badge">
          {request.status?.toUpperCase()}
        </span>

      </div>

      {/* Request information */}
      <div className="request-info">

        <div>
          <span>Required Facility</span>

          <strong>
            {request.resource_type}
          </strong>
        </div>

        <div>
          <span>Request ID</span>

          <strong>
            #{request.id}
          </strong>
        </div>

      </div>

      {/* Waiting status */}
      <div className="request-status">
        <span className="status-dot"></span>

        Waiting for hospital response
      </div>

      {/* Actions */}
      <div className="request-actions">
        {request.status === "requested" && (
          <>
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
          </>
        )}

        {request.status === "accepted" && (
          <button
            className="discharge-button"
            onClick={handleDischarge}
            disabled={loading}
          >
            {loading ? "Processing..." : "Discharge Patient"}
          </button>
        )}
      </div>

      {/* Feedback */}
      {message && (
        <div
          className={`request-message ${messageType === "success"
              ? "success-message"
              : "error-message"
            }`}
        >
          <span>
            {messageType === "success" ? "✓" : "!"}
          </span>

          {message}
        </div>
      )}

    </div>
  );
}

export default RequestCard;