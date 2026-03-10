<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)
const isScrolled = ref(false)

const isHomePage = computed(() => route.path === '/')
const isTransparent = computed(() => isHomePage.value && !isScrolled.value)

const navLinks = [
  { label: 'Studio', to: '/studio' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Gear', to: '/gear' },
  { label: 'Rates', to: '/rates' },
  { label: 'Contact', to: '/contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => route.fullPath, () => {
  isOpen.value = false
  // Re-check scroll position after navigation (other pages always show ink nav)
  isScrolled.value = window.scrollY > 40
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="isScrolled
      ? 'bg-cream/95 backdrop-blur-md shadow-md py-3'
      : 'bg-transparent py-5'"
  >
    <div class="max-w-[1440px] mx-auto px-5 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" aria-label="The Summit Room | Home">
        <AppLogo
          :variant="isTransparent ? 'alt' : 'primary'"
          class="h-10 md:h-12 transition-all duration-300"
        />
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-8" aria-label="Main navigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200
                 relative after:absolute after:bottom-0 after:left-0
                 after:w-0 hover:after:w-full after:h-0.5
                 after:transition-all after:duration-300"
          :class="isTransparent
            ? 'text-cream/90 hover:text-seafoam after:bg-seafoam'
            : 'text-ink/80 hover:text-salmon after:bg-salmon'"
          :active-class="isTransparent ? 'text-seafoam after:!w-full' : 'text-salmon after:!w-full'"
        >
          {{ link.label }}
        </NuxtLink>

        <NuxtLink to="/contact" class="btn-primary text-xs py-2 px-4">
          Book a Session
        </NuxtLink>
      </nav>

      <!-- Mobile Hamburger -->
      <button
        class="lg:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
        @click="isOpen = !isOpen"
      >
        <span
          class="block w-6 h-0.5 transition-all duration-300 origin-center"
          :class="[isTransparent ? 'bg-cream' : 'bg-ink', isOpen ? 'rotate-45 translate-y-2' : '']"
        />
        <span
          class="block w-6 h-0.5 transition-all duration-300"
          :class="[isTransparent ? 'bg-cream' : 'bg-ink', isOpen ? 'opacity-0' : '']"
        />
        <span
          class="block w-6 h-0.5 transition-all duration-300 origin-center"
          :class="[isTransparent ? 'bg-cream' : 'bg-ink', isOpen ? '-rotate-45 -translate-y-2' : '']"
        />
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 -translate-y-4"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isOpen"
        class="lg:hidden absolute top-full left-0 right-0
               bg-forest text-cream px-5 py-8 space-y-4
               border-t-4 border-salmon"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block font-display text-2xl hover:text-seafoam transition-colors"
          active-class="text-salmon"
        >
          {{ link.label }}
        </NuxtLink>
        <div class="tape-strip !h-0.5 opacity-40 my-4" />
        <NuxtLink to="/contact" class="btn-primary w-full justify-center">
          Book a Session
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>
