import { useState } from "react";
import {
  acceptRequest,
  rejectRequest,
  dischargeRequest,
} from "../services/api";

function RequestCard({
  request,
  hospital,
  onRequestUpdate,
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  /*
   * Check how many units/beds of the required
   * resource are currently available.
   *
   * Example:
   * ICU request + ICU = 0
   * → Accept button disabled
   *
   * ICU request + ICU = 1
   * → Accept button enabled
   */
  const availableResource =
    hospital?.available?.[request.resource_type] ?? 0;

  const handleAccept = async () => {
    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      await acceptRequest(request.id);

      setMessage(
        "Request accepted successfully."
      );

      setMessageType("success");

      if (onRequestUpdate) {
        setTimeout(() => {
          onRequestUpdate();
        }, 500);
      }

    } catch (error) {
      console.error(
        "Failed to accept request:",
        error
      );

      setMessage(
        error?.message ||
        "Unable to accept this request."
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

      setMessage(
        "Request rejected successfully."
      );

      setMessageType("success");

      if (onRequestUpdate) {
        setTimeout(() => {
          onRequestUpdate();
        }, 500);
      }

    } catch (error) {
      console.error(
        "Failed to reject request:",
        error
      );

      setMessage(
        error?.message ||
        "Unable to reject this request."
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
      setMessageType("");

      await dischargeRequest(request.id);

      setMessage("Patient discharged successfully.");
      setMessageType("success");

      if (onRequestUpdate) {
        await onRequestUpdate();
      }

    } catch (error) {
      console.error(
        "Failed to discharge request:",
        error
      );

      setMessage(
        error?.message ||
        "Failed to discharge patient."
      );

      setMessageType("error");

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
            {request.status === "accepted"
              ? "ACTIVE PATIENT"
              : "EMERGENCY REQUEST"}
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
          <span>
            Required Facility
          </span>

          <strong>
            {request.resource_type}
          </strong>
        </div>

        <div>
          <span>
            Request ID
          </span>

          <strong>
            #{request.id}
          </strong>
        </div>

      </div>

      {/* Status */}
      <div
        className={`request-status ${request.status === "accepted"
            ? "active-status"
            : availableResource <= 0
              ? "waiting-status"
              : "ready-status"
          }`}
      >
        <span className="status-dot"></span>

        {request.status === "accepted"
          ? "Patient currently admitted"
          : availableResource <= 0
            ? `Waiting for ${request.resource_type} availability`
            : `${request.resource_type} available — ready for acceptance`}
      </div>

      {/* Actions */}
      <div className="request-actions">

        {/* Pending request */}
        {request.status === "requested" && (
          <>
            <button
              onClick={handleAccept}
              disabled={
                loading ||
                availableResource <= 0
              }
              title={
                availableResource <= 0
                  ? `No ${request.resource_type} available`
                  : "Accept emergency request"
              }
            >
              {loading
                ? "Processing..."
                : availableResource <= 0
                  ? "No Capacity"
                  : "Accept"}
            </button>

            <button
              onClick={handleReject}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : "Reject"}
            </button>
          </>
        )}

        {/* Accepted patient */}
        {request.status === "accepted" && (
          <button
            className="discharge-button"
            onClick={handleDischarge}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Discharge Patient"}
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
            {messageType === "success"
              ? "✓"
              : "!"}
          </span>

          {message}

        </div>
      )}

    </div>
  );
}

export default RequestCard;