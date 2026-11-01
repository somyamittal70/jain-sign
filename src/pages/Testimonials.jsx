import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { testimonials } from '../data/content'

const AUTO_MS = 6000
const SWIPE_PX = 60

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 sm:gap-1" role="img" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 sm:h-5 sm:w-5 ${i <= count ? 'fill-brassd text-brassd' : 'text-line'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

const arrowBtn =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-forest shadow-sm transition-all hover:border-forest hover:bg-forest hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/50 sm:h-12 sm:w-12'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = testimonials.length

  useEffect(() => {
    if (paused || total < 2) return
    const t = setInterval(() => setIndex((p) => (p + 1) % total), AUTO_MS)
    return () => clearInterval(t)
  }, [paused, total])

  if (!total) return null

  const go = (i) => setIndex((i + total) % total)
  const t = testimonials[index]
  const initial = t.name.trim().charAt(0).toUpperCase()

  const onDragEnd = (_, info) => {
    if (info.offset.x < -SWIPE_PX) go(index + 1)
    else if (info.offset.x > SWIPE_PX) go(index - 1)
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-line/60 bg-paper/60 py-14 sm:py-20 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glows (smaller on phones so they never cause sideways scroll) */}
      <div className="pointer-events-none absolute left-0 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-brassd/10 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-52 w-52 rounded-full bg-forest/5 blur-[90px] sm:h-[400px] sm:w-[400px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1c352d08_1px,transparent_1px),linear-gradient(to_bottom,#1c352d08_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8">
        {/* grid-cols-1 + min-w-0 stop long content from widening the page */}
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Left: heading */}
          <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:justify-between lg:text-left">
            <div className="min-w-0">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brassd/30 bg-brassd/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brassd backdrop-blur-md sm:mb-6 sm:px-4 sm:text-xs">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brassd" />
                Client Feedback
              </span>

              <h2 className="font-serif text-[1.65rem] font-semibold leading-[1.18] tracking-tight text-forest sm:text-4xl lg:text-5xl">
                Trusted by families across{' '}
                <span className="font-normal italic text-brassd">Ghaziabad &amp; NCR</span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-relaxed text-mute sm:mt-5 sm:text-lg lg:mx-0">
                Words from homeowners who trusted us with their living spaces, modular kitchens and full-home interiors.
              </p>
            </div>

            {/* Desktop counter and arrows */}
            {total > 1 && (
              <div className="mt-10 hidden flex-col gap-6 lg:flex">
                <div className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-widest text-mute">
                  <span className="text-lg text-brassd">{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px w-12 bg-line" />
                  <span>{String(total).padStart(2, '0')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => go(index - 1)} aria-label="Previous testimonial" className={arrowBtn}>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button onClick={() => go(index + 1)} aria-label="Next testimonial" className={arrowBtn}>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: review card */}
          <div className="relative min-w-0">
            <div aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  drag={total > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={onDragEnd}
                  initial={{ opacity: 0, x: 24, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -24, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative m-0 flex min-h-[18rem] w-full touch-pan-y flex-col rounded-2xl border border-line/80 bg-white p-5 shadow-xl transition-colors duration-500 hover:border-brassd/50 sm:min-h-[20rem] sm:rounded-3xl sm:p-8 lg:min-h-[22rem] lg:p-12"
                >
                  <Quote
                    className="pointer-events-none absolute right-3 top-3 h-10 w-10 text-brassd/10 transition-transform duration-700 group-hover:scale-110 sm:right-8 sm:top-8 sm:h-20 sm:w-20"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-2 pr-10 sm:mb-6 sm:gap-4 sm:pr-0">
                    <Stars count={t.rating} />
                    {t.sample && (
                      <span className="rounded-full border border-brassd/30 bg-brassd/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brassd sm:px-3 sm:py-1 sm:text-[11px]">
                        Sample
                      </span>
                    )}
                  </div>

                  <blockquote className="relative z-10 flex-1 break-words font-serif text-[15px] font-normal italic leading-relaxed text-forest sm:text-lg lg:text-xl">
                    “{t.text}”
                  </blockquote>

                  <figcaption className="relative z-10 mt-5 flex items-start gap-3 border-t border-line/60 pt-4 sm:mt-8 sm:items-center sm:gap-4 sm:pt-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest font-serif text-lg font-bold text-paper shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-xl">
                      {initial}
                    </span>
                    {/* min-w-0 + no truncate: long names and places wrap instead of overflowing */}
                    <div className="min-w-0 flex-1">
                      <span className="block break-words font-serif text-base font-bold leading-snug text-forest sm:text-lg">
                        {t.name}
                      </span>
                      <span className="mt-1 flex items-start gap-1.5 text-xs leading-snug text-mute sm:text-sm">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brassd" aria-hidden="true" />
                        <span className="min-w-0 break-words">
                          {t.place}
                          {t.project && <span className="font-medium text-brassd"> · {t.project}</span>}
                        </span>
                      </span>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Mobile and tablet controls */}
            {total > 1 && (
              <div className="mt-5 flex items-center justify-between gap-2 sm:mt-6 lg:hidden">
                <button onClick={() => go(index - 1)} aria-label="Previous testimonial" className={arrowBtn}>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="flex items-center" role="tablist" aria-label="Choose testimonial">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Testimonial ${i + 1}`}
                      onClick={() => go(i)}
                      className="group/dot flex h-8 items-center px-1 focus:outline-none"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-300 group-focus-visible/dot:ring-2 group-focus-visible/dot:ring-forest/50 ${
                          i === index ? 'w-7 bg-forest' : 'w-2.5 bg-line'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button onClick={() => go(index + 1)} aria-label="Next testimonial" className={arrowBtn}>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}