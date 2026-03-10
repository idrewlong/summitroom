<script setup lang="ts">
useSeoMeta({
  title: 'Gallery | The Summit Room | Inside the Studio',
  description: 'See inside The Summit Room. Photos of our live room, control room, vintage gear collection, and sessions in progress.',
})

const galleryItems = [
  { label: 'Control Room Overview', image: '/photos/untitled-19197.webp', span: 'md:col-span-2' },
  { label: 'API Console Detail', image: '/photos/untitled-19199.webp', span: '' },
  { label: 'Live Room: Drums', image: '/photos/untitled-19205.webp', span: '' },
  { label: 'Studer A800 Tape Machine', image: '/photos/untitled-19208.webp', span: '' },
  { label: 'Iso Booth A: Vocals', image: '/photos/untitled-19209.webp', span: '' },
  { label: 'Microphone Collection', image: '/photos/untitled-19211.webp', span: 'md:col-span-2' },
  { label: 'Outboard Rack: Compressors', image: '/photos/untitled-19219.webp', span: '' },
  { label: 'Live Session in Progress', image: '/photos/untitled-19224.webp', span: '' },
  { label: 'The Lounge', image: '/photos/untitled-19228.webp', span: '' },
  { label: 'Neve Preamp Detail', image: '/photos/untitled-19233.webp', span: '' },
  { label: 'Patchbay and Routing', image: '/photos/untitled-19235.webp', span: 'md:col-span-2' },
  { label: 'Guitar Amp Setup', image: '/photos/untitled-19236.webp', span: '' },
]

const gridRef = ref<HTMLElement | null>(null)
useGsapReveal(gridRef, { stagger: 0.08 })
</script>

<template>
  <div class="pt-24">
    <!-- Hero -->
    <section class="py-16 md:py-24 bg-forest text-cream">
      <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <p class="section-label !text-seafoam mb-4">Inside the Room</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-none mb-6">
          The <span class="text-salmon">Gallery</span>
        </h1>
        <p class="text-cream/70 text-lg md:text-xl max-w-2xl leading-relaxed">
          A look inside our spaces, gear, and sessions. Every corner of The Summit Room was built to inspire.
        </p>
      </div>
    </section>

    <UiTapeStrip />

    <!-- Gallery Grid -->
    <section class="py-16 md:py-24 bg-cream">
      <div v-gsap-container ref="gridRef" class="gsap-reveal max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="item in galleryItems"
            :key="item.label"
            class="group relative overflow-hidden rounded-retro border-2 border-ink cursor-pointer h-56 md:h-64"
            :class="item.span"
          >
            <NuxtImg
              :src="item.image"
              :alt="item.label"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              sizes="xs:100vw sm:100vw md:50vw lg:33vw"
            />
            <div class="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-all duration-300 flex items-end p-5">
              <span class="font-mono text-xs uppercase tracking-[0.2em] text-cream opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                {{ item.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
