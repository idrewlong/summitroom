<script setup lang="ts">
const listRef = ref<HTMLElement | null>(null)
useGsapReveal(listRef, { x: -30, y: 0, stagger: 0.1 })

const gearCategories = [
  {
    category: 'Console & Summing',
    items: ['Neve 8816 Summing Mixer', 'API 1608 Console', 'SSL Fusion Stereo Processor'],
  },
  {
    category: 'Microphones',
    items: ['Neumann U87 Ai', 'AKG C414 XLII (pair)', 'Shure SM7B', 'Royer R-121 Ribbon', 'Coles 4038 (pair)'],
  },
  {
    category: 'Outboard & Preamps',
    items: ['Universal Audio 1176LN (x2)', 'Teletronix LA-2A', 'Neve 1073 Preamp (x4)', 'API 550A EQ (x4)'],
  },
  {
    category: 'Tape & Conversion',
    items: ['Studer A800 MkIII 2-inch', 'Antelope Orion 32+', 'Burl B32 Vancouver'],
  },
]
</script>

<template>
  <section class="py-20 md:py-32 bg-forest text-cream relative overflow-hidden">
    <!-- Vinyl record decorations -->
    <div class="absolute -top-20 -right-20 w-80 h-80 animate-tape-spin pointer-events-none" style="animation-duration: 22s;">
      <div class="absolute inset-0 rounded-full border-2 border-cream/25" />
      <div class="absolute inset-8 rounded-full border border-cream/15" />
      <div class="absolute inset-16 rounded-full border border-cream/15" />
      <div class="absolute inset-[120px] rounded-full border border-cream/20 bg-cream/5" />
      <div class="absolute inset-[136px] rounded-full bg-cream/10" />
    </div>
    <div class="absolute -bottom-16 -left-16 w-56 h-56 animate-tape-spin pointer-events-none" style="animation-duration: 16s; animation-direction: reverse;">
      <div class="absolute inset-0 rounded-full border-2 border-cream/20" />
      <div class="absolute inset-6 rounded-full border border-cream/12" />
      <div class="absolute inset-12 rounded-full border border-cream/12" />
      <div class="absolute inset-[80px] rounded-full border border-cream/18 bg-cream/5" />
      <div class="absolute inset-[92px] rounded-full bg-cream/10" />
    </div>

    <div class="max-w-site mx-auto px-5 md:px-8 lg:px-12 relative z-10">
      <div class="text-center mb-16">
        <p class="section-label !text-seafoam mb-4">The Tools</p>
        <h2 class="font-display text-4xl md:text-6xl lg:text-7xl text-cream leading-none">
          Our <span class="text-salmon">Gear</span>
        </h2>
      </div>

      <div v-gsap-container ref="listRef" class="gsap-reveal grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div
          v-for="cat in gearCategories"
          :key="cat.category"
          class="bg-forest-dark/50 border border-cream/10 rounded-retro p-6"
        >
          <h3 class="font-mono text-xs uppercase tracking-[0.3em] text-seafoam mb-4">
            {{ cat.category }}
          </h3>
          <ul class="space-y-2">
            <li
              v-for="item in cat.items"
              :key="item"
              class="flex items-center gap-3 text-cream/80 text-sm"
            >
              <span class="w-1.5 h-1.5 bg-salmon rounded-full flex-shrink-0" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div class="text-center mt-12">
        <NuxtLink to="/gear" class="btn-primary">
          Full Gear List
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
