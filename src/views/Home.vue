<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative z-10">
      <!-- Header -->
      <header class="flex justify-between items-center p-6 backdrop-blur-sm">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl animate-pulse">
            ⚡
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Fast Fingers
          </h1>
        </div>
        <nav>
          <ul class="flex space-x-8">
            <li><a href="#" class="hover:text-yellow-400 transition-all duration-300 hover:scale-105">Home</a></li>
            <router-link to="leaderboard">
              <li><a href="#" class="hover:text-yellow-400 transition-all duration-300 hover:scale-105">Leaderboard</a></li>
            </router-link>
            <li class="relative">
              <a href="#" class="hover:text-yellow-400 transition-all duration-300 hover:scale-105 flex items-center">
                Upgrade
                <span class="absolute -top-2 -right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <!-- Game Container -->
      <div class="max-w-5xl mx-auto px-6">
        <!-- Level & Achievement Bar -->
        <div class="mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium">Level {{ currentLevel }}</span>
            <span class="text-sm text-gray-300">{{ experience }}/{{ nextLevelXP }} XP</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              class="h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000 ease-out"
              :style="{ width: `${(experience / nextLevelXP) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Real-time Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
            <div class="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text mb-2">
              {{ wpm }}
            </div>
            <div class="text-sm text-gray-300 mb-1">WPM</div>
            <div class="text-xs text-gray-400">
              <i class="fas fa-arrow-up text-green-400" v-if="wpmTrend > 0"></i>
              <i class="fas fa-arrow-down text-red-400" v-else-if="wpmTrend < 0"></i>
              {{ Math.abs(wpmTrend) }}
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
            <div class="text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-2">
              {{ accuracy }}%
            </div>
            <div class="text-sm text-gray-300 mb-1">Accuracy</div>
            <div class="flex justify-center">
              <div class="flex space-x-1">
                <div v-for="i in 5" :key="i" 
                     :class="accuracy >= i * 20 ? 'text-yellow-400' : 'text-gray-600'"
                     class="text-xs">★</div>
              </div>
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
            <div class="text-4xl font-bold text-transparent bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text mb-2">
              {{ mistakes }}
            </div>
            <div class="text-sm text-gray-300 mb-1">Mistakes</div>
            <div class="text-xs" :class="mistakes === 0 ? 'text-green-400' : 'text-gray-400'">
              {{ mistakes === 0 ? 'Perfect!' : 'Keep going!' }}
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
            <div class="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-2">
              {{ timer }}
            </div>
            <div class="text-sm text-gray-300 mb-1">Seconds</div>
            <div class="w-full bg-gray-700 rounded-full h-1 mt-2">
              <div class="h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-1000"
                   :style="{ width: `${Math.min((timer / 60) * 100, 100)}%` }"></div>
            </div>
          </div>
        </div>

        <!-- Typing Area -->
        <div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-6 shadow-2xl">
          <!-- Text Display -->
          <div class="bg-gray-900/50 rounded-2xl p-8 mb-6 text-2xl leading-relaxed font-mono min-h-[200px] relative overflow-hidden">
            <!-- Typing cursor line -->
            <div v-if="gameStarted && !gameFinished" 
                 class="absolute w-0.5 h-8 bg-yellow-400 animate-pulse"
                 :style="{ left: `${cursorPosition}px`, top: `${cursorTop}px` }"></div>
            
            <span 
              v-for="(char, index) in textToType" 
              :key="index"
              ref="textChars"
              :class="{
                'bg-yellow-400/30 text-yellow-100 px-1 rounded-md shadow-lg scale-110': index === currentIndex,
                'text-green-400 bg-green-400/20 px-1 rounded': index < currentIndex && userInput[index] === char,
                'text-red-400 bg-red-400/20 underline decoration-2 px-1 rounded animate-shake': index < currentIndex && userInput[index] !== char,
                'text-gray-400': index > currentIndex
              }"
              class="transition-all duration-150 inline-block"
            >
              {{ char === ' ' ? '·' : char }}
            </span>

            <!-- Word completion celebration -->
            <transition name="word-complete">
              <div v-if="showWordComplete" 
                   class="absolute top-4 right-4 text-green-400 text-sm font-bold animate-bounce">
                +{{ wordBonus }} XP
              </div>
            </transition>
          </div>

          <!-- Input Area -->
          <div class="relative">
            <textarea 
              ref="textInput"
              v-model="userInput" 
              @input="onInput"
              @keydown="onKeyDown"
              @focus="inputFocused = true"
              @blur="inputFocused = false"
              placeholder="Click here and start typing..."
              :disabled="gameFinished"
              class="w-full p-6 bg-gray-900/70 text-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all duration-300 text-xl font-mono resize-none border-2"
              :class="{
                'border-yellow-400 shadow-lg shadow-yellow-400/25': inputFocused && !gameFinished,
                'border-gray-600': !inputFocused || gameFinished,
                'border-green-400 shadow-lg shadow-green-400/25': gameFinished
              }"
              rows="3"
            ></textarea>
            
            <!-- Typing indicator -->
            <div v-if="isTyping" class="absolute bottom-4 right-4 text-yellow-400 animate-pulse">
              <i class="fas fa-keyboard text-2xl"></i>
            </div>
          </div>
        </div>

        <!-- AI Commentary -->
        <div class="relative h-24 mb-8">
          <transition
            enter-active-class="transition-all duration-500 ease-out"
            leave-active-class="transition-all duration-300 ease-in"
            enter-from-class="transform translate-y-8 scale-95 opacity-0"
            leave-to-class="transform translate-y-8 scale-95 opacity-0"
          >
            <div v-if="currentComment" class="absolute bottom-0 left-0 right-0">
              <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-2xl border border-white/20 relative">
                <div class="absolute -top-3 left-8 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 transform rotate-45"></div>
                <div class="flex items-center">
                  <div class="text-3xl mr-4 animate-bounce">{{ commentEmoji }}</div>
                  <div>
                    <p class="font-medium text-lg">{{ currentComment }}</p>
                    <p class="text-sm text-purple-200 mt-1">{{ commentSubtext }}</p>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Game Controls -->
        <div class="flex justify-center space-x-6 mb-8">
          <button 
            @click="startGame" 
            :disabled="gameStarted && !gameFinished"
            class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-2xl hover:from-yellow-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <i class="fas fa-play mr-2" v-if="!gameStarted || gameFinished"></i>
            <i class="fas fa-redo mr-2" v-else></i>
            {{ gameStarted && !gameFinished ? 'Restart' : 'Start Game' }}
          </button>
          
          <button 
            @click="resetGame" 
            :disabled="!gameStarted"
            class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <i class="fas fa-refresh mr-2"></i>
            Reset
          </button>

          <button 
            @click="getNewText" 
            class="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <i class="fas fa-dice mr-2"></i>
            New Text
          </button>
        </div>

        <!-- Achievement Notifications -->
        <transition-group name="achievement" tag="div" class="fixed top-4 right-4 space-y-2 z-50">
          <div v-for="achievement in recentAchievements" :key="achievement.id"
               class="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg shadow-lg border border-white/20">
            <div class="flex items-center">
              <i class="fas fa-trophy text-yellow-300 mr-3"></i>
              <div>
                <p class="font-bold">{{ achievement.title }}</p>
                <p class="text-sm opacity-90">{{ achievement.description }}</p>
              </div>
            </div>
          </div>
        </transition-group>

        <!-- Game Results -->
        <transition name="slide-up">
          <div v-if="gameFinished" class="bg-gradient-to-br from-gray-900/90 to-purple-900/90 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20 shadow-2xl">
            <div class="text-6xl mb-4">🎉</div>
            <h2 class="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
              Incredible Performance!
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div class="bg-white/10 rounded-2xl p-6 border border-white/20">
                <div class="text-5xl font-bold text-green-400">{{ wpm }}</div>
                <div class="text-gray-300 mt-2">Words Per Minute</div>
                <div class="text-sm text-gray-400 mt-1">{{ getWPMRating() }}</div>
              </div>
              
              <div class="bg-white/10 rounded-2xl p-6 border border-white/20">
                <div class="text-5xl font-bold text-yellow-400">{{ accuracy }}%</div>
                <div class="text-gray-300 mt-2">Accuracy</div>
                <div class="text-sm text-gray-400 mt-1">{{ getAccuracyRating() }}</div>
              </div>
              
              <div class="bg-white/10 rounded-2xl p-6 border border-white/20">
                <div class="text-5xl font-bold text-purple-400">{{ totalXP }}</div>
                <div class="text-gray-300 mt-2">XP Earned</div>
                <div class="text-sm text-gray-400 mt-1">Excellent job!</div>
              </div>
            </div>

            <div class="mb-6">
              <p class="text-xl mb-4">Share your incredible score!</p>
              <div class="flex justify-center space-x-4">
                <button class="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl flex items-center transition-all duration-300 transform hover:scale-105">
                  <i class="fab fa-whatsapp mr-2"></i>
                  WhatsApp
                </button>
                <button class="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-xl flex items-center transition-all duration-300 transform hover:scale-105">
                  <i class="fab fa-tiktok mr-2"></i>
                  TikTok
                </button>
                <button class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center transition-all duration-300 transform hover:scale-105">
                  <i class="fab fa-twitter mr-2"></i>
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!-- Premium Upgrade Section -->
        <div class="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-3xl p-8 mt-8 shadow-2xl border border-white/20 relative overflow-hidden">
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-center mb-6">
              <div class="text-4xl mr-4">👑</div>
              <h3 class="text-3xl font-bold">Unlock Premium Power</h3>
              <div class="text-4xl ml-4">⚡</div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <h4 class="text-xl font-bold mb-4">🚀 Performance Features</h4>
                <ul class="space-y-2">
                  <li class="flex items-center"><i class="fas fa-check text-green-300 mr-2"></i> Unlimited typing sessions</li>
                  <li class="flex items-center"><i class="fas fa-check text-green-300 mr-2"></i> Advanced analytics dashboard</li>
                  <li class="flex items-center"><i class="fas fa-check text-green-300 mr-2"></i> Custom typing challenges</li>
                  <li class="flex items-center"><i class="fas fa-check text-green-300 mr-2"></i> Export progress reports</li>
                </ul>
              </div>
              
              <div class="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <h4 class="text-xl font-bold mb-4">🎮 Exclusive Content</h4>
                <ul class="space-y-2">
                  <li class="flex items-center"><i class="fas fa-check text-green-300 mr-2"></i> Global tournaments</li>
                  <li class="flex items-center"><i class="fas fa-check text-green-300 mr-2"></i> Exclusive themes & sounds</li>
                  <li class="flex items-center"><i class="fas fa-check text-green-300 mr-2"></i> Priority customer support</li>
                  <li class="flex items-center"><i class="fas fa-check text-green-300 mr-2"></i> Achievement badges</li>
                </ul>
              </div>
            </div>

            <div class="text-center">
              <div class="text-6xl font-bold mb-2">Only 50 KSh</div>
              <div class="text-xl mb-6 opacity-90">Join thousands of typing masters!</div>
              <button class="px-12 py-4 bg-white text-orange-600 font-bold text-xl rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <i class="fas fa-crown mr-2"></i>
                Upgrade Now with Paystack
              </button>
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
  name: 'ModernFastFingersGame',
  data() {
    return {
      textSamples: [
        "The quick brown fox jumps over the lazy dog. This sentence contains all letters of the English alphabet and is perfect for testing typing skills.",
        "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. Every keystroke brings you closer to mastery.",
        "In the digital age, typing speed and accuracy have become essential skills for productivity and professional success in virtually every field.",
        "The art of programming requires patience, logic, and precision. Every line of code is a step toward creating something meaningful and impactful."
      ],
      textToType: "",
      userInput: "",
      gameStarted: false,
      gameFinished: false,
      startTime: 0,
      currentTime: 0,
      timerInterval: null,
      currentIndex: 0,
      mistakes: 0,
      currentComment: "",
      commentEmoji: "",
      commentSubtext: "",
      
      // New engagement features
      experience: 0,
      currentLevel: 1,
      nextLevelXP: 100,
      totalXP: 0,
      wpmTrend: 0,
      previousWPM: 0,
      cursorPosition: 0,
      cursorTop: 32,
      inputFocused: false,
      isTyping: false,
      typingTimeout: null,
      showWordComplete: false,
      wordBonus: 0,
      recentAchievements: [],
      achievementId: 0,

      comments: {
        mistake: [
          { text: "Oops! Take your time", emoji: "😅", subtext: "Accuracy over speed!" },
          { text: "Almost there, keep going!", emoji: "💪", subtext: "You've got this!" },
          { text: "Steady fingers win the race", emoji: "🐢", subtext: "Focus and breathe" }
        ],
        fast: [
          { text: "You're on fire! 🔥", emoji: "⚡", subtext: "Lightning fast typing!" },
          { text: "Speed demon activated!", emoji: "🚀", subtext: "Incredible pace!" },
          { text: "Flying fingers detected!", emoji: "✨", subtext: "Amazing speed!" }
        ],
        slow: [
          { text: "Take your time, find your rhythm", emoji: "🎵", subtext: "Steady wins the race" },
          { text: "Building up speed...", emoji: "⏳", subtext: "Practice makes perfect" },
          { text: "Focus on accuracy first", emoji: "🎯", subtext: "Speed will follow" }
        ],
        pause: [
          { text: "Still there? Don't give up!", emoji: "😴", subtext: "You can do this!" },
          { text: "Ready when you are!", emoji: "⏰", subtext: "Take your time" },
          { text: "Waiting for those magic fingers", emoji: "🪄", subtext: "Continue when ready" }
        ],
        excellent: [
          { text: "Absolutely incredible!", emoji: "🏆", subtext: "You're a typing master!" },
          { text: "Perfect execution!", emoji: "🎯", subtext: "Flawless performance!" },
          { text: "You're unstoppable!", emoji: "🔥", subtext: "Keep this up!" }
        ]
      },

      lastActionTime: 0,
      commentTimeout: null,
      wordCount: 0,
      lastWordCount: 0
    }
  },
  computed: {
    wpm() {
      if (!this.gameStarted || this.currentTime === 0 || this.currentTime === this.startTime) return 0;
      const minutes = (this.currentTime - this.startTime) / 60000;
      const words = this.userInput.trim().split(/\s+/).filter(word => word.length > 0).length;
      return Math.round(words / minutes);
    },
    accuracy() {
      if (this.currentIndex === 0) return 100;
      const correctChars = this.currentIndex - this.mistakes;
      return Math.round((correctChars / this.currentIndex) * 100);
    },
    timer() {
      if (!this.gameStarted) return 0;
      return Math.floor((this.currentTime - this.startTime) / 1000);
    }
  },
  methods: {
    initializeGame() {
      this.getNewText();
    },

    getNewText() {
      const randomIndex = Math.floor(Math.random() * this.textSamples.length);
      this.textToType = this.textSamples[randomIndex];
      if (this.gameStarted) {
        this.resetGame();
      }
    },

    startGame() {
      this.resetGame();
      this.gameStarted = true;
      this.startTime = Date.now();
      this.currentTime = this.startTime;
      this.lastActionTime = this.startTime;
      this.previousWPM = 0;
      
      this.timerInterval = setInterval(() => {
        this.currentTime = Date.now();
        
        // Check for pause
        if (this.currentTime - this.lastActionTime > 4000 && this.userInput.length > 0) {
          this.showComment('pause');
        }

        // Update cursor position
        this.updateCursor();
      }, 100);

      // Focus input
      this.$nextTick(() => {
        if (this.$refs.textInput) {
          this.$refs.textInput.focus();
        }
      });
    },

    resetGame() {
      this.userInput = "";
      this.gameStarted = false;
      this.gameFinished = false;
      this.currentIndex = 0;
      this.mistakes = 0;
      this.currentComment = "";
      this.commentEmoji = "";
      this.commentSubtext = "";
      this.lastActionTime = 0;
      this.wordCount = 0;
      this.lastWordCount = 0;
      this.showWordComplete = false;
      clearInterval(this.timerInterval);
      clearTimeout(this.commentTimeout);
      clearTimeout(this.typingTimeout);
    },

    onKeyDown(event) {
      // Handle special keys
      if (event.key === 'Tab') {
        event.preventDefault();
      }
    },

    onInput() {
      if (!this.gameStarted && this.userInput.length > 0) {
        this.startGame();
        return;
      }
      
      this.lastActionTime = Date.now();
      this.currentIndex = this.userInput.length;
      
      // Show typing indicator
      this.isTyping = true;
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(() => {
        this.isTyping = false;
      }, 1000);
      
      // Check for mistakes
      if (this.userInput.length > 0) {
        const lastChar = this.userInput[this.userInput.length - 1];
        const correctChar = this.textToType[this.userInput.length - 1];
        
        if (lastChar !== correctChar) {
          this.mistakes++;
          this.showComment('mistake');
        } else {
          // Check for word completion
          if (lastChar === ' ' || this.userInput.length === this.textToType.length) {
            this.wordCount = this.userInput.trim().split(/\s+/).filter(word => word.length > 0).length;
            if (this.wordCount > this.lastWordCount) {
              this.showWordCompleteBonus();
              this.lastWordCount = this.wordCount;
            }
          }
        }
      }
      
      // Dynamic commenting based on performance
      this.checkPerformanceAndComment();
      
      // Check if finished
      if (this.userInput === this.textToType) {
        this.finishGame();
      }

      // Update WPM trend
      const currentWPM = this.wpm;
      this.wpmTrend = currentWPM - this.previousWPM;
      this.previousWPM = currentWPM;
    },

    checkPerformanceAndComment() {
      if (this.wpm > 80 && this.accuracy > 95) {
        this.showComment('excellent');
      } else if (this.wpm > 60) {
        this.showComment('fast');
      } else if (this.wpm < 25 && this.wpm > 5) {
        this.showComment('slow');
      }
    },

    showWordCompleteBonus() {
      this.wordBonus = Math.floor(Math.random() * 10) + 5;
      this.experience += this.wordBonus;
      this.showWordComplete = true;
      
      setTimeout(() => {
        this.showWordComplete = false;
      }, 1500);

      this.checkLevelUp();
    },

    showComment(type) {
      clearTimeout(this.commentTimeout);
      
      const comments = this.comments[type];
      const comment = comments[Math.floor(Math.random() * comments.length)];
      
      this.currentComment = comment.text;
      this.commentEmoji = comment.emoji;
      this.commentSubtext = comment.subtext;
      
      this.commentTimeout = setTimeout(() => {
        this.currentComment = "";
        this.commentEmoji = "";
        this.commentSubtext = "";
      }, 3500);
    },

    updateCursor() {
      // This is a simplified cursor position calculation
      // In a real implementation, you'd need to measure text dimensions
      this.cursorPosition = Math.min(this.currentIndex * 15, 800);
    },

    checkLevelUp() {
      while (this.experience >= this.nextLevelXP) {
        this.experience -= this.nextLevelXP;
        this.currentLevel++;
        this.nextLevelXP = Math.floor(this.nextLevelXP * 1.5);
        
        this.showAchievement({
          title: `Level ${this.currentLevel} Reached!`,
          description: `You're becoming a typing master!`
        });
      }
    },

    showAchievement(achievement) {
      achievement.id = this.achievementId++;
      this.recentAchievements.push(achievement);
      
      setTimeout(() => {
        const index = this.recentAchievements.findIndex(a => a.id === achievement.id);
        if (index > -1) {
          this.recentAchievements.splice(index, 1);
        }
      }, 4000);
    },

    calculateXP() {
      let baseXP = Math.floor(this.wpm * 2);
      let accuracyBonus = Math.floor(this.accuracy * 0.5);
      let speedBonus = this.wpm > 50 ? Math.floor((this.wpm - 50) * 1.5) : 0;
      let perfectBonus = this.mistakes === 0 ? 50 : 0;
      
      return baseXP + accuracyBonus + speedBonus + perfectBonus;
    },

    finishGame() {
      this.gameFinished = true;
      this.gameStarted = false;
      this.totalXP = this.calculateXP();
      this.experience += this.totalXP;
      
      clearInterval(this.timerInterval);
      clearTimeout(this.commentTimeout);
      clearTimeout(this.typingTimeout);
      
      // Check for achievements
      this.checkGameAchievements();
      this.checkLevelUp();
    },

    checkGameAchievements() {
      if (this.wpm > 100) {
        this.showAchievement({
          title: "Speed Demon!",
          description: "Typed over 100 WPM!"
        });
      }
      
      if (this.accuracy === 100) {
        this.showAchievement({
          title: "Perfect Accuracy!",
          description: "No mistakes made!"
        });
      }
      
      if (this.wpm > 80 && this.accuracy > 95) {
        this.showAchievement({
          title: "Typing Master!",
          description: "High speed with excellent accuracy!"
        });
      }
    },

    getWPMRating() {
      if (this.wpm > 100) return "🚀 Lightning Fast";
      if (this.wpm > 80) return "⚡ Excellent";
      if (this.wpm > 60) return "🔥 Great";
      if (this.wpm > 40) return "👍 Good";
      if (this.wpm > 20) return "📈 Getting Better";
      return "🌱 Keep Practicing";
    },

    getAccuracyRating() {
      if (this.accuracy === 100) return "🎯 Perfect";
      if (this.accuracy > 95) return "✨ Excellent";
      if (this.accuracy > 90) return "👌 Very Good";
      if (this.accuracy > 80) return "👍 Good";
      return "📊 Room for Improvement";
    }
  },

  mounted() {
    this.initializeGame();
  },

  beforeUnmount() {
    clearInterval(this.timerInterval);
    clearTimeout(this.commentTimeout);
    clearTimeout(this.typingTimeout);
  }
}
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
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

.animate-shake {
  animation: shake 0.3s ease-in-out;
}

/* Transitions */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.word-complete-enter-active {
  transition: all 0.3s ease;
}

.word-complete-leave-active {
  transition: all 1s ease;
}

.word-complete-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.8);
}

.word-complete-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.2);
}

.achievement-enter-active {
  transition: all 0.4s ease-out;
}

.achievement-leave-active {
  transition: all 0.3s ease-in;
}

.achievement-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}

.achievement-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}

.achievement-move {
  transition: transform 0.3s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .text-6xl {
    font-size: 3rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .text-2xl {
    font-size: 1.25rem;
  }
}

/* Custom scrollbar */
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

/* Focus states for accessibility */
button:focus-visible,
textarea:focus-visible {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}

/* Loading animation for text changes */
.text-loading {
  animation: pulse 1s ease-in-out infinite;
}
</style>