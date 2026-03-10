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

  let st: ScrollTrigger | null = null

  onMounted(async () => {
    await nextTick()
    if (!target.value) return

    const container = Array.isArray(target.value) ? target.value[0] : target.value

    // Target children for proper stagger; fall back to container itself
    let elements: HTMLElement[]
    if (Array.isArray(target.value)) {
      elements = target.value
    } else {
      const kids = Array.from(target.value.children) as HTMLElement[]
      elements = kids.length > 0 ? kids : [target.value]
    }

    // Clear the container's inline opacity injected by v-gsap-container.
    // This is synchronous — no browser paint can occur before the gsap.set below
    // hides the children, so there is no flash between the two operations.
    if (container) container.style.opacity = ''

    // Set initial hidden state on children immediately
    gsap.set(elements, { y, x, opacity, force3D: true })

    st = ScrollTrigger.create({
      trigger: container,
      start,
      once: true,
      onEnter: () => {
        gsap.to(elements, {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          stagger,
          force3D: true,
          clearProps: 'transform',
        })
      },
    })

    // Fire immediately for elements already in the viewport at mount time
    ScrollTrigger.refresh()
  })

  onUnmounted(() => {
    st?.kill()
  })
}
