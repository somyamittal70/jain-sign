import { motion } from 'framer-motion'
import { Phone, Clock } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { WA, TEL, PHONE } from '../data/content'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function FinalCta() {
  return (
    <section id="enquire" className="relative overflow-hidden border-t border-line/60 bg-paper/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-forest/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-brass/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-line/80 bg-white p-7 shadow-2xl backdrop-blur-xl sm:p-10 lg:p-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14"
          >
            {/* Left: image */}
            <motion.div variants={itemVariants} className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 sm:aspect-[16/10] lg:aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000"
                alt="Sample modern interior"
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-md backdrop-blur-md">
                <span className="block font-serif text-xs font-bold text-forest sm:text-sm">Ghaziabad Design Experience Studio</span>
                <span className="text-[11px] font-light text-mute">Tailored turn-key residential & commercial interiors</span>
              </div>
            </motion.div>

            {/* Right: contact */}
            <div className="flex flex-col justify-center">
              <motion.div variants={itemVariants}>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brassd/30 bg-brassd/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-brassd">
                  Direct Studio Access
                </span>
                <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-forest sm:text-4xl">
                  Let’s bring your vision to life
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-mute sm:text-base">
                  Skip the delay. Speak directly with our lead interior designers to discuss your floor plan, budget estimation, or site evaluation.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                {/* WhatsApp: SVG icon */}
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] hover:bg-[#22bf5b] hover:shadow-xl active:scale-[0.98]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Call: Lucide icon */}
                <a
                  href={TEL}
                  className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-2xl border border-line bg-paper/80 px-6 py-3.5 text-sm font-semibold text-forest transition-all hover:scale-[1.02] hover:border-forest/40 hover:bg-white hover:shadow-md active:scale-[0.98]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-paper">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="font-mono font-bold">{PHONE}</span>
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-6 flex items-center gap-2 text-xs font-light text-mute">
                <Clock className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Available Mon – Sat, 10:00 AM – 8:00 PM IST</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}