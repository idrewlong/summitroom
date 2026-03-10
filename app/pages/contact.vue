<script setup lang="ts">
useSeoMeta({
  title: 'Contact & Booking | The Summit Room | Nashville',
  description: 'Ready to record? Get in touch to book a session, schedule a tour, or ask about availability at The Summit Room in Nashville.',
})

const config = useRuntimeConfig()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  project: '',
  budget: '',
  timeline: '',
  message: '',
})

function handleSubmit() {
  const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProject: ${form.project}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\n${form.message}`
  const mailtoLink = `mailto:${config.public.studioEmail}?subject=Studio Inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(body)}`
  window.open(mailtoLink)
}

const formRef = ref<HTMLElement | null>(null)
useGsapReveal(formRef, { stagger: 0.08 })
</script>

<template>
  <div class="pt-24">
    <!-- Hero -->
    <section class="py-16 md:py-24 bg-forest text-cream">
      <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <p class="section-label !text-seafoam mb-4">Let's Talk</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-none mb-6">
          Get in <span class="text-salmon">Touch</span>
        </h1>
        <p class="text-cream/70 text-lg md:text-xl max-w-2xl leading-relaxed">
          Ready to record? Have questions? Drop us a line. We'd love to hear about your project.
        </p>
      </div>
    </section>

    <UiTapeStrip />

    <!-- Contact Content -->
    <section class="py-16 md:py-24 bg-cream">
      <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <!-- Contact Info Sidebar -->
          <div class="lg:col-span-2">
            <h2 class="heading-display mb-8">Studio<br /><span class="text-salmon">Info</span></h2>

            <div class="space-y-6 mb-10">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-forest/10 rounded-retro flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:email-outline" class="w-5 h-5 text-forest" />
                </div>
                <div>
                  <p class="font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-1">Email</p>
                  <a :href="`mailto:${config.public.studioEmail}`" class="text-ink hover:text-salmon transition-colors font-medium">
                    {{ config.public.studioEmail }}
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-forest/10 rounded-retro flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:phone-outline" class="w-5 h-5 text-forest" />
                </div>
                <div>
                  <p class="font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-1">Phone</p>
                  <a :href="`tel:${config.public.studioPhone}`" class="text-ink hover:text-salmon transition-colors font-medium">
                    {{ config.public.studioPhone }}
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-forest/10 rounded-retro flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:map-marker-outline" class="w-5 h-5 text-forest" />
                </div>
                <div>
                  <p class="font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-1">Address</p>
                  <p class="text-ink font-medium">{{ config.public.studioAddress }}</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-forest/10 rounded-retro flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:clock-outline" class="w-5 h-5 text-forest" />
                </div>
                <div>
                  <p class="font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-1">Hours</p>
                  <p class="text-ink font-medium">Mon – Sun: 9am – 11pm</p>
                  <p class="text-ink/50 text-sm">By appointment only</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-4">Follow Us</p>
              <div class="flex gap-3">
                <a href="https://www.instagram.com/thesummitroom" target="_blank" rel="noopener" class="w-10 h-10 bg-forest/10 rounded-retro flex items-center justify-center hover:bg-salmon hover:text-cream transition-all" aria-label="Instagram">
                  <Icon name="mdi:instagram" class="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/thesummitroom" target="_blank" rel="noopener" class="w-10 h-10 bg-forest/10 rounded-retro flex items-center justify-center hover:bg-salmon hover:text-cream transition-all" aria-label="Facebook">
                  <Icon name="mdi:facebook" class="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@thesummitroom" target="_blank" rel="noopener" class="w-10 h-10 bg-forest/10 rounded-retro flex items-center justify-center hover:bg-salmon hover:text-cream transition-all" aria-label="YouTube">
                  <Icon name="mdi:youtube" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div v-gsap-container ref="formRef" class="gsap-reveal lg:col-span-3">
            <div class="card-analog">
              <h3 class="font-display text-2xl mb-6">Send Us a Message</h3>

              <form class="space-y-5" @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label for="contact-name" class="block font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-2">Name *</label>
                    <input
                      id="contact-name"
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full bg-cream-dark border border-ink/15 rounded-retro px-4 py-3 text-ink placeholder-ink/30 focus:border-forest focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label for="contact-email" class="block font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-2">Email *</label>
                    <input
                      id="contact-email"
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full bg-cream-dark border border-ink/15 rounded-retro px-4 py-3 text-ink placeholder-ink/30 focus:border-forest focus:outline-none transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label for="contact-phone" class="block font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-2">Phone</label>
                    <input
                      id="contact-phone"
                      v-model="form.phone"
                      type="tel"
                      class="w-full bg-cream-dark border border-ink/15 rounded-retro px-4 py-3 text-ink placeholder-ink/30 focus:border-forest focus:outline-none transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label for="contact-project" class="block font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-2">Project Type</label>
                    <select
                      id="contact-project"
                      v-model="form.project"
                      class="w-full bg-cream-dark border border-ink/15 rounded-retro px-4 py-3 text-ink focus:border-forest focus:outline-none transition-colors"
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="recording">Recording</option>
                      <option value="mixing">Mixing</option>
                      <option value="mastering">Mastering</option>
                      <option value="production">Production</option>
                      <option value="podcast">Podcast / Voice-Over</option>
                      <option value="live">Live Session</option>
                      <option value="tour">Studio Tour</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label for="contact-budget" class="block font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-2">Budget Range</label>
                    <select
                      id="contact-budget"
                      v-model="form.budget"
                      class="w-full bg-cream-dark border border-ink/15 rounded-retro px-4 py-3 text-ink focus:border-forest focus:outline-none transition-colors"
                    >
                      <option value="" disabled>Select range</option>
                      <option value="under-500">Under $500</option>
                      <option value="500-1500">$500 – $1,500</option>
                      <option value="1500-5000">$1,500 – $5,000</option>
                      <option value="5000+">$5,000+</option>
                    </select>
                  </div>
                  <div>
                    <label for="contact-timeline" class="block font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-2">Timeline</label>
                    <input
                      id="contact-timeline"
                      v-model="form.timeline"
                      type="text"
                      class="w-full bg-cream-dark border border-ink/15 rounded-retro px-4 py-3 text-ink placeholder-ink/30 focus:border-forest focus:outline-none transition-colors"
                      placeholder="e.g., Next 2 weeks"
                    />
                  </div>
                </div>

                <div>
                  <label for="contact-message" class="block font-mono text-xs uppercase tracking-[0.2em] text-ink/50 mb-2">Message *</label>
                  <textarea
                    id="contact-message"
                    v-model="form.message"
                    rows="5"
                    required
                    class="w-full bg-cream-dark border border-ink/15 rounded-retro px-4 py-3 text-ink placeholder-ink/30 focus:border-forest focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project, goals, and any specific needs..."
                  />
                </div>

                <button type="submit" class="btn-primary w-full justify-center">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
