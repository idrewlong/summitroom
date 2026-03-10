<script setup lang="ts">
const cardsRef = ref<HTMLElement | null>(null)
useGsapReveal(cardsRef, { stagger: 0.2 })

const services = [
  { title: 'Recording', description: 'Full-band tracking in our tuned live room with world-class microphones and preamps. Analog signal chain, digital capture.', icon: 'mdi:microphone-variant' },
  { title: 'Mixing', description: 'Detailed, dynamic mixes that translate everywhere. Hybrid workflow blending analog summing with digital precision.', icon: 'mdi:tune-vertical' },
  { title: 'Mastering', description: 'Final polish and loudness optimization for streaming, vinyl, and broadcast. Transparent or colored, your call.', icon: 'mdi:disc' },
  { title: 'Production', description: 'From songwriting sessions to full arrangement and beat production. We help shape your vision from concept to master.', icon: 'mdi:music-note-plus' },
  { title: 'Podcast & VO', description: 'Broadcast-quality podcast recording and voice-over sessions in our whisper-quiet iso booths.', icon: 'mdi:podcast' },
  { title: 'Live Sessions', description: 'Capture the energy of a live performance with multi-track recording and professional video coordination.', icon: 'mdi:video-vintage' },
]
</script>

<template>
  <section class="py-20 md:py-32 bg-cream-dark relative overflow-hidden">
    <!-- Grid background pattern -->
    <div
      class="absolute inset-0 opacity-50"
      style="
        background-image:
          linear-gradient(rgba(45, 90, 64, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(45, 90, 64, 0.05) 1px, transparent 1px);
        background-size: 40px 40px;
      "
    />

    <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
      <div class="text-center mb-16">
        <UiSectionLabel text="What We Do" />
        <h2 class="heading-display">
          Our <span class="text-salmon">Services</span>
        </h2>
      </div>

      <div v-gsap-container ref="cardsRef" class="gsap-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="service in services"
          :key="service.title"
          class="card-analog group"
        >
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-forest/10 rounded-retro flex items-center justify-center flex-shrink-0 group-hover:bg-salmon/10 transition-colors">
              <Icon :name="service.icon" class="w-6 h-6 text-forest group-hover:text-salmon transition-colors" />
            </div>
            <div>
              <h3 class="font-body font-bold text-xl mb-2">{{ service.title }}</h3>
              <p class="text-ink/60 text-sm leading-relaxed">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <NuxtLink to="/services" class="btn-secondary">
          View All Services
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
