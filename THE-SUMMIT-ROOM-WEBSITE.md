# The Summit Room — Website Development Guide

> **Nashville's Premier Recording Studio**
> Built with Nuxt 4 · Tailwind CSS · GSAP · Modern Retro Analog Aesthetic

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Tech Stack & Module Config](#tech-stack--module-config)
3. [Tailwind Theme Configuration](#tailwind-theme-configuration)
4. [Typography System](#typography-system)
5. [Design System & Components](#design-system--components)
6. [Page Architecture](#page-architecture)
7. [GSAP Animation Strategy](#gsap-animation-strategy)
8. [SEO Strategy](#seo-strategy)
9. [Responsive / Mobile-First Approach](#responsive--mobile-first-approach)
10. [Asset & Image Strategy](#asset--image-strategy)
11. [Performance & Deployment Notes](#performance--deployment-notes)

---

## Brand Identity

### Color Palette — "Analog Jungle Groove"

| Role             | Name           | Hex       | Tailwind Token    | Usage                                                        |
| ---------------- | -------------- | --------- | ----------------- | ------------------------------------------------------------ |
| Light Shade      | Cream          | `#FAF8EC` | `cream`           | Page backgrounds, light text on dark surfaces                |
| Dark Accent      | Black          | `#0A0A0A` | `ink`             | Primary text, high-contrast elements, nav text               |
| Secondary        | Warm Salmon    | `#D4614A` | `salmon`          | CTAs, accent highlights, hover states, "THE" in logo         |
| Dark Shade       | Forest Green   | `#2D5A40` | `forest`          | Headers, nav backgrounds, section dividers, "SUMMIT" in logo |
| Main Color       | Seafoam Green  | `#A3CBBF` | `seafoam`         | Supporting backgrounds, card fills, decorative washes        |

### Logo Variations

The logo features a mountain silhouette with layered peaks (forest green over golden-yellow accents) sitting above the wordmark. Four lockups exist:

1. **Primary** — Cream background, salmon "THE" + forest "SUMMIT" + salmon "ROOM", mountain icon above
2. **Alternate Type** — Same colors, slightly different typographic treatment (rounder, more playful letterforms on "SUMMIT")
3. **Reversed on Green** — Full logo on a forest green background, cream text replaces salmon for "THE" and "ROOM"
4. **Horizontal / Inline** — Compact single-line lockup for headers and small spaces

Store all logo variants as optimized SVGs in `/public/images/logo/`:

```
/public/images/logo/
  summit-room-primary.svg
  summit-room-alt.svg
  summit-room-reversed.svg
  summit-room-inline.svg
  summit-room-icon-only.svg    ← mountain mark only (favicon / loader)
```

### Brand Voice

Warm, confident, rooted. Think vintage vinyl sleeve meets modern Nashville cool — not corporate, not hipster-ironic. Speak like a seasoned engineer who genuinely loves the craft. Short sentences. Let the room speak for itself.

---

## Tech Stack & Module Config

### `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    'nuxt-gtag',
    '@nuxt/icon',
    '@nuxt/image',
  ],

  // ─── Nuxt Fonts ───────────────────────────────────
  fonts: {
    families: [
      {
        name: 'Black Han Sans',
        provider: 'google',
        weights: [400],
      },
      {
        name: 'Nunito Sans',
        provider: 'google',
        weights: [300, 400, 600, 700, 800],
        styles: ['normal', 'italic'],
      },
      {
        name: 'DM Mono',
        provider: 'google',
        weights: [300, 400, 500],
      },
    ],
  },

  // ─── Nuxt SEO ─────────────────────────────────────
  site: {
    url: 'https://thesummitroom.com',
    name: 'The Summit Room',
    description: 'Nashville\'s premier analog-meets-digital recording studio. World-class gear, warm sound, creative energy.',
    defaultLocale: 'en',
  },

  // ─── Google Tag ───────────────────────────────────
  gtag: {
    id: 'G-XXXXXXXXXX', // Replace with real GA4 measurement ID
  },

  // ─── Nuxt Image ───────────────────────────────────
  image: {
    quality: 80,
    formats: ['avif', 'webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },

  // ─── App Head Defaults ────────────────────────────
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'theme-color', content: '#2D5A40' },
      ],
    },
  },

  // ─── Runtime Config ───────────────────────────────
  runtimeConfig: {
    public: {
      studioEmail: 'booking@thesummitroom.com',
      studioPhone: '(615) 555-0192',
      studioAddress: '123 Music Row, Nashville, TN 37203',
    },
  },
})
```

### GSAP Installation

```bash
npm install gsap
```

Create a Nuxt plugin at `plugins/gsap.client.ts`:

```typescript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText' // Club GreenSock — remove if unlicensed
import { CustomEase } from 'gsap/CustomEase'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, CustomEase)
  // gsap.registerPlugin(SplitText) // Uncomment if licensed

  // Global defaults — analog ease: slightly bouncy, warm deceleration
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })

  // Custom ease for the "tape reel" feel
  CustomEase.create('tapeReel', 'M0,0 C0.14,0 0.27,0.58 0.38,0.76 0.52,1 0.64,1 1,1')

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
```

---

## Tailwind Theme Configuration

### `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Config>{
  content: [
    './app/components/**/*.vue',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.ts',
    './app/plugins/**/*.ts',
    './app/app.vue',
  ],

  theme: {
    extend: {
      // ─── Brand Colors ──────────────────────────────
      colors: {
        cream:   '#FAF8EC',
        ink:     '#0A0A0A',
        salmon:  '#D4614A',
        forest:  '#2D5A40',
        seafoam: '#A3CBBF',

        // Derived shades for flexibility
        'forest-light': '#3A7A56',
        'forest-dark':  '#1E3F2D',
        'salmon-light': '#E07A66',
        'salmon-dark':  '#B84D38',
        'seafoam-light':'#C2DDD5',
        'seafoam-dark': '#7FB3A3',
        'cream-dark':   '#F0EDDA',
      },

      // ─── Typography ────────────────────────────────
      fontFamily: {
        display: ['"Black Han Sans"', ...defaultTheme.fontFamily.sans],
        body:    ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
        mono:    ['"DM Mono"', ...defaultTheme.fontFamily.mono],
      },

      // ─── Spacing & Sizing ─────────────────────────
      maxWidth: {
        'site': '1440px',
      },

      // ─── Border Radius (retro-rounded) ────────────
      borderRadius: {
        'retro': '0.375rem',    // subtle rounding
        'badge': '9999px',      // pill shape for tags
      },

      // ─── Box Shadow (analog warmth) ────────────────
      boxShadow: {
        'analog':   '4px 4px 0px 0px #0A0A0A',
        'analog-sm':'2px 2px 0px 0px #0A0A0A',
        'analog-lg':'8px 8px 0px 0px #0A0A0A',
        'glow':     '0 0 30px rgba(163, 203, 191, 0.3)',
      },

      // ─── Background Patterns (via CSS) ─────────────
      backgroundImage: {
        'noise': "url('/images/textures/noise-light.png')",
        'grid-lines': `
          linear-gradient(rgba(45, 90, 64, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(45, 90, 64, 0.05) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },

      // ─── Keyframe Animations ───────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'tape-spin': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'vhs-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.97' },
          '75%':      { opacity: '0.99' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':      { transform: 'translate(-2%, -2%)' },
          '30%':      { transform: 'translate(1%, -3%)' },
          '50%':      { transform: 'translate(-1%, 2%)' },
          '70%':      { transform: 'translate(3%, 1%)' },
          '90%':      { transform: 'translate(-2%, 3%)' },
        },
      },
      animation: {
        'fade-up':     'fade-up 0.6s ease-out forwards',
        'tape-spin':   'tape-spin 4s linear infinite',
        'vhs-flicker': 'vhs-flicker 0.15s infinite',
        'grain':       'grain 8s steps(10) infinite',
      },
    },
  },

  plugins: [],
}
```

### Global CSS — `assets/css/main.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Base Layer ─────────────────────────────────── */
@layer base {
  html {
    @apply bg-cream text-ink antialiased;
    scroll-behavior: smooth;
  }

  body {
    @apply font-body text-base leading-relaxed;
  }

  ::selection {
    @apply bg-forest text-cream;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    @apply w-2;
  }
  ::-webkit-scrollbar-track {
    @apply bg-cream;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-forest/40 rounded-full;
  }

  /* Smooth scroll anchor offset for fixed nav */
  [id] {
    scroll-margin-top: 5rem;
  }
}

/* ─── Component Layer ────────────────────────────── */
@layer components {
  /* Retro bordered card */
  .card-analog {
    @apply bg-cream border-2 border-ink shadow-analog
           rounded-retro p-6 transition-transform duration-300;
  }
  .card-analog:hover {
    @apply -translate-x-0.5 -translate-y-0.5 shadow-analog-lg;
  }

  /* CTA Button — Primary */
  .btn-primary {
    @apply inline-flex items-center gap-2 px-6 py-3
           bg-salmon text-cream font-body font-bold text-sm uppercase tracking-widest
           border-2 border-ink shadow-analog-sm rounded-retro
           transition-all duration-200;
  }
  .btn-primary:hover {
    @apply bg-salmon-dark -translate-x-0.5 -translate-y-0.5 shadow-analog;
  }

  /* CTA Button — Secondary */
  .btn-secondary {
    @apply inline-flex items-center gap-2 px-6 py-3
           bg-forest text-cream font-body font-bold text-sm uppercase tracking-widest
           border-2 border-ink shadow-analog-sm rounded-retro
           transition-all duration-200;
  }
  .btn-secondary:hover {
    @apply bg-forest-light -translate-x-0.5 -translate-y-0.5 shadow-analog;
  }

  /* Ghost / Outline button */
  .btn-ghost {
    @apply inline-flex items-center gap-2 px-6 py-3
           bg-transparent text-ink font-body font-bold text-sm uppercase tracking-widest
           border-2 border-ink rounded-retro
           transition-all duration-200;
  }
  .btn-ghost:hover {
    @apply bg-ink text-cream;
  }

  /* Section divider — tape strip */
  .tape-strip {
    @apply w-full h-1.5 bg-gradient-to-r from-forest via-seafoam to-salmon opacity-80;
  }

  /* Film grain overlay (apply to parent with relative positioning) */
  .grain-overlay::after {
    content: '';
    @apply absolute inset-0 pointer-events-none opacity-[0.03] z-50;
    background-image: url('/images/textures/noise-light.png');
    background-size: 200px 200px;
    animation: grain 8s steps(10) infinite;
  }

  /* VU meter accent bar */
  .vu-bar {
    @apply h-1 rounded-full;
    background: linear-gradient(90deg, #2D5A40 0%, #A3CBBF 40%, #D4614A 80%, #D4614A 100%);
  }

  /* Section label (small caps utility) */
  .section-label {
    @apply font-mono text-xs uppercase tracking-[0.3em] text-forest;
  }

  /* Display heading */
  .heading-display {
    @apply font-display text-4xl md:text-6xl lg:text-7xl text-ink leading-none;
  }
}

/* ─── Utility Layer ──────────────────────────────── */
@layer utilities {
  /* Text balance for headings */
  .text-balance {
    text-wrap: balance;
  }

  /* Retro underline accent */
  .underline-salmon {
    text-decoration: underline;
    text-decoration-color: #D4614A;
    text-underline-offset: 6px;
    text-decoration-thickness: 3px;
  }
}
```

---

## Typography System

### Font Assignments

| Element                      | Font              | Weight      | Notes                                           |
| ---------------------------- | ----------------- | ----------- | ----------------------------------------------- |
| Logo wordmark                | Black Han Sans    | 400         | Display only — logo SVG, not rendered as text    |
| Section headings (H1–H2)    | Black Han Sans    | 400         | `.font-display` — all caps where appropriate     |
| Sub-headings (H3–H4)        | Nunito Sans       | 700–800     | `.font-body font-bold` / `font-extrabold`        |
| Body copy                    | Nunito Sans       | 400         | `.font-body` — comfortable 16–18px base          |
| Labels, tags, meta           | DM Mono           | 400         | `.font-mono` — small caps, wide tracking         |
| Button text                  | Nunito Sans       | 700         | All caps, `tracking-widest`                      |

### Type Scale (Tailwind classes)

```
Hero headline   → text-5xl sm:text-6xl md:text-7xl lg:text-8xl  (font-display)
Page title      → text-4xl md:text-5xl lg:text-6xl              (font-display)
Section heading → text-3xl md:text-4xl                          (font-display)
Card title      → text-xl md:text-2xl                           (font-body font-bold)
Body            → text-base md:text-lg                          (font-body)
Small / Caption → text-sm                                       (font-body)
Label           → text-xs uppercase tracking-[0.3em]            (font-mono)
```

---

## Design System & Components

### Directory Structure (Nuxt 4)

```
app/
├── assets/
│   ├── css/
│   │   └── main.css
│   └── images/
│       └── textures/
│           └── noise-light.png
├── components/
│   ├── global/
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── AppLogo.vue
│   │   └── MobileNav.vue
│   ├── home/
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── GearSection.vue
│   │   ├── GallerySection.vue
│   │   ├── ServicesSection.vue
│   │   ├── TestimonialsSection.vue
│   │   └── ContactSection.vue
│   └── ui/
│       ├── ButtonPrimary.vue
│       ├── ButtonSecondary.vue
│       ├── CardAnalog.vue
│       ├── SectionLabel.vue
│       ├── TapeStrip.vue
│       ├── VuMeter.vue
│       ├── GrainOverlay.vue
│       └── AnimatedCounter.vue
├── composables/
│   ├── useGsapReveal.ts
│   ├── useGsapParallax.ts
│   └── useGsapSplitText.ts
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   ├── studio.vue
│   ├── services.vue
│   ├── gallery.vue
│   ├── gear.vue
│   ├── rates.vue
│   └── contact.vue
├── plugins/
│   └── gsap.client.ts
├── app.vue
└── error.vue
```

### Key Component Blueprints

#### `components/global/AppHeader.vue`

```vue
<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { label: 'Studio', to: '/studio' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Gear', to: '/gear' },
  { label: 'Rates', to: '/rates' },
  { label: 'Contact', to: '/contact' },
]

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 40
  })
})

watch(() => route.fullPath, () => {
  isOpen.value = false
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="isScrolled
      ? 'bg-cream/95 backdrop-blur-md shadow-md py-3'
      : 'bg-transparent py-5'"
  >
    <div class="max-w-site mx-auto px-5 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" aria-label="The Summit Room — Home">
        <AppLogo
          :variant="isScrolled ? 'inline' : 'inline'"
          class="h-10 md:h-12 transition-all duration-300"
        />
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-8" aria-label="Main navigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="font-mono text-xs uppercase tracking-[0.2em] text-ink/80
                 hover:text-salmon transition-colors duration-200
                 relative after:absolute after:bottom-0 after:left-0
                 after:w-0 hover:after:w-full after:h-0.5 after:bg-salmon
                 after:transition-all after:duration-300"
          active-class="text-salmon after:w-full"
        >
          {{ link.label }}
        </NuxtLink>

        <NuxtLink to="/contact" class="btn-primary text-xs py-2 px-4">
          Book a Session
        </NuxtLink>
      </nav>

      <!-- Mobile Hamburger -->
      <button
        class="lg:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
        @click="isOpen = !isOpen"
      >
        <span
          class="block w-6 h-0.5 bg-ink transition-all duration-300 origin-center"
          :class="isOpen ? 'rotate-45 translate-y-2' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-ink transition-all duration-300"
          :class="isOpen ? 'opacity-0' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-ink transition-all duration-300 origin-center"
          :class="isOpen ? '-rotate-45 -translate-y-2' : ''"
        />
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 -translate-y-4"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isOpen"
        class="lg:hidden absolute top-full left-0 right-0
               bg-forest text-cream px-5 py-8 space-y-4
               border-t-4 border-salmon"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block font-display text-2xl hover:text-seafoam transition-colors"
          active-class="text-salmon"
        >
          {{ link.label }}
        </NuxtLink>
        <div class="tape-strip !h-0.5 opacity-40 my-4" />
        <NuxtLink to="/contact" class="btn-primary w-full justify-center">
          Book a Session
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>
```

#### `components/home/HeroSection.vue`

```vue
<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp()
const heroRef = ref<HTMLElement | null>(null)
const headlineRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!$gsap) return

  const tl = $gsap.timeline({ defaults: { ease: 'tapeReel' } })

  tl.from(headlineRef.value, {
    y: 60,
    opacity: 0,
    duration: 1,
  })
  .from(subRef.value, {
    y: 40,
    opacity: 0,
    duration: 0.8,
  }, '-=0.5')
  .from(ctaRef.value, {
    y: 30,
    opacity: 0,
    duration: 0.6,
  }, '-=0.4')

  // Parallax on hero background
  $gsap.to('.hero-bg', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
})
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex items-center overflow-hidden"
  >
    <!-- Background Image with Parallax -->
    <div class="hero-bg absolute inset-0 z-0">
      <NuxtImg
        src="/images/hero-studio.jpg"
        alt="The Summit Room control room — vintage console and warm lighting"
        class="w-full h-full object-cover"
        sizes="100vw"
        loading="eager"
        format="webp"
      />
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-ink/50" />
      <!-- Grain overlay -->
      <div class="absolute inset-0 grain-overlay" />
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-site mx-auto px-5 py-32 md:py-40">
      <div class="max-w-3xl">
        <p class="section-label text-seafoam mb-4">Nashville, Tennessee</p>

        <h1
          ref="headlineRef"
          class="heading-display text-cream text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6"
        >
          Where Sound<br />
          <span class="text-salmon">Comes Alive</span>
        </h1>

        <p
          ref="subRef"
          class="font-body text-lg md:text-xl text-cream/80 max-w-xl mb-10 leading-relaxed"
        >
          Analog warmth. Digital precision. A room built for records
          that move people. Step inside The Summit Room.
        </p>

        <div ref="ctaRef" class="flex flex-wrap gap-4">
          <NuxtLink to="/contact" class="btn-primary">
            Book a Session
          </NuxtLink>
          <NuxtLink to="/studio" class="btn-ghost border-cream text-cream hover:bg-cream hover:text-ink">
            Explore the Studio
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50">
        <span class="font-mono text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <div class="w-px h-8 bg-cream/30 animate-pulse" />
      </div>
    </div>
  </section>
</template>
```

#### `components/ui/CardAnalog.vue`

```vue
<script setup lang="ts">
defineProps<{
  tag?: string
}>()
</script>

<template>
  <component :is="tag || 'div'" class="card-analog">
    <slot />
  </component>
</template>
```

#### `components/ui/VuMeter.vue`

```vue
<script setup lang="ts">
defineProps<{
  level?: number // 0–100
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
```

---

## Page Architecture

### `pages/index.vue` — Home

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'The Summit Room | Nashville Recording Studio',
  ogTitle: 'The Summit Room — Nashville Recording Studio',
  description: 'Analog warmth meets digital precision. Book your next session at Nashville\'s premier recording studio — world-class gear, experienced engineers, creative energy.',
  ogDescription: 'Analog warmth meets digital precision. Book your next session at Nashville\'s premier recording studio.',
  ogImage: 'https://thesummitroom.com/images/og-home.jpg',
  ogUrl: 'https://thesummitroom.com',
  twitterCard: 'summary_large_image',
})

useHead({
  title: 'The Summit Room | Nashville Recording Studio',
})
</script>

<template>
  <div>
    <HeroSection />
    <TapeStrip />
    <AboutSection />
    <ServicesSection />
    <GallerySection />
    <GearSection />
    <TestimonialsSection />
    <ContactSection />
  </div>
</template>
```

### `pages/studio.vue`

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'The Studio | The Summit Room — Nashville',
  description: 'Explore The Summit Room\'s live room, control room, and iso booths. Vintage analog console, modern digital workflow, tuned acoustics.',
  ogImage: 'https://thesummitroom.com/images/og-studio.jpg',
})
</script>
```

### `pages/services.vue`

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Services | The Summit Room — Recording, Mixing, Mastering',
  description: 'Full-service recording, mixing, mastering, and production. From tracking live bands to producing beats — we bring your sound to life.',
  ogImage: 'https://thesummitroom.com/images/og-services.jpg',
})
</script>
```

### `pages/gallery.vue`

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Gallery | The Summit Room — Inside the Studio',
  description: 'See inside The Summit Room. Photos of our live room, control room, vintage gear collection, and sessions in progress.',
  ogImage: 'https://thesummitroom.com/images/og-gallery.jpg',
})
</script>
```

### `pages/gear.vue`

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Gear List | The Summit Room — Nashville Studio Equipment',
  description: 'Our gear list: vintage microphones, analog outboard, tape machines, modern converters, and instruments. The tools behind the sound.',
  ogImage: 'https://thesummitroom.com/images/og-gear.jpg',
})
</script>
```

