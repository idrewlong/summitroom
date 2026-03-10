/**
 * v-gsap-container directive
 *
 * Apply to any element that wraps content animated by useGsapReveal.
 * - SSR:    getSSRProps injects style="opacity:0" into the server-rendered HTML,
 *           so the container is invisible before any CSS or JS loads.
 * - Client: beforeMount hides the container before it is inserted into the DOM.
 *
 * useGsapReveal clears the container opacity synchronously (in the same JS
 * execution frame) right before GSAP sets child states — no browser paint can
 * occur between the two operations.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('gsap-container', {
    getSSRProps() {
      return { style: 'opacity:0' }
    },
    beforeMount(el: HTMLElement) {
      el.style.opacity = '0'
    },
  })
})
