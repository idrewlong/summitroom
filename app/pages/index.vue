<script setup lang="ts">
useSeoMeta({
  title: 'The Summit Room | Nashville Recording Studio',
  ogTitle: 'The Summit Room | Nashville Recording Studio',
  description: 'Analog warmth meets digital precision. Book your next session at Nashville\'s premier recording studio. World-class gear, experienced engineers, creative energy.',
  ogDescription: 'Analog warmth meets digital precision. Book your next session at Nashville\'s premier recording studio.',
  ogUrl: 'https://thesummitroom.com',
  twitterCard: 'summary_large_image',
})

useHead({
  title: 'The Summit Room | Nashville Recording Studio',
})
</script>

<template>
  <div>
    <HomeHeroSection />
    <UiTapeStrip />
    <HomeAboutSection />
    <HomeServicesSection />
    <HomeGallerySection />
    <HomeGearSection />
    <HomeTestimonialsSection />
    <HomeContactSection />
  </div>
</template>
