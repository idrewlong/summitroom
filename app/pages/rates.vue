<script setup lang="ts">
useSeoMeta({
  title: 'Rates & Packages | The Summit Room | Nashville',
  description: 'Transparent studio rates and booking packages. Hourly, half-day, and full-day sessions available. Lock in your time at The Summit Room.',
})

const packages = [
  {
    name: 'Hourly',
    price: '$125',
    unit: '/ hour',
    description: 'For quick sessions, overdubs, and mixing work.',
    features: [
      'Full studio access',
      'Engineer included',
      'All outboard & mics available',
      '2-hour minimum',
      'Digital files delivered same day',
    ],
    highlighted: false,
  },
  {
    name: 'Half Day',
    price: '$550',
    unit: '/ 5 hours',
    description: 'Our most popular option. Perfect for tracking singles or mixing sessions.',
    features: [
      'Everything in Hourly',
      '5 consecutive hours',
      'Setup & teardown included',
      'Dedicated headphone mixes',
      'Rough mixes before you leave',
      'Save $75 vs hourly rate',
    ],
    highlighted: true,
  },
  {
    name: 'Full Day',
    price: '$950',
    unit: '/ 10 hours',
    description: 'For serious sessions. Track an EP, mix an album, or produce start to finish.',
    features: [
      'Everything in Half Day',
      '10 consecutive hours',
      'Lounge access & refreshments',
      'Tape machine available (2" reel)',
      'Priority booking for follow-ups',
      'Save $300 vs hourly rate',
    ],
    highlighted: false,
  },
]

const addons = [
  { name: 'Analog Tape (2-inch reel)', price: '$250 / reel' },
  { name: 'Additional Engineer', price: '$50 / hour' },
  { name: 'Session Musicians', price: 'Starting at $150 / player' },
  { name: 'Mixing (per song)', price: '$350 – $600' },
  { name: 'Mastering (per song)', price: '$100 – $175' },
  { name: 'Rush Delivery', price: '+25%' },
]

const cardsRef = ref<HTMLElement | null>(null)
useGsapReveal(cardsRef, { stagger: 0.15 })
</script>

<template>
  <div class="pt-24">
    <!-- Hero -->
    <section class="py-16 md:py-24 bg-forest text-cream">
      <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <p class="section-label !text-seafoam mb-4">Investment</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-none mb-6">
          Rates & <span class="text-salmon">Packages</span>
        </h1>
        <p class="text-cream/70 text-lg md:text-xl max-w-2xl leading-relaxed">
          Transparent pricing. No hidden fees. Every session includes a professional engineer and full access to our gear.
        </p>
      </div>
    </section>

    <UiTapeStrip />

    <!-- Pricing Cards -->
    <section class="py-16 md:py-24 bg-cream">
      <div v-gsap-container ref="cardsRef" class="gsap-reveal max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div
            v-for="pkg in packages"
            :key="pkg.name"
            class="border-2 border-ink rounded-retro p-8 transition-all duration-300 relative"
            :class="pkg.highlighted
              ? 'bg-forest text-cream shadow-analog-lg scale-[1.02]'
              : 'bg-cream shadow-analog hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-analog-lg'"
          >
            <!-- Popular badge -->
            <span
              v-if="pkg.highlighted"
              class="absolute -top-3 left-6 bg-salmon text-cream font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-badge border-2 border-ink"
            >
              Most Popular
            </span>

            <h3 class="font-display text-3xl mb-2">{{ pkg.name }}</h3>
            <div class="flex items-baseline gap-1 mb-4">
              <span class="font-display text-4xl md:text-5xl" :class="pkg.highlighted ? 'text-salmon' : 'text-forest'">
                {{ pkg.price }}
              </span>
              <span class="font-mono text-xs" :class="pkg.highlighted ? 'text-cream/60' : 'text-ink/50'">
                {{ pkg.unit }}
              </span>
            </div>
            <p class="text-sm mb-6" :class="pkg.highlighted ? 'text-cream/70' : 'text-ink/60'">
              {{ pkg.description }}
            </p>

            <ul class="space-y-2 mb-8">
              <li
                v-for="feature in pkg.features"
                :key="feature"
                class="flex items-start gap-2 text-sm"
                :class="pkg.highlighted ? 'text-cream/80' : 'text-ink/70'"
              >
                <Icon name="mdi:check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0" :class="pkg.highlighted ? 'text-seafoam' : 'text-forest'" />
                {{ feature }}
              </li>
            </ul>

            <NuxtLink
              to="/contact"
              :class="pkg.highlighted ? 'btn-primary w-full justify-center' : 'btn-ghost w-full justify-center'"
            >
              Book Now
            </NuxtLink>
          </div>
        </div>

        <!-- Add-ons -->
        <div class="max-w-2xl mx-auto">
          <div class="text-center mb-8">
            <UiSectionLabel text="Add-ons" />
            <h2 class="heading-display">Extras</h2>
          </div>

          <div class="card-analog">
            <div class="space-y-4">
              <div
                v-for="addon in addons"
                :key="addon.name"
                class="flex items-center justify-between py-2 border-b border-ink/10 last:border-0"
              >
                <span class="text-sm font-body">{{ addon.name }}</span>
                <span class="font-mono text-xs text-forest font-medium">{{ addon.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