### `pages/rates.vue`

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Rates & Packages | The Summit Room — Nashville',
  description: 'Transparent studio rates and booking packages. Hourly, half-day, and full-day sessions available. Lock in your time at The Summit Room.',
  ogImage: 'https://thesummitroom.com/images/og-rates.jpg',
})
</script>
```

### `pages/contact.vue`

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Contact & Booking | The Summit Room — Nashville',
  description: 'Ready to record? Get in touch to book a session, schedule a tour, or ask about availability at The Summit Room in Nashville.',
  ogImage: 'https://thesummitroom.com/images/og-contact.jpg',
})
</script>
```

---

## GSAP Animation Strategy

### Composable: `composables/useGsapReveal.ts`

A reusable scroll-triggered reveal for any element:

```typescript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface RevealOptions {
  y?: number
  x?: number
  opacity?: number
  duration?: number
  delay?: number
  ease?: string
  start?: string
  stagger?: number
}

export function useGsapReveal(
  target: Ref<HTMLElement | HTMLElement[] | null>,
  options: RevealOptions = {},
) {
  const {
    y = 40,
    x = 0,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    ease = 'tapeReel',
    start = 'top 85%',
    stagger = 0.15,
  } = options

  onMounted(() => {
    if (!target.value) return

    const elements = Array.isArray(target.value) ? target.value : [target.value]

    gsap.from(elements, {
      y,
      x,
      opacity,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger: elements[0],
        start,
        toggleActions: 'play none none none',
      },
    })
  })

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())
  })
}
```

