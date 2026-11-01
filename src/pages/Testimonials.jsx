import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { testimonials } from '../data/content'

const AUTO_MS = 6000

function Stars({ count }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${count} out of 5 stars`}>
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

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const total = testimonials.length

  // Auto slide effect
  useEffect(() => {
    if (paused || total < 2) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, AUTO_MS)
    return () => clearInterval(timer)
  }, [paused, total])

  if (!total) return null

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total)
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % total)

  const currentTestimonial = testimonials[currentIndex]
  const initial = currentTestimonial.name.trim().charAt(0).toUpperCase()

  return (
    <section 
      id="testimonials" 
      className="relative overflow-hidden bg-paper/60 py-24 lg:py-32 border-t border-line/60 text-main"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Light Theme Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-brassd/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 -z-10 h-[400px] w-[400px] rounded-full bg-forest/5 blur-[120px] pointer-events-none" />

      {/* Light grid texture overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c352d08_1px,transparent_1px),linear-gradient(to_bottom,#1c352d08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 relative z-10">
        
        {/* Asymmetric Split Layout */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          
          {/* Left Column: Context & Headings */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brassd/30 bg-brassd/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brassd mb-6 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-brassd animate-pulse" />
                Client Feedback
              </span>
              
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-forest leading-[1.15]">
                Trusted by families across <span className="italic font-normal text-brassd">Ghaziabad & NCR</span>
              </h2>

              <p className="mt-5 text-base sm:text-lg text-mute font-light leading-relaxed">
                Read authentic reflections from homeowners who entrusted us with their living spaces, modular kitchens, and full-scale architectural transformations.
              </p>
            </div>

            {/* Controls & Counter Group (Desktop) */}
            {total > 1 && (
              <div className="mt-12 hidden lg:flex flex-col gap-6">
                
                {/* Counter Index */}
                <div className="font-mono text-sm font-bold uppercase tracking-widest text-mute flex items-center gap-3">
                  <span className="text-brassd text-lg">{String(currentIndex + 1).padStart(2, '0')}</span> 
                  <span className="h-px w-12 bg-line" />
                  <span>{String(total).padStart(2, '0')}</span>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-forest shadow-sm transition-all hover:bg-forest hover:border-forest hover:text-paper hover:scale-105 focus:outline-none"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-forest shadow-sm transition-all hover:bg-forest hover:border-forest hover:text-paper hover:scale-105 focus:outline-none"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Light Theme Interactive Spotlight Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.figure
                key={currentIndex}
                initial={{ opacity: 0, x: 30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl border border-line/80 bg-white p-8 sm:p-10 lg:p-12 shadow-xl backdrop-blur-2xl transition-all duration-500 hover:border-brassd/50 hover:shadow-2xl group"
              >
                {/* Decorative Background Quote Icon */}
                <Quote className="absolute right-8 top-8 h-20 w-20 text-brassd/10 pointer-events-none transition-transform duration-700 group-hover:scale-110" aria-hidden="true" />

                <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                  <Stars count={currentTestimonial.rating} />
                  {currentTestimonial.sample && (
                    <span className="rounded-full border border-brassd/30 bg-brassd/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brassd">
                      Verified Sample
                    </span>
                  )}
                </div>

                {/* Testimonial Quote Text */}
                <blockquote className="relative z-10 font-serif text-lg sm:text-xl font-normal leading-relaxed text-main italic">
                  “{currentTestimonial.text}”
                </blockquote>

                {/* Author Footer */}
                <figcaption className="mt-8 flex items-center gap-4 border-t border-line/60 pt-6 relative z-10">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forest font-serif text-xl font-bold text-paper shadow-md transition-transform duration-300 group-hover:scale-105">
                    {initial}
                  </span>
                  <div className="min-w-0">
                    <span className="block truncate font-serif text-lg font-bold text-forest">
                      {currentTestimonial.name}
                    </span>
                    <span className="flex items-center gap-1.5 truncate text-xs sm:text-sm text-mute mt-0.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-brassd" aria-hidden="true" />
                      <span>{currentTestimonial.place}</span>
                      {currentTestimonial.project ? <span className="text-brassd font-medium">· {currentTestimonial.project}</span> : ''}
                    </span>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Mobile Controls & Counter */}
            {total > 1 && (
              <div className="mt-6 flex items-center justify-between lg:hidden">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-mute">
                  <span className="text-brassd">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-forest shadow-sm transition-all hover:bg-forest hover:text-paper"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-forest shadow-sm transition-all hover:bg-forest hover:text-paper"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}