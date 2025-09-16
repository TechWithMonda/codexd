<template>
  <div class="min-h-screen bg-slate-950 text-white">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg"></div>
          <span class="font-bold text-xl">Codexd</span>
        </div>
        <nav class="hidden md:flex space-x-6">
          <a v-for="(link, index) in navLinks" :key="index" :href="link.href"
            class="hover:text-purple-400 transition-colors duration-200 font-medium" @click.prevent="scrollToSection(link.href.substring(1))">
            {{ link.text }}
          </a>
        </nav>
        <div class="flex items-center space-x-4">
          <button @click="scrollToSection('ai-agent')"
            class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-medium hidden md:inline-block transition-all duration-200 shadow-lg hover:shadow-purple-500/25">
            Try AI Agent
          </button>
          <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>
      </div>
      <nav v-if="isMenuOpen" class="md:hidden flex flex-col space-y-4 px-4 pb-4 bg-slate-900/95 backdrop-blur-sm">
        <a v-for="(link, index) in navLinks" :key="index" :href="link.href"
          class="text-slate-300 hover:text-white transition-colors py-2" @click.prevent="scrollToSection(link.href.substring(1)); isMenuOpen = false;">
          {{ link.text }}
        </a>
        <button @click="scrollToSection('ai-agent'); isMenuOpen = false" 
          class="text-left text-slate-300 hover:text-white transition-colors py-2">
          Try AI Agent
        </button>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="relative h-[80vh] flex items-center justify-center text-center px-4 pt-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
          Discover. Buy. Build.
        </h1>
        <p class="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Your marketplace for developer tools, components, and productivity boosters. Plus, get access to our free Python AI agent for code matching and differences.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button class="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105" @click="scrollToSection('tools')">
            Explore Tools
          </button>
          <button class="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium transition-all duration-200 shadow-lg hover:scale-105" @click="scrollToSection('sell-tool')">
            Sell Your Tool
          </button>
        </div>
      </div>
    </section>

    <!-- Free Python AI Agent Section -->
    <section id="ai-agent" class="py-20 bg-gradient-to-br from-slate-900/50 to-purple-900/10">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Free Python Matches/Differs AI Agent
          </h2>
          <p class="text-lg text-slate-300 mb-8">
            Powerful AI-driven code analysis tool that helps you find similarities, differences, and matches in your Python code.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Features List -->
          <div class="space-y-6">
            <div v-for="feature in aiAgentFeatures" :key="feature.title" 
              class="flex items-start space-x-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-all duration-200">
              <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
                <p class="text-slate-400">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="text-center lg:text-left">
            <div class="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8">
              <h3 class="text-2xl font-bold mb-4">Ready to Try It?</h3>
              <p class="text-slate-300 mb-6">
                Get instant access to our Python code analysis AI. No registration required, completely free to use.
              </p>
              <div class="space-y-4">
                <router-link to="/differs"
                  class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Get Started Free
                </router-link>
                <div class="flex items-center justify-center lg:justify-start space-x-4 text-sm text-slate-400">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    No signup required
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Instant results
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools Section -->
    <section id="tools" class="py-20 bg-slate-900/50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Featured Tools</h2>

        <!-- Filters & Search -->
        <div class="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div class="flex flex-wrap gap-2">
            <button v-for="filter in filters" :key="filter" @click="setActiveFilter(filter)"
              :class="[
                'px-4 py-2 rounded-lg transition-all duration-200 font-medium',
                activeFilter === filter ? 'bg-purple-600 shadow-lg shadow-purple-500/25' : 'bg-slate-800 hover:bg-slate-700'
              ]">
              {{ filter }}
            </button>
          </div>
          <div class="relative w-full md:w-64">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Search tools..."
              class="w-full pl-10 pr-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-slate-700 transition-all duration-200" />
          </div>
        </div>

        <!-- Tool Cards -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="tool in filteredTools" :key="tool.name"
            class="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer border border-slate-700/50 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
            @click="selectTool(tool)">
            <h3 class="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">{{ tool.name }}</h3>
            <p class="text-slate-400 mb-4 line-clamp-2">{{ tool.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in tool.tags" :key="tag" class="px-2 py-1 bg-slate-700/70 rounded text-sm text-slate-300">
                {{ tag }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-bold text-purple-400">${{ tool.price }}</span>
              <span class="text-sm text-slate-400">{{ tool.purchases }} purchases</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sell Your Tool Section -->
    <section id="sell-tool" class="py-20 bg-gradient-to-br from-slate-900/80 to-purple-900/20">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Sell Your Tool
          </h2>
          <p class="text-lg text-slate-300">
            Join our marketplace and start earning from your developer tools and components.
          </p>
        </div>

        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <form @submit.prevent="submitTool" class="space-y-6">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Tool Name *</label>
                <input v-model="sellForm.name" type="text" required
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter tool name">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Category *</label>
                <select v-model="sellForm.category" required
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
                  <option value="">Select category</option>
                  <option v-for="category in sellCategories" :key="category" :value="category">{{ category }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Description *</label>
              <textarea v-model="sellForm.description" required rows="4"
                class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Describe your tool, its features, and benefits..."></textarea>
            </div>

            <!-- Pricing and Tags -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Price (USD) *</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                  <input v-model="sellForm.price" type="number" min="1" step="0.01" required
                    class="w-full pl-8 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Tags</label>
                <input v-model="sellForm.tags" type="text"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="react, javascript, ui (comma separated)">
              </div>
            </div>

            <!-- File Upload -->
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Tool Files *</label>
              <div class="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors duration-200">
                <input type="file" @change="handleFileUpload" multiple 
                  class="hidden" ref="fileInput" accept=".zip,.rar,.tar.gz">
                <div class="space-y-4">
                  <svg class="w-12 h-12 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <div>
                    <button type="button" @click="$refs.fileInput.click()"
                      class="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors duration-200">
                      Choose Files
                    </button>
                    <p class="text-sm text-slate-400 mt-2">Upload ZIP, RAR, or TAR.GZ files (Max 50MB)</p>
                  </div>
                </div>
              </div>
              <div v-if="sellForm.files.length > 0" class="mt-3 space-y-2">
                <div v-for="(file, index) in sellForm.files" :key="index"
                  class="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg">
                  <span class="text-sm text-slate-300">{{ file.name }} ({{ formatFileSize(file.size) }})</span>
                  <button type="button" @click="removeFile(index)"
                    class="text-red-400 hover:text-red-300 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Your Email *</label>
                <input v-model="sellForm.email" type="email" required
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Phone (Optional)</label>
                <input v-model="sellForm.phone" type="tel"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="+1 (555) 123-4567">
              </div>
            </div>

            <!-- Additional Information -->
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Documentation/Demo URL</label>
              <input v-model="sellForm.demoUrl" type="url"
                class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="https://your-demo-site.com">
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Additional Notes</label>
              <textarea v-model="sellForm.notes" rows="3"
                class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Any additional information about your tool..."></textarea>
            </div>

            <!-- Terms Agreement -->
            <div class="flex items-start space-x-3">
              <input v-model="sellForm.agreeToTerms" type="checkbox" required
                class="mt-1 w-4 h-4 bg-slate-900/50 border-slate-600 rounded focus:ring-purple-500">
              <label class="text-sm text-slate-300">
                I agree to the marketplace terms and conditions. I confirm that I own the rights to this tool and can legally sell it. *
              </label>
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button type="submit" :disabled="isSubmitting"
                class="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] flex items-center justify-center space-x-2">
                <svg v-if="isSubmitting" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isSubmitting ? 'Submitting...' : 'Submit Tool for Review' }}</span>
              </button>
              <p class="text-sm text-slate-400 text-center mt-3">
                Your tool will be reviewed within 24-48 hours before being published.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Tool Details Modal -->
    <div v-if="selectedTool"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      @click.self="selectedTool = null">
      <div class="bg-slate-900 rounded-2xl max-w-lg w-full p-6 relative my-8 max-h-[90vh] overflow-y-auto border border-slate-700/50">
        <button @click="selectedTool = null" 
          class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-200 text-xl font-bold hover:rotate-90">
          ×
        </button>
        <h3 class="text-2xl font-bold mb-4">{{ selectedTool.name }}</h3>
        <p class="text-slate-300 mb-4">{{ selectedTool.description }}</p>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-slate-800/50 p-3 rounded-lg">
            <p class="text-sm text-slate-400">Version</p>
            <p>{{ selectedTool.version }}</p>
          </div>
          <div class="bg-slate-800/50 p-3 rounded-lg">
            <p class="text-sm text-slate-400">Last Updated</p>
            <p>{{ selectedTool.updated }}</p>
          </div>
          <div class="bg-slate-800/50 p-3 rounded-lg">
            <p class="text-sm text-slate-400">Compatibility</p>
            <p>{{ selectedTool.compatibility }}</p>
          </div>
          <div class="bg-slate-800/50 p-3 rounded-lg">
            <p class="text-sm text-slate-400">Rating</p>
            <p>{{ selectedTool.rating }} ★</p>
          </div>
        </div>

        <div class="mb-6">
          <h4 class="font-semibold mb-2">Features</h4>
          <ul class="list-disc list-inside text-slate-300">
            <li v-for="feature in selectedTool.features" :key="feature">{{ feature }}</li>
          </ul>
        </div>

        <!-- Payment Options -->
        <div class="space-y-3">
          <button @click="payWithPaystack(selectedTool)"
            :disabled="processingPayment"
            class="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg">
            <span>Pay with Paystack</span>
            <span class="text-sm opacity-75">- ${{ selectedTool.price }}</span>
          </button>
          
          <button @click="payWithEversend(selectedTool)"
            :disabled="processingPayment"
            class="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg">
            <span>Pay with Eversend</span>
            <span class="text-sm opacity-75">- ${{ selectedTool.price }}</span>
          </button>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-slate-900 px-2 text-slate-400">Or pay manually</span>
            </div>
          </div>
          
          <button @click="showManualPayment(selectedTool)"
            class="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition-all duration-200">
            Manual Payment Options
          </button>
          
          <button @click="selectedTool = null"
            class="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium transition-all duration-200">
            Cancel
          </button>
          
          <p class="text-xs text-slate-400 text-center mt-2">
            Choose your preferred payment method
          </p>
        </div>
      </div>
    </div>

    <!-- Manual Payment Instructions Modal -->
    <div v-if="showingManualPayment"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-60 p-4 overflow-y-auto"
      @click.self="showingManualPayment = false">
      <div class="bg-slate-900 rounded-2xl max-w-md w-full p-6 relative my-8 max-h-[90vh] overflow-y-auto border border-slate-700/50">
        <button @click="showingManualPayment = false" 
          class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-200 text-xl font-bold hover:rotate-90">
          ×
        </button>
        
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-2">Manual Payment</h3>
          <p class="text-slate-300">{{ currentPaymentTool?.name }}</p>
          <p class="text-purple-400 font-bold text-xl">${{ currentPaymentTool?.price }}</p>
        </div>

        <div class="space-y-6">
          <!-- Payment Instructions -->
          <div class="bg-slate-800/50 rounded-lg p-4">
            <h4 class="font-semibold mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Payment Instructions
            </h4>
            <div class="space-y-3 text-sm">
              <p class="text-slate-300">Send payment via:</p>
              
              <!-- Mobile Money -->
              <div class="bg-slate-700/50 rounded p-3">
                <p class="font-medium text-green-400 mb-1">📱 Mobile Money (M-Pesa/Airtel)</p>
                <p class="font-mono text-white">0745232052</p>
                <p class="text-slate-400 text-xs">Name: Samuel Monda</p>
              </div>

              <!-- Email/PayPal -->
              <div class="bg-slate-700/50 rounded p-3">
                <p class="font-medium text-blue-400 mb-1">📧 Eversend/Email Transfer/PayPal</p>
                <p class="font-mono text-white">samwelmonda48@gmail.com</p>
                <p class="text-slate-400 text-xs">Use friends & family to avoid fees</p>
              </div>
            </div>
          </div>

          <!-- Payment Reference -->
          <div class="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
            <h4 class="font-semibold mb-2 text-purple-300">📋 Payment Reference</h4>
            <p class="font-mono text-sm bg-slate-800/50 p-2 rounded border text-center">
              {{ paymentReference }}
            </p>
            <p class="text-xs text-slate-400 mt-1 text-center">
              Include this reference in your payment
            </p>
          </div>

          <!-- Verification Instructions -->
          <div class="bg-slate-800/50 rounded-lg p-4">
            <h4 class="font-semibold mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              After Payment
            </h4>
            <div class="space-y-2 text-sm text-slate-300">
              <p>1. Take a screenshot of the payment confirmation</p>
              <p>2. Send proof via WhatsApp or Email with your payment reference</p>
              <p>3. You'll receive your download link within 1-2 hours</p>
            </div>
          </div>

          <!-- Contact Options -->
          <div class="grid grid-cols-2 gap-3">
            <a :href="`https://wa.me/254745232052?text=Hi, I've sent payment for ${currentPaymentTool?.name}. Reference: ${paymentReference}`"
              target="_blank"
              class="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-medium transition-all duration-200 shadow-lg hover:scale-105">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.109"/>
              </svg>
              WhatsApp
            </a>
            <a :href="`mailto:samwelmonda48@gmail.com?subject=Payment Proof - ${currentPaymentTool?.name}&body=Hi,%0A%0AI have sent payment for ${currentPaymentTool?.name}%0APayment Reference: ${paymentReference}%0AAmount: $${currentPaymentTool?.price}%0A%0APlease find payment proof attached.%0A%0AThank you!`"
              class="flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all duration-200 shadow-lg hover:scale-105">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Email
            </a>
          </div>

          <!-- Close Button -->
          <button @click="showingManualPayment = false"
            class="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition-all duration-200">
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Payment Processing Modal -->
    <div v-if="processingPayment"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-60 p-4"
      @click.self="cancelProcessing">
      <div class="bg-slate-900 rounded-2xl p-8 text-center relative border border-slate-700/50">
        <button @click="cancelProcessing" 
          class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-200 text-sm font-bold hover:rotate-90">
          ×
        </button>
        <div class="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-lg font-semibold">Processing Payment...</p>
        <p class="text-slate-400 mt-2">Please don't close this window</p>
        <button @click="cancelProcessing" 
          class="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
          Cancel
        </button>
      </div>
    </div>

    <!-- Notification Toast -->
    <div v-if="notification.show"
      :class="[
        'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 border',
        notification.type === 'success' ? 'bg-green-600 border-green-500' : 
        notification.type === 'error' ? 'bg-red-600 border-red-500' : 
        notification.type === 'warning' ? 'bg-yellow-600 border-yellow-500' : 'bg-blue-600 border-blue-500'
      ]">
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="notification.type === 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          <path v-else-if="notification.type === 'error'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          <path v-else-if="notification.type === 'warning'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-white">{{ notification.message }}</p>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-slate-900/80 py-12 border-t border-slate-800 backdrop-blur-sm">
      <div class="container mx-auto px-4 text-center text-slate-400">
        <div class="mb-4">
          <div class="flex items-center justify-center space-x-2 mb-2">
            <div class="w-6 h-6 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg"></div>
            <span class="font-bold text-lg text-white">Codexd</span>
          </div>
          <p class="text-sm">Building the future of developer tools</p>
        </div>
        <p>© 2025 Codexd Marketplace. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import axios from "axios"

const isMenuOpen = ref(false)
const loading = ref(false)
const processingPayment = ref(false)
const showingManualPayment = ref(false)
const currentPaymentTool = ref(null)
const paymentReference = ref("")
const notification = ref({ show: false, message: "", type: "success" })
const isSubmitting = ref(false)

// API configuration
const API_BASE_URL = "http://127.0.0.1:8000/api"
const PAYSTACK_PUBLIC_KEY = "pk_live_2dd04a53c74f3b59bd516882c555f4c31bcc8619"
const EVERSEND_PUBLIC_KEY = "YOUR_EVERSEND_PUBLIC_KEY"

const navLinks = [
  { text: "Home", href: "#" },
  { text: "AI Agent", href: "#ai-agent" },
  { text: "Tools", href: "#tools" },
  { text: "Sell Tool", href: "#sell-tool" },
];

const filters = ["All", "Frontend", "Backend", "AI", "UI/UX", "DevOps"]
const sellCategories = ["Frontend", "Backend", "Full Stack", "Mobile", "AI/ML", "DevOps", "UI/UX", "Database", "Security", "Testing", "Other"]

// AI Agent Features (hardcoded)
const aiAgentFeatures = ref([
  {
    title: "Code Similarity Detection",
    description: "Find similar code patterns and duplicates across your Python files with advanced AI analysis.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  {
    title: "Intelligent Code Comparison",
    description: "Compare two Python files and get detailed differences with context-aware suggestions.",
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  },
  {
    title: "Pattern Matching",
    description: "Identify common patterns, anti-patterns, and best practices in your codebase automatically.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  },
  {
    title: "Real-time Analysis",
    description: "Get instant results with our fast AI-powered analysis engine. No waiting, no delays.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  }
])

// Reactive data
const tools = ref([])
const searchQuery = ref("")
const activeFilter = ref("All")
const selectedTool = ref(null)

// Sell Tool Form
const sellForm = ref({
  name: "",
  category: "",
  description: "",
  price: "",
  tags: "",
  files: [],
  email: "",
  phone: "",
  demoUrl: "",
  notes: "",
  agreeToTerms: false
})

// Fetch tools from API
onMounted(async () => {
  await fetchTools()
  await loadPaymentSDKs()
})

async function loadPaymentSDKs() {
  if (!window.PaystackPop) {
    const paystackScript = document.createElement('script')
    paystackScript.src = 'https://js.paystack.co/v1/inline.js'
    document.head.appendChild(paystackScript)
  }

  if (!window.EversendPay) {
    const eversendScript = document.createElement('script')
    eversendScript.src = 'https://api.eversend.co/v1/eversend-pay.js'
    document.head.appendChild(eversendScript)
  }
}

async function fetchTools() {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE_URL}/tools/`)
    tools.value = response.data
  } catch (error) {
    console.error("Failed to fetch tools:", error)
    // Add some demo tools if API fails
    tools.value = [
      {
        id: 1,
        name: "React Dashboard Kit",
        description: "Complete dashboard solution with components, charts, and authentication",
        price: "49.99",
        category: "Frontend",
        tags: ["react", "dashboard", "charts"],
        purchases: 156,
        version: "2.1.0",
        updated: "2025-01-01",
        compatibility: "React 18+",
        rating: "4.8",
        features: ["50+ Components", "Dark/Light Mode", "Authentication", "Charts & Analytics", "Responsive Design"]
      },
      {
        id: 2,
        name: "Python API Boilerplate",
        description: "FastAPI boilerplate with authentication, database, and deployment ready",
        price: "29.99",
        category: "Backend",
        tags: ["python", "fastapi", "database"],
        purchases: 89,
        version: "1.5.2",
        updated: "2024-12-28",
        compatibility: "Python 3.8+",
        rating: "4.6",
        features: ["JWT Authentication", "PostgreSQL Setup", "Docker Ready", "API Documentation", "Testing Suite"]
      }
    ]
    showNotification("Loaded demo tools (API unavailable)", "warning")
  } finally {
    loading.value = false
  }
}

const filteredTools = computed(() => {
  return tools.value.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (tool.tags && tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.value.toLowerCase())))

    const matchesFilter = activeFilter.value === "All" || tool.category === activeFilter.value
    return matchesSearch && matchesFilter
  })
})

function setActiveFilter(filter) {
  activeFilter.value = filter
}

function selectTool(tool) {
  selectedTool.value = tool
}

function scrollToSection(sectionId) {
  if (sectionId === "#" || sectionId === "") {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  
  const section = document.getElementById(sectionId)
  if (section) {
    const headerOffset = 80 // Account for fixed header
    const elementPosition = section.offsetTop
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

function generatePaymentReference() {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `CODEXD-${timestamp}-${random}`.toUpperCase()
}

function showManualPayment(tool) {
  currentPaymentTool.value = tool
  paymentReference.value = generatePaymentReference()
  showingManualPayment.value = true
}

function showNotification(message, type = "success") {
  notification.value = {
    show: true,
    message,
    type
  }
  
  setTimeout(() => {
    notification.value.show = false
  }, 5000)
}

// File Upload Functions
function handleFileUpload(event) {
  const files = Array.from(event.target.files)
  const maxSize = 50 * 1024 * 1024 // 50MB
  const validTypes = ['.zip', '.rar', '.tar.gz']
  
  for (const file of files) {
    if (file.size > maxSize) {
      showNotification(`File ${file.name} is too large. Maximum size is 50MB.`, "error")
      continue
    }
    
    const extension = file.name.toLowerCase()
    if (!validTypes.some(type => extension.endsWith(type))) {
      showNotification(`File ${file.name} is not a supported format. Use ZIP, RAR, or TAR.GZ.`, "error")
      continue
    }
    
    sellForm.value.files.push(file)
  }
}

function removeFile(index) {
  sellForm.value.files.splice(index, 1)
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Sell Tool Form Submission
async function submitTool() {
  if (!sellForm.value.agreeToTerms) {
    showNotification("Please agree to the terms and conditions", "error")
    return
  }

  if (sellForm.value.files.length === 0) {
    showNotification("Please upload at least one file", "error")
    return
  }

  isSubmitting.value = true

  try {
    const formData = new FormData()
    
    // Add form fields
    Object.keys(sellForm.value).forEach(key => {
      if (key !== 'files') {
        formData.append(key, sellForm.value[key])
      }
    })
    
    // Add files
    sellForm.value.files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    // Simulate API call (replace with actual API endpoint)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    showNotification("Tool submitted successfully! We'll review it within 24-48 hours.", "success")
    
    // Reset form
    sellForm.value = {
      name: "",
      category: "",
      description: "",
      price: "",
      tags: "",
      files: [],
      email: "",
      phone: "",
      demoUrl: "",
      notes: "",
      agreeToTerms: false
    }
    
  } catch (error) {
    console.error("Error submitting tool:", error)
    showNotification("Failed to submit tool. Please try again.", "error")
  } finally {
    isSubmitting.value = false
  }
}

// Enhanced Paystack Payment with fallback
async function payWithPaystack(tool) {
  processingPayment.value = true

  try {
    const userEmail = await getUserEmail()
    
    const paymentIntentResponse = await axios.post(`${API_BASE_URL}/create-payment-intent/`, {
      tool_id: tool.id,
      email: userEmail,
      payment_method: 'paystack'
    })

    const data = paymentIntentResponse.data

    if (!data.status) {
      if (data.error === "Payment already completed for this tool") {
        showNotification("You've already purchased this tool!", "info")
        processingPayment.value = false
        return
      }
      throw new Error(data.error || "Invalid response from backend")
    }

    const { reference } = data.data
    const amount = Math.round(parseFloat(tool.price) * 100)
    const email = data.data.email || userEmail

    // Check if Paystack is loaded
    if (!window.PaystackPop) {
      throw new Error("Paystack payment system is currently unavailable")
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount,
      currency: "KES",
      ref: reference,
      callback: (response) => {
        handlePaymentVerification(response.reference, 'paystack')
      },
      onClose: () => {
        showNotification("Transaction was not completed. You can try manual payment instead.", "warning")
        processingPayment.value = false
        setTimeout(() => {
          showManualPayment(tool)
        }, 1000)
      }
    })

    handler.openIframe()

  } catch (error) {
    console.error("Paystack payment error:", error)
    handlePaymentError(error, tool, 'Paystack')
  }
}

// Enhanced Eversend Payment with fallback
async function payWithEversend(tool) {
  processingPayment.value = true

  try {
    const userEmail = await getUserEmail()
    
    const paymentIntentResponse = await axios.post(`${API_BASE_URL}/create-payment-intent/`, {
      tool_id: tool.id,
      email: userEmail,
      payment_method: 'eversend'
    })

    const data = paymentIntentResponse.data

    if (!data.status) {
      if (data.error === "Payment already completed for this tool") {
        showNotification("You've already purchased this tool!", "info")
        processingPayment.value = false
        return
      }
      throw new Error(data.error || "Invalid response from backend")
    }

    const { reference } = data.data
    const amount = parseFloat(tool.price)
    const email = data.data.email || userEmail

    // Check if Eversend is available
    if (!window.EversendPay) {
      throw new Error("Eversend payment system is currently unavailable")
    }

    const eversendConfig = {
      publicKey: EVERSEND_PUBLIC_KEY,
      amount: amount,
      currency: 'USD',
      email: email,
      reference: reference,
      callback: (response) => {
        if (response.status === 'success') {
          handlePaymentVerification(response.reference, 'eversend')
        } else {
          showNotification("Payment failed. Please try manual payment instead.", "error")
          processingPayment.value = false
          setTimeout(() => {
            showManualPayment(tool)
          }, 1000)
        }
      },
      onClose: () => {
        showNotification("Transaction was cancelled. You can try manual payment instead.", "warning")
        processingPayment.value = false
        setTimeout(() => {
          showManualPayment(tool)
        }, 1000)
      },
      metadata: {
        tool_id: tool.id,
        tool_name: tool.name
      }
    }

    window.EversendPay.initialize(eversendConfig)

  } catch (error) {
    console.error("Eversend payment error:", error)
    handlePaymentError(error, tool, 'Eversend')
  }
}

// Helper function to get user email
async function getUserEmail() {
  const email = localStorage.getItem('guest_email')
  if (email) return email
  
  return await promptForEmail()
}

async function promptForEmail() {
  return new Promise((resolve, reject) => {
    const email = prompt("Please enter your email address to continue with payment:")
    if (email && isValidEmail(email)) {
      localStorage.setItem('guest_email', email)
      resolve(email)
    } else {
      reject(new Error("Valid email is required to make a purchase"))
    }
  })
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Enhanced verification function
async function handlePaymentVerification(reference, paymentMethod) {
  try {
    showNotification("Verifying your payment...", "info")
    
    const verifyResponse = await axios.post(`${API_BASE_URL}/verify-payment/`, {
      reference,
      payment_method: paymentMethod
    })

    const verifyData = verifyResponse.data

    if (verifyData.status === "success") {
      showNotification(`🎉 Payment successful via ${paymentMethod}! You can now download your tool.`, "success")
      
      selectedTool.value = null
      await fetchTools()
      
      if (!isUserLoggedIn()) {
        storeAnonymousPurchase(reference, paymentMethod)
      }
    } else {
      showNotification("Payment verification failed. Please contact support with reference: " + reference, "error")
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    
    if (error.response && error.response.data && error.response.data.error) {
      showNotification("Verification error: " + error.response.data.error, "error")
    } else {
      showNotification("Payment verification failed. Please contact support with reference: " + reference, "error")
    }
  } finally {
    processingPayment.value = false
  }
}

// Enhanced error handling with manual payment fallback
function handlePaymentError(error, tool, paymentMethod) {
  console.error(`${paymentMethod} payment error:`, error)
  
  let errorMessage = `${paymentMethod} payment is currently unavailable.`
  
  if (error.response && error.response.data && error.response.data.error) {
    errorMessage = error.response.data.error
  } else if (error.message) {
    if (error.message.includes("unavailable") || error.message.includes("not loaded")) {
      errorMessage = `${paymentMethod} payment system is temporarily unavailable.`
    } else {
      errorMessage = error.message
    }
  }
  
  showNotification(errorMessage + " Please try manual payment.", "error")
  processingPayment.value = false
  
  // Auto-suggest manual payment after a short delay
  setTimeout(() => {
    showManualPayment(tool)
  }, 1500)
}

function cancelProcessing() {
  processingPayment.value = false
  showNotification("Payment cancelled by user.", "warning")
}

// Helper functions
function isUserLoggedIn() {
  return false // Implement based on your authentication system
}

function storeAnonymousPurchase(reference, paymentMethod) {
  const purchases = JSON.parse(localStorage.getItem('anonymous_purchases') || '[]')
  purchases.push({
    reference,
    paymentMethod,
    date: new Date().toISOString()
  })
  localStorage.setItem('anonymous_purchases', JSON.stringify(purchases))
}
</script>

<style scoped>
/* Custom scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.7);
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease;
}

/* Enhanced card hover effects */
.group:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
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
</style>