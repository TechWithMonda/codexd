<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute top-40 left-40 w-60 h-60 sm:w-80 sm:h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative z-10">
      <!-- Header -->
      <header class="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 backdrop-blur-sm">
        <div class="flex items-center space-x-3 mb-4 sm:mb-0">
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-xl sm:text-2xl animate-pulse">
            ⚡
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Fast Fingers
          </h1>
        </div>
        <nav class="w-full sm:w-auto">
          <ul class="flex justify-center sm:justify-end space-x-4 sm:space-x-8">
            <router-link to="/">
                <li><a href="#" class="text-sm sm:text-base hover:text-yellow-400 transition-all duration-300 hover:scale-105">Play Game</a></li>
            </router-link>
            <router-link to="/leaderboard">
                <li><a href="#" class="text-sm sm:text-base hover:text-yellow-400 transition-all duration-300 hover:scale-105">Leaderboard</a></li>
            </router-link>
          </ul>
        </nav>
      </header>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <!-- Hero Section -->
        <div class="text-center mb-8 sm:mb-12 animate-slide-down">
          <div class="text-4xl sm:text-6xl md:text-8xl mb-4">📄</div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Legal Information
          </h2>
          <p class="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Your privacy matters to us. Learn about our terms of service and how we protect your data.
          </p>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex flex-col sm:flex-row justify-center mb-8 sm:mb-12">
          <div class="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 border border-white/20 inline-flex flex-col sm:flex-row">
            <button
              @click="activeTab = 'terms'"
              :class="activeTab === 'terms' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'"
              class="px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base mb-2 sm:mb-0 sm:mr-2"
            >
              <i class="fas fa-file-contract mr-2"></i>
              Terms & Conditions
            </button>
            <button
              @click="activeTab = 'privacy'"
              :class="activeTab === 'privacy' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'"
              class="px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base"
            >
              <i class="fas fa-shield-alt mr-2"></i>
              Privacy Policy
            </button>
          </div>
        </div>

        <!-- Terms & Conditions Content -->
        <div v-if="activeTab === 'terms'" class="animate-fade-in">
          <div class="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/20 overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 sm:p-6 border-b border-white/20">
              <h3 class="text-2xl sm:text-3xl font-bold flex items-center">
                <i class="fas fa-file-contract text-blue-400 mr-3"></i>
                Terms & Conditions
              </h3>
              <p class="text-sm sm:text-base text-gray-300 mt-2">Last updated: January 2025</p>
            </div>

            <!-- Content -->
            <div class="p-4 sm:p-8 max-h-96 sm:max-h-[600px] overflow-y-auto space-y-6">
              
              <!-- Introduction -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-blue-400 flex items-center">
                  <span class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">1</span>
                  Introduction
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    Welcome to Fast Fingers! These Terms and Conditions ("Terms") govern your use of our typing game platform and services. By accessing or using Fast Fingers, you agree to be bound by these Terms.
                  </p>
                  <p class="text-gray-300">
                    Fast Fingers is a competitive typing platform designed to help users improve their typing speed and accuracy while competing with players worldwide.
                  </p>
                </div>
              </div>

              <!-- Acceptance of Terms -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-blue-400 flex items-center">
                  <span class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">2</span>
                  Acceptance of Terms
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    By creating an account, playing games, or using any part of our service, you acknowledge that you have read, understood, and agree to these Terms.
                  </p>
                  <p class="text-gray-300">
                    If you do not agree with any part of these Terms, you must not use our services.
                  </p>
                </div>
              </div>

              <!-- User Accounts -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-blue-400 flex items-center">
                  <span class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">3</span>
                  User Accounts
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    <strong class="text-white">Account Creation:</strong> You must provide accurate and complete information when creating an account.
                  </p>
                  <p class="text-gray-300">
                    <strong class="text-white">Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.
                  </p>
                  <p class="text-gray-300">
                    <strong class="text-white">Age Requirements:</strong> Users must be at least 13 years old to create an account. Users under 18 must have parental consent.
                  </p>
                </div>
              </div>

              <!-- Acceptable Use -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-blue-400 flex items-center">
                  <span class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">4</span>
                  Acceptable Use
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">You agree not to:</p>
                  <ul class="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Use cheats, bots, or automated typing tools</li>
                    <li>Harass, intimidate, or abuse other users</li>
                    <li>Share offensive, inappropriate, or harmful content</li>
                    <li>Attempt to hack or disrupt our services</li>
                    <li>Create multiple accounts to manipulate rankings</li>
                  </ul>
                </div>
              </div>

              <!-- Premium Services -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-blue-400 flex items-center">
                  <span class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">5</span>
                  Premium Services
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    <strong class="text-white">Subscription:</strong> Premium features require a paid subscription with automatic renewal.
                  </p>
                  <p class="text-gray-300">
                    <strong class="text-white">Refunds:</strong> Refunds are available within 14 days of purchase, subject to our refund policy.
                  </p>
                  <p class="text-gray-300">
                    <strong class="text-white">Cancellation:</strong> You can cancel your subscription at any time through your account settings.
                  </p>
                </div>
              </div>

              <!-- Intellectual Property -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-blue-400 flex items-center">
                  <span class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">6</span>
                  Intellectual Property
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    All content, features, and functionality of Fast Fingers are owned by us and protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p class="text-gray-300">
                    You retain ownership of content you create, but grant us a license to use it within our platform.
                  </p>
                </div>
              </div>

              <!-- Limitation of Liability -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-blue-400 flex items-center">
                  <span class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">7</span>
                  Limitation of Liability
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    Fast Fingers is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.
                  </p>
                </div>
              </div>

              <!-- Changes to Terms -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-blue-400 flex items-center">
                  <span class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">8</span>
                  Changes to Terms
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    We may update these Terms at any time. Continued use of our services after changes constitutes acceptance of the new Terms.
                  </p>
                </div>
              </div>

              <!-- Contact Information -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-blue-400 flex items-center">
                  <span class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">9</span>
                  Contact Us
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    If you have questions about these Terms, please contact us at:
                  </p>
                  <div class="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p class="text-yellow-400 font-medium">📧 Email: legal@fastfingers.com</p>
                    <p class="text-yellow-400 font-medium">🏢 Address: Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Privacy Policy Content -->
        <div v-if="activeTab === 'privacy'" class="animate-fade-in">
          <div class="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/20 overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 sm:p-6 border-b border-white/20">
              <h3 class="text-2xl sm:text-3xl font-bold flex items-center">
                <i class="fas fa-shield-alt text-purple-400 mr-3"></i>
                Privacy Policy
              </h3>
              <p class="text-sm sm:text-base text-gray-300 mt-2">Last updated: January 2025</p>
            </div>

            <!-- Content -->
            <div class="p-4 sm:p-8 max-h-96 sm:max-h-[600px] overflow-y-auto space-y-6">
              
              <!-- Introduction -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-purple-400 flex items-center">
                  <span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">1</span>
                  Privacy Overview
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    At Fast Fingers, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
                  </p>
                  <p class="text-gray-300">
                    We believe in transparency and want you to understand exactly what information we collect and how we use it to improve your typing experience.
                  </p>
                </div>
              </div>

              <!-- Information We Collect -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-purple-400 flex items-center">
                  <span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">2</span>
                  Information We Collect
                </h4>
                <div class="pl-11 space-y-4 text-sm sm:text-base leading-relaxed">
                  <div>
                    <h5 class="text-lg font-semibold text-white mb-2">Personal Information</h5>
                    <ul class="list-disc list-inside space-y-1 text-gray-300 ml-4">
                      <li>Username and email address</li>
                      <li>Profile information (country, avatar)</li>
                      <li>Account preferences and settings</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="text-lg font-semibold text-white mb-2">Game Data</h5>
                    <ul class="list-disc list-inside space-y-1 text-gray-300 ml-4">
                      <li>Typing speed and accuracy statistics</li>
                      <li>Game history and performance metrics</li>
                      <li>Leaderboard rankings and achievements</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="text-lg font-semibold text-white mb-2">Technical Data</h5>
                    <ul class="list-disc list-inside space-y-1 text-gray-300 ml-4">
                      <li>IP address and browser information</li>
                      <li>Device type and operating system</li>
                      <li>Usage patterns and feature interactions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- How We Use Your Information -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-purple-400 flex items-center">
                  <span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">3</span>
                  How We Use Your Information
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">We use your information to:</p>
                  <ul class="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Provide and improve our typing game services</li>
                    <li>Maintain global leaderboards and rankings</li>
                    <li>Send important account and service updates</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                    <li>Prevent fraud and ensure platform security</li>
                    <li>Provide customer support when needed</li>
                  </ul>
                </div>
              </div>

              <!-- Data Sharing -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-purple-400 flex items-center">
                  <span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">4</span>
                  Data Sharing & Disclosure
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    <strong class="text-white">We do not sell your personal data.</strong> We may share information in these limited circumstances:
                  </p>
                  <ul class="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>With your consent for specific features</li>
                    <li>Public leaderboard data (username, scores, country)</li>
                    <li>With service providers who help us operate the platform</li>
                    <li>When required by law or to protect our rights</li>
                  </ul>
                </div>
              </div>

              <!-- Data Security -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-purple-400 flex items-center">
                  <span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">5</span>
                  Data Security
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    We implement industry-standard security measures to protect your data:
                  </p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div class="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div class="text-green-400 font-medium">🔐 Encryption</div>
                      <div class="text-gray-400 text-sm">Data encrypted in transit and at rest</div>
                    </div>
                    <div class="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div class="text-green-400 font-medium">🛡️ Access Control</div>
                      <div class="text-gray-400 text-sm">Limited employee access to data</div>
                    </div>
                    <div class="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div class="text-green-400 font-medium">🔍 Monitoring</div>
                      <div class="text-gray-400 text-sm">Continuous security monitoring</div>
                    </div>
                    <div class="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div class="text-green-400 font-medium">💾 Backups</div>
                      <div class="text-gray-400 text-sm">Regular secure data backups</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Your Rights -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-purple-400 flex items-center">
                  <span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">6</span>
                  Your Privacy Rights
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">You have the right to:</p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <div class="bg-blue-500/10 rounded-lg p-3 border border-blue-400/20">
                      <div class="text-blue-400 font-medium mb-1">📋 Access</div>
                      <div class="text-gray-300 text-sm">Request a copy of your data</div>
                    </div>
                    <div class="bg-yellow-500/10 rounded-lg p-3 border border-yellow-400/20">
                      <div class="text-yellow-400 font-medium mb-1">✏️ Update</div>
                      <div class="text-gray-300 text-sm">Correct inaccurate information</div>
                    </div>
                    <div class="bg-red-500/10 rounded-lg p-3 border border-red-400/20">
                      <div class="text-red-400 font-medium mb-1">🗑️ Delete</div>
                      <div class="text-gray-300 text-sm">Request data deletion</div>
                    </div>
                    <div class="bg-purple-500/10 rounded-lg p-3 border border-purple-400/20">
                      <div class="text-purple-400 font-medium mb-1">📤 Export</div>
                      <div class="text-gray-300 text-sm">Download your data</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Cookies -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-purple-400 flex items-center">
                  <span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">7</span>
                  Cookies & Tracking
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    We use cookies and similar technologies to enhance your experience:
                  </p>
                  <ul class="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li><strong class="text-white">Essential cookies</strong> - Required for basic functionality</li>
                    <li><strong class="text-white">Performance cookies</strong> - Help us analyze usage patterns</li>
                    <li><strong class="text-white">Preference cookies</strong> - Remember your settings</li>
                  </ul>
                  <p class="text-gray-300">
                    You can control cookies through your browser settings.
                  </p>
                </div>
              </div>

              <!-- Data Retention -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-purple-400 flex items-center">
                  <span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">8</span>
                  Data Retention
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    We retain your data only as long as necessary:
                  </p>
                  <ul class="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Active accounts: Data retained while account is active</li>
                    <li>Deleted accounts: Data removed within 30 days</li>
                    <li>Game statistics: May be retained for leaderboard integrity</li>
                    <li>Legal requirements: Some data may be retained longer if required by law</li>
                  </ul>
                </div>
              </div>

              <!-- Contact Information -->
              <div class="space-y-4">
                <h4 class="text-xl sm:text-2xl font-bold text-purple-400 flex items-center">
                  <span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">9</span>
                  Contact Us
                </h4>
                <div class="pl-11 space-y-3 text-sm sm:text-base leading-relaxed">
                  <p class="text-gray-300">
                    For privacy-related questions or to exercise your rights:
                  </p>
                  <div class="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p class="text-yellow-400 font-medium">📧 Email: privacy@fastfingers.com</p>
                    <p class="text-yellow-400 font-medium">🏢 Address: Nairobi, Kenya</p>
                    <p class="text-yellow-400 font-medium">🕒 Response Time: Within 48 hours</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
            <i class="fas fa-download mr-2"></i>
            Download PDF Copy
          </button>
          <button @click="printPage" class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
            <i class="fas fa-print mr-2"></i>
            Print Page
          </button>
        </div>

        <!-- Quick Links -->
        <div class="mt-8 sm:mt-12">
          <div class="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/20">
            <h3 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              <i class="fas fa-link text-yellow-400 mr-3"></i>
              Quick Links
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="#" class="group bg-white/5 rounded-xl p-4 border border-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:bg-white/10 text-center">
                <i class="fas fa-play-circle text-2xl sm:text-3xl text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300"></i>
                <div class="font-medium text-sm sm:text-base">Play Game</div>
                <div class="text-xs text-gray-400">Start typing now</div>
              </a>
              <a href="#" class="group bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:bg-white/10 text-center">
                <i class="fas fa-trophy text-2xl sm:text-3xl text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300"></i>
                <div class="font-medium text-sm sm:text-base">Leaderboard</div>
                <div class="text-xs text-gray-400">View rankings</div>
              </a>
              <a href="#" class="group bg-white/5 rounded-xl p-4 border border-white/10 hover:border-green-400/50 transition-all duration-300 hover:bg-white/10 text-center">
                <i class="fas fa-user-circle text-2xl sm:text-3xl text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300"></i>
                <div class="font-medium text-sm sm:text-base">Profile</div>
                <div class="text-xs text-gray-400">Manage account</div>
              </a>
              <a href="#" class="group bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:bg-white/10 text-center">
                <i class="fas fa-question-circle text-2xl sm:text-3xl text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300"></i>
                <div class="font-medium text-sm sm:text-base">Support</div>
                <div class="text-xs text-gray-400">Get help</div>
              </a>
            </div>
          </div>
        </div>

        <!-- Last Updated Info -->
        <div class="mt-8 text-center">
          <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/20 inline-flex items-center">
            <i class="fas fa-info-circle text-yellow-400 mr-3"></i>
            <div class="text-sm sm:text-base">
              <span class="text-gray-300">These documents were last updated on</span>
              <span class="text-yellow-400 font-medium ml-2">January 31, 2025</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <footer class="mt-12 sm:mt-16 text-center text-gray-400 py-6 sm:py-8">
        <div class="flex justify-center items-center space-x-4 mb-4 flex-wrap">
          <i class="fas fa-heart text-red-400 animate-pulse"></i>
          <span class="text-sm sm:text-base">Made with passion in Kenya</span>
          <i class="fas fa-flag text-green-400"></i>
        </div>
        <div class="flex flex-wrap justify-center items-center space-x-6 text-xs sm:text-sm mb-4">
          <a href="#" class="hover:text-yellow-400 transition-colors duration-300">Contact Us</a>
          <span>•</span>
          <a href="#" class="hover:text-yellow-400 transition-colors duration-300">Support</a>
          <span>•</span>
          <a href="#" class="hover:text-yellow-400 transition-colors duration-300">Blog</a>
          <span>•</span>
          <a href="#" class="hover:text-yellow-400 transition-colors duration-300">API</a>
        </div>
        <p class="text-sm sm:text-base">© 2025 Fast Fingers | Empowering typists worldwide</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "FastFingersLegalPage",
  data() {
    return {
      activeTab: "terms"
    };
  },
  methods: {
    printPage() {
      window.print();
    }
  }
};
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes slide-down {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-blob { animation: blob 7s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
.animate-slide-down { animation: slide-down 0.8s ease-out; }
.animate-fade-in { animation: fade-in 0.5s ease-out; }

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 8px; }
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
a:focus-visible {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}

/* Custom button transitions */
button, a {
  transition: all 0.3s ease;
}

button:active, a:active {
  transform: scale(0.98);
}

/* Print styles */
@media print {
  .bg-gradient-to-br,
  .backdrop-blur-md,
  .bg-white\/10,
  .bg-white\/5 {
    background: white !important;
    color: black !important;
  }
  
  .text-white,
  .text-gray-300,
  .text-gray-400 {
    color: black !important;
  }
  
  .text-blue-400,
  .text-purple-400,
  .text-yellow-400,
  .text-green-400 {
    color: #333 !important;
  }
  
  .border-white\/20,
  .border-white\/10 {
    border-color: #ccc !important;
  }
  
  .animate-blob,
  .animate-slide-down,
  .animate-fade-in {
    animation: none !important;
  }
  
  header nav,
  footer,
  .quick-links {
    display: none !important;
  }
}

/* Enhanced mobile responsiveness */
@media (max-width: 640px) {
  .text-3xl { font-size: 1.5rem; }
  .text-4xl { font-size: 2rem; }
  .text-5xl { font-size: 2.5rem; }
  
  .p-8 { padding: 1rem; }
  .p-6 { padding: 1rem; }
  .p-4 { padding: 0.75rem; }
  
  .space-y-6 > * + * { margin-top: 1rem; }
  .space-y-4 > * + * { margin-top: 0.75rem; }
  
  .max-h-96 { max-height: 20rem; }
}

/* Improved readability */
.leading-relaxed {
  line-height: 1.75;
}

/* Smooth transitions for tab switching */
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* Enhanced link hover effects */
a:hover {
  text-decoration: none;
}

.group:hover .fa-play-circle,
.group:hover .fa-trophy,
.group:hover .fa-user-circle,
.group:hover .fa-question-circle {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

/* Better spacing for numbered sections */
.space-y-6 > div:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Enhanced list styling */
.list-disc {
  padding-left: 1rem;
}

.list-disc li {
  margin-bottom: 0.5rem;
}

/* Better mobile grid layout */
@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .lg\:grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .lg\:grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
</style>