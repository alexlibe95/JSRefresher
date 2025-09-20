<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import questionsData from '../data/questions.json'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface Category {
  name: string
  description: string
  icon: string
  quiz: QuizQuestion[]
}

interface Props {
  categoryId: string
}

const props = defineProps<Props>()
const route = useRoute()

const category = ref<Category | null>(null)
const questions = ref<QuizQuestion[]>([])
const currentQuestionIndex = ref(0)
const selectedAnswer = ref<number | null>(null)
const showResult = ref(false)
const isAnswered = ref(false)
const userAnswers = ref<number[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)
const isFirstQuestion = computed(() => currentQuestionIndex.value === 0)
const progress = computed(() => ((currentQuestionIndex.value + 1) / questions.value.length) * 100)

const score = computed(() => {
  if (questions.value.length === 0) return 0
  const correctAnswers = userAnswers.value.filter((answer, index) =>
    answer === questions.value[index]?.correct
  ).length
  return Math.round((correctAnswers / questions.value.length) * 100)
})

const getScoreText = computed(() => {
  const percentage = score.value
  if (percentage >= 90) return 'Excellent!'
  if (percentage >= 80) return 'Great job!'
  if (percentage >= 70) return 'Good work!'
  if (percentage >= 60) return 'Not bad!'
  return 'Keep practicing!'
})

onMounted(() => {
  try {
    const categories = questionsData.categories as Record<string, Category>

    if (categories[props.categoryId]) {
      category.value = categories[props.categoryId]
      questions.value = categories[props.categoryId].quiz || []
      userAnswers.value = new Array(questions.value.length).fill(-1)
    } else {
      error.value = 'Category not found'
    }

    isLoading.value = false
  } catch (err) {
    console.error('Error loading quiz:', err)
    error.value = 'Error loading quiz data'
    isLoading.value = false
  }
})

const selectAnswer = (answerIndex: number) => {
  if (isAnswered.value) return
  selectedAnswer.value = answerIndex
}

const submitAnswer = () => {
  if (selectedAnswer.value === null || isAnswered.value) return

  userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value
  isAnswered.value = true
  showResult.value = true
}

const nextQuestion = () => {
  if (!isLastQuestion.value) {
    currentQuestionIndex.value++
    resetQuestionState()
  }
}

const previousQuestion = () => {
  if (!isFirstQuestion.value) {
    currentQuestionIndex.value--
    resetQuestionState()
  }
}

const resetQuestionState = () => {
  selectedAnswer.value = userAnswers.value[currentQuestionIndex.value]
  isAnswered.value = userAnswers.value[currentQuestionIndex.value] !== -1
  showResult.value = false
}

const restartQuiz = () => {
  currentQuestionIndex.value = 0
  userAnswers.value = new Array(questions.value.length).fill(-1)
  resetQuestionState()
}

const goToQuestion = (index: number) => {
  currentQuestionIndex.value = index
  resetQuestionState()
}

const getAnswerClass = (optionIndex: number) => {
  if (!showResult.value) {
    return selectedAnswer.value === optionIndex
      ? 'bg-indigo-100 border-indigo-300 text-indigo-900'
      : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
  }

  if (optionIndex === currentQuestion.value?.correct) {
    return 'bg-green-100 border-green-300 text-green-900'
  }

  if (optionIndex === selectedAnswer.value && optionIndex !== currentQuestion.value?.correct) {
    return 'bg-red-100 border-red-300 text-red-900'
  }

  return 'bg-gray-100 border-gray-300 text-gray-500'
}

