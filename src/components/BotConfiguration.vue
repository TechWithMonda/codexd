<template>
  <div class="config-card">
    <div class="config-header">
      <h5>Bot Configuration</h5>
    </div>
    
    <div class="config-body">
      <!-- Config Selector -->
      <div v-if="botConfigs.length > 1" class="form-group">
        <label class="form-label">Select Configuration</label>
        <select 
          class="form-input"
          v-model="selectedConfigId"
          @change="handleConfigChange"
        >
          <option v-for="config in botConfigs" :key="config.id" :value="config.id">
            Config {{ config.id }} - {{ config.current_market }}
          </option>
        </select>
      </div>
      
      <div v-if="config">
        <!-- API Token -->
        <div class="form-group">
          <label class="form-label">API Token</label>
          <input
            type="password"
            class="form-input"
            v-model="editableConfig.token"
            :disabled="config.is_running"
            placeholder="Enter your API token"
          >
        </div>
        
        <!-- Stake Amount -->
        <div class="form-group">
          <label class="form-label">Stake Amount ($)</label>
          <input
            type="number"
            class="form-input"
            v-model="editableConfig.stake"
            min="1"
            step="0.01"
            :disabled="config.is_running"
          >
        </div>
        
        <!-- Max Trades -->
        <div class="form-group">
          <label class="form-label">Max Trades</label>
          <input
            type="number"
            class="form-input"
            v-model="editableConfig.max_trades"
            min="1"
            :disabled="config.is_running"
          >
        </div>
        
        <!-- Current Market -->
        <div class="form-group">
          <label class="form-label">Current Market</label>
          <div class="market-controls">
            <span class="market-badge">{{ config.current_market }}</span>
            <button 
              class="btn-switch" 
              @click="switchMarket"
              :disabled="!config.is_running"
            >
              🔄 Switch Market
            </button>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
          <!-- Start/Stop Bot -->
          <button
            v-if="!config.is_running"
            class="btn-primary btn-large btn-start"
            @click="startBot"
          >
            ▶️ Start Bot
          </button>
          
          <button
            v-else
            class="btn-primary btn-large btn-stop"
            @click="stopBot"
          >
            ⏹️ Stop Bot
          </button>
          
          <!-- Force Trade -->
          <button
            class="btn-secondary btn-force"
            @click="forceTrade"
            :disabled="!config.is_running"
          >
            ⚡ Force Trade
          </button>
          
          <!-- Save Changes -->
          <button
            class="btn-secondary"
            @click="saveConfig"
            :disabled="config.is_running"
          >
            💾 Save Changes
          </button>
        </div>
        
        <!-- Status Indicator -->
        <div class="status-indicator">
          <span class="status-badge" :class="config.is_running ? 'status-running' : 'status-stopped'">
            <span class="status-dot"></span>
            {{ config.is_running ? 'Running' : 'Stopped' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'BotConfiguration',
  props: {
    config: {
      type: Object,
      required: true
    },
    botConfigs: {
      type: Array,
      default: () => []
    }
  },
  emits: ['config-updated', 'config-changed'],
  data() {
    return {
      editableConfig: { ...this.config },
      selectedConfigId: this.config.id
    }
  },
  watch: {
    config(newConfig) {
      this.editableConfig = { ...newConfig }
      this.selectedConfigId = newConfig.id
    }
  },
  methods: {
    handleConfigChange() {
      const newConfig = this.botConfigs.find(c => c.id === this.selectedConfigId)
      if (newConfig) {
        this.$emit('config-changed', newConfig)
      }
    },
    
    async startBot() {
      try {
        await api.startBot(this.config.id)
        this.$emit('config-updated', { ...this.config, is_running: true })
      } catch (error) {
        console.error('Error starting bot:', error)
        alert('Error starting bot: ' + error.message)
      }
    },
    
    async stopBot() {
      try {
        await api.stopBot(this.config.id)
        this.$emit('config-updated', { ...this.config, is_running: false })
      } catch (error) {
        console.error('Error stopping bot:', error)
        alert('Error stopping bot: ' + error.message)
      }
    },
    
    async switchMarket() {
      try {
        await api.switchMarket(this.config.id)
        // Refresh config to get updated market
        const configs = await api.getBotConfigs()
        const updatedConfig = configs.find(c => c.id === this.config.id)
        if (updatedConfig) {
          this.$emit('config-updated', updatedConfig)
        }
      } catch (error) {
        console.error('Error switching market:', error)
        alert('Error switching market: ' + error.message)
      }
    },
    
    async forceTrade() {
      try {
        await api.forceTrade(this.config.id)
        this.$emit('trade-forced')
      } catch (error) {
        console.error('Error forcing trade:', error)
        alert('Error forcing trade: ' + error.message)
      }
    },
    
    async saveConfig() {
      try {
        const updatedConfig = await api.updateBotConfig(
          this.config.id,
          this.editableConfig
        )
        this.$emit('config-updated', updatedConfig)
        alert('Configuration saved successfully!')
      } catch (error) {
        console.error('Error saving config:', error)
        alert('Error saving configuration: ' + error.message)
      }
    }
  }
}
</script>

<style scoped>
.config-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: none;
  overflow: hidden;
  height: fit-content;
}

.config-header {
  background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
  color: #212529;
  padding: 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.config-header h5 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.config-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group:last-of-type {
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:disabled {
  background-color: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.market-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.market-badge {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.btn-switch {
  background: transparent;
  border: 2px solid #3b82f6;
  color: #3b82f6;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-switch:hover:not(:disabled) {
  background: #3b82f6;
  color: white;
  transform: translateY(-1px);
}

.btn-switch:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-primary, .btn-secondary {
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  width: 100%;
}

.btn-large {
  padding: 1rem 1.5rem;
  font-size: 1rem;
}

.btn-start {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.btn-start:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.btn-stop {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.btn-stop:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.btn-force {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
}

.btn-secondary {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.btn-primary:disabled, .btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.status-indicator {
  text-align: center;
  margin-top: 1.5rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
}

.status-running {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.status-stopped {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .config-body {
    padding: 1rem;
  }
  
  .market-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .btn-switch {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .config-header {
    padding: 1rem;
  }
  
  .config-header h5 {
    font-size: 1.1rem;
  }
}
</style>