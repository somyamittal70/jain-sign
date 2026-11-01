import { motion } from 'framer-motion'
import { stats } from '../data/content'

// Container animation with staggered children
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

// Item entry variant with subtle vertical float & scale
const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Stats() {
  return (
    <section className="relative z-10 border-b border-line/80 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-5 py-8 md:py-10">
        <motion.dl
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-4 md:gap-x-8"
        >
          {stats.map(([number, label], index) => (
            <motion.div
              key={label}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="relative flex flex-col items-center justify-center p-3 transition-transform"
            >
              {/* Optional vertical separator line for desktop view */}
              {index > 0 && (
                <div className="absolute left-0 top-1/2 hidden h-10 w-[1px] -translate-y-1/2 bg-line/60 md:block" />
              )}

              <dt className="font-serif text-3xl font-bold tracking-tight text-brassd sm:text-4xl lg:text-[40px] leading-none">
                {number}
              </dt>
              
              <dd className="mt-2.5 max-w-[180px] text-xs font-medium uppercase tracking-wider text-mute sm:text-sm">
                {label}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}