### Composable: `composables/useGsapParallax.ts`

```typescript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useGsapParallax(
  target: Ref<HTMLElement | null>,
  speed: number = 0.3,
) {
  onMounted(() => {
    if (!target.value) return

    gsap.to(target.value, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: target.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}
```

### Animation Playbook

| Element               | Animation                                              | Trigger            |
| --------------------- | ------------------------------------------------------ | ------------------ |
| Hero headline         | Staggered word reveal, y:60→0, opacity:0→1             | Page load          |
| Hero background       | Parallax yPercent shift                                | Scroll scrub       |
| Section labels        | Fade-up + slight left slide                            | Scroll into view   |
| Card grids            | Staggered reveal, 0.15s between cards                  | Scroll into view   |
| Gear list items       | Slide from left, staggered                             | Scroll into view   |
| Gallery images        | Scale 1.05→1 + fade                                    | Scroll into view   |
| Testimonial quotes    | Fade-up, quotation mark scales in separately           | Scroll into view   |
| Page transitions      | Cream color wipe left→right (use Nuxt page transition) | Route change       |
| Tape strip dividers   | Width 0→100% draw-on                                   | Scroll into view   |
| VU meter bars         | Width animates from 0→value                            | Scroll into view   |
| Contact form          | Fields stagger in from bottom                          | Scroll into view   |
| Footer                | Gentle fade-up                                         | Scroll into view   |

