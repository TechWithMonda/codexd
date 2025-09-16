const API_BASE_URL = 'http://localhost:8000/api/trading'

export default {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  },

  // Bot Configuration
  getBotConfigs() {
    return this.request('/bot-configs/')
  },
  
  createBotConfig(config) {
    return this.request('/bot-configs/', {
      method: 'POST',
      body: JSON.stringify(config)
    })
  },
  
  updateBotConfig(id, config) {
    return this.request(`/bot-configs/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(config)
    })
  },
  
  deleteBotConfig(id) {
    return this.request(`/bot-configs/${id}/`, {
      method: 'DELETE'
    })
  },
  
  startBot(id) {
    return this.request(`/bot-configs/${id}/start_bot/`, {
      method: 'POST'
    })
  },
  
  stopBot(id) {
    return this.request(`/bot-configs/${id}/stop_bot/`, {
      method: 'POST'
    })
  },
  
  switchMarket(id) {
    return this.request(`/bot-configs/${id}/switch_market/`, {
      method: 'POST'
    })
  },
  
  forceTrade(id) {
    return this.request(`/bot-configs/${id}/force_trade/`, {
      method: 'POST'
    })
  },
  
  // Trades
  getTrades(botConfigId = null) {
    const params = botConfigId ? `?bot_config=${botConfigId}` : ''
    return this.request(`/trades/${params}`)
  },
  
  // Market Performance
  getMarketPerformance(botConfigId = null) {
    const params = botConfigId ? `?bot_config=${botConfigId}` : ''
    return this.request(`/market-performances/${params}`)
  },
  
  // Statistics
  getStatistics(botConfigId = null) {
    const params = botConfigId ? `?bot_config=${botConfigId}` : ''
    return this.request(`/bot-statistics/${params}`)
  },
  
  // Market Data
  getMarketData(botConfigId = null, limit = 100) {
    const params = new URLSearchParams()
    if (botConfigId) params.append('bot_config', botConfigId)
    params.append('limit', limit)
    
    return this.request(`/market-data/?${params}`)
  }
}