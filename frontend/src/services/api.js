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