import { createRouter, createWebHistory } from 'vue-router'

// Lazy load components for better performance
const HomePage = () => import('../views/HomePage.vue')
const CategoryPage = () => import('../views/CategoryPage.vue')
const QuizPage = () => import('../views/QuizPage.vue')
const HintsPage = () => import('../views/HintsPage.vue')
const AboutPage = () => import('../views/AboutPage.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: 'JSRefresher - Home'
      }
    },
    {
      path: '/category/:categoryId',
      name: 'category',
      component: CategoryPage,
      props: true,
      meta: {
        title: 'JSRefresher - Category'
      }
    },
    {
      path: '/quiz/:categoryId',
      name: 'quiz',
      component: QuizPage,
      props: true,
      meta: {
        title: 'JSRefresher - Quiz'
      }
    },
    {
      path: '/hints/:categoryId',
      name: 'hints',
      component: HintsPage,
      props: true,
      meta: {
        title: 'JSRefresher - Hints'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: {
        title: 'JSRefresher - About'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update page title based on route meta
router.beforeEach((to, from, next) => {
  const title = to.meta.title as string || 'JSRefresher'
  document.title = title
  next()
})

export default router
