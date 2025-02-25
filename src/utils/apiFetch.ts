export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const API_URL = import.meta.env.VITE_ALEGRA_API_URL || ''
  const TOKEN = import.meta.env.VITE_ALEGRA_API_TOKEN || ''

  const defaultHeaders = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Basic ${TOKEN}`,
  })

  const headers = options.headers ? new Headers(options.headers) : new Headers()
  defaultHeaders.forEach((value, key) => {
    if (!headers.has(key)) {
      headers.set(key, value)
    }
  })

  const config: RequestInit = {
    ...options,
    headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, config)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`)
  }
  return response.json()
}
