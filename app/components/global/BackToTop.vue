<script setup lang="ts">
const showButton = ref(false)
const isAnimating = ref(false)
const scrollProgress = ref(0)

const RADIUS = 18
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // ~113.1

const progressOffset = computed(() => CIRCUMFERENCE * (1 - scrollProgress.value))

const checkScroll = () => {
  const scrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  showButton.value = scrollY > 300
  scrollProgress.value = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0
}

const handleClick = () => {
  isAnimating.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setTimeout(() => { isAnimating.value = false }, 600)
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true })
  checkScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <Transition name="slide-up">
    <button
      v-show="showButton"
      class="back-to-top"
      :class="{ 'is-clicking': isAnimating }"
      aria-label="Back to top"
      @click="handleClick"
    >
      <!-- Progress ring -->
      <svg class="progress-ring" viewBox="0 0 44 44" aria-hidden="true">
        <circle class="ring-track" cx="22" cy="22" r="18" />
        <circle
          class="ring-fill"
          cx="22"
          cy="22"
          r="18"
          :style="{ strokeDashoffset: progressOffset }"
        />
      </svg>

      <!-- Arrow -->
      <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>

      <!-- Tooltip -->
      <span class="tooltip" aria-hidden="true">Back to top</span>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-cream);
  border: 2px solid var(--color-ink);
  box-shadow: var(--shadow-analog-sm);
  color: var(--color-forest);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
  z-index: 40;
}

.back-to-top:hover {
  background: var(--color-forest);
  color: var(--color-cream);
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-analog);
}

.back-to-top.is-clicking {
  transform: scale(0.92);
}

.back-to-top:focus-visible {
  outline: 2px solid var(--color-salmon);
  outline-offset: 3px;
}

/* Progress ring */
.progress-ring {
  position: absolute;
  inset: -4px;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  transform: rotate(-90deg);
  pointer-events: none;
}

.ring-track {
  fill: none;
  stroke: var(--color-ink);
  stroke-width: 1.5;
  opacity: 0.1;
}

.ring-fill {
  fill: none;
  stroke: var(--color-salmon);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-dasharray: 113.1;
  stroke-dashoffset: 113.1;
  transition: stroke-dashoffset 0.1s linear;
}

/* Arrow icon */
.arrow {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  position: relative;
  z-index: 1;
}

.back-to-top:hover .arrow {
  transform: translateY(-2px);
}

/* Tooltip */
.tooltip {
  position: absolute;
  right: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-ink);
  color: var(--color-cream);
  font-size: 0.65rem;
  font-family: var(--font-mono);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 4px 8px;
  border-radius: 3px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.tooltip::after {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 4px solid transparent;
  border-left-color: var(--color-ink);
}

.back-to-top:hover .tooltip {
  opacity: 1;
}

/* Slide-up transition */
.slide-up-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.slide-up-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
