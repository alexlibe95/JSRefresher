<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import questionsData from '../data/questions.json'

interface Category {
  name: string
  description: string
  icon: string
  hints: any[]
  quiz: any[]
}

interface Props {
  categoryId: string
}

const props = defineProps<Props>()
const route = useRoute()

const category = ref<Category | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const categoryName = computed(() => category.value?.name || 'Unknown Category')
const categoryIcon = computed(() => {
  const icon = category.value?.icon || 'fas fa-book'
  return `<i class="${icon}"></i>`
})
const categoryDescription = computed(() => category.value?.description || '')

onMounted(() => {
  try {
    const categories = questionsData.categories as Record<string, Category>

    if (categories[props.categoryId]) {
      category.value = categories[props.categoryId]
    } else {
      error.value = 'Category not found'
    }

    isLoading.value = false
  } catch (err) {
    console.error('Error loading category:', err)
    error.value = 'Error loading category data'
    isLoading.value = false
  }
})

const getStats = () => {
  if (!category.value) return { hints: 0, quiz: 0 }

  return {
    hints: category.value.hints?.length || 0,
    quiz: category.value.quiz?.length || 0
  }
}
</script>

<template>
  <div class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <div class="mb-8">
        <RouterLink
          to="/"
          class="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </RouterLink>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="text-6xl mb-4"><i class="fas fa-dizzy"></i></div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <RouterLink
          to="/"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Go Home
        </RouterLink>
      </div>

      <!-- Category Content -->
      <div v-else-if="category">
        <!-- Category Header -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div class="flex items-center mb-4">
              <div class="text-6xl mr-6" v-html="categoryIcon"></div>
              <div>
                <h1 class="text-4xl font-bold mb-2">{{ categoryName }}</h1>
                <p class="text-xl text-indigo-100">{{ categoryDescription }}</p>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="p-6 bg-gray-50 border-t">
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span class="text-gray-700">
                  <span class="font-semibold">{{ getStats().hints }}</span> hints available
                </span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span class="text-gray-700">
                  <span class="font-semibold">{{ getStats().quiz }}</span> quiz questions
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mode Selection -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Hints Mode -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
            <div class="p-8 flex-1 flex flex-col">
              <div class="text-center flex-1 flex flex-col justify-center">
                <div class="text-6xl mb-6 flex-shrink-0"><i class="fas fa-lightbulb"></i></div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">Hints Mode</h3>
                <p class="text-gray-600 mb-6 leading-relaxed flex-1 flex items-center">
                  Browse through flashcards with bite-sized explanations and reminders.
                  Perfect for quick refresh sessions and learning new concepts.
                </p>
                <div class="mb-6 flex-shrink-0">
                  <div class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    {{ getStats().hints }} hints available
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6 flex-shrink-0">
              <RouterLink
                :to="`/hints/${props.categoryId}`"
                class="block text-center"
              >
                <button class="w-full bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  Start Hints Mode
                </button>
              </RouterLink>
            </div>
          </div>

          <!-- Quiz Mode -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
            <div class="p-8 flex-1 flex flex-col">
              <div class="text-center flex-1 flex flex-col justify-center">
                <div class="text-6xl mb-6 flex-shrink-0"><i class="fas fa-bullseye"></i></div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">Quiz Mode</h3>
                <p class="text-gray-600 mb-6 leading-relaxed flex-1 flex items-center">
                  Test your knowledge with multiple-choice questions and code challenges.
                  Get immediate feedback and detailed explanations for each answer.
                </p>
                <div class="mb-6 flex-shrink-0">
                  <div class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    {{ getStats().quiz }} questions
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex-shrink-0">
              <RouterLink
                :to="`/quiz/${props.categoryId}`"
                class="block text-center"
              >
                <button class="w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  Start Quiz Mode
                </button>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">How to Use</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-semibold text-gray-800 mb-2"><i class="fas fa-bullseye mr-2"></i>Quiz Mode</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Multiple choice questions</li>
                <li>• Immediate feedback</li>
                <li>• Detailed explanations</li>
                <li>• Track your progress</li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold text-gray-800 mb-2"><i class="fas fa-lightbulb mr-2"></i>Hints Mode</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Flashcard-style learning</li>
                <li>• Quick refresh sessions</li>
                <li>• Bite-sized explanations</li>
                <li>• Perfect for review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white {
  animation: slideInUp 0.5s ease-out;
}

/* Gradient button hover effects */
.bg-gradient-to-r:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* Icon animations */
.text-6xl:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}
</style>