const getOptionLetter = (index: number) => {
  return String.fromCharCode(65 + index) // A, B, C, D
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
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
            <h1 class="text-xl font-bold text-gray-900">{{ category?.name }} Quiz</h1>
          </div>
        </div>

        <div class="text-sm text-gray-500">
          Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="text-6xl mb-4"><i class="fas fa-dizzy"></i></div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Quiz Not Found</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <RouterLink
          :to="`/category/${props.categoryId}`"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Category
        </RouterLink>
      </div>

      <!-- Quiz Content -->
      <div v-else-if="questions.length > 0">
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

        <!-- Question Card -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div class="p-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
              {{ currentQuestion?.question }}
            </h2>

            <!-- Options -->
            <div class="space-y-3">
              <button
                v-for="(option, index) in currentQuestion?.options"
                :key="index"
                @click="selectAnswer(index)"
                :disabled="isAnswered"
                :class="[
                  'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
                  getAnswerClass(index),
                  'disabled:cursor-not-allowed'
                ]"
              >
                <div class="flex items-center">
                  <span class="inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-semibold mr-3"
                        :class="[
                          showResult.value && index === currentQuestion?.correct ? 'bg-green-500 text-white' :
                          selectedAnswer === index && showResult.value && index !== currentQuestion?.correct ? 'bg-red-500 text-white' :
                          selectedAnswer === index ? 'bg-indigo-500 text-white' :
                          'bg-gray-200 text-gray-600'
                        ]">
                    {{ getOptionLetter(index) }}
                  </span>
                  <span>{{ option }}</span>
                </div>
              </button>
            </div>

            <!-- Submit Button -->
            <div class="mt-8 text-center">
              <button
                v-if="!isAnswered"
                @click="submitAnswer"
                :disabled="selectedAnswer === null"
                class="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Check Answer
              </button>

              <button
                v-else
                @click="nextQuestion"
                class="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                {{ isLastQuestion ? 'Finish Quiz' : 'Next Question' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Explanation -->
        <div v-if="showResult" class="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div class="flex items-start">
            <div class="flex-shrink-0 mr-4">
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center',
                selectedAnswer === currentQuestion?.correct ? 'bg-green-100' : 'bg-red-100'
              ]">
                <svg
                  v-if="selectedAnswer === currentQuestion?.correct"
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold mb-2">
                {{ selectedAnswer === currentQuestion?.correct ? 'Correct!' : 'Incorrect' }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ currentQuestion?.explanation }}
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div v-if="questions.length > 1" class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Question Navigation</h3>
            <button
              @click="restartQuiz"
              class="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Restart Quiz
            </button>
          </div>

          <div class="grid grid-cols-5 sm:grid-cols-10 gap-2">
            <button
              v-for="(question, index) in questions"
              :key="question.id"
              @click="goToQuestion(index)"
              :class="[
                'aspect-square rounded-lg border-2 font-semibold text-sm transition-all',
                index === currentQuestionIndex
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : userAnswers[index] === -1
                  ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  : userAnswers[index] === question.correct
                  ? 'bg-green-100 border-green-300 text-green-800'
                  : 'bg-red-100 border-red-300 text-red-800'
              ]"
            >
              {{ index + 1 }}
            </button>
          </div>
        </div>

        <!-- Quiz Results -->
        <div v-if="isLastQuestion && isAnswered" class="mt-8 bg-white rounded-xl shadow-lg p-8 text-center">
          <div class="text-6xl mb-6"><i class="fas fa-trophy"></i></div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
          <div class="text-6xl font-bold text-indigo-600 mb-4">{{ score }}%</div>
          <p class="text-xl text-gray-600 mb-6">{{ getScoreText }}</p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-2xl font-bold text-gray-900">{{ userAnswers.filter((a, i) => a === questions[i]?.correct).length }}</div>
              <div class="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-2xl font-bold text-gray-900">{{ questions.length }}</div>
              <div class="text-sm text-gray-600">Total Questions</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-2xl font-bold text-gray-900">{{ Math.round((userAnswers.filter((a, i) => a === questions[i]?.correct).length / questions.length) * 100) }}%</div>
              <div class="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="restartQuiz"
              class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Try Again
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

      <!-- No Questions -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4"><i class="fas fa-file-alt"></i></div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">No Questions Available</h2>
        <p class="text-gray-600 mb-6">There are no quiz questions for this category yet.</p>
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

.bg-white {
  animation: fadeInUp 0.3s ease-out;
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* Option button animations */
button:disabled {
  transform: none;
}

/* Progress bar animation */
.progress-bar {
  transition: width 0.5s ease-in-out;
}
</style>
