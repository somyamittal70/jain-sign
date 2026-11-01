import { motion } from 'framer-motion'
import { why } from '../data/content'

// Container variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

// Individual card entrance
const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function WhyUs() {
  return (
    <section id="why" className="relative border-y border-line bg-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        
        {/* Editorial Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.25fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Header + Vertical Showcase Image */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="inline-block rounded-full border border-brassd/30 bg-brassd/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-brassd mb-3">
                The Jain Signature Advantage
              </span>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-main leading-tight">
                One accountable team, start to finish
              </h2>
              <p className="mt-3 text-base sm:text-lg text-mute font-light leading-relaxed">
                Eliminate communication gaps between separate architects, contractors, and carpenters. We take complete ownership under one roof.
              </p>
            </motion.div>

            {/* Left Vertical Image (Aspect 3/4) with Floating Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 aspect-[3/4] max-h-[460px] w-full"
            >
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000"
                alt="Jain Signature Studio interior craftsmanship"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/20 to-transparent" />

              {/* Floating Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest text-paper font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-main text-sm">In-House Manufacturing</h4>
                    <p className="text-xs text-mute font-light">Direct factory precision without third-party delay.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Vertical Feature Stack */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="flex flex-col gap-5"
          >
            {why.map(([title, description], index) => (
              <motion.div
                key={title}
                variants={cardVariants}
                whileHover={{ x: 6 }}
                className="group relative flex items-start gap-5 rounded-3xl border border-line/80 bg-paper/30 p-6 sm:p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-forest/40 hover:bg-white hover:shadow-xl hover:shadow-forest/5"
              >
                {/* Number Indicator */}
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-line font-serif text-lg font-bold text-forest shadow-sm transition-all duration-300 group-hover:bg-forest group-hover:text-paper group-hover:border-forest">
                  0{index + 1}
                </span>

                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold tracking-tight text-main transition-colors group-hover:text-forest">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-mute font-light">
                    {description}
                  </p>
                </div>

                {/* Arrow Indicator */}
                <div className="self-center text-mute/30 group-hover:text-forest transition-colors text-sm font-mono transform translate-x-1 group-hover:translate-x-2 duration-300 hidden sm:block">
                  →
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  )
}