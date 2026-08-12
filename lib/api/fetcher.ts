import { getLocale } from 'next-intl/server';

const BASE_URL = "https://bayt-aljamal-dev.saber.aait-d.com/api/";

interface FetchOptions extends Omit<RequestInit, "body"> {
  endpoint: string;
  body?: unknown;
}

export async function apiFetch<T>({
  endpoint,
  headers,
  body,
  ...options
}: FetchOptions): Promise<T> {
  let locale = 'en';
  try {
    locale = await getLocale();
  } catch (e) {
    // Fallback if getLocale fails in some contexts
  }

  const isFormData = body instanceof FormData;
  const mergedHeaders: Record<string, string> = { ...(headers as Record<string, string> || {}) };
  if (!isFormData) {
    mergedHeaders["Content-Type"] = "application/json";
  }
  mergedHeaders["Accept-Language"] = locale;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: mergedHeaders,
    body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
    next: options.next,
  });

  if (!response?.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `Request failed: ${response?.status}`);
    (error as any).status = response?.status;
    throw error;
  }

  return response.json() as Promise<T>;
}
