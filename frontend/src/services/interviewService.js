// frontend/src/services/interviewService.js
import { API_BASE_URL, API_ENDPOINTS } from "../constants";

// Helper function to send multipart form data (required for file upload)
export async function startInterview(formData) {
  const url = `${API_BASE_URL}${API_ENDPOINTS.INTERVIEW.START}`;

  // Note: We use raw fetch here and DON'T set Content-Type for FormData
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorBody = await response.text();
    throw new Error(
      `Failed to start interview: ${response.status} - ${errorBody}`
    );
  }

  return response.json();
}

// Sends the final report structure (questions + answers) for grading
export async function endInterview(reportPayload) {
  const url = `${API_BASE_URL}${API_ENDPOINTS.INTERVIEW.END}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reportPayload),
  });

  if (!response.ok) {
    let errorBody = await response.text();
    throw new Error(
      `Failed to end interview: ${response.status} - ${errorBody}`
    );
  }

  return response.json();
}

// Fetches the final graded report
export async function fetchReport(reportId) {
  const url = `${API_BASE_URL}${API_ENDPOINTS.INTERVIEW.GET_REPORT}/${reportId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch report ${reportId}`);
  }

  return response.json();
}
