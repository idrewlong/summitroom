<script setup lang="ts">
useSeoMeta({
  title: 'The Studio | The Summit Room | Nashville',
  description: 'Explore The Summit Room\'s live room, control room, and iso booths. Vintage analog console, modern digital workflow, tuned acoustics.',
})

const rooms = [
  {
    name: 'The Control Room',
    description: 'The nerve center. Custom-built around an API 1608 console with Neve summing, our control room delivers pristine monitoring through Augspurger mains and detailed nearfields. Every mix position is calibrated for accuracy.',
    specs: ['API 1608 Console', 'Augspurger Main Monitors', 'Studer A800 2-inch Tape', 'Pro Tools HDX'],
    image: '/photos/untitled-19197.webp',
  },
  {
    name: 'The Live Room',
    description: 'A 600 sq ft tracking space with 14-foot ceilings, tuned variable acoustics, and natural daylight. The room breathes: tight when you need it, open when you don\'t. Built for bands, built for sound.',
    specs: ['600 sq ft', '14ft Ceilings', 'Variable Acoustics', 'Natural Daylight'],
    image: '/photos/untitled-19205.webp',
  },
  {
    name: 'Iso Booth A',
    description: 'Our primary isolation booth with a direct line of sight to the live room. Perfect for vocal tracking, amp isolation, or quiet overdubs. Floated floor, independent HVAC.',
    specs: ['Floated Floor', 'Line of Sight', 'Independent HVAC', 'Dedicated Headphone Mix'],
    image: '/photos/untitled-19209.webp',
  },
  {
    name: 'Iso Booth B & C',
    description: 'Two additional isolation spaces for simultaneous tracking. Run a full band session with guitar amps isolated, drums in the live room, and vocals clean, all at once.',
    specs: ['Dual Booths', 'Amp Isolation', 'Simultaneous Tracking', 'Tie Lines to Live Room'],
    image: '/photos/untitled-19224.webp',
  },
  {
    name: 'The Lounge',
    description: 'Because great records need great breaks. Our lounge features comfortable seating, a mini kitchen, and a curated vinyl collection. Recharge, listen back, get inspired.',
    specs: ['Full Kitchen', 'Vinyl Listening Station', 'Wi-Fi', 'Street Parking'],
    image: '/photos/untitled-19228.webp',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
useGsapReveal(sectionRef, { stagger: 0.15 })
</script>

<template>
  <div class="pt-24">
    <!-- Hero -->
    <section class="py-16 md:py-24 bg-forest text-cream">
      <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <p class="section-label !text-seafoam mb-4">The Space</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-none mb-6">
          Our <span class="text-salmon">Studio</span>
        </h1>
        <p class="text-cream/70 text-lg md:text-xl max-w-2xl leading-relaxed">
          Every room at The Summit Room was designed with one goal: capturing
          the best possible performance. Walk through our spaces.
        </p>
      </div>
    </section>

    <UiTapeStrip />

    <!-- Rooms -->
    <section class="py-16 md:py-24 bg-cream">
      <div v-gsap-container ref="sectionRef" class="gsap-reveal max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 space-y-16">
        <div
          v-for="(room, index) in rooms"
          :key="room.name"
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          <!-- Image placeholder -->
          <div
            class="rounded-retro border-2 border-ink overflow-hidden shadow-analog order-1"
            :class="index % 2 === 1 ? 'lg:order-2' : ''"
          >
            <NuxtImg
              :src="room.image"
              :alt="room.name"
              class="w-full h-64 md:h-80 object-cover"
              loading="lazy"
              sizes="xs:100vw sm:100vw md:100vw lg:50vw"
            />
          </div>

          <!-- Text -->
          <div :class="index % 2 === 1 ? 'lg:order-1' : ''">
            <h2 class="font-display text-3xl md:text-4xl mb-4">{{ room.name }}</h2>
            <p class="text-ink/70 leading-relaxed mb-6">{{ room.description }}</p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="spec in room.specs"
                :key="spec"
                class="font-mono text-xs uppercase tracking-wider bg-forest/10 text-forest px-3 py-1 rounded-badge"
              >
                {{ spec }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-20 bg-cream-dark text-center">
      <div class="max-w-[1440px] mx-auto px-5">
        <h2 class="heading-display mb-6">Want a <span class="text-salmon">Tour?</span></h2>
        <p class="text-ink/60 max-w-lg mx-auto mb-8">
          We love showing off the room. Schedule a walkthrough or jump straight to booking.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink to="/contact" class="btn-primary">Book a Session</NuxtLink>
          <NuxtLink to="/gear" class="btn-ghost">See Our Gear</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
