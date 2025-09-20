<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="text-6xl mb-6"><i class="fas fa-rocket"></i></div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">About JSRefresher</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
          Your interactive companion for refreshing JavaScript, TypeScript, and modern web development knowledge.
        </p>
      </div>

      <!-- Mission Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 transition-colors duration-300">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Our Mission</h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 transition-colors duration-300">
          JSRefresher was created to help developers like you quickly refresh and reinforce your knowledge
          of modern web technologies. Whether you're preparing for an interview, brushing up before a project,
          or just want to stay sharp, we've got you covered with interactive quizzes and helpful hints.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-4xl mb-3"><i class="fas fa-bullseye"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Quiz Mode</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Test your knowledge with multiple-choice questions and get instant feedback.</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-3"><i class="fas fa-lightbulb"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Hints Mode</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Browse flashcards with bite-sized explanations for quick refresh sessions.</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-3"><i class="fas fa-chart-line"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Progress Tracking</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Monitor your learning progress and identify areas for improvement.</p>
          </div>
        </div>
      </div>

      <!-- Technologies Covered -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 transition-colors duration-300">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Technologies Covered</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <div class="text-3xl mb-2"><i class="fab fa-js-square"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">JavaScript</h3>
          </div>
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <div class="text-3xl mb-2"><i class="fas fa-globe"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Web Dev</h3>
          </div>
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <div class="text-3xl mb-2"><i class="fab fa-vuejs"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Vue.js</h3>
          </div>
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <div class="text-3xl mb-2"><i class="fab fa-react"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">React</h3>
          </div>
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <div class="text-3xl mb-2"><i class="fab fa-angular"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Angular</h3>
          </div>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mt-6 transition-colors duration-300">
          And more! We're constantly adding new categories and questions to help you stay current
          with the latest web development technologies and best practices.
        </p>
      </div>

      <!-- Features -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3"><i class="fas fa-palette mr-2"></i>Modern UI</h3>
            <p class="text-gray-600 mb-4">
              Clean, responsive design built with Vue 3 and Tailwind CSS for an optimal learning experience
              on any device.
            </p>

            <h3 class="text-lg font-semibold text-gray-900 mb-3">⚡ Fast & Lightweight</h3>
            <p class="text-gray-600 mb-4">
              Optimized for performance with lazy loading and efficient state management.
            </p>

            <h3 class="text-lg font-semibold text-gray-900 mb-3">🔄 Regular Updates</h3>
            <p class="text-gray-600">
              New questions and hints added regularly to keep content fresh and relevant.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3"><i class="fas fa-mobile-alt mr-2"></i>Mobile Friendly</h3>
            <p class="text-gray-600 mb-4">
              Fully responsive design that works perfectly on smartphones, tablets, and desktops.
            </p>

            <h3 class="text-lg font-semibold text-gray-900 mb-3"><i class="fas fa-bullseye mr-2"></i>Targeted Learning</h3>
            <p class="text-gray-600 mb-4">
              Focus on specific technologies or concepts with our categorized content structure.
            </p>

            <h3 class="text-lg font-semibold text-gray-900 mb-3"><i class="fas fa-chart-line mr-2"></i>Progress Tracking</h3>
            <p class="text-gray-600">
              Monitor your improvement over time and identify areas that need more attention.
            </p>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 transition-colors duration-300">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Built With</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-4xl mb-2"><i class="fab fa-vuejs"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Vue 3</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Composition API</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-2"><i class="fas fa-palette"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Tailwind CSS</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Utility-First CSS</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-2"><i class="fas fa-route"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Vue Router</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Client-Side Routing</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-2"><i class="fab fa-js-square"></i></div>
            <h3 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">JavaScript</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Core Language</p>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Ready to Start Learning?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
          Jump right in and start refreshing your knowledge!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/"
            class="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Start Learning
          </RouterLink>
          <a
            href="https://github.com"
            target="_blank"
            class="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
          >
            View on GitHub
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white {
  animation: fadeInUp 0.5s ease-out;
}
</style>
