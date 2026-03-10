<script setup lang="ts">
useSeoMeta({
  title: 'Gear List | The Summit Room | Nashville Studio Equipment',
  description: 'Our gear list: vintage microphones, analog outboard, tape machines, modern converters, and instruments. The tools behind the sound.',
})

const gearCategories = [
  {
    title: 'Console & Summing',
    icon: 'mdi:tune-vertical',
    items: [
      { name: 'API 1608 Console', detail: '16 channels, inline monitoring' },
      { name: 'Neve 8816 Summing Mixer', detail: '16x2 analog summing' },
      { name: 'SSL Fusion', detail: 'Stereo analog processor' },
      { name: 'Dangerous 2-Bus+', detail: 'Summing & monitoring controller' },
    ],
  },
  {
    title: 'Microphones',
    icon: 'mdi:microphone-variant',
    items: [
      { name: 'Neumann U87 Ai', detail: 'Large diaphragm condenser' },
      { name: 'Neumann U67 (vintage)', detail: 'Tube condenser, 1960s' },
      { name: 'AKG C414 XLII', detail: 'Matched stereo pair' },
      { name: 'Shure SM7B', detail: 'Dynamic, broadcast standard' },
      { name: 'Royer R-121', detail: 'Ribbon, figure-8 pattern' },
      { name: 'Coles 4038', detail: 'BBC ribbon pair' },
      { name: 'Sennheiser MD 421', detail: 'Dynamic, versatile' },
      { name: 'Earthworks QTC50', detail: 'Omni reference pair' },
    ],
  },
  {
    title: 'Preamps',
    icon: 'mdi:knob',
    items: [
      { name: 'Neve 1073 (x4)', detail: 'Class-A transformer preamp/EQ' },
      { name: 'API 312 (x4)', detail: 'Discrete op-amp preamp' },
      { name: 'Universal Audio 610 (x2)', detail: 'Tube preamp/DI' },
      { name: 'Grace Design m108', detail: '8-channel transparent preamp' },
    ],
  },
  {
    title: 'Compressors & Dynamics',
    icon: 'mdi:gauge',
    items: [
      { name: 'Universal Audio 1176LN (x2)', detail: 'FET limiting amplifier' },
      { name: 'Teletronix LA-2A', detail: 'Optical leveling amplifier' },
      { name: 'Empirical Labs Distressor (x2)', detail: 'Multi-ratio compressor' },
      { name: 'API 2500', detail: 'Stereo bus compressor' },
      { name: 'Shadow Hills Mastering Comp', detail: 'Dual-stage, dual-transformer' },
    ],
  },
  {
    title: 'EQ & Processing',
    icon: 'mdi:equalizer',
    items: [
      { name: 'API 550A (x4)', detail: '3-band proportional EQ' },
      { name: 'Pultec EQP-1A', detail: 'Tube program equalizer' },
      { name: 'Manley Massive Passive', detail: 'Stereo tube EQ' },
      { name: 'Chandler Curve Bender', detail: 'Mastering EQ' },
    ],
  },
  {
    title: 'Tape & Conversion',
    icon: 'mdi:cassette',
    items: [
      { name: 'Studer A800 MkIII', detail: '2-inch, 24-track analog tape' },
      { name: 'Ampex ATR-102', detail: 'Half-inch stereo mastering deck' },
      { name: 'Antelope Orion 32+', detail: '32-channel AD/DA conversion' },
      { name: 'Burl B32 Vancouver', detail: '32-channel AD/DA, transformer-coupled' },
    ],
  },
  {
    title: 'Monitoring',
    icon: 'mdi:speaker',
    items: [
      { name: 'Augspurger Classic 215H', detail: 'Main monitors, soffit-mounted' },
      { name: 'Focal Trio11 Be', detail: 'Nearfield / midfield' },
      { name: 'Auratone 5C', detail: 'Single-driver reference' },
      { name: 'Grace Design m908', detail: 'Monitor controller' },
    ],
  },
  {
    title: 'Instruments & Amps',
    icon: 'mdi:guitar-electric',
    items: [
      { name: 'Yamaha C7 Grand Piano', detail: '7\'6" concert grand' },
      { name: 'Hammond B3 + Leslie 122', detail: 'Vintage organ & cabinet' },
      { name: 'Fender Twin Reverb (\'65)', detail: 'Guitar amplifier' },
      { name: 'Vox AC30', detail: 'Guitar amplifier' },
      { name: 'Ampeg SVT + 8x10', detail: 'Bass amplifier rig' },
    ],
  },
]

const listRef = ref<HTMLElement | null>(null)
useGsapReveal(listRef, { x: -20, y: 0, stagger: 0.1 })
</script>

<template>
  <div class="pt-24">
    <!-- Hero -->
    <section class="py-16 md:py-24 bg-forest text-cream">
      <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <p class="section-label !text-seafoam mb-4">The Tools</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-none mb-6">
          Gear <span class="text-salmon">List</span>
        </h1>
        <p class="text-cream/70 text-lg md:text-xl max-w-2xl leading-relaxed">
          Every piece chosen for a reason. Vintage character, modern reliability, all in service of the sound.
        </p>
      </div>
    </section>

    <UiTapeStrip />

    <!-- Gear Categories -->
    <section class="py-16 md:py-24 bg-cream">
      <div v-gsap-container ref="listRef" class="gsap-reveal max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 space-y-10">
        <div
          v-for="category in gearCategories"
          :key="category.title"
          class="card-analog"
        >
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-forest/10 rounded-retro flex items-center justify-center">
              <Icon :name="category.icon" class="w-5 h-5 text-forest" />
            </div>
            <h2 class="font-display text-2xl md:text-3xl">{{ category.title }}</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="item in category.items"
              :key="item.name"
              class="bg-cream-dark/50 rounded-retro px-4 py-3 border border-ink/5"
            >
              <p class="font-body font-bold text-sm">{{ item.name }}</p>
              <p class="font-mono text-xs text-ink/50">{{ item.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
