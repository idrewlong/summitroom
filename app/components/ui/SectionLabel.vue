<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <p class="section-label mb-4">{{ text }}</p>
</template>
