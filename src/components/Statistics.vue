<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Statistics</h5>
    </div>
    
    <div class="card-body">
      <div v-if="stats" class="row text-center">
        <div class="col-md-3 mb-3">
          <div class="border rounded p-3">
            <h6>Balance</h6>
            <h4 :class="stats.balance >= 0 ? 'text-success' : 'text-danger'">
              ${{ stats.balance.toFixed(2) }}
            </h4>
          </div>
        </div>
        
        <div class="col-md-3 mb-3">
          <div class="border rounded p-3">
            <h6>P&L</h6>
            <h4 :class="stats.profit_loss >= 0 ? 'text-success' : 'text-danger'">
              ${{ stats.profit_loss.toFixed(2) }}
            </h4>
          </div>
        </div>
        
        <div class="col-md-3 mb-3">
          <div class="border rounded p-3">
            <h6>Win Rate</h6>
            <h4>{{ stats.win_rate.toFixed(1) }}%</h4>
          </div>
        </div>
        
        <div class="col-md-3 mb-3">
          <div class="border rounded p-3">
            <h6>Wins/Losses</h6>
            <h4>{{ stats.wins }}/{{ stats.losses }}</h4>
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <div class="border rounded p-3">
            <h6>Total Trades</h6>
            <h4>{{ stats.trade_count }}</h4>
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <div class="border rounded p-3">
            <h6>Market Switches</h6>
            <h4>{{ stats.market_switch_counter }}</h4>
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <div class="border rounded p-3">
            <h6>Last Updated</h6>
            <h6>{{ formatDate(stats.updated_at) }}</h6>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center text-muted">
        <p>No statistics available</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  props: {
    stats: {
      type: Object,
      default: null
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleString()
    }
  }
}
</script>