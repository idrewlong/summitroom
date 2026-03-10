<script setup lang="ts">
defineProps<{
  level?: number
}>()
</script>

<template>
  <div class="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
    <div
      class="vu-bar h-full transition-all duration-700 ease-out rounded-full"
      :style="{ width: `${level ?? 75}%` }"
    />
  </div>
</template>
