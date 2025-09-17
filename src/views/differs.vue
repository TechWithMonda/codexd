<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    
    <!-- Risk Warning Banner -->
    <div v-if="config.martingaleEnabled && botStatus.martingale?.current_step > 0" 
         class="bg-gradient-to-r from-red-600 to-red-800 border-b-2 border-red-400 p-3 animate-pulse">
      <div class="container mx-auto px-4 flex items-center justify-center space-x-3">
        <svg class="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <div class="text-center">
          <div class="font-bold text-lg">⚠️ HIGH RISK: Martingale Active</div>
          <div class="text-sm">Step {{ botStatus.martingale?.current_step }}/{{ botStatus.martingale?.max_steps }} | Next Stake: ${{ botStatus.current_stake?.toFixed(2) }}</div>
        </div>
      </div>
    </div>

    <!-- Header with Enhanced Status -->
    <header class="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 shadow-lg">
      <div class="container mx-auto px-4 sm:px-6 py-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Enhanced Deriv Trading Bot
              </h1>
              <p class="text-xs sm:text-sm text-slate-400">Martingale + Risk Management + Auto Rotation</p>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <!-- Enhanced Current Tick -->
            <div v-if="currentTick" class="bg-slate-700/50 rounded-lg px-4 py-2 border border-slate-600">
              <div class="text-xs text-slate-400">{{ botStatus.symbol || 'Market' }}</div>
              <div class="text-lg font-bold">{{ currentTick.quote }}</div>
              <div class="text-sm text-blue-400">Last Digit: {{ currentTick.last_digit }}</div>
            </div>
            
            <!-- Enhanced Status Indicators -->
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <div :class="['w-3 h-3 rounded-full', botStatus.is_running ? 'bg-green-500 animate-pulse' : 'bg-red-500']"></div>
                <span class="text-sm font-medium">{{ botStatus.is_running ? 'Trading' : 'Stopped' }}</span>
                <div v-if="config.martingaleEnabled" class="ml-2 px-2 py-1 bg-red-600 rounded text-xs">
                  MARTINGALE
                </div>
              </div>
              
              <div class="flex items-center space-x-4 text-xs text-slate-400">
                <div class="flex items-center space-x-1">
                  <div :class="['w-2 h-2 rounded-full', botStatus.is_connected ? 'bg-blue-500' : 'bg-gray-500']"></div>
                  <span>{{ botStatus.is_connected ? 'Connected' : 'Offline' }}</span>
                </div>
                <div>Uptime: {{ formatUptime(botStatus.uptime_minutes) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      
      <!-- Enhanced Configuration Section -->
      <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 border border-slate-700/50 shadow-xl">
        <h2 class="text-lg sm:text-xl font-semibold mb-6 flex items-center">
          <svg class="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          </svg>
          Enhanced Trading Configuration
        </h2>
        
        <!-- Basic Settings Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">API Token</label>
            <input 
              v-model="config.token" 
              type="password" 
              placeholder="Enter Deriv API token"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Market</label>
            <select 
              v-model="config.symbol" 
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option v-for="market in availableMarkets" :key="market" :value="market">{{ market }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Base Stake ($)</label>
            <input 
              v-model.number="config.baseStake" 
              type="number" 
              min="0.35" 
              step="0.25"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <p class="text-xs text-slate-400 mt-1">Current: ${{ botStatus.current_stake?.toFixed(2) || config.baseStake?.toFixed(2) }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Daily Loss Limit ($)</label>
            <input 
              v-model.number="config.dailyLossLimit" 
              type="number" 
              min="10" 
              step="5"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <!-- Martingale Settings -->
        <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-red-300 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              Martingale System (HIGH RISK)
            </h3>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-slate-400">Enable</span>
              <input 
                v-model="config.martingaleEnabled" 
                type="checkbox"
                class="w-5 h-5 text-red-600 bg-slate-700 border-slate-600 rounded focus:ring-red-500"
              />
            </div>
          </div>
          
          <div v-if="config.martingaleEnabled" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-red-300 mb-2">Multiplier</label>
              <input 
                v-model.number="config.martingaleMultiplier" 
                type="number" 
                min="1.1" 
                max="5" 
                step="0.1"
                @input="calculateMartingaleRisk"
                class="w-full px-3 py-2 bg-slate-700/50 border border-red-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-red-300"
              />
              <p class="text-xs text-red-400 mt-1">Recommended: 1.5-2.5</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-red-300 mb-2">Max Steps</label>
              <input 
                v-model.number="config.martingaleMaxSteps" 
                type="number" 
                min="1" 
                max="10"
                @input="calculateMartingaleRisk"
                class="w-full px-3 py-2 bg-slate-700/50 border border-red-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-red-300"
              />
              <p class="text-xs text-red-400 mt-1">Current: {{ botStatus.martingale?.current_step || 0 }}/{{ config.martingaleMaxSteps }}</p>
            </div>
            
            <div class="flex flex-col justify-center">
              <div class="text-sm font-medium text-red-300 mb-1">Risk Level</div>
              <div :class="['px-3 py-2 rounded-lg text-center font-bold', getRiskLevelClass()]">
                {{ riskAssessment.level }}
              </div>
              <div class="text-xs text-red-400 mt-1">Max Loss: ${{ riskAssessment.maxLoss?.toFixed(2) }}</div>
            </div>
          </div>
          
          <div v-if="config.martingaleEnabled" class="mt-4 p-3 bg-red-900/30 rounded-lg">
            <div class="text-xs text-red-300 space-y-1">
              <div class="font-bold">⚠️ MARTINGALE WARNINGS:</div>
              <div>• Can lead to rapid and complete loss of capital</div>
              <div>• Risk increases exponentially with each loss</div>
              <div>• No guarantee of recovery even with wins</div>
              <div>• Only use with money you can afford to lose entirely</div>
            </div>
          </div>
        </div>

        <!-- Take Profit & Stop Loss -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div class="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-green-300">Take Profit</h3>
              <input 
                v-model="config.takeProfitEnabled" 
                type="checkbox"
                class="w-5 h-5 text-green-600 bg-slate-700 border-slate-600 rounded focus:ring-green-500"
              />
            </div>
            
            <div v-if="config.takeProfitEnabled">
              <label class="block text-sm font-medium text-green-300 mb-2">Target Profit ($)</label>
              <input 
                v-model.number="config.takeProfitAmount" 
                type="number" 
                min="5" 
                step="5"
                class="w-full px-3 py-2 bg-slate-700/50 border border-green-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-300"
              />
              <p class="text-xs text-green-400 mt-1">Session: ${{ botStatus.session_pnl?.toFixed(2) || '0.00' }}</p>
            </div>
          </div>
          
          <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-red-300">Stop Loss</h3>
              <input 
                v-model="config.stopLossEnabled" 
                type="checkbox"
                class="w-5 h-5 text-red-600 bg-slate-700 border-slate-600 rounded focus:ring-red-500"
              />
            </div>
            
            <div v-if="config.stopLossEnabled">
              <label class="block text-sm font-medium text-red-300 mb-2">Max Loss ($)</label>
              <input 
                v-model.number="config.stopLossAmount" 
                type="number" 
                max="-5" 
                step="5"
                class="w-full px-3 py-2 bg-slate-700/50 border border-red-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-red-300"
              />
              <p class="text-xs text-red-400 mt-1">Session: ${{ botStatus.session_pnl?.toFixed(2) || '0.00' }}</p>
            </div>
          </div>
        </div>

        <!-- Auto Market Rotation -->
        <div class="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-purple-300">Auto Market Rotation</h3>
            <input 
              v-model="config.autoMarketRotation" 
              type="checkbox"
              class="w-5 h-5 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
          </div>
          
          <div v-if="config.autoMarketRotation" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-purple-300 mb-2">Trades per Market</label>
              <input 
                v-model.number="config.tradesPerMarket" 
                type="number" 
                min="1" 
                max="10"
                class="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-300"
              />
            </div>
            <div class="flex flex-col justify-center">
              <div class="text-sm text-purple-300">Current Progress</div>
              <div class="text-lg font-bold text-purple-300">
                {{ botStatus.market_rotation?.trades_on_current || 0 }}/{{ config.tradesPerMarket }}
              </div>
              <div class="text-xs text-purple-400">on {{ botStatus.market_rotation?.current_market || config.symbol }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Statistics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Account Balance with Risk Indicator -->
        <div :class="['bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border shadow-xl', getBalanceRiskClass()]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Account Balance</h3>
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="text-3xl font-bold text-white mb-2">
            ${{ botStatus.current_balance?.toFixed(2) || '0.00' }}
          </div>
          <div class="text-sm text-slate-400">
            Session Risk: {{ ((Math.abs(botStatus.session_pnl || 0) / Math.max(botStatus.current_balance || 1, 1)) * 100).toFixed(1) }}%
          </div>
        </div>

        <!-- Session P&L with Glow Effect -->
        <div :class="['bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl', 
                     botStatus.session_pnl > 0 ? 'profit-glow' : botStatus.session_pnl < 0 ? 'loss-glow' : '']">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Session P&L</h3>
            <svg :class="['w-6 h-6', botStatus.session_pnl >= 0 ? 'text-green-400' : 'text-red-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="botStatus.session_pnl >= 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
            </svg>
          </div>
          <div :class="['text-3xl font-bold mb-2', botStatus.session_pnl >= 0 ? 'text-green-400' : 'text-red-400']">
            ${{ botStatus.session_pnl?.toFixed(2) || '0.00' }}
          </div>
          <div class="text-sm text-slate-400">
            TP: ${{ config.takeProfitAmount }} | SL: ${{ config.stopLossAmount }}
          </div>
        </div>

        <!-- Martingale Status -->
        <div :class="['bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border shadow-xl', 
                     botStatus.martingale?.current_step > 0 ? 'martingale-active border-red-500/50' : 'border-slate-700/50']">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Martingale Status</h3>
            <svg :class="['w-6 h-6', config.martingaleEnabled ? 'text-red-400' : 'text-slate-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div :class="['text-3xl font-bold mb-2', config.martingaleEnabled ? 'text-red-400' : 'text-slate-400']">
            {{ botStatus.martingale?.current_step || 0 }}/{{ config.martingaleMaxSteps }}
          </div>
          <div class="text-sm text-slate-400">
            {{ config.martingaleEnabled ? `Losses: ${botStatus.martingale?.consecutive_losses || 0}` : 'Disabled' }}
          </div>
        </div>

        <!-- Win Rate -->
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Win Rate</h3>
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          </div>
          <div class="text-3xl font-bold text-yellow-400 mb-2">
            {{ botStatus.win_rate || 0 }}%
          </div>
          <div class="text-sm text-slate-400">
            {{ botStatus.successful_trades || 0 }}/{{ botStatus.total_trades || 0 }} trades
          </div>
        </div>
      </div>

      <!-- Controls and Analysis Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        <!-- Enhanced Controls -->
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
          <h2 class="text-xl font-semibold mb-6 flex items-center">
            <svg class="w-6 h-6 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
            Enhanced Controls
          </h2>
          
          <div class="space-y-4">
            <button 
              @click="startBot" 
              :disabled="!config.token || botStatus.is_running || loading"
              class="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-105 disabled:hover:scale-100"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ loading ? 'Starting...' : 'Start Enhanced Bot' }}</span>
            </button>
            
            <button 
              @click="stopBot" 
              :disabled="!botStatus.is_running || loading"
              class="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105 disabled:hover:scale-100"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9h6v6H9z"></path>
              </svg>
              <span>{{ loading ? 'Stopping...' : 'Stop Bot' }}</span>
            </button>
            
            <button 
              @click="forceTrade" 
              :disabled="!botStatus.is_running || loading"
              class="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105 disabled:hover:scale-100"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>Force Trade</span>
            </button>
            
            <button 
              @click="updateSettings" 
              :disabled="loading"
              class="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105 disabled:hover:scale-100"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Update Settings</span>
            </button>
            
            <button 
              @click="resetData" 
              :disabled="loading"
              class="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/25 hover:scale-105 disabled:hover:scale-100"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <span>Reset All Data</span>
            </button>

            <!-- Risk Calculator Button -->
            <button 
              @click="showRiskCalculator = !showRiskCalculator" 
              class="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-yellow-500/25 hover:scale-105"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <span>Risk Calculator</span>
            </button>
          </div>
        </div>

        <!-- Last 5 Digits Analysis -->
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
          <h2 class="text-xl font-semibold mb-6 flex items-center">
            <svg class="w-6 h-6 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            Strategy Analysis
          </h2>
          
          <!-- Current Target Display -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-slate-300 mb-3">Current Target Digit</h3>
            <div class="flex items-center justify-center">
              <div v-if="botStatus.current_target_digit !== null" 
                   class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl font-bold border-2 border-red-400 shadow-lg">
                {{ botStatus.current_target_digit }}
              </div>
              <div v-else class="text-slate-400 text-sm py-4">
                Waiting for 5 digits...
              </div>
            </div>
            <div v-if="botStatus.current_target_digit !== null" class="text-center text-xs text-slate-400 mt-2">
              Next trade: DIGITDIFF ≠ {{ botStatus.current_target_digit }}
            </div>
          </div>

          <!-- Last 5 Digits Display -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-slate-300 mb-3">Last 5 Digits</h3>
            <div class="flex justify-center space-x-2">
              <div v-for="(digit, index) in botStatus.last_5_digits" 
                   :key="index"
                   class="w-10 h-10 bg-slate-600/50 rounded-lg flex items-center justify-center text-lg font-bold border border-slate-500">
                {{ digit }}
              </div>
              <div v-for="i in Math.max(0, 5 - (botStatus.last_5_digits?.length || 0))" 
                   :key="'empty-' + i"
                   class="w-10 h-10 bg-slate-700/30 rounded-lg flex items-center justify-center border border-slate-600 border-dashed">
                <span class="text-slate-500 text-sm">?</span>
              </div>
            </div>
          </div>

          <!-- Calculation Display -->
          <div v-if="botStatus.tick_analysis?.last_5_calculation?.ready_to_trade" class="bg-slate-700/30 rounded-lg p-4 mb-4">
            <h3 class="text-sm font-medium text-slate-300 mb-2">Calculation</h3>
            <div class="text-xs text-slate-400 space-y-1">
              <div>Digits: {{ botStatus.tick_analysis.last_5_calculation.digits?.join(' + ') }}</div>
              <div>Sum: {{ botStatus.tick_analysis.last_5_calculation.sum }}</div>
              <div>Average: {{ botStatus.tick_analysis.last_5_calculation.average }}</div>
              <div class="font-semibold text-red-400">Target: {{ botStatus.tick_analysis.last_5_calculation.target_digit }}</div>
            </div>
          </div>

          <!-- Enhanced Market Rotation Info -->
          <div v-if="config.autoMarketRotation" class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
            <h3 class="text-sm font-medium text-purple-300 mb-2">Market Rotation</h3>
            <div class="text-xs text-purple-400 space-y-1">
              <div>Current: {{ botStatus.market_rotation?.current_market || config.symbol }}</div>
              <div>Progress: {{ botStatus.market_rotation?.trades_on_current || 0 }}/{{ config.tradesPerMarket }}</div>
              <div>Next: {{ getNextMarket() }}</div>
            </div>
          </div>
        </div>

        <!-- Enhanced Strategy Info -->
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
          <h2 class="text-xl font-semibold mb-6 flex items-center">
            <svg class="w-6 h-6 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Enhanced Features
          </h2>
          
          <div class="space-y-4">
            <div class="bg-slate-700/30 rounded-lg p-4">
              <h3 class="font-semibold text-green-400 mb-2">Base Strategy</h3>
              <p class="text-sm text-slate-300 mb-3">
                Average Last 5 Digits → DIGITDIFF Target
              </p>
              <div class="text-xs text-slate-400">
                • Collects last 5 tick end digits<br>
                • Calculates average (sum ÷ 5)<br>
                • Uses integer part as target<br>
                • Predicts next tick ≠ target
              </div>
            </div>

            <div :class="['rounded-lg p-4', config.martingaleEnabled ? 'bg-red-500/10 border border-red-500/30' : 'bg-slate-700/30']">
              <h3 :class="['font-semibold mb-2', config.martingaleEnabled ? 'text-red-400' : 'text-slate-400']">
                Martingale System {{ config.martingaleEnabled ? '(ACTIVE)' : '(OFF)' }}
              </h3>
              <div v-if="config.martingaleEnabled" class="text-xs text-red-400 space-y-1">
                <div>• Doubles stake after each loss</div>
                <div>• Current step: {{ botStatus.martingale?.current_step || 0 }}/{{ config.martingaleMaxSteps }}</div>
                <div>• Next stake: ${{ botStatus.current_stake?.toFixed(2) }}</div>
                <div class="font-bold text-red-300 mt-2">⚠️ HIGH RISK STRATEGY</div>
              </div>
              <div v-else class="text-xs text-slate-400">
                Martingale disabled - using fixed stake
              </div>
            </div>

            <div class="bg-slate-700/30 rounded-lg p-4">
              <h3 class="font-semibold text-blue-400 mb-2">Risk Management</h3>
              <div class="text-xs text-slate-400 space-y-1">
                <div>• Take Profit: {{ config.takeProfitEnabled ? `${config.takeProfitAmount}` : 'OFF' }}</div>
                <div>• Stop Loss: {{ config.stopLossEnabled ? `${config.stopLossAmount}` : 'OFF' }}</div>
                <div>• Daily Limit: ${{ config.dailyLossLimit }}</div>
                <div>• Auto Rotation: {{ config.autoMarketRotation ? 'ON' : 'OFF' }}</div>
              </div>
            </div>

            <div class="bg-slate-700/30 rounded-lg p-4">
              <h3 class="font-semibold text-purple-400 mb-2">Session Stats</h3>
              <div class="text-xs text-slate-400 space-y-1">
                <div>Ticks analyzed: {{ botStatus.tick_analysis?.total_ticks_analyzed || 0 }}</div>
                <div>Trade cycle: {{ botStatus.trade_cycle_count || 0 }}</div>
                <div>Win rate: {{ botStatus.win_rate || 0 }}%</div>
                <div>Uptime: {{ formatUptime(botStatus.uptime_minutes) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Risk Calculator Modal -->
      <div v-if="showRiskCalculator" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-red-300">Martingale Risk Calculator</h3>
            <button @click="showRiskCalculator = false" class="text-slate-400 hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="space-y-4 mb-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-slate-300 mb-1">Base Stake</label>
                <input v-model.number="riskCalc.baseStake" type="number" step="0.1" 
                       class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
              </div>
              <div>
                <label class="block text-sm text-slate-300 mb-1">Current Balance</label>
                <input v-model.number="riskCalc.balance" type="number" step="10" 
                       class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
              </div>
            </div>
            
            <button @click="calculateRisk" 
                    class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all">
              Calculate Risk
            </button>
          </div>

          <div v-if="riskResults" class="space-y-4">
            <div :class="['p-4 rounded-lg border-2', getRiskResultClass()]">
              <div class="text-lg font-bold mb-2">Risk Level: {{ riskResults.risk_level }}</div>
              <div class="text-sm space-y-1">
                <div>Total Risk: ${{ riskResults.total_risk }}</div>
                <div>Risk Percentage: {{ riskResults.risk_percentage }}%</div>
                <div>Break-even Win Rate: {{ riskResults.break_even_win_rate }}%</div>
              </div>
            </div>

            <div class="bg-slate-700/50 rounded-lg p-4">
              <h4 class="font-semibold mb-3 text-slate-300">Martingale Progression</h4>
              <div class="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                <div v-for="step in riskResults.progression" :key="step.step"
                     class="flex justify-between text-sm py-1 px-2 bg-slate-800/50 rounded">
                  <span>Step {{ step.step }}:</span>
                  <span>${{ step.stake }}</span>
                  <span class="text-slate-400">({{ step.percentage_of_balance }}%)</span>
                </div>
              </div>
            </div>

            <div v-if="riskResults.warnings?.length" class="bg-red-900/30 border border-red-500 rounded-lg p-4">
              <h4 class="font-semibold text-red-300 mb-2">⚠️ Warnings</h4>
              <ul class="text-sm text-red-200 space-y-1">
                <li v-for="warning in riskResults.warnings" :key="warning">• {{ warning }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Log -->
      <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold flex items-center">
            <svg class="w-6 h-6 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Enhanced Activity Log
          </h2>
          <button 
            @click="clearLogs" 
            class="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg font-medium transition-all duration-200 text-sm border border-slate-600/50">
            Clear Logs
          </button>
        </div>
        
        <div class="bg-slate-900/50 rounded-xl border border-slate-700/50 h-64 overflow-y-auto custom-scrollbar">
          <div class="p-4 space-y-2">
            <div v-for="(log, index) in logs" 
                 :key="index"
                 :class="[
                   'flex items-start space-x-3 py-2 px-3 rounded-lg transition-colors duration-200',
                   log.level === 'success' ? 'bg-green-500/10 border-l-4 border-green-500' :
                   log.level === 'error' ? 'bg-red-500/10 border-l-4 border-red-500' :
                   log.level === 'warning' ? 'bg-yellow-500/10 border-l-4 border-yellow-500' :
                   log.level === 'trade' ? 'bg-blue-500/10 border-l-4 border-blue-500' :
                   'bg-slate-500/10 border-l-4 border-slate-500'
                 ]">
              <div class="flex-shrink-0 mt-1">
                <svg v-if="log.level === 'success'" class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg v-else-if="log.level === 'error'" class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <svg v-else-if="log.level === 'warning'" class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <svg v-else-if="log.level === 'trade'" class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <svg v-else class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-xs font-mono text-slate-400">[{{ log.time }}]</span>
                  <span v-if="log.martingale_step > 0" class="text-xs bg-red-600 text-white px-2 py-0.5 rounded">
                    M{{ log.martingale_step }}
                  </span>
                  <span v-if="log.session_pnl !== undefined" :class="['text-xs px-2 py-0.5 rounded', 
                    log.session_pnl >= 0 ? 'bg-green-600 text-white' : 'bg-red-600 text-white']">
                    ${{ log.session_pnl.toFixed(2) }}
                  </span>
                </div>
                <div :class="[
                  'text-sm break-words',
                  log.level === 'success' ? 'text-green-300' :
                  log.level === 'error' ? 'text-red-300' :
                  log.level === 'warning' ? 'text-yellow-300' :
                  log.level === 'trade' ? 'text-blue-300' :
                  'text-slate-300'
                ]">{{ log.message }}</div>
              </div>
            </div>
            <div v-if="logs.length === 0" class="text-center text-slate-400 py-8">
              <svg class="w-12 h-12 mx-auto mb-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="font-medium">No activity logs yet</p>
              <p class="text-sm">Start the enhanced bot to see real-time updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

export default {
  name: 'EnhancedDerivTradingDashboard',
  setup() {
    // API Configuration
    const API_BASE_URL = window.location.hostname === "localhost" 
      ? "http://localhost:8000" 
      : "https://codexd-production.up.railway.app";

    // Enhanced configuration state
    const config = ref({
      token: '',
      symbol: 'R_100',
      baseStake: 1.79,
      dailyLossLimit: 100.0,
      tradeCooldown: 5,
      
      // Martingale settings
      martingaleEnabled: false,
      martingaleMultiplier: 2.0,
      martingaleMaxSteps: 5,
      
      // Take Profit / Stop Loss
      takeProfitEnabled: false,
      takeProfitAmount: 50.0,
      stopLossEnabled: false,
      stopLossAmount: -25.0,
      
      // Auto Market Rotation
      autoMarketRotation: false,
      tradesPerMarket: 3
    })

    // Enhanced bot status
    const botStatus = ref({
      is_running: false,
      is_connected: false,
      symbol: null,
      strategy: "Enhanced Average Last 5 Digits",
      total_trades: 0,
      successful_trades: 0,
      win_rate: 0,
      total_pnl: 0,
      daily_pnl: 0,
      session_pnl: 0,
      current_balance: 0,
      current_target_digit: null,
      trade_cycle_count: 0,
      base_stake: 1.79,
      current_stake: 1.79,
      last_5_digits: [],
      martingale: {
        enabled: false,
        multiplier: 2.0,
        current_step: 0,
        max_steps: 5,
        consecutive_losses: 0
      },
      take_profit: {
        enabled: false,
        amount: 50.0,
        current_session: 0.0
      },
      stop_loss: {
        enabled: false,
        amount: -25.0,
        current_session: 0.0
      },
      market_rotation: {
        enabled: false,
        current_market: null,
        trades_on_current: 0,
        trades_per_market: 3,
        available_markets: ['R_10', 'R_25', 'R_50', 'R_75', 'R_100']
      },
      tick_analysis: {
        total_ticks_analyzed: 0,
        digit_frequencies: {},
        recent_ticks: [],
        last_5_digits: [],
        last_5_calculation: {
          digits_collected: 0,
          digits: [],
          ready_to_trade: false
        }
      },
      uptime_minutes: 0,
      connection_status: {
        connected: false,
        connection_attempts: 0,
        max_attempts: 3
      }
    })

    // UI state
    const currentTick = ref(null)
    const loading = ref(false)
    const logs = ref([])
    const showRiskCalculator = ref(false)
    const availableMarkets = ref(['R_10', 'R_25', 'R_50', 'R_75', 'R_100'])

    // Risk assessment
    const riskAssessment = ref({
      level: 'LOW',
      maxLoss: 0,
      percentage: 0
    })

    // Risk calculator
    const riskCalc = ref({
      baseStake: 1.79,
      balance: 1000
    })
    const riskResults = ref(null)

    // Polling interval
    let statusInterval = null

    // Watch for martingale changes to recalculate risk
    watch([() => config.value.martingaleEnabled, () => config.value.martingaleMultiplier, 
           () => config.value.martingaleMaxSteps, () => config.value.baseStake], () => {
      if (config.value.martingaleEnabled) {
        calculateMartingaleRisk()
      }
    })

    // API utility function
    const makeApiRequest = async (endpoint, method = 'GET', data = null) => {
      try {
        const requestConfig = {
          method,
          headers: { 'Content-Type': 'application/json' },
        }
        
        if (data) {
          requestConfig.body = JSON.stringify(data)
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, requestConfig)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
        }
        
        return await response.json()
      } catch (error) {
        log(`API Error: ${error.message}`, 'error')
        throw error
      }
    }

    // Enhanced logging function with risk indicators
    const log = (message, level = 'info', extraData = {}) => {
      const time = new Date().toLocaleTimeString()
      logs.value.unshift({ 
        time, 
        message, 
        level,
        martingale_step: botStatus.value.martingale?.current_step || 0,
        session_pnl: botStatus.value.session_pnl || 0,
        id: Date.now() + Math.random(),
        ...extraData
      })
      
      if (logs.value.length > 150) {
        logs.value = logs.value.slice(0, 150)
      }
    }

    // Enhanced bot control functions
    const startBot = async () => {
      if (!config.value.token.trim()) {
        log('Please enter a valid Deriv API token', 'error')
        return
      }

      // Risk validation for martingale
      if (config.value.martingaleEnabled) {
        const riskCheck = calculateMartingaleRisk()
        if (riskCheck.level === 'EXTREME') {
          const confirm = window.confirm(
            `⚠️ EXTREME RISK WARNING!\n\n` +
            `Martingale settings could risk ${riskCheck.percentage.toFixed(1)}% of your balance.\n` +
            `Maximum potential loss: ${riskCheck.maxLoss.toFixed(2)}\n\n` +
            `This is extremely dangerous and could lead to complete loss of capital.\n\n` +
            `Are you absolutely sure you want to proceed?`
          )
          if (!confirm) {
            log('Bot start cancelled due to high risk settings', 'warning')
            return
          }
        }
      }

      loading.value = true
      
      try {
        log('Starting Enhanced Average Last 5 Digits Bot...', 'info')
        
        // Save configuration
        localStorage.setItem('deriv_token', config.value.token)
        localStorage.setItem('enhanced_trading_config', JSON.stringify(config.value))
        
        // Enhanced API call
        const response = await makeApiRequest('/start', 'POST', {
          token: config.value.token,
          symbol: config.value.symbol,
          base_stake: config.value.baseStake,
          duration: 5,
          
          // Enhanced features
          martingale_enabled: config.value.martingaleEnabled,
          martingale_multiplier: config.value.martingaleMultiplier,
          martingale_max_steps: config.value.martingaleMaxSteps,
          
          take_profit_enabled: config.value.takeProfitEnabled,
          take_profit_amount: config.value.takeProfitAmount,
          stop_loss_enabled: config.value.stopLossEnabled,
          stop_loss_amount: config.value.stopLossAmount,
          
          auto_market_rotation: config.value.autoMarketRotation,
          trades_per_market: config.value.tradesPerMarket
        })

        if (response.status === 'started') {
          log(`Enhanced bot started on ${config.value.symbol}`, 'success')
          log(`Base stake: ${config.value.baseStake}`, 'info')
          
          if (config.value.martingaleEnabled) {
            log(`⚠️ MARTINGALE ENABLED: x${config.value.martingaleMultiplier} multiplier, max ${config.value.martingaleMaxSteps} steps`, 'warning')
            log(`⚠️ MAX RISK: ${riskAssessment.value.maxLoss.toFixed(2)} (${riskAssessment.value.percentage.toFixed(1)}%)`, 'warning')
          }
          
          if (config.value.takeProfitEnabled) {
            log(`Take Profit set at ${config.value.takeProfitAmount}`, 'info')
          }
          
          if (config.value.stopLossEnabled) {
            log(`Stop Loss set at ${config.value.stopLossAmount}`, 'info')
          }
          
          if (config.value.autoMarketRotation) {
            log(`Auto Market Rotation: ${config.value.tradesPerMarket} trades per market`, 'info')
          }
          
          startStatusPolling()
        } else {
          log(`Enhanced bot start failed: ${response.message || 'Unknown error'}`, 'error')
        }
        
      } catch (error) {
        log(`Failed to start enhanced bot: ${error.message}`, 'error')
      } finally {
        loading.value = false
      }
    }

    const stopBot = async () => {
      loading.value = true
      
      try {
        log('Stopping enhanced trading bot...', 'info')
        
        const response = await makeApiRequest('/stop', 'POST')
        
        if (response.status === 'stopped') {
          log('Enhanced trading bot stopped successfully', 'success')
          
          if (response.session_stats) {
            const stats = response.session_stats
            log(`Session Summary: ${stats.total_trades} trades, ${stats.win_rate}% win rate`, 'info')
            log(`Session P&L: ${stats.session_pnl?.toFixed(2) || '0.00'}`, stats.session_pnl >= 0 ? 'success' : 'error')
            
            if (config.value.martingaleEnabled) {
              log(`Final Martingale Step: ${stats.martingale?.current_step || 0}/${stats.martingale?.max_steps || 0}`, 'info')
            }
          }
        }
        
        stopStatusPolling()
        
      } catch (error) {
        log(`Error stopping enhanced bot: ${error.message}`, 'error')
      } finally {
        loading.value = false
        botStatus.value.is_running = false
      }
    }

    const forceTrade = async () => {
      try {
        log('Executing enhanced manual trade...', 'info')
        
        const response = await makeApiRequest('/force-trade', 'POST')
        
        if (response.status === 'success') {
          const martingaleInfo = response.martingale_step > 0 ? ` (Martingale Step ${response.martingale_step})` : ''
          log(`Manual trade executed: DIGITDIFF ≠ ${response.target_digit}${martingaleInfo}`, 'trade')
          log(`Stake: ${response.stake_amount?.toFixed(2)}`, 'info')
          
          if (response.calculation) {
            log(`Calculation: ${response.calculation.digits?.join('+')} = ${response.calculation.sum} → ${response.calculation.target_digit}`, 'info')
          }
        } else {
          log(`Manual trade failed: ${response.message}`, 'error')
        }
        
      } catch (error) {
        log(`Manual trade error: ${error.message}`, 'error')
      }
    }

    const updateSettings = async () => {
      try {
        log('Updating enhanced bot settings...', 'info')
        
        // Risk check for martingale changes
        if (config.value.martingaleEnabled) {
          const riskCheck = calculateMartingaleRisk()
          if (riskCheck.level === 'EXTREME') {
            log('⚠️ WARNING: Martingale settings pose extreme risk!', 'warning')
          }
        }
        
        if (botStatus.value.is_running) {
          await makeApiRequest('/update-settings', 'POST', {
            base_stake: config.value.baseStake,
            trade_cooldown: config.value.tradeCooldown,
            daily_loss_limit: config.value.dailyLossLimit,
            
            martingale_enabled: config.value.martingaleEnabled,
            martingale_multiplier: config.value.martingaleMultiplier,
            martingale_max_steps: config.value.martingaleMaxSteps,
            
            take_profit_enabled: config.value.takeProfitEnabled,
            take_profit_amount: config.value.takeProfitAmount,
            stop_loss_enabled: config.value.stopLossEnabled,
            stop_loss_amount: config.value.stopLossAmount,
            
            auto_market_rotation: config.value.autoMarketRotation,
            trades_per_market: config.value.tradesPerMarket
          })
        }
        
        localStorage.setItem('enhanced_trading_config', JSON.stringify(config.value))
        
        log('Enhanced settings updated successfully', 'success')
        
      } catch (error) {
        log(`Settings update failed: ${error.message}`, 'error')
      }
    }

    const resetData = async () => {
      const confirmReset = window.confirm(
        'Are you sure you want to reset ALL data?\n\n' +
        'This will clear:\n' +
        '• All trading statistics\n' +
        '• Tick history and analysis\n' +
        '• Martingale progression\n' +
        '• Session P&L\n\n' +
        'This action cannot be undone!'
      )
      
      if (!confirmReset) return
      
      try {
        log('Resetting all enhanced data...', 'info')
        
        const response = await makeApiRequest('/reset', 'POST')
        
        if (response.status === 'success') {
          log('All enhanced data has been reset', 'success')
          
          // Reset local state
          Object.assign(botStatus.value, {
            total_trades: 0,
            successful_trades: 0,
            win_rate: 0,
            total_pnl: 0,
            daily_pnl: 0,
            session_pnl: 0,
            current_target_digit: null,
            trade_cycle_count: 0,
            current_stake: config.value.baseStake,
            last_5_digits: [],
            martingale: {
              ...botStatus.value.martingale,
              current_step: 0,
              consecutive_losses: 0
            }
          })
          
          setTimeout(async () => {
            await getBotStatus()
          }, 1000)
          
        } else {
          log(`Reset failed: ${response.message || 'Unknown error'}`, 'error')
        }
        
      } catch (error) {
        log(`Reset data error: ${error.message}`, 'error')
      }
    }

    // Risk calculation functions
    const calculateMartingaleRisk = () => {
      if (!config.value.martingaleEnabled) {
        riskAssessment.value = { level: 'LOW', maxLoss: 0, percentage: 0 }
        return riskAssessment.value
      }

      let totalRisk = 0
      let currentStake = config.value.baseStake
      
      for (let step = 0; step <= config.value.martingaleMaxSteps; step++) {
        totalRisk += currentStake
        currentStake *= config.value.martingaleMultiplier
      }
      
      const balance = botStatus.value.current_balance || 1000
      const percentage = (totalRisk / balance) * 100
      
      let level = 'LOW'
      if (percentage > 50) level = 'EXTREME'
      else if (percentage > 30) level = 'HIGH'
      else if (percentage > 10) level = 'MEDIUM'
      
      riskAssessment.value = {
        level,
        maxLoss: totalRisk,
        percentage
      }
      
      return riskAssessment.value
    }

    const calculateRisk = async () => {
      try {
        const response = await makeApiRequest('/risk-calculator?' + new URLSearchParams({
          base_stake: riskCalc.value.baseStake,
          multiplier: config.value.martingaleMultiplier,
          max_steps: config.value.martingaleMaxSteps,
          balance: riskCalc.value.balance
        }))
        
        riskResults.value = response
      } catch (error) {
        log(`Risk calculation failed: ${error.message}`, 'error')
      }
    }

    // Status monitoring
    const getBotStatus = async () => {
      try {
        const response = await makeApiRequest('/statistics')
        Object.assign(botStatus.value, response)
        
        // Update current tick simulation
        if (response.is_running && Math.random() < 0.3) {
          const quote = (Math.random() * 100 + 1000).toFixed(3)
          currentTick.value = {
            quote,
            last_digit: parseInt(quote.slice(-1)),
            symbol: response.symbol
          }
        }
        
      } catch (error) {
        botStatus.value.is_running = false
        botStatus.value.is_connected = false
      }
    }

    const startStatusPolling = () => {
      if (statusInterval) return
      
      statusInterval = setInterval(async () => {
        await getBotStatus()
      }, 2000)
      
      log('Started enhanced real-time monitoring', 'info')
    }

    const stopStatusPolling = () => {
      if (statusInterval) {
        clearInterval(statusInterval)
        statusInterval = null
        log('Stopped real-time monitoring', 'info')
      }
    }

    // Utility functions
    const formatUptime = (minutes) => {
      if (!minutes) return '0m'
      if (minutes < 60) return `${Math.floor(minutes)}m`
      const hours = Math.floor(minutes / 60)
      const mins = Math.floor(minutes % 60)
      return `${hours}h ${mins}m`
    }

    const getRiskLevelClass = () => {
      switch (riskAssessment.value.level) {
        case 'EXTREME': return 'risk-high border-red-500'
        case 'HIGH': return 'risk-high border-red-400'
        case 'MEDIUM': return 'risk-medium border-yellow-500'
        default: return 'risk-low border-green-500'
      }
    }

    const getBalanceRiskClass = () => {
      const sessionRisk = (Math.abs(botStatus.value.session_pnl || 0) / Math.max(botStatus.value.current_balance || 1, 1)) * 100
      if (sessionRisk > 20) return 'border-red-500/50'
      if (sessionRisk > 10) return 'border-yellow-500/50'
      return 'border-slate-700/50'
    }

    const getRiskResultClass = () => {
      if (!riskResults.value) return ''
      switch (riskResults.value.risk_level) {
        case 'EXTREME': return 'border-red-500 bg-red-500/10'
        case 'HIGH': return 'border-red-400 bg-red-400/10'
        case 'MEDIUM': return 'border-yellow-500 bg-yellow-500/10'
        default: return 'border-green-500 bg-green-500/10'
      }
    }

    const getNextMarket = () => {
      if (!config.value.autoMarketRotation) return 'N/A'
      const currentIndex = availableMarkets.value.indexOf(botStatus.value.symbol || config.value.symbol)
      const nextIndex = (currentIndex + 1) % availableMarkets.value.length
      return availableMarkets.value[nextIndex]
    }

    const clearLogs = () => {
      logs.value = []
      log('Enhanced activity logs cleared', 'info')
    }

    // Test connection and initialize
    const testConnection = async () => {
      try {
        const response = await makeApiRequest('/health')
        log('Connected to Enhanced Trading API server', 'success')
        log(`Available features: ${response.features ? Object.keys(response.features).join(', ') : 'basic'}`, 'info')
        
        if (response.risk_warning) {
          log(response.risk_warning, 'warning')
        }
        
        // Check for active session
        const stats = await makeApiRequest('/statistics')
        if (stats.is_running) {
          log('Detected active enhanced bot session, resuming monitoring...', 'info')
          Object.assign(botStatus.value, stats)
          startStatusPolling()
        }
      } catch (error) {
        log('Failed to connect to Enhanced API server. Please ensure backend is running.', 'error')
      }
    }

    // Component lifecycle
    onMounted(async () => {
      // Load saved configuration
      const savedToken = localStorage.getItem('deriv_token')
      const savedConfig = localStorage.getItem('enhanced_trading_config')
      
      if (savedToken) {
        config.value.token = savedToken
      }
      
      if (savedConfig) {
        try {
          Object.assign(config.value, JSON.parse(savedConfig))
        } catch (e) {
          console.warn('Failed to load saved enhanced config')
        }
      }

      // Initialize
      log('Initializing Enhanced Deriv Trading Bot Dashboard...', 'info')
      log('Features: Martingale, Take Profit/Stop Loss, Auto Market Rotation', 'info')
      log('⚠️ WARNING: Enhanced features include high-risk strategies', 'warning')
      
      await testConnection()
      
      // Calculate initial risk if martingale enabled
      if (config.value.martingaleEnabled) {
        calculateMartingaleRisk()
      }
      
      log('Enhanced dashboard ready. Configure settings and trade responsibly.', 'success')
    })

    onUnmounted(() => {
      stopStatusPolling()
    })

    return {
      // State
      config,
      botStatus,
      currentTick,
      loading,
      logs,
      availableMarkets,
      showRiskCalculator,
      riskAssessment,
      riskCalc,
      riskResults,
      
      // Methods
      startBot,
      stopBot,
      forceTrade,
      updateSettings,
      resetData,
      calculateMartingaleRisk,
      calculateRisk,
      clearLogs,
      
      // Utilities
      formatUptime,
      getRiskLevelClass,
      getBalanceRiskClass,
      getRiskResultClass,
      getNextMarket
    }
  }
}
</script>

<style scoped>
.risk-high { 
  background-color: rgba(239, 68, 68, 0.2);
  border-color: rgb(239, 68, 68);
  color: rgb(252, 165, 165);
}
.risk-medium { 
  background-color: rgba(234, 179, 8, 0.2);
  border-color: rgb(234, 179, 8);
  color: rgb(253, 224, 71);
}
.risk-low { 
  background-color: rgba(34, 197, 94, 0.2);
  border-color: rgb(34, 197, 94);
  color: rgb(134, 239, 172);
}

.martingale-active {
  animation: pulse 2s infinite;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
}

.profit-glow {
  animation: profit-pulse 3s infinite;
}

.loss-glow {
  animation: loss-pulse 3s infinite;
}

@keyframes profit-pulse {
  0%, 100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5); }
  50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8); }
}

@keyframes loss-pulse {
  0%, 100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.5); }
  50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.8); }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.7);
}

/* Enhanced transitions */
* {
  transition: all 0.2s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

input:focus, select:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Accessibility */
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid rgb(59 130 246);
  outline-offset: 2px;
}

/* Text selection */
::selection {
  background-color: rgba(59, 130, 246, 0.3);
  color: white;
}

/* Responsive optimizations */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .text-3xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  
  .text-2xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}
</style>