### Page Transitions — `app.vue`

```vue
<template>
  <NuxtLayout>
    <NuxtPage :transition="{
      name: 'page',
      mode: 'out-in',
    }" />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
```

---

## SEO Strategy

### Schema.org Structured Data — `app.vue` or layout

```typescript
useSchemaOrg([
  defineOrganization({
    name: 'The Summit Room',
    url: 'https://thesummitroom.com',
    logo: 'https://thesummitroom.com/images/logo/summit-room-primary.svg',
    sameAs: [
      'https://www.instagram.com/thesummitroom',
      'https://www.facebook.com/thesummitroom',
      'https://www.youtube.com/@thesummitroom',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-615-555-0192',
      contactType: 'reservations',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  }),
  defineLocalBusiness({
    name: 'The Summit Room',
    image: 'https://thesummitroom.com/images/og-home.jpg',
    address: {
      streetAddress: '123 Music Row',
      addressLocality: 'Nashville',
      addressRegion: 'TN',
      postalCode: '37203',
      addressCountry: 'US',
    },
    geo: {
      latitude: 36.1527,
      longitude: -86.7816,
    },
    priceRange: '$$',
    openingHours: 'Mo-Su 09:00-23:00',
  }),
])
```

### Per-Page SEO Pattern

Every page uses `useSeoMeta()` (shown in Page Architecture above). Additionally:

