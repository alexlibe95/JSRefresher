import { ref, computed, onMounted } from 'vue'

type ThemeMode = 'light' | 'dark'

const themeMode = ref<ThemeMode>('light')

export function useDarkMode() {
  const toggleDarkMode = () => {
    setTheme(themeMode.value === 'light' ? 'dark' : 'light')
  }

  const setTheme = (mode: ThemeMode) => {
    themeMode.value = mode
    localStorage.setItem('themeMode', mode)
    updateDocumentClass()
  }

  const updateDocumentClass = () => {
    const root = document.documentElement

    // Remove existing theme classes
    root.classList.remove('dark')

    // Apply the selected theme
    if (themeMode.value === 'dark') {
      root.classList.add('dark')
    }

    // Force a style recalculation
    root.style.display = 'none'
    // Trigger reflow
    void root.offsetHeight
    root.style.display = ''
  }

  const getCurrentTheme = () => {
    return themeMode.value
  }

  const initDarkMode = () => {
    // Check localStorage first
    const saved = localStorage.getItem('themeMode') as ThemeMode
    if (saved && ['light', 'dark'].includes(saved)) {
      themeMode.value = saved
    } else {
      // Default to light mode for better user experience
      themeMode.value = 'light'
    }
    updateDocumentClass()
  }

  onMounted(() => {
    initDarkMode()
  })

  return {
    themeMode: computed(() => themeMode.value),
    isDark: computed(() => getCurrentTheme() === 'dark'),
    toggleDarkMode,
    setTheme
  }
}
