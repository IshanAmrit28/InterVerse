// utils/api.js

/**
 * Send JSON POST request to backend API.
 * @param {string} endpoint - The API endpoint (e.g. "/api/saveInterviewData")
 * @param {Object} data - Data to send in JSON format
 * @returns {Promise<Object>} - Response JSON
 */
export async function postInterviewData(endpoint, data) {
  try {
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error in postData:", error);
    console.log(data);
    return { success: false, error: error.message };
  }
}
