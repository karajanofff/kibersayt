const API_BASE = import.meta.env.VITE_API_URL || '';
const DEFAULT_TIMEOUT_MS = 20000;

function getToken() {
  return localStorage.getItem('cyberedu_token');
}

export function clearSession() {
  localStorage.removeItem('cyberedu_token');
  localStorage.removeItem('cyberedu_user');
}

export async function apiFetch(path, options = {}) {
  const { timeout = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));

    if (res.status === 401) {
      clearSession();
      window.dispatchEvent(new Event('cyberedu:session-expired'));
      throw new Error(data.message || 'Sessiya waqtı támam boldı. Qayta kiriń.');
    }

    if (!res.ok) {
      throw new Error(data.message || 'Sorawda qátelik júz berdi');
    }
    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Server juwap bermedi. Keyin qayta urınıp kóriń.');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
