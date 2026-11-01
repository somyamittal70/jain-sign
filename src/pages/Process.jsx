import { motion } from "framer-motion";
import { steps } from "../data/content";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Process({ onOpen }) {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-gradient-to-b from-white via-paper/40 to-white py-20 lg:py-28"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border border-brassd/30 bg-brassd/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-brassd shadow-sm">
            How It Works
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-main sm:text-4xl lg:text-5xl">
            From first call to handover, in five steps
          </h2>
          <p className="mt-4 text-base text-mute sm:text-lg font-light leading-relaxed">
            No chasing contractors. One dedicated team handles design,
            production, and execution.
          </p>
        </motion.div>

        {/* Timeline Process Flow */}
        <div className="relative mt-16 lg:mt-24">
          {/* Connecting Line across steps on Desktop */}
          <div className="absolute top-8 left-12 right-12 hidden h-0.5 bg-gradient-to-r from-forest/20 via-forest/40 to-forest/20 lg:block -z-0" />

          <motion.ol
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 relative z-10"
          >
            {steps.map(([title, description], index) => {
              const stepNumber = index + 1;

              return (
                <motion.li
                  key={title}
                  variants={stepVariants}
                  whileHover={{ y: -8 }}
                  className="group relative flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  {/* Step Node Circle Badge */}
                  <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-line shadow-md transition-all duration-500 group-hover:border-forest group-hover:bg-forest group-hover:shadow-xl group-hover:shadow-forest/20">
                    <span className="font-serif text-xl font-bold text-forest transition-colors duration-500 group-hover:text-paper">
                      0{stepNumber}
                    </span>

                    {/* Glowing pulse ring on hover */}
                    <span className="absolute inset-0 -z-10 rounded-2xl bg-forest/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Card Content Box */}
                  <div className="w-full flex-1 rounded-2xl border border-line/80 bg-white/80 backdrop-blur-xl p-6 shadow-sm transition-all duration-300 group-hover:border-forest/40 group-hover:shadow-lg">
                    <h3 className="font-serif text-lg font-bold tracking-tight text-main transition-colors duration-300 group-hover:text-forest">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-mute font-light leading-relaxed">
                      {description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        {/* Centered CTA Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 flex justify-center sm:mt-16"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpen}
            className="inline-flex min-h-[52px] w-full max-w-xs items-center justify-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-semibold text-paper shadow-xl shadow-forest/20 transition-colors hover:bg-forest/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/50 focus-visible:ring-offset-2 sm:w-auto sm:max-w-none sm:text-base"
          >
            Start with a free call
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
