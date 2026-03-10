<script setup lang="ts">
const config = useRuntimeConfig()
const formRef = ref<HTMLElement | null>(null)
useGsapReveal(formRef, { stagger: 0.1 })

const form = reactive({
  name: '',
  email: '',
  project: '',
  message: '',
})

function handleSubmit() {
  // In production, wire this to an API endpoint or form service
  const mailtoLink = `mailto:${config.public.studioEmail}?subject=Studio Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}`
  window.open(mailtoLink)
}
</script>

<template>
  <section id="contact" class="py-20 md:py-32 bg-forest text-cream relative overflow-hidden">
    <!-- Subtle grid overlay -->
    <div
      class="absolute inset-0 opacity-30"
      style="
        background-image:
          linear-gradient(rgba(250, 248, 236, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(250, 248, 236, 0.03) 1px, transparent 1px);
        background-size: 40px 40px;
      "
    />

    <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <!-- Left: Info -->
        <div>
          <p class="section-label !text-seafoam mb-4">Get in Touch</p>
          <h2 class="font-display text-4xl md:text-6xl text-cream leading-none mb-6">
            Ready to<br />
            <span class="text-salmon">Record?</span>
          </h2>
          <p class="text-cream/70 text-lg leading-relaxed mb-10 max-w-md">
            Whether you're tracking a full album or laying down a single,
            we'd love to hear about your project. Drop us a line and let's make something great.
          </p>

          <div class="space-y-4 text-cream/80">
            <div class="flex items-center gap-3">
              <Icon name="mdi:email-outline" class="w-5 h-5 text-seafoam" />
              <a :href="`mailto:${config.public.studioEmail}`" class="hover:text-salmon transition-colors">
                {{ config.public.studioEmail }}
              </a>
            </div>
            <div class="flex items-center gap-3">
              <Icon name="mdi:phone-outline" class="w-5 h-5 text-seafoam" />
              <a :href="`tel:${config.public.studioPhone}`" class="hover:text-salmon transition-colors">
                {{ config.public.studioPhone }}
              </a>
            </div>
            <div class="flex items-center gap-3">
              <Icon name="mdi:map-marker-outline" class="w-5 h-5 text-seafoam" />
              <span>{{ config.public.studioAddress }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div v-gsap-container ref="formRef" class="gsap-reveal">
          <form class="space-y-5" @submit.prevent="handleSubmit">
            <div>
              <label for="name" class="block font-mono text-xs uppercase tracking-[0.2em] text-seafoam mb-2">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full bg-forest-dark/50 border border-cream/20 rounded-retro px-4 py-3 text-cream placeholder-cream/30 focus:border-salmon focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label for="email" class="block font-mono text-xs uppercase tracking-[0.2em] text-seafoam mb-2">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full bg-forest-dark/50 border border-cream/20 rounded-retro px-4 py-3 text-cream placeholder-cream/30 focus:border-salmon focus:outline-none transition-colors"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label for="project" class="block font-mono text-xs uppercase tracking-[0.2em] text-seafoam mb-2">Project Type</label>
              <select
                id="project"
                v-model="form.project"
                class="w-full bg-forest-dark/50 border border-cream/20 rounded-retro px-4 py-3 text-cream focus:border-salmon focus:outline-none transition-colors"
              >
                <option value="" disabled>Select a service</option>
                <option value="recording">Recording</option>
                <option value="mixing">Mixing</option>
                <option value="mastering">Mastering</option>
                <option value="production">Production</option>
                <option value="podcast">Podcast / VO</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label for="message" class="block font-mono text-xs uppercase tracking-[0.2em] text-seafoam mb-2">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                required
                class="w-full bg-forest-dark/50 border border-cream/20 rounded-retro px-4 py-3 text-cream placeholder-cream/30 focus:border-salmon focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button type="submit" class="btn-primary w-full justify-center">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
