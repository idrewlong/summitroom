<script setup lang="ts">
const config = useRuntimeConfig();
const currentYear = new Date().getFullYear();

const navLinks = [
	{ label: 'Studio', to: '/studio' },
	{ label: 'Services', to: '/services' },
	{ label: 'Gallery', to: '/gallery' },
	{ label: 'Gear', to: '/gear' },
	{ label: 'Rates', to: '/rates' },
	{ label: 'Contact', to: '/contact' },
];
</script>

<template>
	<footer class="bg-forest-dark text-cream">
		<!-- Tape Strip Top -->
		<div class="tape-strip" />

		<div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-20">
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
			>
				<!-- Brand Column -->
				<div class="lg:col-span-1">
					<AppLogo variant="alt" class="h-16 mb-6" />
					<p class="text-cream/70 text-sm leading-relaxed max-w-xs">
						Analog warmth. Digital precision. A room built for records that move
						people.
					</p>
				</div>

				<!-- Navigation -->
				<div>
					<h4
						class="font-mono text-xs uppercase tracking-[0.3em] text-seafoam mb-6"
					>
						Navigate
					</h4>
					<ul class="space-y-3">
						<li v-for="link in navLinks" :key="link.to">
							<NuxtLink
								:to="link.to"
								class="text-cream/70 hover:text-salmon transition-colors duration-200 text-sm"
							>
								{{ link.label }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<!-- Contact Info -->
				<div>
					<h4
						class="font-mono text-xs uppercase tracking-[0.3em] text-seafoam mb-6"
					>
						Contact
					</h4>
					<ul class="space-y-3 text-sm text-cream/70">
						<li>
							<a
								:href="`mailto:${config.public.studioEmail}`"
								class="hover:text-salmon transition-colors"
							>
								{{ config.public.studioEmail }}
							</a>
						</li>
						<li>
							<a
								:href="`tel:${config.public.studioPhone}`"
								class="hover:text-salmon transition-colors"
							>
								{{ config.public.studioPhone }}
							</a>
						</li>
						<li>{{ config.public.studioAddress }}</li>
					</ul>
				</div>

				<!-- Hours & Social -->
				<div>
					<h4
						class="font-mono text-xs uppercase tracking-[0.3em] text-seafoam mb-6"
					>
						Studio Hours
					</h4>
					<ul class="space-y-2 text-sm text-cream/70 mb-8">
						<li>Mon – Sun: 9am – 11pm</li>
						<li class="text-cream/50 text-xs">By appointment only</li>
					</ul>

					<h4
						class="font-mono text-xs uppercase tracking-[0.3em] text-seafoam mb-4"
					>
						Follow
					</h4>
					<div class="flex gap-4">
						<a
							href="https://www.instagram.com/thesummitroom"
							target="_blank"
							rel="noopener"
							class="text-cream/60 hover:text-salmon transition-colors"
							aria-label="Instagram"
						>
							<Icon name="mdi:instagram" class="w-5 h-5" />
						</a>
						<a
							href="https://www.facebook.com/thesummitroom"
							target="_blank"
							rel="noopener"
							class="text-cream/60 hover:text-salmon transition-colors"
							aria-label="Facebook"
						>
							<Icon name="mdi:facebook" class="w-5 h-5" />
						</a>
						<a
							href="https://www.youtube.com/@thesummitroom"
							target="_blank"
							rel="noopener"
							class="text-cream/60 hover:text-salmon transition-colors"
							aria-label="YouTube"
						>
							<Icon name="mdi:youtube" class="w-5 h-5" />
						</a>
					</div>
				</div>
			</div>

			<!-- Bottom Bar -->
			<div
				class="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4"
			>
				<p class="text-cream/40 text-xs font-mono">
					&copy; {{ currentYear }} The Summit Room. All rights reserved.
				</p>
				<p class="text-cream/30 text-xs font-mono">Nashville, Tennessee</p>
			</div>
		</div>
	</footer>
</template>
