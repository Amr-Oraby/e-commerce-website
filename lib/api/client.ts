export async function apiClient<T>(url: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);
  
  if (!headers.has("Content-Type") && !(options?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}
