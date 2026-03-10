import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@nuxt/fonts', '@nuxtjs/seo', 'nuxt-gtag', '@nuxt/icon', '@nuxt/image'],

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
    id: 'G-XXXXXXXXXX',
  },

  // ─── App Head Defaults ────────────────────────────
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicons/site.webmanifest' },
      ],
      meta: [
        { name: 'theme-color', content: '#2D5A40' },
      ],
    },
  },

  // ─── Nuxt Image ───────────────────────────────────
  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 375,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1440,
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