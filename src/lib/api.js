export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function parseResponse(res) {
  let data = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    return await parseResponse(res);
  } catch (err) {
    if (err.message && err.message !== "Failed to fetch") {
      throw err;
    }
    throw new Error(
      "Cannot reach the API server. Run: cd driveFleet-server && npm run dev",
    );
  }
}
