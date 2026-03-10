<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null);
useGsapReveal(sectionRef);
</script>

<template>
	<section class="py-20 md:py-32 bg-cream">
		<div v-gsap-container ref="sectionRef" class="gsap-reveal max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
			<div
				class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
			>
				<!-- Text Content -->
				<div>
					<UiSectionLabel text="About the Room" />
					<h2 class="heading-display mb-6">
						Built for the<br />
						<span class="text-salmon">Sound</span>
					</h2>
					<p class="text-ink/70 text-lg leading-relaxed mb-6">
						The Summit Room is more than a recording studio. It's a creative
						sanctuary in the heart of Nashville's Music Row. Built from the
						ground up with acoustics in mind, every surface, every angle, every
						material was chosen to serve one purpose: making records that move
						people.
					</p>
					<p class="text-ink/70 leading-relaxed mb-8">
						Our room pairs the warmth of vintage analog equipment with the
						precision of a modern digital workflow. From the hand-wired preamps
						to the tuned live room, every detail has been obsessed over, so you
						can focus on what matters: the music.
					</p>

					<div class="flex flex-wrap gap-6">
						<div class="text-center">
							<span class="block font-display text-4xl text-forest">15+</span>
							<span
								class="font-mono text-xs uppercase tracking-[0.2em] text-ink/50"
								>Years Experience</span
							>
						</div>
						<div class="text-center">
							<span class="block font-display text-4xl text-forest">500+</span>
							<span
								class="font-mono text-xs uppercase tracking-[0.2em] text-ink/50"
								>Projects</span
							>
						</div>
						<div class="text-center">
							<span class="block font-display text-4xl text-forest">3</span>
							<span
								class="font-mono text-xs uppercase tracking-[0.2em] text-ink/50"
								>Iso Booths</span
							>
						</div>
					</div>
				</div>

				<!-- Image -->
				<div class="relative">
					<div class="card-analog p-0! overflow-hidden">
						<NuxtImg
							src="/photos/untitled-19205.webp"
							alt="Inside The Summit Room"
							class="w-full h-80 md:h-[480px] object-cover"
							loading="lazy"
							sizes="xs:100vw sm:100vw md:100vw lg:50vw xl:50vw"
						/>
					</div>
					<!-- Decorative offset -->
					<div
						class="absolute -bottom-4 -right-4 w-full h-full border-2 border-seafoam rounded-retro -z-10"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
