const API_BASE_URL = "http://127.0.0.1:8000";

export async function rankHospitals(data) {
  const response = await fetch(`${API_BASE_URL}/rank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Backend returned ${response.status}`);
  }

  return response.json();
}

export async function createCase(data) {
  const response = await fetch(`${API_BASE_URL}/cases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create case: ${response.status}`);
  }

  return response.json();
}

export async function getCase(caseId) {
  const response = await fetch(
    `${API_BASE_URL}/cases/${caseId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to get case: ${response.status}`);
  }

  return response.json();
}

export async function createRequest(data) {
  const response = await fetch(`${API_BASE_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create request: ${response.status}`);
  }

  return response.json();
}

export async function getHospitalRequests(hospitalId) {
  const response = await fetch(
    `${API_BASE_URL}/requests/hospital/${hospitalId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hospital requests");
  }

  return response.json();
}

export const acceptRequest = async (requestId) => {
  const response = await fetch(
    `${API_BASE_URL}/requests/${requestId}/accept`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.detail || "Failed to accept request"
    );
  }

  return response.json();
};

export async function rejectRequest(requestId) {
  const response = await fetch(
    `${API_BASE_URL}/requests/${requestId}/reject`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to reject request");
  }

  return response.json();
}

export async function getHospitals() {
  const response = await fetch(`${API_BASE_URL}/hospitals`);

  if (!response.ok) {
    throw new Error("Failed to fetch hospitals");
  }

  return response.json();
}

export const dischargeRequest = async (requestId) => {
  const response = await fetch(
    `${API_BASE_URL}/requests/${requestId}/discharge`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to discharge request");
  }

  return response.json();
};

export const getActiveHospitalRequests = async (hospitalId) => {
  const response = await fetch(
    `${API_BASE_URL}/requests/hospital/${hospitalId}/active`
  );

  if (!response.ok) {
    throw new Error("Failed to load active patients");
  }

  return response.json();
};