<script setup lang="ts">
useSeoMeta({
  title: 'Services | The Summit Room | Recording, Mixing, Mastering',
  description: 'Full-service recording, mixing, mastering, and production. From tracking live bands to producing beats, we bring your sound to life.',
})

const services = [
  {
    title: 'Recording & Tracking',
    description: 'Multi-track recording in our tuned live room and isolation booths. Full band, solo artist, or ensemble, we capture every nuance with world-class microphones and analog signal chains.',
    details: [
      'Full band tracking with iso capability',
      'Analog signal chain through Neve & API preamps',
      'Simultaneous multi-track recording up to 32 channels',
      'Tape and/or digital capture (Pro Tools HDX)',
      'Remote artist talkback & headphone mixes',
    ],
    icon: 'mdi:microphone-variant',
  },
  {
    title: 'Mixing',
    description: 'Detailed, dynamic mixes that translate on every system. Our hybrid workflow blends the warmth of analog summing and outboard processing with the precision and recall of digital.',
    details: [
      'Hybrid analog/digital workflow',
      'Analog summing through Neve 8816',
      'Outboard compression & EQ on every bus',
      'Unlimited revisions until you\'re thrilled',
      'Stem delivery and alt mixes included',
    ],
    icon: 'mdi:tune-vertical',
  },
  {
    title: 'Mastering',
    description: 'The final step. We prepare your mixes for distribution: streaming, vinyl, CD, broadcast. Transparent loudness optimization or colored analog character, tailored to your vision.',
    details: [
      'Stereo and stem mastering',
      'Analog and digital processing chains',
      'Format-specific masters (streaming, vinyl, broadcast)',
      'DDP, WAV, and MP3 deliverables',
      'ISRC encoding & metadata',
    ],
    icon: 'mdi:disc',
  },
  {
    title: 'Production',
    description: 'From pre-production and arrangement to full beat production and songwriting sessions. We help translate your idea into a finished, polished record.',
    details: [
      'Songwriting & co-writing sessions',
      'Arrangement and orchestration',
      'Beat production & programming',
      'Session musician coordination',
      'Demo to master pipeline',
    ],
    icon: 'mdi:music-note-plus',
  },
  {
    title: 'Podcast & Voice-Over',
    description: 'Broadcast-quality recording in our whisper-quiet isolation booths. Whether it\'s a podcast series or a commercial voice-over, we deliver clean, professional audio.',
    details: [
      'Dedicated podcast recording setup',
      'Multi-host capability',
      'Professional editing and processing',
      'Remote guest recording coordination',
      'Delivery in all podcast formats',
    ],
    icon: 'mdi:podcast',
  },
  {
    title: 'Live Session Capture',
    description: 'Capture the raw energy of a live performance with multi-track audio recording. We coordinate with video teams for synced live session content.',
    details: [
      'Multi-track live recording',
      'Video team coordination',
      'Live mix for stream or broadcast',
      'Post-production mixing available',
      'Suitable for EPKs, social content, and more',
    ],
    icon: 'mdi:video-vintage',
  },
]

const cardsRef = ref<HTMLElement | null>(null)
useGsapReveal(cardsRef, { stagger: 0.12 })
</script>

<template>
  <div class="pt-24">
    <!-- Hero -->
    <section class="py-16 md:py-24 bg-forest text-cream">
      <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <p class="section-label !text-seafoam mb-4">What We Offer</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-none mb-6">
          Our <span class="text-salmon">Services</span>
        </h1>
        <p class="text-cream/70 text-lg md:text-xl max-w-2xl leading-relaxed">
          Full-service recording, mixing, mastering, and production, from first note to final master.
        </p>
      </div>
    </section>

    <UiTapeStrip />

    <!-- Services Grid -->
    <section class="py-16 md:py-24 bg-cream">
      <div v-gsap-container ref="cardsRef" class="gsap-reveal max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 space-y-8">
        <div
          v-for="service in services"
          :key="service.title"
          class="card-analog grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10"
        >
          <div class="lg:col-span-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-forest/10 rounded-retro flex items-center justify-center">
                <Icon :name="service.icon" class="w-5 h-5 text-forest" />
              </div>
              <h2 class="font-display text-2xl md:text-3xl">{{ service.title }}</h2>
            </div>
            <p class="text-ink/60 leading-relaxed">{{ service.description }}</p>
          </div>

          <div class="lg:col-span-2">
            <h4 class="font-mono text-xs uppercase tracking-[0.2em] text-forest mb-4">What's Included</h4>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <li
                v-for="detail in service.details"
                :key="detail"
                class="flex items-start gap-2 text-ink/70 text-sm"
              >
                <span class="w-1.5 h-1.5 bg-salmon rounded-full mt-1.5 flex-shrink-0" />
                {{ detail }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-20 bg-cream-dark text-center">
      <div class="max-w-[1440px] mx-auto px-5">
        <h2 class="heading-display mb-6">Let's <span class="text-salmon">Create</span></h2>
        <p class="text-ink/60 max-w-lg mx-auto mb-8">
          Every project is unique. Tell us about yours and we'll put together the right plan.
        </p>
        <NuxtLink to="/contact" class="btn-primary">Get in Touch</NuxtLink>
      </div>
    </section>
  </div>
</template>
