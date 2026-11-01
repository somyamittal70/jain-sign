import { motion } from 'framer-motion'
import { services } from '../data/content'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services({ onOpen }) {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-brassd">Our Specializations</span>
        <h2 className="h2 mt-1 font-serif text-3xl font-semibold tracking-tight text-forest sm:text-4xl lg:text-5xl">
          Everything your home needs, under one roof
        </h2>
        <p className="mt-3 text-base font-light leading-relaxed text-mute sm:text-lg">
          Start with one room or plan the whole house. Tell us the scope and we’ll quote it itemised.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s) => (
          <motion.article
            key={s.t}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            {/* Image area: gradient shows if the photo is missing */}
            <div className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${s.g}`}>
              <img
                src={s.img}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-medium text-white">
                Sample image
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <h3 className="font-serif text-2xl font-bold tracking-tight text-forest">{s.t}</h3>

              <ul className="mb-8 mt-4 space-y-2.5 text-sm text-mute">
                {s.l.map((x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brassd" />
                    <span className="leading-snug">{x}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpen}
                  className="btn btn-ghost inline-flex items-center gap-2 rounded-xl border border-line bg-paper/50 px-5 py-2.5 text-sm font-semibold text-forest transition-all group-hover:border-forest group-hover:bg-forest group-hover:text-white"
                >
                  Get a quote
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}