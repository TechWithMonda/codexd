<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Trade History</h5>
    </div>
    
    <div class="card-body p-0">
      <div v-if="trades.length > 0" class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>Time</th>
              <th>Market</th>
              <th>Barrier</th>
              <th>Stake</th>
              <th>Profit</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trade in trades" :key="trade.id">
              <td>{{ formatTime(trade.timestamp) }}</td>
              <td>
                <span class="badge bg-secondary">{{ trade.market }}</span>
              </td>
              <td>{{ trade.barrier }}</td>
              <td>${{ trade.stake.toFixed(2) }}</td>
              <td :class="trade.profit >= 0 ? 'text-success' : 'text-danger'">
                {{ trade.profit >= 0 ? '+' : '' }}${{ trade.profit.toFixed(2) }}
              </td>
              <td>
                <span
                  class="badge"
                  :class="trade.outcome === 'win' ? 'bg-success' : 'bg-danger'"
                >
                  {{ trade.outcome }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else class="text-center text-muted p-4">
        <p>No trades yet</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradeHistory',
  props: {
    trades: {
      type: Array,
      default: () => []
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
.table {
  font-size: 0.9rem;
}

.table th {
  border-top: none;
  font-weight: 500;
}
</style>