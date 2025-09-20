<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <RouterLink to="/" class="flex items-center space-x-2" @click="closeMenu">
              <div class="text-2xl"><i class="fas fa-rocket"></i></div>
              <span class="text-xl font-bold text-gray-900">JSRefresher</span>
            </RouterLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <RouterLink
              to="/"
              class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-indigo-600 bg-indigo-50"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/about"
              class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-indigo-600 bg-indigo-50"
            >
              About
            </RouterLink>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button
              @click="toggleMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                :class="{ 'hidden': isMenuOpen, 'block': !isMenuOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                class="h-6 w-6"
                :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div
          class="md:hidden transition-all duration-300 ease-in-out"
          :class="{ 'max-h-48 opacity-100': isMenuOpen, 'max-h-0 opacity-0 overflow-hidden': !isMenuOpen }"
        >
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <RouterLink
              to="/"
              class="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              active-class="text-indigo-600 bg-indigo-50"
              @click="closeMenu"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/about"
              class="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              active-class="text-indigo-600 bg-indigo-50"
              @click="closeMenu"
            >
              About
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-gray-400">
            Built with <i class="fas fa-heart text-red-500"></i> using Vue 3, TypeScript, and Tailwind CSS
          </p>
          <p class="text-sm text-gray-500 mt-2">
            © 2025 JSRefresher. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
