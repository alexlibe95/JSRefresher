<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import questionsData from '../data/questions.json'

interface Hint {
  id: string
  title: string
  content: string
}

interface Category {
  name: string
  description: string
  icon: string
  hints: Hint[]
}

interface Props {
  categoryId: string
}

const props = defineProps<Props>()
const route = useRoute()

const category = ref<Category | null>(null)
const hints = ref<Hint[]>([])
const currentHintIndex = ref(0)
const showAnswer = ref(false)
const isLoading = ref(true)
const error = ref<string | null>(null)

const currentHint = computed(() => hints.value[currentHintIndex.value])
const isLastHint = computed(() => currentHintIndex.value === hints.value.length - 1)
const isFirstHint = computed(() => currentHintIndex.value === 0)
const progress = computed(() => ((currentHintIndex.value + 1) / hints.value.length) * 100)

onMounted(() => {
  try {
    const categories = questionsData.categories as Record<string, Category>

    if (categories[props.categoryId]) {
      category.value = categories[props.categoryId]
      hints.value = categories[props.categoryId].hints || []
    } else {
      error.value = 'Category not found'
    }

    isLoading.value = false
  } catch (err) {
    console.error('Error loading hints:', err)
    error.value = 'Error loading hints data'
    isLoading.value = false
  }
})

const toggleAnswer = () => {
  showAnswer.value = !showAnswer.value
}

const nextHint = () => {
  if (!isLastHint.value) {
    currentHintIndex.value++
    showAnswer.value = false
  }
}

const previousHint = () => {
  if (!isFirstHint.value) {
    currentHintIndex.value--
    showAnswer.value = false
  }
}

const restartHints = () => {
  currentHintIndex.value = 0
  showAnswer.value = false
}

const goToHint = (index: number) => {
  currentHintIndex.value = index
  showAnswer.value = false
}

const shuffleHints = () => {
  const shuffled = [...hints.value].sort(() => Math.random() - 0.5)
  hints.value = shuffled
  currentHintIndex.value = 0
  showAnswer.value = false
}
</script>

<template>
  <div class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <RouterLink
          :to="`/category/${props.categoryId}`"
          class="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Category
        </RouterLink>

        <div class="text-center">
          <div class="flex items-center space-x-2">
            <span class="text-2xl" v-html="'<i class=&quot;' + (category?.icon || 'fas fa-book') + '&quot;></i>'"></span>
            <h1 class="text-xl font-bold text-gray-900">{{ category?.name }} Hints</h1>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <button
            v-if="hints.length > 1"
            @click="shuffleHints"
            class="inline-flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Shuffle
          </button>
          <div class="text-sm text-gray-500">
            Hint {{ currentHintIndex + 1 }} of {{ hints.length }}
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="text-6xl mb-4"><i class="fas fa-dizzy"></i></div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Hints Not Found</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <RouterLink
          :to="`/category/${props.categoryId}`"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Category
        </RouterLink>
      </div>

      <!-- Hints Content -->
      <div v-else-if="hints.length > 0">
        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700">Progress</span>
            <span class="text-sm font-medium text-gray-700">{{ Math.round(progress) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>

        <!-- Flashcard -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div class="p-8">
            <!-- Question Side -->
            <div v-if="!showAnswer" class="text-center">
              <div class="text-6xl mb-6"><i class="fas fa-question"></i></div>
              <h2 class="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                {{ currentHint?.title }}
              </h2>
              <button
                @click="toggleAnswer"
                class="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Show Answer
              </button>
            </div>

            <!-- Answer Side -->
            <div v-else class="text-center">
              <div class="text-6xl mb-6"><i class="fas fa-lightbulb"></i></div>
              <h2 class="text-2xl font-bold text-gray-900 mb-4 leading-relaxed">
                {{ currentHint?.title }}
              </h2>
              <div class="bg-gray-50 rounded-lg p-6 mb-8">
                <p class="text-gray-700 leading-relaxed whitespace-pre-line">
                  {{ currentHint?.content }}
                </p>
              </div>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  @click="toggleAnswer"
                  class="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Show Question
                </button>
                <button
                  v-if="!isLastHint"
                  @click="nextHint"
                  class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Next Hint
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Controls -->
        <div class="flex items-center justify-between mb-8">
          <button
            @click="previousHint"
            :disabled="isFirstHint"
            class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div class="flex space-x-2">
            <button
              @click="restartHints"
              class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2M4.582 9H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Restart
            </button>
          </div>

          <button
            @click="nextHint"
            :disabled="isLastHint"
            class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Hint Grid Navigation -->
        <div v-if="hints.length > 1" class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">All Hints</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <button
              v-for="(hint, index) in hints"
              :key="hint.id"
              @click="goToHint(index)"
              :class="[
                'p-4 rounded-lg border-2 font-medium text-sm transition-all',
                index === currentHintIndex
                  ? 'bg-indigo-100 border-indigo-300 text-indigo-900'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
              ]"
            >
              <div class="text-center">
                <div class="font-bold">{{ index + 1 }}</div>
                <div class="text-xs mt-1 truncate">{{ hint.title.split(' ').slice(0, 3).join(' ') }}...</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Completion Message -->
        <div v-if="isLastHint && showAnswer" class="mt-8 bg-white rounded-xl shadow-lg p-8 text-center">
          <div class="text-6xl mb-6"><i class="fas fa-trophy"></i></div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">All Hints Completed!</h2>
          <p class="text-xl text-gray-600 mb-6">
            You've reviewed all {{ hints.length }} hints in this category.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="restartHints"
              class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Review Again
            </button>
            <button
              @click="shuffleHints"
              class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            >
              Shuffle & Review
            </button>
            <RouterLink
              :to="`/category/${props.categoryId}`"
              class="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Back to Category
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- No Hints -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4"><i class="fas fa-lightbulb"></i></div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">No Hints Available</h2>
        <p class="text-gray-600 mb-6">There are no hints for this category yet.</p>
        <RouterLink
          :to="`/category/${props.categoryId}`"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Category
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flipInY {
  from {
    transform: perspective(400px) rotateY(-180deg);
    opacity: 0;
  }
  to {
    transform: perspective(400px) rotateY(0deg);
    opacity: 1;
  }
}

.bg-white {
  animation: fadeInUp 0.3s ease-out;
}

/* Flashcard flip animation */
.flashcard-flip {
  animation: flipInY 0.6s ease-in-out;
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

button:disabled {
  transform: none;
}

/* Progress bar animation */
.progress-bar {
  transition: width 0.5s ease-in-out;
}

/* Grid item hover effects */
.grid button:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>
