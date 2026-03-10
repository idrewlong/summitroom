<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    message: string
  }
}>()

const handleClearError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen bg-cream flex items-center justify-center px-5">
    <div class="text-center max-w-lg">
      <p class="font-mono text-xs uppercase tracking-[0.3em] text-forest mb-4">Error {{ error.statusCode }}</p>
      <h1 class="font-display text-6xl md:text-8xl text-ink mb-4">
        {{ error.statusCode === 404 ? 'Lost Signal' : 'Bad Tape' }}
      </h1>
      <p class="text-ink/60 text-lg mb-8 leading-relaxed">
        {{ error.statusCode === 404
          ? 'The page you\'re looking for doesn\'t exist, like a track that got erased.'
          : 'Something went wrong on our end. We\'re on it.'
        }}
      </p>
      <button class="btn-primary" @click="handleClearError">
        Back to Home
      </button>
    </div>
  </div>
</template>
