<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <!-- Header with Real-time Status -->
    <header class="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 shadow-lg">
      <div class="container mx-auto px-4 sm:px-6 py-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Average Last 5 Digits Bot
              </h1>
              <p class="text-xs sm:text-sm text-slate-400">DIGITDIFF Strategy with Enhanced Analytics</p>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
            <!-- Current Tick Display -->
            <div v-if="currentTick" class="bg-slate-700/50 rounded-lg px-4 py-2 border border-slate-600">
              <div class="text-xs text-slate-400">Current Tick</div>
              <div class="text-lg font-bold">{{ currentTick.quote }}</div>
              <div class="text-sm text-blue-400">Digit: {{ currentTick.last_digit }}</div>
            </div>
            
            <!-- Status Indicators -->
            <div class="flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-2">
              <div class="flex items-center space-x-2">
                <div :class="['w-3 h-3 rounded-full', botStatus.is_running ? 'bg-green-500 animate-pulse' : 'bg-red-500']"></div>
                <span class="text-sm font-medium">{{ botStatus.is_running ? 'Trading' : 'Stopped' }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <div :class="['w-3 h-3 rounded-full', botStatus.is_connected ? 'bg-blue-500' : 'bg-gray-500']"></div>
                <span class="text-xs text-slate-400">{{ botStatus.is_connected ? 'API Connected' : 'Disconnected' }}</span>
              </div>
            </div>
            
            <!-- Uptime -->
            <div class="text-left sm:text-right">
              <div class="text-xs text-slate-400">Uptime</div>
              <div class="text-sm font-medium">{{ formatUptime(botStatus.uptime_minutes) }}</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <!-- Enhanced Configuration Section -->
      <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-700/50 shadow-xl">
        <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center">
          <svg class="w-5 sm:w-6 h-5 sm:h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Trading Configuration
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">API Token</label>
            <input 
              v-model="config.token" 
              type="password" 
              placeholder="Enter Deriv API token"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
            />
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">Market</label>
            <select 
              v-model="config.symbol" 
              class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            >
              <option v-for="market in availableMarkets" :key="market" :value="market">
                {{ market }}
              </option>
            </select>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">Stake ($)</label>
            <input 
              v-model.number="config.stake" 
              type="number" 
              min="0.35" 
              step="0.25"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            />
            <p class="text-xs text-slate-400">Min: $0.35, Max: 2% of balance</p>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">Daily Loss Limit ($)</label>
            <input 
              v-model.number="config.dailyLossLimit" 
              type="number" 
              min="10" 
              step="5"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            />
          </div>
          
          <div class="space-y-2 sm:col-span-2 lg:col-span-1 xl:col-span-1">
            <label class="block text-sm font-medium text-slate-300">Trade Cooldown (s)</label>
            <input 
              v-model.number="config.tradeCooldown" 
              type="number" 
              min="1" 
              max="60"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      <!-- Enhanced Statistics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <!-- Account Balance -->
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-xl">
          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <h3 class="text-base sm:text-lg font-semibold">Account Balance</h3>
            <svg class="w-5 sm:w-6 h-5 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="text-2xl sm:text-3xl font-bold text-white mb-2">
            ${{ botStatus.current_balance?.toFixed(2) || '0.00' }}
          </div>
          <div class="text-xs sm:text-sm text-slate-400">
            Max stake: ${{ (botStatus.current_balance * 0.02)?.toFixed(2) || '0.00' }}
          </div>
        </div>

        <!-- Daily P&L -->
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-xl">
          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <h3 class="text-base sm:text-lg font-semibold">Daily P&L</h3>
            <svg :class="['w-5 sm:w-6 h-5 sm:h-6', botStatus.daily_pnl >= 0 ? 'text-green-400' : 'text-red-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="botStatus.daily_pnl >= 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
            </svg>
          </div>
          <div :class="['text-2xl sm:text-3xl font-bold mb-2', botStatus.daily_pnl >= 0 ? 'text-green-400' : 'text-red-400']">
            ${{ botStatus.daily_pnl?.toFixed(2) || '0.00' }}
          </div>
          <div class="text-xs sm:text-sm text-slate-400">
            Limit: ${{ config.dailyLossLimit }}
          </div>
        </div>

        <!-- Win Rate -->
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-xl">
          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <h3 class="text-base sm:text-lg font-semibold">Win Rate</h3>
            <svg class="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          </div>
          <div class="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">
            {{ botStatus.win_rate || 0 }}%
          </div>
          <div class="text-xs sm:text-sm text-slate-400">
            {{ botStatus.successful_trades || 0 }}/{{ botStatus.total_trades || 0 }} trades
          </div>
        </div>

        <!-- Total P&L -->
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-xl">
          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <h3 class="text-base sm:text-lg font-semibold">Total P&L</h3>
            <svg :class="['w-5 sm:w-6 h-5 sm:h-6', botStatus.total_pnl >= 0 ? 'text-green-400' : 'text-red-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div :class="['text-2xl sm:text-3xl font-bold mb-2', botStatus.total_pnl >= 0 ? 'text-green-400' : 'text-red-400']">
            ${{ botStatus.total_pnl?.toFixed(2) || '0.00' }}
          </div>
          <div class="text-xs sm:text-sm text-slate-400">
            Session total
          </div>
        </div>
      </div>

      <!-- Controls and Analysis Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
        <!-- Controls -->
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-xl">
          <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center">
            <svg class="w-5 sm:w-6 h-5 sm:h-6 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
            Trading Controls
          </h2>
          
          <div class="space-y-3 sm:space-y-4">
            <button 
              @click="startBot" 
              :disabled="!config.token || botStatus.is_running || loading"
              class="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-105 disabled:hover:scale-100 text-sm sm:text-base"
            >
              <svg class="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ loading ? 'Starting...' : 'Start Bot' }}</span>
            </button>
            
            <button 
              @click="stopBot" 
              :disabled="!botStatus.is_running || loading"
              class="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105 disabled:hover:scale-100 text-sm sm:text-base"
            >
              <svg class="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9h6v6H9z"></path>
              </svg>
              <span>{{ loading ? 'Stopping...' : 'Stop Bot' }}</span>
            </button>
            
            <button 
              @click="forceTrade" 
              :disabled="!botStatus.is_running || loading"
              class="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105 disabled:hover:scale-100 text-sm sm:text-base"
            >
              <svg class="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>Force Trade</span>
            </button>
            
            <button 
              @click="updateSettings" 
              :disabled="loading"
              class="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105 disabled:hover:scale-100 text-sm sm:text-base"
            >
              <svg class="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Update Settings</span>
            </button>
            
            <button 
              @click="resetData" 
              :disabled="loading"
              class="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/25 hover:scale-105 disabled:hover:scale-100 text-sm sm:text-base"
            >
              <svg class="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        <!-- Last 5 Digits Analysis -->
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-xl">
          <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center">
            <svg class="w-5 sm:w-6 h-5 sm:h-6 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            Last 5 Digits Analysis
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
          <div v-if="botStatus.tick_analysis?.last_5_calculation?.ready_to_trade" class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="text-sm font-medium text-slate-300 mb-2">Calculation</h3>
            <div class="text-xs text-slate-400 space-y-1">
              <div>Digits: {{ botStatus.tick_analysis.last_5_calculation.digits?.join(' + ') }}</div>
              <div>Sum: {{ botStatus.tick_analysis.last_5_calculation.sum }}</div>
              <div>Average: {{ botStatus.tick_analysis.last_5_calculation.average }}</div>
              <div class="font-semibold text-red-400">Target: {{ botStatus.tick_analysis.last_5_calculation.target_digit }}</div>
            </div>
          </div>

          <!-- Digit Frequency Chart -->
          <div class="mt-6">
            <h3 class="text-sm font-medium text-slate-300 mb-3">Recent Digit Frequency</h3>
            <div class="grid grid-cols-5 gap-1 sm:gap-2">
              <div v-for="digit in [0,1,2,3,4,5,6,7,8,9]" 
                   :key="digit"
                   class="text-center">
                <div class="text-xs font-medium mb-1">{{ digit }}</div>
                <div class="bg-slate-700/30 h-12 sm:h-16 rounded relative overflow-hidden">
                  <div 
                    :class="[
                      'absolute bottom-0 w-full transition-all duration-500',
                      digit === botStatus.current_target_digit ? 'bg-gradient-to-t from-red-500 to-red-400' : 'bg-gradient-to-t from-blue-500 to-blue-400'
                    ]"
                    :style="{ height: `${getDigitFrequencyHeight(digit)}%` }"
                  ></div>
                </div>
                <div class="text-xs text-slate-400 mt-1">
                  {{ getDigitFrequency(digit) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Ticks -->
          <div class="mt-4 sm:mt-6">
            <h3 class="text-sm font-medium text-slate-300 mb-3">Recent Digits</h3>
            <div class="flex space-x-1 overflow-x-auto pb-2">
              <div v-for="(digit, index) in getRecentTicks()" 
                   :key="index"
                   :class="[
                     'flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold border transition-all duration-200',
                     digit === botStatus.current_target_digit ? 
                       'bg-red-500/20 border-red-500 text-red-300' : 
                       'bg-slate-600/50 border-slate-500 text-slate-300'
                   ]">
                {{ digit }}
              </div>
            </div>
          </div>
        </div>

        <!-- Strategy Info -->
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-xl">
          <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center">
            <svg class="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Strategy Info
          </h2>
          
          <div class="space-y-3 sm:space-y-4">
            <div class="bg-slate-700/30 rounded-lg p-3 sm:p-4">
              <h3 class="font-semibold text-green-400 mb-2">Average Last 5 Digits</h3>
              <p class="text-sm text-slate-300 mb-3">
                Calculates the average of the last 5 tick digits and uses it as the target for DIGITDIFF contracts.
              </p>
              <div class="text-xs text-slate-400">
                • Collects last 5 tick digits<br>
                • Calculates average (sum ÷ 5)<br>
                • Uses integer part as DIGITDIFF target<br>
                • Predicts next tick ≠ target digit
              </div>
            </div>

            <div class="bg-slate-700/30 rounded-lg p-3 sm:p-4">
              <h3 class="font-semibold text-blue-400 mb-2">Risk Management</h3>
              <div class="text-xs text-slate-400 space-y-1">
                <div>• Max stake: 2% of balance</div>
                <div>• Trade cooldown: {{ config.tradeCooldown }}s</div>
                <div>• Daily loss limit: ${{ config.dailyLossLimit }}</div>
                <div>• Minimum stake: $0.35</div>
                <div>• Contract duration: 5 ticks</div>
              </div>
            </div>

            <div class="bg-slate-700/30 rounded-lg p-3 sm:p-4">
              <h3 class="font-semibold text-purple-400 mb-2">Current Status</h3>
              <div class="text-xs text-slate-400 space-y-1">
                <div>Ticks analyzed: {{ botStatus.tick_analysis?.total_ticks_analyzed || 0 }}</div>
                <div>Trade cycle: {{ botStatus.trade_cycle_count || 0 }}</div>
                <div>Active market: {{ config.symbol }}</div>
                <div>Last 5 collected: {{ (botStatus.last_5_digits?.length || 0) }}/5</div>
                <div v-if="botStatus.connection_status">
                  Connection attempts: {{ botStatus.connection_status.connection_attempts }}/{{ botStatus.connection_status.max_attempts }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Log -->
      <div class="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-xl">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <h2 class="text-lg sm:text-xl font-semibold flex items-center">
            <svg class="w-5 sm:w-6 h-5 sm:h-6 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Activity Log
          </h2>
          <button 
            @click="clearLogs" 
            class="px-3 sm:px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm border border-slate-600/50">
            Clear Logs
          </button>
        </div>
        
        <div class="bg-slate-900/50 rounded-xl border border-slate-700/50 h-48 sm:h-64 overflow-y-auto custom-scrollbar">
          <div class="p-3 sm:p-4 space-y-2">
            <div v-for="(log, index) in logs" 
                 :key="index"
                 :class="[
                   'flex items-start space-x-2 sm:space-x-3 py-2 px-3 rounded-lg transition-colors duration-200 slide-in',
                   log.level === 'success' ? 'bg-green-500/10 border-l-4 border-green-500' :
                   log.level === 'error' ? 'bg-red-500/10 border-l-4 border-red-500' :
                   log.level === 'warning' ? 'bg-yellow-500/10 border-l-4 border-yellow-500' :
                   log.level === 'trade' ? 'bg-blue-500/10 border-l-4 border-blue-500' :
                   'bg-slate-500/10 border-l-4 border-slate-500'
                 ]">
              <div class="flex-shrink-0 mt-1">
                <svg v-if="log.level === 'success'" class="w-3 sm:w-4 h-3 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg v-else-if="log.level === 'error'" class="w-3 sm:w-4 h-3 sm:h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <svg v-else-if="log.level === 'warning'" class="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <svg v-else-if="log.level === 'trade'" class="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <svg v-else class="w-3 sm:w-4 h-3 sm:h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                  <span class="text-xs font-mono text-slate-400">[{{ log.time }}]</span>
                  <span v-if="log.trade_info" class="text-xs bg-slate-600 px-2 py-1 rounded inline-block">
                    {{ log.trade_info }}
                  </span>
                </div>
                <div :class="[
                  'text-xs sm:text-sm break-words',
                  log.level === 'success' ? 'text-green-300' :
                  log.level === 'error' ? 'text-red-300' :
                  log.level === 'warning' ? 'text-yellow-300' :
                  log.level === 'trade' ? 'text-blue-300' :
                  'text-slate-300'
                ]">{{ log.message }}</div>
              </div>
            </div>
            <div v-if="logs.length === 0" class="text-center text-slate-400 py-6 sm:py-8">
              <svg class="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 sm:mb-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="font-medium text-sm sm:text-base">No activity logs yet</p>
              <p class="text-xs sm:text-sm">Start the bot to see real-time trading updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

