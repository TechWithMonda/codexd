import axios from 'axios'

// Use localhost in development, production URL otherwise
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-production-api.com'
  : 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor: attach token to headers for all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('deriv_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: optional, can handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: handle 401 globally
    if (error.response?.status === 401) {
      console.warn('Unauthorized! Redirect to login or refresh token.')
    }
    return Promise.reject(error)
  }
)

// Specific API calls
export const tradingAPI = {
  // Connection
  connect: (token) => api.post('/connect', { token }),

  // Bot control
  startBot: (data) => api.post('/start-bot', data),
  stopBot: () => api.post('/stop-bot'),
  getStatus: () => api.get('/status'),

  // Trading
  placeTrade: (data) => api.post('/trade', data),
  getBalance: () => api.get('/balance'), // token is now in headers

  // Market data
  getMarketAnalysis: () => api.get('/market-analysis')
}

export default api
