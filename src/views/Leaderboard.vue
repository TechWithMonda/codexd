<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="relative z-10">
      <!-- Header -->
      <header class="flex justify-between items-center p-6 backdrop-blur-sm">
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl animate-pulse"
          >
            ⚡
          </div>
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
          >
            Fast Fingers
          </h1>
        </div>
        <nav>
          <ul class="flex space-x-8">
            <router-link to="/">
              <li>
                <a
                  href="#"
                  class="hover:text-yellow-400 transition-all duration-300 hover:scale-105"
                  >Play Game</a
                >
              </li>
            </router-link>
            <li>
              <a href="#" class="text-yellow-400 font-bold">Leaderboard</a>
            </li>
            <li>
              <a
                href="#"
                class="hover:text-yellow-400 transition-all duration-300 hover:scale-105"
                >Profile</a
              >
            </li>
          </ul>
        </nav>
      </header>

      <div class="max-w-7xl mx-auto px-6 py-8">
        <!-- Hero Section -->
        <div class="text-center mb-12 animate-slide-down">
          <div class="text-8xl mb-4">🏆</div>
          <h2
            class="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
          >
            Global Champions
          </h2>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Compete with the world's fastest typists. Climb the ranks and prove
            your typing mastery!
          </p>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div
            class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300"
          >
            <div class="text-4xl mb-3">🌍</div>
            <div class="text-3xl font-bold text-blue-400">
              {{ totalPlayers.toLocaleString() }}
            </div>
            <div class="text-sm text-gray-300 mt-1">Global Players</div>
          </div>
          <div
            class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300"
          >
            <div class="text-4xl mb-3">⚡</div>
            <div class="text-3xl font-bold text-yellow-400">
              {{ averageWPM }}
            </div>
            <div class="text-sm text-gray-300 mt-1">Average WPM</div>
          </div>
          <div
            class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300"
          >
            <div class="text-4xl mb-3">🎯</div>
            <div class="text-3xl font-bold text-green-400">
              {{ averageAccuracy }}%
            </div>
            <div class="text-sm text-gray-300 mt-1">Average Accuracy</div>
          </div>
          <div
            class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300"
          >
            <div class="text-4xl mb-3">🔥</div>
            <div class="text-3xl font-bold text-red-400">{{ recordWPM }}</div>
            <div class="text-sm text-gray-300 mt-1">World Record</div>
          </div>
        </div>

        <!-- Filter & Search Section -->
        <div
          class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div
            class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6"
          >
            <!-- Time Period Filter -->
            <div class="flex space-x-2">
              <button
                v-for="period in timePeriods"
                :key="period.value"
                @click="selectedPeriod = period.value"
                :class="
                  selectedPeriod === period.value
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-700 hover:bg-gray-600'
                "
                class="px-4 py-2 rounded-xl font-medium transition-all duration-300"
              >
                {{ period.label }}
              </button>
            </div>

            <!-- Category Filter -->
            <div class="flex space-x-2">
              <button
                v-for="category in categories"
                :key="category.value"
                @click="selectedCategory = category.value"
                :class="
                  selectedCategory === category.value
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                "
                class="px-4 py-2 rounded-xl font-medium transition-all duration-300"
              >
                <i :class="category.icon" class="mr-2"></i>
                {{ category.label }}
              </button>
            </div>

            <!-- Search -->
            <div class="relative flex-1 max-w-md">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search players..."
                class="w-full px-4 py-2 pl-10 bg-gray-900/70 text-white rounded-xl border border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300"
              />
              <i
                class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Leaderboard -->
          <div class="lg:col-span-2">
            <!-- Top 3 Podium -->
            <div
              class="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8"
            >
              <h3
                class="text-2xl font-bold text-center mb-8 flex items-center justify-center"
              >
                <i class="fas fa-crown text-yellow-400 mr-3"></i>
                Champions Podium
              </h3>

              <div class="flex justify-center items-end space-x-4 mb-8">
                <!-- Second Place -->
                <div
                  v-if="topPlayers[1]"
                  class="text-center transform hover:scale-105 transition-all duration-300"
                >
                  <div class="relative">
                    <div
                      class="w-24 h-24 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center text-2xl font-bold mb-2 border-4 border-gray-300 shadow-lg"
                    >
                      {{ getInitials(topPlayers[1].name) }}
                    </div>
                    <div
                      class="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm"
                    >
                      2
                    </div>
                  </div>
                  <div
                    class="bg-gray-400/20 rounded-xl p-3 border border-gray-400/30"
                  >
                    <div class="font-bold text-gray-300">
                      {{ topPlayers[1].name }}
                    </div>
                    <div class="text-2xl font-bold text-gray-400">
                      {{ topPlayers[1].wpm }}
                    </div>
                    <div class="text-xs text-gray-400">WPM</div>
                    <div class="text-xs text-gray-300">
                      {{ topPlayers[1].accuracy }}% ACC
                    </div>
                  </div>
                </div>

                <!-- First Place -->
                <div
                  v-if="topPlayers[0]"
                  class="text-center transform hover:scale-105 transition-all duration-300 -mt-8"
                >
                  <div class="relative">
                    <div
                      class="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-3xl font-bold mb-2 border-4 border-yellow-300 shadow-2xl animate-pulse"
                    >
                      {{ getInitials(topPlayers[0].name) }}
                    </div>
                    <div
                      class="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold"
                    >
                      👑
                    </div>
                  </div>
                  <div
                    class="bg-yellow-400/20 rounded-xl p-4 border border-yellow-400/30"
                  >
                    <div class="font-bold text-yellow-300">
                      {{ topPlayers[0].name }}
                    </div>
                    <div class="text-3xl font-bold text-yellow-400">
                      {{ topPlayers[0].wpm }}
                    </div>
                    <div class="text-sm text-yellow-300">WPM</div>
                    <div class="text-sm text-yellow-300">
                      {{ topPlayers[0].accuracy }}% ACC
                    </div>
                    <div class="text-xs text-yellow-200 mt-2">
                      {{ topPlayers[0].country }} 🏆
                    </div>
                  </div>
                </div>

                <!-- Third Place -->
                <div
                  v-if="topPlayers[2]"
                  class="text-center transform hover:scale-105 transition-all duration-300"
                >
                  <div class="relative">
                    <div
                      class="w-24 h-24 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 flex items-center justify-center text-2xl font-bold mb-2 border-4 border-amber-400 shadow-lg"
                    >
                      {{ getInitials(topPlayers[2].name) }}
                    </div>
                    <div
                      class="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    >
                      3
                    </div>
                  </div>
                  <div
                    class="bg-amber-600/20 rounded-xl p-3 border border-amber-400/30"
                  >
                    <div class="font-bold text-amber-300">
                      {{ topPlayers[2].name }}
                    </div>
                    <div class="text-2xl font-bold text-amber-400">
                      {{ topPlayers[2].wpm }}
                    </div>
                    <div class="text-xs text-amber-300">WPM</div>
                    <div class="text-xs text-amber-300">
                      {{ topPlayers[2].accuracy }}% ACC
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Full Leaderboard -->
            <div
              class="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden"
            >
              <div class="p-6 border-b border-white/20">
                <h3 class="text-2xl font-bold flex items-center">
                  <i class="fas fa-list-ol text-purple-400 mr-3"></i>
                  {{
                    selectedCategory === "wpm"
                      ? "Speed"
                      : selectedCategory === "accuracy"
                      ? "Accuracy"
                      : "Overall"
                  }}
                  Rankings
                </h3>
                <p class="text-gray-300 mt-1">{{ getPeriodDescription() }}</p>
              </div>

              <div class="max-h-96 overflow-y-auto">
                <div
                  v-for="(player, index) in filteredLeaderboard"
                  :key="player.id"
                  :class="
                    player.isCurrentUser
                      ? 'bg-yellow-400/20 border-yellow-400/50'
                      : 'hover:bg-white/5'
                  "
                  class="flex items-center p-4 border-b border-white/10 transition-all duration-300 cursor-pointer"
                  @click="viewProfile(player)"
                >
                  <!-- Rank -->
                  <div class="flex items-center justify-center w-12 h-12 mr-4">
                    <div v-if="index + 4 <= 3" class="text-2xl">
                      {{
                        index + 4 === 1 ? "🥇" : index + 4 === 2 ? "🥈" : "🥉"
                      }}
                    </div>
                    <div
                      v-else
                      :class="
                        player.isCurrentUser
                          ? 'bg-yellow-400 text-gray-900'
                          : 'bg-gray-700'
                      "
                      class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                    >
                      {{ index + 4 }}
                    </div>
                  </div>

                  <!-- Avatar & Name -->
                  <div class="flex items-center flex-1 min-w-0">
                    <div
                      :class="
                        player.isCurrentUser
                          ? 'from-yellow-400 to-orange-500'
                          : 'from-purple-400 to-pink-500'
                      "
                      class="w-12 h-12 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold mr-4 flex-shrink-0"
                    >
                      {{ getInitials(player.name) }}
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center">
                        <h4
                          :class="
                            player.isCurrentUser
                              ? 'text-yellow-300'
                              : 'text-white'
                          "
                          class="font-bold truncate"
                        >
                          {{ player.name }}
                        </h4>
                        <span
                          v-if="player.isPremium"
                          class="ml-2 text-yellow-400 text-sm"
                          >👑</span
                        >
                        <span
                          v-if="player.isCurrentUser"
                          class="ml-2 text-yellow-400 text-sm font-medium"
                          >(You)</span
                        >
                      </div>
                      <div class="flex items-center text-sm text-gray-400">
                        <i class="fas fa-flag mr-1"></i>
                        {{ player.country }}
                        <span class="mx-2">•</span>
                        <i class="fas fa-calendar mr-1"></i>
                        {{ formatDate(player.lastActive) }}
                      </div>
                    </div>
                  </div>

                  <!-- Stats -->
                  <div class="flex items-center space-x-6">
                    <div class="text-center">
                      <div
                        :class="
                          selectedCategory === 'wpm'
                            ? 'text-yellow-400'
                            : 'text-white'
                        "
                        class="text-xl font-bold"
                      >
                        {{ player.wpm }}
                      </div>
                      <div class="text-xs text-gray-400">WPM</div>
                    </div>
                    <div class="text-center">
                      <div
                        :class="
                          selectedCategory === 'accuracy'
                            ? 'text-green-400'
                            : 'text-white'
                        "
                        class="text-xl font-bold"
                      >
                        {{ player.accuracy }}%
                      </div>
                      <div class="text-xs text-gray-400">ACC</div>
                    </div>
                    <div class="text-center">
                      <div class="text-xl font-bold text-purple-400">
                        {{ player.level }}
                      </div>
                      <div class="text-xs text-gray-400">LVL</div>
                    </div>
                  </div>

                  <!-- Trend -->
                  <div class="ml-4">
                    <div
                      v-if="player.trend > 0"
                      class="text-green-400 flex items-center"
                    >
                      <i class="fas fa-arrow-up mr-1"></i>
                      <span class="text-sm">+{{ player.trend }}</span>
                    </div>
                    <div
                      v-else-if="player.trend < 0"
                      class="text-red-400 flex items-center"
                    >
                      <i class="fas fa-arrow-down mr-1"></i>
                      <span class="text-sm">{{ player.trend }}</span>
                    </div>
                    <div v-else class="text-gray-400 flex items-center">
                      <i class="fas fa-minus mr-1"></i>
                      <span class="text-sm">0</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Load More -->
              <div class="p-4 text-center border-t border-white/20">
                <button
                  @click="loadMore"
                  :disabled="loading"
                  class="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 transition-all duration-300"
                >
                  <span v-if="!loading">Load More Players</span>
                  <span v-else class="flex items-center">
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Loading...
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-8">
            <!-- Your Ranking -->
            <div
              class="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20"
            >
              <h3 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-user text-yellow-400 mr-3"></i>
                Your Ranking
              </h3>
              <div class="text-center">
                <div
                  class="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-bold mx-auto mb-4"
                >
                  {{ getInitials(currentUser.name) }}
                </div>
                <div class="text-2xl font-bold text-yellow-400 mb-2">
                  #{{ currentUser.rank }}
                </div>
                <div class="text-gray-300 mb-4">{{ currentUser.name }}</div>
                <div class="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div class="text-xl font-bold">{{ currentUser.wpm }}</div>
                    <div class="text-xs text-gray-400">WPM</div>
                  </div>
                  <div>
                    <div class="text-xl font-bold">
                      {{ currentUser.accuracy }}%
                    </div>
                    <div class="text-xs text-gray-400">ACC</div>
                  </div>
                </div>
                <button
                  class="mt-4 w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300"
                >
                  Improve Ranking
                </button>
              </div>
            </div>

            <!-- Recent Achievements -->
            <div
              class="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20"
            >
              <h3 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-trophy text-purple-400 mr-3"></i>
                Recent Achievements
              </h3>
              <div class="space-y-3">
                <div
                  v-for="achievement in recentAchievements"
                  :key="achievement.id"
                  class="flex items-center p-3 bg-white/5 rounded-xl border border-white/10"
                >
                  <div class="text-2xl mr-3">{{ achievement.emoji }}</div>
                  <div class="flex-1">
                    <div class="font-medium text-sm">
                      {{ achievement.title }}
                    </div>
                    <div class="text-xs text-gray-400">
                      {{ achievement.player }}
                    </div>
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ achievement.timeAgo }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Weekly Challenge -->
            <div
              class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl p-6 border border-purple-400/30"
            >
              <h3 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-fire text-orange-400 mr-3"></i>
                Weekly Challenge
              </h3>
              <div class="text-center">
                <div class="text-3xl mb-2">🎯</div>
                <div class="text-lg font-bold mb-2">Speed Sprint</div>
                <div class="text-sm text-gray-300 mb-4">
                  Type 100 words at 80+ WPM
                </div>
                <div class="bg-white/10 rounded-xl p-3 mb-4">
                  <div class="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>67/100</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div
                      class="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                      style="width: 67%"
                    ></div>
                  </div>
                </div>
                <div class="text-sm text-gray-300 mb-4">
                  <i class="fas fa-clock mr-1"></i>
                  3 days remaining
                </div>
                <button
                  class="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                >
                  Join Challenge
                </button>
              </div>
            </div>

            <!-- Country Rankings -->
            <div
              class="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20"
            >
              <h3 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-globe text-green-400 mr-3"></i>
                Top Countries
              </h3>
              <div class="space-y-3">
                <div
                  v-for="(country, index) in topCountries"
                  :key="country.code"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold mr-3"
                    >
                      {{ index + 1 }}
                    </div>
                    <div>
                      <div class="font-medium">{{ country.name }}</div>
                      <div class="text-xs text-gray-400">
                        {{ country.players }} players
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-bold">{{ country.avgWPM }}</div>
                    <div class="text-xs text-gray-400">avg WPM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="mt-16 text-center text-gray-400 py-8">
        <div class="flex justify-center items-center space-x-4 mb-4">
          <i class="fas fa-heart text-red-400 animate-pulse"></i>
          <span>Made with passion in Kenya</span>
          <i class="fas fa-flag text-green-400"></i>
        </div>
        <p>© 2025 Fast Fingers | Empowering typists worldwide</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "FastFingersLeaderboard",
  data() {
    return {
      selectedPeriod: "all",
      selectedCategory: "wpm",
      searchQuery: "",
      loading: false,

      timePeriods: [
        { label: "Today", value: "today" },
        { label: "This Week", value: "week" },
        { label: "This Month", value: "month" },
        { label: "All Time", value: "all" },
      ],

      categories: [
        { label: "Speed", value: "wpm", icon: "fas fa-tachometer-alt" },
        { label: "Accuracy", value: "accuracy", icon: "fas fa-bullseye" },
        { label: "Overall", value: "overall", icon: "fas fa-trophy" },
      ],

      totalPlayers: 25847,
      averageWPM: 42,
      averageAccuracy: 87,
      recordWPM: 156,

      currentUser: {
        id: "current",
        name: "John Doe",
        rank: 1247,
        wpm: 68,
        accuracy: 92,
        level: 15,
        country: "Kenya",
      },

      leaderboard: [
        {
          id: 1,
          name: "TypeMaster_Pro",
          wpm: 156,
          accuracy: 98,
          level: 50,
          country: "USA",
          lastActive: "2025-01-15",
          trend: 5,
          isPremium: true,
          isCurrentUser: false,
        },
        {
          id: 2,
          name: "Lightning_Fingers",
          wpm: 142,
          accuracy: 96,
          level: 48,
          country: "Singapore",
          lastActive: "2025-01-14",
          trend: 2,
          isPremium: true,
          isCurrentUser: false,
        },
        {
          id: 3,
          name: "SwiftTyper2024",
          wpm: 138,
          accuracy: 94,
          level: 45,
          country: "Germany",
          lastActive: "2025-01-15",
          trend: -1,
          isPremium: false,
          isCurrentUser: false,
        },
        {
          id: 4,
          name: "KeyboardNinja",
          wpm: 135,
          accuracy: 97,
          level: 42,
          country: "Canada",
          lastActive: "2025-01-13",
          trend: 3,
          isPremium: true,
          isCurrentUser: false,
        },
        {
          id: 5,
          name: "SpeedDemon_X",
          wpm: 132,
          accuracy: 93,
          level: 40,
          country: "UK",
          lastActive: "2025-01-15",
          trend: 0,
          isPremium: false,
          isCurrentUser: false,
        },
        {
          id: 6,
          name: "John Doe",
          wpm: 68,
          accuracy: 92,
          level: 15,
          country: "Kenya",
          lastActive: "2025-01-15",
          trend: 8,
          isPremium: false,
          isCurrentUser: true,
        },
      ],

      recentAchievements: [
        {
          id: 1,
          emoji: "🏆",
          title: "New World Record!",
          player: "TypeMaster_Pro",
          timeAgo: "2h ago",
        },
        {
          id: 2,
          emoji: "🎯",
          title: "100% Accuracy Master",
          player: "PerfectTypist",
          timeAgo: "5h ago",
        },
        {
          id: 3,
          emoji: "🔥",
          title: "Speed Demon Unlocked",
          player: "Lightning_Fingers",
          timeAgo: "1d ago",
        },
        {
          id: 4,
          emoji: "⭐",
          title: "First Perfect Game",
          player: "NewTyper123",
          timeAgo: "2d ago",
        },
      ],

      topCountries: [
        { code: "US", name: "United States", players: 8420, avgWPM: 48 },
        { code: "SG", name: "Singapore", players: 3210, avgWPM: 52 },
        { code: "DE", name: "Germany", players: 2890, avgWPM: 46 },
        { code: "CA", name: "Canada", players: 2654, avgWPM: 44 },
        { code: "UK", name: "United Kingdom", players: 2341, avgWPM: 43 },
        { code: "KE", name: "Kenya", players: 1876, avgWPM: 41 },
      ],
    };
  },
  computed: {
    topPlayers() {
      return this.leaderboard.slice(0, 3);
    },

    filteredLeaderboard() {
      let filtered = [...this.leaderboard];

      // Remove top 3 from main list since they're shown in podium
      filtered = filtered.slice(3);

      // Apply search filter
      if (this.searchQuery) {
        filtered = filtered.filter(
          (player) =>
            player.name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            player.country
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        );
      }

      // Sort by selected category
      filtered.sort((a, b) => {
        if (this.selectedCategory === "wpm") {
          return b.wpm - a.wpm;
        } else if (this.selectedCategory === "accuracy") {
          return b.accuracy - a.accuracy;
        } else {
          // Overall ranking (combination of WPM and accuracy)
          const scoreA = a.wpm * 0.7 + a.accuracy * 0.3;
          const scoreB = b.wpm * 0.7 + b.accuracy * 0.3;
          return scoreB - scoreA;
        }
      });

      return filtered;
    },
  },

  methods: {
    getInitials(name) {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    },

    getPeriodDescription() {
      const descriptions = {
        today: "Rankings from today's performances",
        week: "Rankings from the past 7 days",
        month: "Rankings from the past 30 days",
        all: "All-time global rankings",
      };
      return descriptions[this.selectedPeriod];
    },

    viewProfile(player) {
      // In a real app, navigate to player profile
      console.log("Viewing profile for:", player.name);
      // Show player details modal or navigate to profile page
    },

    async loadMore() {
      this.loading = true;

      try {
        // Simulate API call to load more players
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Add mock data for demonstration
        const newPlayers = [
          {
            id: this.leaderboard.length + 1,
            name: "FastTyper2025",
            wpm: 85,
            accuracy: 89,
            level: 22,
            country: "Australia",
            lastActive: "2025-01-14",
            trend: 2,
            isPremium: false,
            isCurrentUser: false,
          },
          {
            id: this.leaderboard.length + 2,
            name: "KeyboardMaster",
            wpm: 83,
            accuracy: 91,
            level: 20,
            country: "Brazil",
            lastActive: "2025-01-13",
            trend: -1,
            isPremium: true,
            isCurrentUser: false,
          },
        ];

        this.leaderboard.push(...newPlayers);
      } catch (error) {
        console.error("Failed to load more players:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-slide-down {
  animation: slide-down 0.8s ease-out;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:bg-white\/5:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fa-spin {
  animation: spin 1s linear infinite;
}

/* Responsive design */
@media (max-width: 768px) {
  .text-8xl {
    font-size: 4rem;
  }

  .text-5xl {
    font-size: 2.5rem;
  }

  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .lg\:grid-cols-3 {
    grid-template-columns: 1fr;
  }

  .lg\:col-span-2 {
    grid-column: span 1;
  }

  .flex-col {
    flex-direction: column;
  }

  .lg\:flex-row {
    flex-direction: column;
  }

  .lg\:space-x-6 {
    margin-left: 0;
    margin-right: 0;
  }

  .lg\:space-x-6 > * + * {
    margin-left: 0;
    margin-top: 1rem;
  }

  .space-y-4 > * + * {
    margin-top: 1rem;
  }

  .lg\:space-y-0 > * + * {
    margin-top: 1rem;
  }
}

@media (max-width: 640px) {
  .w-32 {
    width: 6rem;
  }

  .h-32 {
    height: 6rem;
  }

  .w-24 {
    width: 4rem;
  }

  .h-24 {
    height: 4rem;
  }

  .text-3xl {
    font-size: 1.5rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }

  .p-8 {
    padding: 1rem;
  }

  .p-6 {
    padding: 1rem;
  }

  .space-x-4 > * + * {
    margin-left: 0.5rem;
  }

  .space-x-6 > * + * {
    margin-left: 1rem;
  }
}

/* Focus states for accessibility */
button:focus-visible,
input:focus-visible {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}

/* Custom button transitions */
button {
  transition: all 0.3s ease;
}

button:active {
  transform: scale(0.98);
}

/* Gradient text animation */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

/* Trophy shine effect */
@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.fa-trophy {
  position: relative;
  overflow: hidden;
}

.fa-trophy::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shine 2s ease-in-out infinite;
}

/* Country flag spacing */
.fa-flag {
  margin-right: 0.25rem;
}

/* Leaderboard row hover effects */
.cursor-pointer:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-left: 4px solid #fbbf24;
  padding-left: 1rem;
  transition: all 0.3s ease;
}

/* Achievement pulse effect */
.recentAchievements .bg-white\/5 {
  animation: pulse 3s ease-in-out infinite;
}

/* Premium crown animation */
.fa-crown {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}
</style>
