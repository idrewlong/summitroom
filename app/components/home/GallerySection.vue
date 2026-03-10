<script setup lang="ts">
const galleryRef = ref<HTMLElement | null>(null)
useGsapReveal(galleryRef, { stagger: 0.12 })

const galleryItems = [
  { label: 'Control Room', image: '/photos/untitled-19197.webp' },
  { label: 'Live Room', image: '/photos/untitled-19199.webp' },
  { label: 'Session in Progress', image: '/photos/untitled-19205.webp' },
  { label: 'Iso Booth A', image: '/photos/untitled-19208.webp' },
  { label: 'Vintage Rack Gear', image: '/photos/untitled-19209.webp' },
  { label: 'The Lounge', image: '/photos/untitled-19211.webp' },
]
</script>

<template>
  <section class="py-20 md:py-32 bg-cream">
    <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
      <div class="text-center mb-16">
        <UiSectionLabel text="Inside the Room" />
        <h2 class="heading-display">
          The <span class="text-salmon">Gallery</span>
        </h2>
      </div>

      <div v-gsap-container ref="galleryRef" class="gsap-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(item, index) in galleryItems"
          :key="item.label"
          class="group relative overflow-hidden rounded-retro border-2 border-ink cursor-pointer"
          :class="index === 0 ? 'md:col-span-2 md:row-span-2 h-64 md:h-auto md:min-h-[320px]' : 'h-48 md:h-56'"
        >
          <NuxtImg
            :src="item.image"
            :alt="item.label"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            sizes="xs:100vw sm:100vw md:50vw lg:33vw"
          />
          <!-- Overlay with label -->
          <div class="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-all duration-300 flex items-end p-4">
            <span class="font-mono text-xs uppercase tracking-[0.2em] text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <NuxtLink to="/gallery" class="btn-ghost">
          View Full Gallery
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