```typescript
// For dynamic pages (if you add blog/news later)
useSeoMeta({
  title: () => `${article.value?.title} | The Summit Room`,
  ogTitle: () => article.value?.title,
  description: () => article.value?.excerpt,
  ogImage: () => article.value?.ogImage,
  articlePublishedTime: () => article.value?.publishedAt,
})
```

### Sitemap

`@nuxtjs/seo` includes `nuxt-simple-sitemap`. Configure in `nuxt.config.ts`:

```typescript
sitemap: {
  strictNuxtContentPaths: true,
},
```

### Robots

```typescript
robots: {
  disallow: ['/admin'],
},
```

### OG Image

Consider using `nuxt-og-image` for dynamic OG image generation per page using the brand colors and fonts.

---

## Responsive / Mobile-First Approach

### Breakpoint Strategy

```
< 640px   → Mobile (single column, stacked, hamburger nav)
640–767   → Large mobile / small tablet
768–1023  → Tablet (2-col grids, nav still hamburger or condensed)
1024–1279 → Desktop (full nav, 3-col grids, larger type)
1280+     → Wide desktop (max-w-site container, generous whitespace)
```

### Mobile-Specific Design Decisions

- **Nav**: Hamburger → full-screen forest-green overlay with display font links
- **Hero**: Full-bleed image, text stacks vertically, CTA buttons go full-width below 640px
- **Cards**: Single column on mobile, 2-col on md, 3-col on lg
- **Gallery**: Single column masonry on mobile, 2-col on md, 3-col on lg
- **Typography**: Scale down aggressively — hero text `text-4xl` on mobile vs `text-8xl` on desktop
- **Touch targets**: All interactive elements minimum 44×44px
- **Spacing**: Tighter padding on mobile (`px-5`) → generous on desktop (`px-12`)
- **Images**: Use `<NuxtImg>` `sizes` prop for responsive delivery:

