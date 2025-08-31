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
      <header class="flex justify-between items-center p-4 md:p-6 backdrop-blur-sm">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl animate-pulse">
            ⚡
          </div>
          <h1 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Fast Fingers
          </h1>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:block">
          <ul class="flex space-x-4 lg:space-x-8">
            <router-link to="/">
              <li><a href="#" class="hover:text-yellow-400 transition-all duration-300 hover:scale-105">Play Without Signing Up</a></li>
            </router-link>
            <router-link to="TermsAndCondition">
              <li><a href="#" class="hover:text-yellow-400 transition-all duration-300 hover:scale-105">Terms</a></li>
            </router-link>
            <li><a href="#" @click="showLogin = true" class="hover:text-yellow-400 transition-all duration-300 hover:scale-105 cursor-pointer">Login</a></li>
          </ul>
        </nav>
        
        <!-- Mobile Hamburger Menu -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              v-if="!mobileMenuOpen" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>

      <!-- Mobile Menu Overlay -->
      <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="mobileMenuOpen" 
          class="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          @click="mobileMenuOpen = false"
        ></div>
      </transition>

      <!-- Mobile Menu Slide-in -->
      <transition
        enter-active-class="transition-transform duration-300"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-300"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div 
          v-if="mobileMenuOpen" 
          class="fixed top-0 right-0 h-full w-64 bg-slate-900/95 backdrop-blur-md z-50 p-6 border-l border-white/20 md:hidden"
        >
          <div class="flex justify-between items-center mb-10">
            <h2 class="text-xl font-bold text-yellow-400">Menu</h2>
            <button @click="mobileMenuOpen = false" class="p-1 rounded-full hover:bg-white/10">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <ul class="space-y-6">
            <li>
              <router-link to="/" class="block py-2 text-lg hover:text-yellow-400 transition-colors" @click="mobileMenuOpen = false">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="TermsAndCondition" class="block py-2 text-lg hover:text-yellow-400 transition-colors" @click="mobileMenuOpen = false">
                Terms & Conditions
              </router-link>
            </li>
            <li>
              <a href="#" @click="showLogin = true; mobileMenuOpen = false" class="block py-2 text-lg hover:text-yellow-400 transition-colors cursor-pointer">
                Login
              </a>
            </li>
            <li class="pt-6 border-t border-white/20">
              <button 
                @click="scrollToSignUp"
                class="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300"
              >
                Sign Up Now
              </button>
            </li>
          </ul>
          
          <div class="absolute bottom-6 left-6 right-6 text-center text-sm text-gray-400">
            <p>© 2025 Fast Fingers</p>
          </div>
        </div>
      </transition>

      <div class="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          <!-- Left Side - Marketing Content -->
          <div class="space-y-6 md:space-y-8 animate-slide-right">
            <!-- Hero Section -->
            <div>
              <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight">
                Master Your Typing Speed
              </h2>
              <p class="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                Join thousands of users who've transformed their typing skills with our gamified learning platform. 
                Track progress, compete globally, and unlock your potential!
              </p>
            </div>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div class="text-3xl md:text-4xl mb-3 md:mb-4">🚀</div>
                <h3 class="text-lg md:text-xl font-bold mb-2">Boost Speed</h3>
                <p class="text-gray-300 text-sm">Increase your WPM with personalized challenges and real-time feedback</p>
              </div>
              
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div class="text-3xl md:text-4xl mb-3 md:mb-4">🎯</div>
                <h3 class="text-lg md:text-xl font-bold mb-2">Perfect Accuracy</h3>
                <p class="text-gray-300 text-sm">Train muscle memory with adaptive difficulty and smart corrections</p>
              </div>
              
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div class="text-3xl md:text-4xl mb-3 md:mb-4">🏆</div>
                <h3 class="text-lg md:text-xl font-bold mb-2">Global Rankings</h3>
                <p class="text-gray-300 text-sm">Compete with typists worldwide and climb the leaderboard</p>
              </div>
              
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div class="text-3xl md:text-4xl mb-3 md:mb-4">📊</div>
                <h3 class="text-lg md:text-xl font-bold mb-2">Progress Analytics</h3>
                <p class="text-gray-300 text-sm">Detailed insights into your improvement journey and weak areas</p>
              </div>
            </div>

            <!-- Social Proof -->
            <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-green-400/30">
              <div class="flex items-center mb-4">
                <div class="flex -space-x-2 md:-space-x-3">
                  <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center text-xs md:text-sm font-bold">A</div>
                  <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full border-2 border-white flex items-center justify-center text-xs md:text-sm font-bold">M</div>
                  <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full border-2 border-white flex items-center justify-center text-xs md:text-sm font-bold">S</div>
                  <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-xs md:text-sm font-bold text-white">+</div>
                </div>
                <div class="ml-3 md:ml-4">
                  <p class="font-bold text-green-300 text-sm md:text-base">25,000+ Active Users</p>
                  <p class="text-xs md:text-sm text-gray-300">Joined this month</p>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-3 md:gap-4 text-center">
                <div>
                  <div class="text-xl md:text-2xl font-bold text-green-400">150M+</div>
                  <div class="text-xs text-gray-300">Words Typed</div>
                </div>
                <div>
                  <div class="text-xl md:text-2xl font-bold text-blue-400">4.9★</div>
                  <div class="text-xs text-gray-300">User Rating</div>
                </div>
                <div>
                  <div class="text-xl md:text-2xl font-bold text-purple-400">92%</div>
                  <div class="text-xs text-gray-300">See Improvement</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Sign Up Form -->
          <div id="signup-form" class="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl animate-slide-left">
            <div class="text-center mb-6 md:mb-8">
              <div class="text-5xl md:text-6xl mb-3 md:mb-4">🎮</div>
              <h3 class="text-2xl md:text-3xl font-bold mb-2">Start Your Journey</h3>
              <p class="text-gray-300 text-sm md:text-base">Create your account and begin mastering your typing skills</p>
            </div>

            <form @submit.prevent="handleSignUp" class="space-y-4 md:space-y-6">
              <!-- Full Name -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-300">Full Name</label>
                <div class="relative">
                  <input 
                    v-model="formData.fullName"
                    type="text" 
                    required
                    class="w-full px-4 py-3 bg-gray-900/70 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 pl-12"
                    placeholder="Enter your full name"
                  />
                  <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-300">Email Address</label>
                <div class="relative">
                  <input 
                    v-model="formData.email"
                    type="email" 
                    required
                    class="w-full px-4 py-3 bg-gray-900/70 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 pl-12"
                    placeholder="your@email.com"
                  />
                  <i class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              <!-- Phone Number -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-300">Phone Number</label>
                <div class="relative">
                  <input 
                    v-model="formData.phone"
                    type="tel" 
                    required
                    class="w-full px-4 py-3 bg-gray-900/70 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 pl-12"
                    placeholder="+254 700 000 000"
                  />
                  <i class="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              <!-- Password -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-300">Password</label>
                <div class="relative">
                  <input 
                    v-model="formData.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="w-full px-4 py-3 bg-gray-900/70 text-white rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 pl-12 pr-12"
                    placeholder="Create a strong password"
                  />
                  <i class="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <button 
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <div class="mt-2">
                  <div class="flex space-x-1 mb-1">
                    <div v-for="i in 4" :key="i" 
                         :class="passwordStrength >= i ? 'bg-green-400' : 'bg-gray-600'"
                         class="h-1 flex-1 rounded transition-colors duration-300"></div>
                  </div>
                  <p class="text-xs" :class="passwordStrengthColor">{{ passwordStrengthText }}</p>
                </div>
              </div>

              <!-- Plan Selection -->
              <div class="space-y-3 md:space-y-4">
                <label class="block text-sm font-medium text-gray-300">Choose Your Plan</label>
                <div class="grid grid-cols-1 gap-2 md:gap-3">
                  <div 
                    @click="formData.plan = 'free'"
                    :class="formData.plan === 'free' ? 'border-green-400 bg-green-400/10' : 'border-gray-600'"
                    class="border-2 rounded-xl p-3 md:p-4 cursor-pointer transition-all duration-300 hover:border-green-400/50"
                  >
                    <div class="flex justify-between items-center">
                      <div>
                        <h4 class="font-bold text-green-400 text-sm md:text-base">Free Starter</h4>
                        <p class="text-xs md:text-sm text-gray-300">5 games per day</p>
                      </div>
                      <div class="text-xl md:text-2xl font-bold">FREE</div>
                    </div>
                  </div>
                  
                  <div 
                    @click="formData.plan = 'premium'"
                    :class="formData.plan === 'premium' ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-600'"
                    class="border-2 rounded-xl p-3 md:p-4 cursor-pointer transition-all duration-300 hover:border-yellow-400/50 relative overflow-hidden"
                  >
                    <div class="absolute top-1 right-1 md:top-2 md:right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                      POPULAR
                    </div>
                    <div class="flex justify-between items-center">
                      <div>
                        <h4 class="font-bold text-yellow-400 text-sm md:text-base">Premium Pro</h4>
                        <p class="text-xs md:text-sm text-gray-300">Unlimited games + extras</p>
                      </div>
                      <div>
                        <div class="text-xl md:text-2xl font-bold text-yellow-400">50 KSh</div>
                        <div class="text-xs text-gray-400">/month</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Terms & Conditions -->
              <div class="flex items-start space-x-3">
                <input 
                  v-model="formData.agreeToTerms"
                  type="checkbox" 
                  required
                  class="mt-1 w-4 h-4 md:w-5 md:h-5 text-yellow-400 bg-gray-900 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                />
                <label class="text-xs md:text-sm text-gray-300 leading-5">
                  I agree to the <a href="#" class="text-yellow-400 hover:underline">Terms of Service</a> and 
                  <a href="#" class="text-yellow-400 hover:underline">Privacy Policy</a>
                </label>
              </div>

              <!-- Newsletter Subscription -->
              <div class="flex items-center space-x-3">
                <input 
                  v-model="formData.newsletter"
                  type="checkbox" 
                  class="w-4 h-4 md:w-5 md:h-5 text-yellow-400 bg-gray-900 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                />
                <label class="text-xs md:text-sm text-gray-300">Subscribe to typing tips and updates</label>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit"
                :disabled="isLoading"
                class="w-full py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold text-base md:text-lg rounded-xl hover:from-yellow-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span v-if="!isLoading" class="flex items-center justify-center">
                  <i class="fas fa-rocket mr-2"></i>
                  Create My Account
                </span>
                <span v-else class="flex items-center justify-center">
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Creating Account...
                </span>
              </button>
            </form>

            <!-- Social Login -->
            <div class="mt-6 md:mt-8">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-600"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div class="mt-4 md:mt-6 grid grid-cols-2 gap-3">
                <button class="w-full inline-flex justify-center py-2 md:py-3 px-3 md:px-4 rounded-xl border border-gray-600 bg-gray-900/50 text-xs md:text-sm font-medium text-white hover:bg-gray-800 transition-colors">
                  <i class="fab fa-google mr-1 md:mr-2 text-red-400"></i>
                  Google
                </button>
                <button class="w-full inline-flex justify-center py-2 md:py-3 px-3 md:px-4 rounded-xl border border-gray-600 bg-gray-900/50 text-xs md:text-sm font-medium text-white hover:bg-gray-800 transition-colors">
                  <i class="fab fa-facebook mr-1 md:mr-2 text-blue-400"></i>
                  Facebook
                </button>
              </div>
            </div>

            <!-- Login Link -->
            <div class="mt-6 md:mt-8 text-center">
              <p class="text-gray-300 text-sm md:text-base">
                Already have an account? 
                <a href="#" @click="showLogin = true" class="text-yellow-400 hover:underline font-medium cursor-pointer">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Success Modal -->
        <transition name="modal">
          <div v-if="showSuccess" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div class="bg-gray-900 rounded-3xl p-6 md:p-8 max-w-md w-full border border-white/20 text-center">
              <div class="text-5xl md:text-6xl mb-4">🎉</div>
              <h3 class="text-xl md:text-2xl font-bold text-green-400 mb-4">Welcome to Fast Fingers!</h3>
              <p class="text-gray-300 mb-6 text-sm md:text-base">
                Your account has been created successfully. You can now start your typing journey!
              </p>
              <div class="space-y-3">
                <button 
                  @click="goToGame"
                  class="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300"
                >
                  Start Playing Now
                </button>
                <button 
                  @click="showSuccess = false"
                  class="w-full py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!-- Login Modal -->
        <transition name="modal">
          <div v-if="showLogin" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div class="bg-gray-900 rounded-3xl p-6 md:p-8 max-w-md w-full border border-white/20">
              <div class="text-center mb-6">
                <h3 class="text-xl md:text-2xl font-bold text-yellow-400 mb-2">Welcome Back!</h3>
                <p class="text-gray-300 text-sm md:text-base">Sign in to continue your typing journey</p>
              </div>
              
              <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                  <input 
                    v-model="loginData.email"
                    type="email" 
                    required
                    class="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <input 
                    v-model="loginData.password"
                    type="password" 
                    required
                    class="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300"
                    placeholder="Password"
                  />
                </div>
                <button 
                  type="submit"
                  class="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300"
                >
                  Sign In
                </button>
              </form>
              
              <div class="flex justify-between mt-4 text-sm">
                <a href="#" class="text-yellow-400 hover:underline">Forgot password?</a>
                <button @click="showLogin = false" class="text-gray-400 hover:text-white">Close</button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Footer -->
      <footer class="mt-12 md:mt-16 text-center text-gray-400 py-6 md:py-8 px-4">
        <div class="flex justify-center items-center space-x-3 md:space-x-4 mb-4">
          <i class="fas fa-heart text-red-400 animate-pulse"></i>
          <span class="text-sm md:text-base">Made with passion in Kenya</span>
          <i class="fas fa-flag text-green-400"></i>
        </div>
        <p class="text-sm md:text-base">© 2025 Fast Fingers | Empowering typists worldwide</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FastFingersSignUp',
  data() {
    return {
      formData: {
        fullName: '',
        email: '',
        phone: '',
        password: '',
        plan: 'free',
        agreeToTerms: false,
        newsletter: true
      },
      loginData: {
        email: '',
        password: ''
      },
      showPassword: false,
      isLoading: false,
      showSuccess: false,
      showLogin: false,
      mobileMenuOpen: false
    }
  },
  computed: {
    passwordStrength() {
      const password = this.formData.password;
      let strength = 0;
      
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++;
      
      return strength;
    },
    passwordStrengthText() {
      const strength = this.passwordStrength;
      const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
      return texts[strength] || 'Very Weak';
    },
    passwordStrengthColor() {
      const strength = this.passwordStrength;
      const colors = ['text-red-400', 'text-orange-400', 'text-yellow-400', 'text-green-400', 'text-green-500'];
      return colors[strength] || 'text-red-400';
    }
  },
  methods: {
    async handleSignUp() {
      this.isLoading = true;
      
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Store user data (in real app, send to backend)
        const userData = {
          ...this.formData,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        
        // Mock success
        console.log('User registered:', userData);
        this.showSuccess = true;
        
      } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      } finally {
        this.isLoading = false;
      }
    },
    
    async handleLogin() {
      this.isLoading = true;
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Login attempt:', this.loginData);
        this.showLogin = false;
        this.goToGame();
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      } finally {
        this.isLoading = false;
      }
    },
    
    goToGame() {
      // In a real app, navigate to the game page
      alert('Redirecting to Fast Fingers game...');
      this.showSuccess = false;
    },
    
    scrollToSignUp() {
      this.mobileMenuOpen = false;
      const formElement = document.getElementById('signup-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  watch: {
    mobileMenuOpen(newVal) {
      // Prevent body scrolling when mobile menu is open
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
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

@keyframes slide-right {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-left {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

.animate-slide-right {
  animation: slide-right 0.8s ease-out;
}

.animate-slide-left {
  animation: slide-left 0.8s ease-out;
}

/* Modal transitions */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Form focus states */
input:focus {
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}

/* Checkbox styling */
input[type="checkbox"]:checked {
  background-color: #fbbf24;
  border-color: #fbbf24;
}

/* Responsive design */
@media (max-width: 768px) {
  .text-6xl {
    font-size: 3rem;
  }
  
  .text-3xl {
    font-size: 1.875rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .lg\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

/* Loading animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.fa-spin {
  animation: spin 1s linear infinite;
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
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

/* Mobile responsiveness */
@media (max-width: 640px) {
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

/* Prevent horizontal scrolling */
html, body {
  max-width: 100%;
  overflow-x: hidden;
}
</style>