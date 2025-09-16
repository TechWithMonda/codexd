<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Market Analysis</h5>
    </div>
    
    <div class="card-body">
      <h6>Recent Market Data</h6>
      <div class="color-history mb-3">
        <div
          v-for="(data, index) in recentMarketData"
          :key="index"
          class="color-dot"
          :class="data.color"
          :title="`Digit: ${data.digit}, Time: ${formatTime(data.timestamp)}`"
        ></div>
      </div>
      
      <h6 class="mt-4">Market Performance</h6>
      <div v-if="performance.length > 0" class="performance-chart">
        <div
          v-for="item in performance"
          :key="item.market"
          class="performance-item mb-2"
        >
          <div class="d-flex justify-content-between align-items-center">
            <span class="market-name">{{ item.market }}</span>
            <span :class="item.profit >= 0 ? 'text-success' : 'text-danger'">
              ${{ item.profit.toFixed(2) }}
            </span>
          </div>
          <div class="progress" style="height: 8px;">
            <div
              class="progress-bar"
              :class="item.profit >= 0 ? 'bg-success' : 'bg-danger'"
              :style="`width: ${Math.min(Math.abs(item.profit) / maxProfit * 100, 100)}%`"
            ></div>
          </div>
          <small class="text-muted">
            Wins: {{ item.wins }} | Losses: {{ item.losses }}
          </small>
        </div>
      </div>
      
      <div v-else class="text-center text-muted">
        <p>No market performance data available</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarketAnalysis',
  props: {
    marketData: {
      type: Array,
      default: () => []
    },
    performance: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    recentMarketData() {
      return this.marketData.slice(0, 20).reverse()
    },
    maxProfit() {
      if (this.performance.length === 0) return 1
      const max = Math.max(...this.performance.map(p => Math.abs(p.profit)))
      return max === 0 ? 1 : max
    }
  },
  methods: {
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString()
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar styling */
.card-body::-webkit-scrollbar {
  width: 6px;
}

.card-body::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 3px;
}

.card-body::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
  border-radius: 3px;
}

.card-body::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.7);
}

/* Smooth transitions for all interactive elements */
.card * {
  transition: all 0.2s ease;
}

/* Enhanced card hover effects */
.card {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.375rem;
  background-color: #fff;
}

.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  padding: 0.75rem 1.25rem;
}

.card-body {
  padding: 1.25rem;
}

/* Custom backdrop blur for better modal experience */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Text truncation for better layout */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Professional form styling enhancements */
input:focus, textarea:focus, select:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.15);
}

/* Custom file upload styling */
input[type="file"] {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

/* Enhanced button hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

/* Loading animation enhancements */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Notification slide-in animation */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.fixed.top-4.right-4 {
  animation: slideInRight 0.3s ease-out;
}

/* Gradient animations for hero text */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 4s ease infinite;
}

/* Professional spacing utilities */
.container {
  max-width: 1200px;
}

/* Enhanced responsive design */
@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
    line-height: 1.1;
  }
  
  .text-7xl {
    font-size: 3rem;
    line-height: 1.1;
  }
}

/* Improved modal positioning on mobile */
@media (max-height: 600px) {
  .max-h-\[90vh\] {
    max-height: calc(100vh - 2rem);
  }
}

/* Enhanced focus states for accessibility */
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid rgb(147 51 234);
  outline-offset: 2px;
}

/* Custom selection colors */
::selection {
  background-color: rgba(147, 51, 234, 0.3);
  color: white;
}

/* Enhanced dropdown styling */
select option {
  background-color: rgb(30 41 59);
  color: white;
}

/* Professional shadow utilities */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-purple-500\/25:hover {
  box-shadow: 0 25px 50px -12px rgba(147, 51, 234, 0.25);
}

.hover\:shadow-purple-500\/10:hover {
  box-shadow: 0 20px 25px -5px rgba(147, 51, 234, 0.1), 0 10px 10px -5px rgba(147, 51, 234, 0.04);
}

/* Original component styles */
.color-history {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.color-dot.red {
  background-color: #dc3545;
}

.color-dot.green {
  background-color: #28a745;
}

.performance-item {
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.market-name {
  font-weight: 500;
}
</style>