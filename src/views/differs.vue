<template>
  <div>
    <div class="dashboard-header">
      <div class="header-left">
        <h2>Smart Market Differ Bot</h2>
      </div>
      <div class="header-right">
        <button class="btn-primary" @click="showConfigModal = true">
          New Bot Config
        </button>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="sidebar">
        <BotConfiguration
          v-if="currentBotConfig"
          :config="currentBotConfig"
          @update="updateBotConfig"
          @start="startBot"
          @stop="stopBot"
        />
      </div>

      <div class="main-content">
        <div class="content-grid">
          <div class="stats-section">
            <Statistics :stats="statistics" />
          </div>

          <div class="market-section">
            <MarketAnalysis
              :market-data="marketData"
              :performance="marketPerformance"
            />
          </div>

          <div class="trades-section">
            <TradeHistory :trades="trades" />
          </div>
        </div>
      </div>
    </div>

    <!-- Bot Config Modal -->
    <div v-if="showConfigModal" class="modal-overlay" tabindex="-1">
      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Create New Bot Configuration</h5>
            <button type="button" class="close-btn" @click="showConfigModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createNewConfig">
              <div class="form-group">
                <label>API Token</label>
                <input
                  type="password"
                  class="form-input"
                  v-model="newConfig.token"
                  required
                />
              </div>
              <div class="form-group">
                <label>Stake Amount ($)</label>
                <input
                  type="number"
                  class="form-input"
                  v-model="newConfig.stake"
                  min="1"
                  step="0.01"
                  required
                />
              </div>
              <div class="form-group">
                <label>Max Trades</label>
                <input
                  type="number"
                  class="form-input"
                  v-model="newConfig.max_trades"
                  min="1"
                  required
                />
              </div>
              <div class="form-group">
                <label>Initial Market</label>
                <select class="form-select" v-model="newConfig.current_market">
                  <option value="R_10">R_10</option>
                  <option value="R_25">R_25</option>
                  <option value="R_50">R_50</option>
                  <option value="R_75">R_75</option>
                  <option value="R_100">R_100</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="showConfigModal = false">
              Cancel
            </button>
            <button type="button" class="btn-primary" @click="createNewConfig">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BotConfiguration from '../components/BotConfiguration.vue'
import Statistics from '../components/Statistics.vue'
import MarketAnalysis from '../components/MarketAnalysis.vue'
import TradeHistory from '../components/TradeHistory.vue'

export default {
  name: 'Dashboard',
  components: {
    BotConfiguration,
    Statistics,
    MarketAnalysis,
    TradeHistory
  },
  data() {
    return {
      showConfigModal: false,
      currentBotConfig: null,
      statistics: {},
      marketData: {},
      marketPerformance: {},
      trades: [],
      newConfig: {
        token: '',
        stake: 1,
        max_trades: 5,
        current_market: 'R_10'
      }
    }
  },
  methods: {
    createNewConfig() {
      // Implementation for creating new config
      this.showConfigModal = false
    },
    updateBotConfig(config) {
      this.currentBotConfig = config
    },
    startBot() {
      // Implementation for starting bot
    },
    stopBot() {
      // Implementation for stopping bot
    }
  }
}
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
}

.header-left h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.sidebar {
  min-height: 400px;
}

.main-content {
  display: flex;
  flex-direction: column;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.stats-section {
  grid-column: 1 / -1;
}

.market-section,
.trades-section {
  min-height: 300px;
}

/* Button Styles */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.btn-secondary:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
}

.modal-header h5 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e9ecef;
  color: #495057;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
}

/* Form Styles */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-select {
  cursor: pointer;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .market-section,
  .trades-section {
    grid-column: 1;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .header-right {
    width: 100%;
    justify-content: center;
  }
  
  .modal {
    width: 95%;
    margin: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-footer button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .dashboard-header {
    padding: 0.5rem 0;
  }
  
  .header-left h2 {
    font-size: 1.5rem;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
}
</style>