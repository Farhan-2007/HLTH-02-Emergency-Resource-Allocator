const API_BASE_URL = "http://127.0.0.1:8000";

export async function rankHospitals(data) {
  console.log("Sending to backend:", data);

  const response = await fetch(`${API_BASE_URL}/rank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("Backend response:", response.status);

  if (!response.ok) {
    throw new Error(`Backend returned ${response.status}`);
  }

  return response.json();
}

export const getHospitalRequests = async (hospitalId) => {
  const response = await fetch(
    `${API_BASE_URL}/requests/hospital/${hospitalId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hospital requests");
  }

  return response.json();
};

export const acceptRequest = async (requestId) => {
  const response = await fetch(
    `${API_BASE_URL}/requests/${requestId}/accept`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to accept request");
  }

  return response.json();
};

export const rejectRequest = async (requestId) => {
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
};

export const getHospitals = async () => {
  const response = await fetch(`${API_BASE_URL}/hospitals`);

  if (!response.ok) {
    throw new Error("Failed to fetch hospitals");
  }

  return response.json();
};