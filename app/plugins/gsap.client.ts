import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, CustomEase)

  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })

  CustomEase.create('tapeReel', 'M0,0 C0.14,0 0.27,0.58 0.38,0.76 0.52,1 0.64,1 1,1')

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(20)
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
