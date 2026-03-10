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
