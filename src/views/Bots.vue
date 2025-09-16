<template>
  <section id="bot-instructions" class="py-16 bg-slate-800">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-12 text-center">Trading Bot Instructions</h2>
      
      <!-- Search and Filter Bar -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 p-4 bg-slate-700 rounded-lg">
        <div class="relative w-full md:w-1/3 mb-4 md:mb-0">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search bots..." 
            class="w-full bg-slate-600 text-slate-200 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
          <svg class="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        <div class="flex space-x-2">
          <button 
            v-for="(filter, index) in filters" 
            :key="index"
            @click="setActiveFilter(filter)"
            :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors', 
                    activeFilter === filter ? 'bg-blue-500 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500']"
          >
            {{ filter }}
          </button>
        </div>
      </div>
      
      <!-- Bot Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(bot, index) in filteredBots" 
          :key="index" 
          class="bg-slate-700 rounded-xl p-6 border border-slate-600 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
        >
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold">{{ bot.name }}</h3>
              <span class="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full">{{ bot.version }}</span>
            </div>
          </div>
          
          <p class="text-slate-300 mb-6">{{ bot.description }}</p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="(tag, tagIndex) in bot.tags" :key="tagIndex" class="text-xs bg-slate-600 px-2 py-1 rounded-full">
              {{ tag }}
            </span>
          </div>
          
          <div class="flex items-center justify-between text-sm text-slate-400 mb-6">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Updated {{ bot.updated }}
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              {{ bot.views }}
            </div>
          </div>
          
          <button 
            @click="selectBot(bot)"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-300 flex items-center justify-center group"
          >
            View Instructions
            <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- No Results Message -->
      <div v-if="filteredBots.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="text-xl font-semibold text-slate-400">No bots found</h3>
        <p class="text-slate-500 mt-2">Try adjusting your search or filter criteria</p>
      </div>
      
      <!-- Bot Detail Modal -->
      <div v-if="selectedBot" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div class="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-slate-800 p-6 border-b border-slate-700 flex justify-between items-center">
            <h3 class="text-2xl font-bold">{{ selectedBot.name }} <span class="text-blue-400 text-lg">{{ selectedBot.version }}</span></h3>
            <button @click="selectedBot = null" class="text-slate-400 hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="p-6">
            <p class="text-slate-300 mb-6">{{ selectedBot.description }}</p>
            
            <div class="bg-slate-700 rounded-lg p-4 mb-6">
              <h4 class="text-lg font-semibold mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Quick Setup Guide
              </h4>
              <ol class="list-decimal list-inside space-y-2 text-slate-300">
                <li v-for="(step, index) in selectedBot.quickSetup" :key="index" class="pl-2">{{ step }}</li>
              </ol>
            </div>
            
            <div class="mb-6">
              <h4 class="text-lg font-semibold mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Recommended Settings
              </h4>
              <div class="bg-slate-700 rounded-lg p-4">
                <div v-for="(setting, index) in selectedBot.recommendedSettings" :key="index" class="flex justify-between py-2 border-b border-slate-600 last:border-b-0">
                  <span class="text-slate-300">{{ setting.name }}</span>
                  <span class="text-blue-400 font-medium">{{ setting.value }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex justify-center">
              <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-300 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download Full Manual
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BotInstructions',
  data() {
    return {
      searchQuery: '',
      activeFilter: 'All',
      filters: ['All', 'Popular', 'New', 'Arbitrage', 'Trend', 'Grid'],
      selectedBot: null,
      bots: [
        {
          name: 'Arbitrage Pro',
          version: 'v2.1',
          description: 'Automated arbitrage trading bot with support for multiple exchanges and advanced risk management.',
          tags: ['Arbitrage', 'Multi-Exchange', 'Advanced'],
          updated: '2 days ago',
          views: '12.4k',
          quickSetup: [
            'Connect your exchange API keys with trading permissions',
            'Select the markets you want to monitor for arbitrage opportunities',
            'Set your risk tolerance and investment amount per trade',
            'Activate the bot and monitor initial trades'
          ],
          recommendedSettings: [
            { name: 'Profit Threshold', value: '0.8%' },
            { name: 'Max Investment', value: '15%' },
            { name: 'Stop-Loss', value: '2%' },
            { name: 'Trade Cooldown', value: '30s' }
          ]
        },
        {
          name: 'Trend Rider',
          version: 'v1.5',
          description: 'Follow market trends with this intelligent bot that identifies and rides momentum waves.',
          tags: ['Trend', 'Momentum', 'Intermediate'],
          updated: '1 week ago',
          views: '8.7k',
          quickSetup: [
            'Connect your preferred exchange API',
            'Select the trading pair and timeframe for analysis',
            'Configure your position sizing strategy',
            'Set trend confirmation parameters'
          ],
          recommendedSettings: [
            { name: 'RSI Threshold', value: '60' },
            { name: 'Trend Confirmation', value: '3 candles' },
            { name: 'Take Profit', value: '5%' },
            { name: 'Trailing Stop', value: '2%' }
          ]
        },
        {
          name: 'Grid Master',
          version: 'v3.0',
          description: 'Advanced grid trading algorithm with dynamic level adjustment and risk controls.',
          tags: ['Grid', 'Range', 'Advanced'],
          updated: '3 days ago',
          views: '15.2k',
          quickSetup: [
            'Select trading pair and set price range for grid',
            'Define number of grid levels and investment per level',
            'Set profit-taking parameters for each grid level',
            'Enable dynamic range adjustment for volatile markets'
          ],
          recommendedSettings: [
            { name: 'Grid Levels', value: '25' },
            { name: 'Investment per Level', value: '2%' },
            { name: 'Profit per Grid', value: '1%' },
            { name: 'Range Adjustment', value: 'Auto' }
          ]
        },
        {
          name: 'Scalper Elite',
          version: 'v2.7',
          description: 'High-frequency trading bot designed for quick scalping strategies with minimal risk exposure.',
          tags: ['Scalping', 'High Frequency', 'Expert'],
          updated: '5 days ago',
          views: '9.8k',
          quickSetup: [
            'Connect to exchange with low API latency',
            'Set very short timeframes (1m-5m) for analysis',
            'Configure minimal profit targets per trade',
            'Set maximum number of trades per hour'
          ],
          recommendedSettings: [
            { name: 'Profit Target', value: '0.3%' },
            { name: 'Max Trades/Hour', value: '12' },
            { name: 'Stop-Loss', value: '0.5%' },
            { name: 'Volume Filter', value: '2x Avg' }
          ]
        },
        {
          name: 'DCA Commander',
          version: 'v1.2',
          description: 'Dollar-cost averaging bot that automatically invests at regular intervals regardless of market conditions.',
          tags: ['DCA', 'Long-term', 'Beginner'],
          updated: '2 weeks ago',
          views: '7.3k',
          quickSetup: [
            'Select the asset you want to accumulate',
            'Set your investment amount and frequency',
            'Define the total investment period',
            'Optional: set price triggers for additional purchases'
          ],
          recommendedSettings: [
            { name: 'Investment Frequency', value: 'Weekly' },
            { name: 'Amount per Investment', value: '$100' },
            { name: 'Price Drop Trigger', value: '-15%' },
            { name: 'Extra Purchase Amount', value: '50%' }
          ]
        },
        {
          name: 'Market Maker',
          version: 'v4.3',
          description: 'Professional market making bot with advanced order book analysis and spread capture algorithms.',
          tags: ['Market Making', 'Advanced', 'Liquidity'],
          updated: '1 day ago',
          views: '6.5k',
          quickSetup: [
            'Connect exchange API with sufficient permissions',
            'Set desired spread and order depth parameters',
            'Configure inventory management rules',
            'Set circuit breakers for extreme volatility'
          ],
          recommendedSettings: [
            { name: 'Target Spread', value: '0.2%' },
            { name: 'Order Depth', value: '2%' },
            { name: 'Inventory Rebalance', value: 'Hourly' },
            { name: 'Volatility Limit', value: '5%' }
          ]
        }
      ]
    }
  },
  computed: {
    filteredBots() {
      let filtered = this.bots;
      
      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(bot => 
          bot.name.toLowerCase().includes(query) || 
          bot.description.toLowerCase().includes(query) ||
          bot.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      // Apply category filter
      if (this.activeFilter !== 'All') {
        filtered = filtered.filter(bot => 
          bot.tags.map(tag => tag.toLowerCase()).includes(this.activeFilter.toLowerCase())
        );
      }
      
      return filtered;
    }
  },
  methods: {
    setActiveFilter(filter) {
      this.activeFilter = filter;
    },
    selectBot(bot) {
      this.selectedBot = bot;
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for modal */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #1e293b;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>