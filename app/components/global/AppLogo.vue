<script setup lang="ts">
defineProps<{
	variant?: 'primary' | 'alt' | 'inline';
	class?: string;
}>();
</script>

<template>
	<NuxtImg
		v-if="variant === 'alt'"
		src="/whitealtlogo.webp"
		alt="The Summit Room"
		:class="$props.class"
		loading="eager"
	/>
	<NuxtImg v-else src="/altlogo.webp" alt="The Summit Room" :class="$props.class" loading="eager" />
</template>