```vue
<NuxtImg
  src="/images/studio-live-room.jpg"
  alt="The Summit Room live room"
  sizes="sm:100vw md:50vw lg:33vw"
  class="w-full h-64 md:h-80 object-cover rounded-retro"
/>
```

### Container Pattern

```vue
<!-- Consistent max-width wrapper used across all sections -->
<div class="max-w-site mx-auto px-5 md:px-8 lg:px-12">
  <!-- Section content -->
</div>
```

---

## Asset & Image Strategy

### Required Images

```
/public/images/
├── hero-studio.jpg          → Control room hero (wide, moody)
├── textures/
│   └── noise-light.png      → Film grain texture tile (200×200, subtle)
├── logo/
│   ├── summit-room-primary.svg
│   ├── summit-room-alt.svg
│   ├── summit-room-reversed.svg
│   ├── summit-room-inline.svg
│   └── summit-room-icon-only.svg
├── studio/
│   ├── control-room.jpg
│   ├── live-room.jpg
│   ├── iso-booth.jpg
│   └── lounge.jpg
├── gear/
│   ├── console.jpg
│   ├── tape-machine.jpg
│   ├── microphones.jpg
│   └── outboard.jpg
├── gallery/
│   ├── session-01.jpg → session-12.jpg
│   └── ...
├── og-home.jpg
├── og-studio.jpg
├── og-services.jpg
├── og-gallery.jpg
├── og-gear.jpg
├── og-rates.jpg
└── og-contact.jpg
```