export default {
  name: 'AverageLast5DigitsTradingDashboard',
  setup() {
    // API Configuration - matches your backend
    const API_BASE_URL = window.location.hostname === "localhost" 
      ? "http://localhost:8000" 
      : "https://codexd-production.up.railway.app/api";

    // Configuration state
    const config = ref({
      token: '',
      symbol: 'R_100',
      stake: 1.0,
      dailyLossLimit: 50.0,
      tradeCooldown: 5
    })

    // Bot status matching your backend structure
    const botStatus = ref({
      is_running: false,
      is_connected: false,
      symbol: null,
      strategy: "Average Last 5 Digits",
      total_trades: 0,
      successful_trades: 0,
      win_rate: 0,
      total_pnl: 0,
      daily_pnl: 0,
      current_balance: 0,
      current_target_digit: null,
      trade_cycle_count: 0,
      last_5_digits: [],
      tick_analysis: {
        total_ticks_analyzed: 0,
        digit_frequencies: {},
        recent_ticks: [],
        last_5_calculation: {
          digits_collected: 0,
          digits: [],
          ready_to_trade: false,
          sum: 0,
          average: 0,
          target_digit: null
        }
      },
      uptime_minutes: 0,
      connection_status: {
        connected: false,
        connection_attempts: 0,
        max_attempts: 3
      }
    })

    // Real-time data
    const currentTick = ref(null)
    const loading = ref(false)
    const logs = ref([])

    // Available markets
    const availableMarkets = ref(['R_10', 'R_25', 'R_50', 'R_75', 'R_100'])

    // Polling intervals
    let statusInterval = null

    // API utility function
    const makeApiRequest = async (endpoint, method = 'GET', data = null) => {
      try {
        const config = {
          method,
          headers: { 'Content-Type': 'application/json' },
        }
        
        if (data) {
          config.body = JSON.stringify(data)
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
        
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

    // Enhanced logging function
    const log = (message, level = 'info', tradeInfo = null) => {
      const time = new Date().toLocaleTimeString()
      logs.value.unshift({ 
        time, 
        message, 
        level,
        trade_info: tradeInfo,
        id: Date.now() + Math.random()
      })
      
      if (logs.value.length > 100) {
        logs.value = logs.value.slice(0, 100)
      }
    }

    // Bot control functions matching your backend API
    const startBot = async () => {
      if (!config.value.token.trim()) {
        log('Please enter a valid Deriv API token', 'error')
        return
      }

      loading.value = true
      
      try {
        log('Starting Average Last 5 Digits trading bot...', 'info')
        
        // Save token to localStorage
        localStorage.setItem('deriv_token', config.value.token)
        
        // Start the bot using your backend endpoint
        const response = await makeApiRequest('/start', 'POST', {
          token: config.value.token,
          symbol: config.value.symbol,
          stake: config.value.stake,
          duration: 5 // Fixed 5 ticks as in your backend
        })

        if (response.status === 'started') {
          log(`Bot started successfully on ${config.value.symbol}`, 'success', `Stake: ${config.value.stake}`)
          log('Strategy: Average Last 5 Digits → DIGITDIFF', 'info')
          log(`Risk limits: ${config.value.dailyLossLimit} daily loss, ${config.value.tradeCooldown}s cooldown`, 'info')
          
          // Start monitoring
          startStatusPolling()
          
        } else {
          log(`Bot start failed: ${response.message || 'Unknown error'}`, 'error')
        }
        
      } catch (error) {
        log(`Failed to start bot: ${error.message}`, 'error')
      } finally {
        loading.value = false
      }
    }

    const stopBot = async () => {
      loading.value = true
      
      try {
        log('Stopping trading bot...', 'info')
        
        const response = await makeApiRequest('/stop', 'POST')
        
        if (response.status === 'stopped') {
          log('Trading bot stopped successfully', 'success')
          
          // Log session summary
          if (response.session_stats) {
            const stats = response.session_stats
            log(`Session summary: ${stats.total_trades} trades, ${stats.win_rate}% win rate, ${stats.total_pnl} P&L`, 'info')
          }
        }
        
        stopStatusPolling()
        
      } catch (error) {
        log(`Error stopping bot: ${error.message}`, 'error')
      } finally {
        loading.value = false
        botStatus.value.is_running = false
      }
    }

    const forceTrade = async () => {
      try {
        log('Executing manual trade...', 'info')
        
        const response = await makeApiRequest('/force-trade', 'POST')
        
        if (response.status === 'success') {
          log(`Manual trade executed on digit ${response.target_digit}`, 'trade', `Target: ${response.target_digit}`)
          log(`Calculation: ${response.calculation?.digits?.join('+')} = ${response.calculation?.sum} → ${response.calculation?.target_digit}`, 'info')
        } else {
          log(`Manual trade failed: ${response.message}`, 'error')
        }
        
      } catch (error) {
        log(`Manual trade error: ${error.message}`, 'error')
      }
    }

    const updateSettings = async () => {
      try {
        log('Updating bot settings...', 'info')
        
        // Update settings via API if bot is running
        if (botStatus.value.is_running) {
          await makeApiRequest('/update-settings', 'POST', {
            stake: config.value.stake,
            trade_cooldown: config.value.tradeCooldown,
            daily_loss_limit: config.value.dailyLossLimit
          })
        }
        
        // Save to localStorage
        localStorage.setItem('trading_config', JSON.stringify(config.value))
        
        log(`Settings updated: Stake ${config.value.stake}, Cooldown ${config.value.tradeCooldown}s, Loss limit ${config.value.dailyLossLimit}`, 'success')
        
      } catch (error) {
        log(`Settings update failed: ${error.message}`, 'error')
      }
    }

    const resetData = async () => {
      try {
        log('Resetting all data...', 'info')
        
        const response = await makeApiRequest('/reset', 'POST')
        
        if (response.status === 'success') {
          log('All data has been reset', 'success')
          
          // Clear local state
          botStatus.value = {
            ...botStatus.value,
            total_trades: 0,
            successful_trades: 0,
            win_rate: 0,
            total_pnl: 0,
            daily_pnl: 0,
            current_target_digit: null,
            trade_cycle_count: 0,
            last_5_digits: [],
            tick_analysis: {
              total_ticks_analyzed: 0,
              digit_frequencies: {},
              recent_ticks: [],
              last_5_calculation: {
                digits_collected: 0,
                digits: [],
                ready_to_trade: false
              }
            }
          }
          
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

    // Status monitoring
    const getBotStatus = async () => {
      try {
        const response = await makeApiRequest('/statistics')
        
        // Update bot status with your backend structure
        Object.assign(botStatus.value, response)
        
      } catch (error) {
        // Connection lost
        botStatus.value.is_running = false
        botStatus.value.is_connected = false
      }
    }

    const startStatusPolling = () => {
      if (statusInterval) return
      
      statusInterval = setInterval(async () => {
        await getBotStatus()
      }, 2000)
      
      log('Started real-time monitoring', 'info')
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

    const getDigitFrequency = (digit) => {
      return botStatus.value.tick_analysis?.digit_frequencies?.[digit] || 0
    }

    const getDigitFrequencyHeight = (digit) => {
      const frequencies = botStatus.value.tick_analysis?.digit_frequencies || {}
      const maxFreq = Math.max(...Object.values(frequencies), 1)
      const freq = frequencies[digit] || 0
      return Math.max((freq / maxFreq) * 100, 2)
    }

    const getRecentTicks = () => {
      return botStatus.value.tick_analysis?.recent_ticks?.slice(-15) || []
    }

    const clearLogs = () => {
      logs.value = []
      log('Activity logs cleared', 'info')
    }

    // Test connection on mount
    const testConnection = async () => {
      try {
        const response = await makeApiRequest('/statistics')
        log('Connected to trading API server', 'success')
        
        // Check if bot is already running
        if (response.is_running) {
          log('Detected active bot session, resuming monitoring...', 'info')
          Object.assign(botStatus.value, response)
          startStatusPolling()
        }
      } catch (error) {
        log('Failed to connect to API server. Please ensure the backend is running.', 'error')
      }
    }

    // Component lifecycle
    onMounted(async () => {
      // Load saved configuration
      const savedToken = localStorage.getItem('deriv_token')
      const savedConfig = localStorage.getItem('trading_config')
      
      if (savedToken) {
        config.value.token = savedToken
      }
      
      if (savedConfig) {
        try {
          Object.assign(config.value, JSON.parse(savedConfig))
        } catch (e) {
          console.warn('Failed to load saved config')
        }
      }

      // Initialize
      log('Initializing Average Last 5 Digits Bot Dashboard...', 'info')
      log('Strategy: Calculate average of last 5 digits → DIGITDIFF target', 'info')
      
      await testConnection()
      
      log('Dashboard ready. Configure settings and start trading.', 'success')
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
      
      // Methods
      startBot,
      stopBot,
      forceTrade,
      updateSettings,
      resetData,
      clearLogs,
      
      // Utilities
      formatUptime,
      getDigitFrequency,
      getDigitFrequencyHeight,
      getRecentTicks
    }
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes slide-in {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.slide-in {
  animation: slide-in 0.3s ease-out;
}

/* Custom scrollbar */
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

/* Transitions */
* {
  transition: all 0.2s ease;
}

/* Button hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

/* Input focus effects */
input:focus, select:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Focus states for accessibility */
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid rgb(59 130 246);
  outline-offset: 2px;
}

/* Text selection color */
::selection {
  background-color: rgba(59, 130, 246, 0.3);
  color: white;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Responsive text scaling */
@media (max-width: 480px) {
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