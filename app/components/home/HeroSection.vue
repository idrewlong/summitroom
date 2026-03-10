<script setup lang="ts">
const { $gsap } = useNuxtApp()
const heroRef = ref<HTMLElement | null>(null)
const headlineRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const scrollIndicatorRef = ref<HTMLElement | null>(null)

const updateScrollIndicator = () => {
  requestAnimationFrame(() => {
    if (scrollIndicatorRef.value) {
      scrollIndicatorRef.value.style.opacity = String(
        Math.max(0, 1 - window.scrollY / 120)
      )
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollIndicator, { passive: true })

  if (!$gsap) return

  const tl = $gsap.timeline({ defaults: { ease: 'tapeReel' } })

  tl.from(headlineRef.value, {
    y: 60,
    opacity: 0,
    duration: 1,
  })
    .from(
      subRef.value,
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
      },
      '-=0.5',
    )
    .from(
      ctaRef.value,
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
      },
      '-=0.4',
    )

  // Parallax on hero background — GPU-accelerated
  $gsap.to('.hero-bg', {
    yPercent: 20,
    ease: 'none',
    force3D: true,
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollIndicator)
})
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex items-center overflow-hidden"
  >
    <!-- Background with real photo + gradient overlays -->
    <div class="hero-bg absolute inset-0 z-0" style="will-change: transform; transform: translateZ(0);">
      <!-- Actual studio photo as base layer -->
      <NuxtImg
        src="/photos/untitled-19238.webp"
        alt="The Summit Room studio"
        class="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchpriority="high"
        sizes="100vw"
      />
      <!-- Dark gradient overlay for text legibility -->
      <div
        class="absolute inset-0"
        style="
          background:
            linear-gradient(135deg, rgba(30,63,45,0.88) 0%, rgba(10,10,10,0.78) 40%, rgba(26,26,26,0.72) 60%, rgba(45,90,64,0.82) 100%);
        "
      />
      <!-- Warm glow overlay -->
      <div
        class="absolute inset-0"
        style="
          background:
            radial-gradient(ellipse at 30% 50%, rgba(212, 97, 74, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 30%, rgba(163, 203, 191, 0.1) 0%, transparent 50%);
        "
      />
      <!-- Film grain effect via CSS -->
      <div
        class="absolute inset-0 opacity-[0.04] pointer-events-none animate-grain"
        style="
          will-change: transform;
          background-image: url('data:image/svg+xml;utf8,<svg viewBox=&quot;0 0 200 200&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><filter id=&quot;n&quot;><feTurbulence type=&quot;fractalNoise&quot; baseFrequency=&quot;0.9&quot; numOctaves=&quot;4&quot; stitchTiles=&quot;stitch&quot;/></filter><rect width=&quot;100%25&quot; height=&quot;100%25&quot; filter=&quot;url(%23n)&quot; opacity=&quot;1&quot;/></svg>');
          background-size: cover;
        "
      />
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-32 md:py-40">
      <div class="max-w-3xl">
        <p class="section-label text-seafoam mb-4">Nashville, Tennessee</p>

        <h1
          ref="headlineRef"
          class="font-display text-cream text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-none"
        >
          Where Sound<br />
          <span class="text-salmon">Comes Alive</span>
        </h1>

        <p
          ref="subRef"
          class="font-body text-lg md:text-xl text-cream/80 max-w-xl mb-10 leading-relaxed"
        >
          Analog warmth. Digital precision. A room built for records
          that move people. Step inside The Summit Room.
        </p>

        <div ref="ctaRef" class="flex flex-wrap gap-4">
          <NuxtLink to="/contact" class="btn-primary">
            Book a Session
          </NuxtLink>
          <NuxtLink
            to="/studio"
            class="btn-ghost !border-cream !text-cream hover:!bg-cream hover:!text-ink"
          >
            Explore the Studio
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Scroll indicator — fades out as user scrolls -->
    <div
      ref="scrollIndicatorRef"
      class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/50 pointer-events-none"
    >
      <span class="font-mono text-[10px] uppercase tracking-[0.4em]">Scroll</span>
      <div class="w-px h-8 bg-linear-to-b from-cream/30 to-transparent" />
    </div>
  </section>
</template>