### Image Guidelines

- All photos should feel warm, analog-tinted — think golden hour, tungsten warmth, film grain
- Avoid clinical white-balance studio shots — lean into the amber and green tones of the brand
- OG images: 1200×630px, include logo + dark overlay + page-specific text
- Use `<NuxtImg>` everywhere — never raw `<img>` tags
- Lazy load everything except hero image (`loading="eager"` on hero only)

### Favicon

Generate from the mountain icon mark. Provide:

```
/public/
├── favicon.svg         → SVG favicon (forest green mountain)
├── favicon.ico         → Legacy fallback
├── apple-touch-icon.png → 180×180
└── site.webmanifest
```

---

## Performance & Deployment Notes

### Performance Targets

- **Lighthouse**: 90+ across all categories
- **LCP**: < 2.5s (optimize hero image — preload, AVIF/WebP, proper sizing)
- **CLS**: < 0.1 (set explicit dimensions on all images/media)
- **FID/INP**: < 200ms (defer non-critical JS, GSAP is client-side only)

### Preloading Critical Assets

In `nuxt.config.ts` app head:

```typescript
link: [
  {
    rel: 'preload',
    href: '/images/hero-studio.jpg',
    as: 'image',
    type: 'image/webp',
  },
],
```

### GSAP Performance Notes

