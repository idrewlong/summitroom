<script setup lang="ts">
const testimonialsRef = ref<HTMLElement | null>(null)
useGsapReveal(testimonialsRef, { stagger: 0.2 })

const testimonials = [
  {
    quote: 'The Summit Room captured a vibe we\'d been chasing for years. The room sounds incredible, and the engineer knew exactly how to translate our vision into the mix.',
    name: 'Marcus Cole',
    role: 'Singer-Songwriter',
  },
  {
    quote: 'Best studio experience I\'ve had in Nashville. The gear is top-shelf, the acoustics are dialed, and the team makes you feel right at home from the first note.',
    name: 'Sarah Jin',
    role: 'Producer / Artist',
  },
  {
    quote: 'We tracked our entire album here in five days. The workflow is seamless: analog warmth going in, pristine digital coming out. Can\'t recommend it enough.',
    name: 'The River Foxes',
    role: 'Indie Folk Band',
  },
]
</script>

<template>
  <section class="py-20 md:py-32 bg-cream-dark">
    <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
      <div class="text-center mb-16">
        <UiSectionLabel text="Kind Words" />
        <h2 class="heading-display">
          What Artists <span class="text-salmon">Say</span>
        </h2>
      </div>

      <div v-gsap-container ref="testimonialsRef" class="gsap-reveal grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="card-analog relative"
        >
          <!-- Big quotation mark -->
          <span class="absolute -top-3 -left-1 font-display text-6xl text-salmon/20 leading-none select-none">"</span>

          <blockquote class="text-ink/70 text-sm leading-relaxed mb-6 relative z-10 pt-4">
            {{ testimonial.quote }}
          </blockquote>

          <div class="border-t border-ink/10 pt-4">
            <p class="font-body font-bold text-sm">{{ testimonial.name }}</p>
            <p class="font-mono text-xs text-ink/50 uppercase tracking-wider">{{ testimonial.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
