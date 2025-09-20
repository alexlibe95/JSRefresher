<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import questionsData from '../data/questions.json'

interface Category {
  name: string
  description: string
  icon: string
}

const categories = ref<Record<string, Category>>({})
const isLoading = ref(true)

onMounted(() => {
  try {
    // Load categories from the JSON data
    categories.value = questionsData.categories as Record<string, Category>
    isLoading.value = false
  } catch (error) {
    console.error('Error loading categories:', error)
    isLoading.value = false
  }
})

const getCategoryKeys = () => {
  return Object.keys(categories.value)
}

const getCategory = (key: string) => {
  return categories.value[key]
}

const getCategoryIcon = (key: string) => {
  const category = categories.value[key]
  if (category && category.icon) {
    return `<i class="${category.icon}"></i>`
  }
  return '<i class="fas fa-book"></i>'
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span class="text-yellow-300">JSRefresher</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Refresh your knowledge of JavaScript, TypeScript, and modern web development concepts
            with interactive quizzes and helpful hints.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div class="text-3xl font-bold"><i class="fas fa-book"></i></div>
              <div class="text-sm">Interactive Learning</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div class="text-3xl font-bold"><i class="fas fa-bullseye"></i></div>
              <div class="text-sm">Quiz Mode</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div class="text-3xl font-bold"><i class="fas fa-lightbulb"></i></div>
              <div class="text-sm">Hints Mode</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Technology
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a technology category to start refreshing your knowledge with quizzes and hints.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center py-16">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>

        <!-- Categories Grid -->
        <div v-else-if="getCategoryKeys().length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="categoryKey in getCategoryKeys()"
            :key="categoryKey"
            class="group h-full"
          >
            <RouterLink
              :to="`/category/${categoryKey}`"
              class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 h-full flex flex-col"
            >
              <div class="p-8 flex-1 flex flex-col">
                <div class="text-center flex-1 flex flex-col justify-center">
                  <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" style="will-change: transform;" v-html="getCategoryIcon(categoryKey)">
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors flex-shrink-0" style="will-change: color;">
                    {{ getCategory(categoryKey)?.name }}
                  </h3>
                  <p class="text-gray-600 leading-relaxed flex-1 flex items-center">
                    {{ getCategory(categoryKey)?.description }}
                  </p>
                </div>
              </div>
              <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex-shrink-0">
                <div class="flex justify-between items-center text-white">
                  <span class="text-sm font-medium">Explore →</span>
                  <div class="flex space-x-2">
                    <div class="w-2 h-2 bg-white rounded-full opacity-60"></div>
                    <div class="w-2 h-2 bg-white rounded-full opacity-80"></div>
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <!-- Error State -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4"><i class="fas fa-dizzy"></i></div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">No categories found</h3>
          <p class="text-gray-600">There was an error loading the technology categories.</p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Quiz Mode -->
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="text-4xl mb-4"><i class="fas fa-bullseye"></i></div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Quiz Mode</h3>
            <p class="text-gray-600">
              Test your knowledge with multiple-choice questions and code challenges.
              Get immediate feedback and detailed explanations for each answer.
            </p>
          </div>

          <!-- Hints Mode -->
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="text-4xl mb-4"><i class="fas fa-lightbulb"></i></div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Hints Mode</h3>
            <p class="text-gray-600">
              Browse through flashcards with bite-sized explanations and reminders.
              Perfect for quick refresh sessions and learning new concepts.
            </p>
          </div>

          <!-- Progress Tracking -->
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="text-4xl mb-4"><i class="fas fa-chart-line"></i></div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
            <p class="text-gray-600">
              Track your learning progress across different technologies and topics.
              Identify areas that need more attention and celebrate your achievements.
            </p>
          </div>
        </div>
      </div>
    </section>
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

/* Removed hover animation to prevent flickering */

/* Gradient text animation */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.text-yellow-300 {
  background: linear-gradient(-45deg, #fbbf24, #f59e0b, #d97706, #fbbf24);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
}
</style>
