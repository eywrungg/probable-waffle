import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel'

type Slide = {
  src: string
  alt: string
  label?: string
  objectPosition?: React.CSSProperties['objectPosition']
}

type Props = {
  slides: Slide[]
  options?: EmblaOptionsType
  className?: string
  color?: string
  speed?: React.CSSProperties['animationDuration']
}

const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

function useDotButtons(emblaApi: EmblaCarouselType | undefined) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onInit = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  )

  return { selectedIndex, scrollTo }
}

export default function EmblaPortraitCarousel({
  slides,
  options,
  className = '',
  color = '#f59e0b',
  speed = '5s',
}: Props) {
  const resolvedOptions = useMemo<EmblaOptionsType>(
    () => ({ loop: true, align: 'center', ...options }),
    [options],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(resolvedOptions)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { selectedIndex, scrollTo } = useDotButtons(emblaApi)

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla-portrait__slide__inner') as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
  }, [])

  const tweenScale = useCallback(
    (api: EmblaCarouselType, event?: EmblaEventType) => {
      const engine = api.internalEngine()
      const scrollProgress = api.scrollProgress()
      const slidesInView = api.slidesInView()
      const isScrollEvent = event === 'scroll'

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)
                if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
                if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            })
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const scale = numberWithinRange(tweenValue, 0, 1)
          const node = tweenNodes.current[slideIndex]
          if (node) node.style.transform = `scale(${scale})`
        })
      })
    },
    [],
  )

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
  }, [emblaApi, setTweenFactor, setTweenNodes, tweenScale])

  // Autoplay
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return
    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext()
    }, 3500)
  }, [emblaApi])

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    startAutoplay()
    return () => stopAutoplay()
  }, [emblaApi, startAutoplay, stopAutoplay])

  return (
    <div
      className={`embla-portrait ${className}`}
      style={{
        ['--embla-star-color' as any]: color,
        ['--embla-star-speed' as any]: speed,
      }}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="embla-portrait__viewport" ref={emblaRef}>
        <div className="embla-portrait__container">
          {slides.map((s, idx) => (
            <div
              className="embla-portrait__slide"
              key={`${s.src}-${idx}`}
              data-active={idx === selectedIndex ? 'true' : 'false'}
            >
              <button
                type="button"
                className="embla-portrait__slide__inner"
                onClick={() => scrollTo(idx)}
                aria-label={`Focus slide ${idx + 1}`}
              >
                {idx === selectedIndex && (
                  <>
                    <div
                      aria-hidden
                      className="embla-portrait__star embla-portrait__star--bottom"
                    />
                    <div
                      aria-hidden
                      className="embla-portrait__star embla-portrait__star--top"
                    />
                  </>
                )}
                <div className="embla-portrait__content">
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="embla-portrait__img"
                    style={{ objectPosition: s.objectPosition ?? 'center' }}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const el = e.currentTarget
                      el.style.display = 'none'
                      const parent = el.parentElement as HTMLElement | null
                      if (parent) parent.style.background = 'linear-gradient(135deg, #1a1a2e, #0d0d1a)'
                    }}
                  />
                  {s.label && <div className="embla-portrait__label">{s.label}</div>}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