- All GSAP logic runs client-side only (`.client.ts` plugin)
- Use `will-change: transform` on elements that animate frequently
- Kill ScrollTrigger instances on component unmount to prevent memory leaks
- Prefer `transform` and `opacity` animations (GPU-composited, no layout thrashing)
- Use `gsap.matchMedia()` to disable heavy animations on mobile if needed:

```typescript
const mm = gsap.matchMedia()

mm.add('(min-width: 1024px)', () => {
  // Desktop-only parallax or complex animations
})

mm.add('(max-width: 1023px)', () => {
  // Simpler mobile animations
})
```

### Deployment Checklist

- [ ] Replace `G-XXXXXXXXXX` with real GA4 measurement ID
- [ ] Replace placeholder contact info in `runtimeConfig`
- [ ] Generate and place all OG images
- [ ] Export logo SVGs from design files
- [ ] Create and tile the noise texture PNG
- [ ] Test all pages in Lighthouse (mobile + desktop)
- [ ] Verify `sitemap.xml` and `robots.txt` generation
- [ ] Test OG meta tags with Facebook Debugger + Twitter Card Validator
- [ ] Verify responsive behavior on real devices (iOS Safari, Android Chrome)
- [ ] Ensure GSAP animations degrade gracefully with `prefers-reduced-motion`

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

And in GSAP plugin:

```typescript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(20) // effectively instant
}
```

---

## Design Aesthetic Reference

> **Modern Retro Analog** — The site should feel like walking into a perfectly maintained vintage studio that happens to have a cutting-edge digital workflow. Think: warm amber lighting on a Neve console, reel-to-reel tape spinning, but with a clean modern UI wrapping it all. The design language borrows from 70s album art, National Park posters, and analog equipment faceplates — bold type, earthy colors, tactile textures — but the layout and interaction patterns are unmistakably contemporary.

### Visual Motifs to Weave In

- **Film grain overlays** — subtle, almost subliminal texture on backgrounds
- **VU meter bars** — as decorative accents / progress indicators
- **Tape strip dividers** — gradient bars between sections (forest → seafoam → salmon)
- **Hard offset shadows** — the `shadow-analog` pattern gives a screen-printed / letterpress feel
- **Rounded-but-not-bubbly** corners — `rounded-retro` is restrained, not cutesy
- **Mono-spaced labels** — DM Mono at tiny sizes for section markers and metadata
- **Bold display type** — Black Han Sans for headlines gives that vintage poster impact
- **Warm photography** — always lean amber/gold in color temperature

---

*Built for The Summit Room — Nashville, Tennessee*
*"Analog Jungle Groove" Color Palette 1*
