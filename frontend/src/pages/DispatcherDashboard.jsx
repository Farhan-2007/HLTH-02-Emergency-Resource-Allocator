import { useEffect, useState } from "react";
import EmergencyForm from "../components/EmergencyForm";
import HospitalCard from "../components/HospitalCard";
import {
  createRequest,
  getCase,
} from "../services/api";

function DispatcherDashboard({
  dispatcherState,
  setDispatcherState,
}) {
  const {
    hospitals,
    currentCase,
    facility,
    requestSent,
    selectedHospital,
    caseStatus,
  } = dispatcherState;

  const [loading, setLoading] = useState(false);

  // =========================================================
  // EMERGENCY CREATED
  // =========================================================

  const handleEmergencyCreated = (data) => {
    setDispatcherState({
      hospitals: data.hospitals,
      currentCase: data.case,
      facility: data.facility,
      requestSent: false,
      selectedHospital: null,
      caseStatus: data.case.status,
    });
  };

  // =========================================================
  // SEND REQUEST TO HOSPITAL
  // =========================================================

  const handleSendRequest = async (hospital) => {
    if (!currentCase) {
      alert("Please create an emergency first.");
      return;
    }

    try {
      setLoading(true);

      console.log("Selected hospital:", hospital);
      console.log("Hospital ID:", hospital.hospital_id);

      const request = await createRequest({
        case_id: currentCase.id,
        hospital_id: hospital.hospital_id,
        resource_type: facility,
      });

      setDispatcherState((prev) => ({
        ...prev,
        selectedHospital: hospital,
        requestSent: true,
        caseStatus: "requested",
      }));

      console.log("Request created:", request);

    } catch (error) {
      console.error("Failed to send request:", error);
      alert("Failed to send request.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CHECK CASE STATUS
  // =========================================================

  useEffect(() => {
    if (!currentCase) {
      return;
    }

    const checkCaseStatus = async () => {
      try {
        const updatedCase = await getCase(currentCase.id);

        setDispatcherState((prev) => ({
          ...prev,
          currentCase: updatedCase,
          caseStatus: updatedCase.status,
        }));

      } catch (error) {
        console.error(
          "Failed to update case status:",
          error
        );
      }
    };

    // Check immediately
    checkCaseStatus();

    // Keep checking every 3 seconds
    const interval = setInterval(
      checkCaseStatus,
      3000
    );

    return () => clearInterval(interval);

  }, [currentCase?.id, setDispatcherState]);

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="dashboard">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="page-heading">

        <div>

          <p className="eyebrow">
            EMERGENCY CONTROL CENTER
          </p>

          <h2>
            Dispatcher Dashboard
          </h2>

          <p>
            Find and send an emergency request to a hospital.
          </p>

        </div>

        <div className="system-status">

          <span></span>

          System Online

        </div>

      </div>


      {/* =====================================================
          MAIN GRID
          ===================================================== */}

      <div className="dashboard-grid">


        {/* ===================================================
            LEFT — NEW EMERGENCY
            =================================================== */}

        <section className="panel">

          <div className="panel-header">

            <div>

              <h3>
                New Emergency
              </h3>

              <p>
                Enter incident information to find hospitals.
              </p>

            </div>

          </div>


          <EmergencyForm
            onEmergencyCreated={handleEmergencyCreated}
            onLoading={setLoading}
          />

        </section>


        {/* ===================================================
            RIGHT — HOSPITAL RECOMMENDATIONS
            =================================================== */}

        <section className="panel">

          <div className="panel-header">

            <div>

              <h3>
                Hospital Recommendations
              </h3>

              <p>
                Ranked using resource availability and travel time.
              </p>

            </div>

          </div>


          {/* =================================================
              LOADING
              ================================================= */}

          {loading && hospitals.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ...
              </div>

              <h3>
                Finding hospitals
              </h3>

              <p>
                Checking hospital resources and travel time.
              </p>

            </div>


          ) : hospitals.length === 0 ? (

            /* ===============================================
               NO ACTIVE EMERGENCY
               =============================================== */

            <div className="empty-state">

              <div className="empty-icon">
                +
              </div>

              <h3>
                No active emergency
              </h3>

              <p>
                Enter an emergency on the left to see
                recommended hospitals.
              </p>

            </div>


          ) : (

            /* ===============================================
               HOSPITAL RESULTS
               =============================================== */

            <>

              {/* =============================================
                  CASE STATUS
                  ============================================= */}

              {currentCase && (

                <div className="case-status-card">

                  <div>

                    <span>
                      CASE
                    </span>

                    <strong>
                      #{currentCase.id}
                    </strong>

                  </div>


                  <div>

                    <span>
                      STATUS
                    </span>

                    <strong
                      className={`status-${caseStatus}`}
                    >
                      {caseStatus.toUpperCase()}
                    </strong>

                  </div>

                </div>

              )}


              {/* =============================================
                  HOSPITAL LIST
                  ============================================= */}

              <div className="hospital-list">

                {hospitals.map(
                  (hospital, index) => (

                    <HospitalCard
                      key={hospital.hospital_id}
                      hospital={hospital}
                      rank={index + 1}
                      onSendRequest={handleSendRequest}
                      requestSent={
                        requestSent &&
                        selectedHospital?.hospital_id ===
                          hospital.hospital_id
                      }
                    />

                  )
                )}

              </div>

            </>

          )}

        </section>

      </div>

    </div>
  );
}

export default DispatcherDashboard;