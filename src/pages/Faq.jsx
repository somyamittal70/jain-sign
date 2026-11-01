import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqs, PHONE, TEL, WA } from '../data/content'

function FaqItem({ q, a, isOpen, onClick, index }) {
  const formattedIndex = index < 9 ? `0${index + 1}` : index + 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? 'border-forest/40 bg-white shadow-xl shadow-forest/5'
          : 'border-line/80 bg-paper/40 hover:border-forest/20 hover:bg-white'
      }`}
    >
      {/* Question Header */}
      <button
        onClick={onClick}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className={`font-mono text-xs font-bold transition-colors ${
            isOpen ? 'text-forest' : 'text-brassd'
          }`}>
            {formattedIndex}
          </span>
          <span className={`font-serif text-base sm:text-lg font-semibold transition-colors ${
            isOpen ? 'text-forest' : 'text-main group-hover:text-forest'
          }`}>
            {q}
          </span>
        </div>

        {/* Toggle Circle */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${
            isOpen
              ? 'border-forest bg-forest text-paper shadow-md'
              : 'border-line bg-white text-main group-hover:border-forest/40 group-hover:text-forest'
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>

      {/* Expandable Answer Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-line/40 px-6 pb-6 pt-4 text-sm sm:text-base text-mute font-light leading-relaxed pl-14">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0) // Default first item open

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative border-y border-line bg-gradient-to-b from-white via-paper/20 to-white py-20 lg:py-28 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 -right-40 -z-10 h-96 w-96 rounded-full bg-forest/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        
        {/* Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Sticky Header & Contact Card */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-brassd/30 bg-brassd/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-brassd mb-3">
                Got Questions?
              </div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-main leading-tight">
                Everything you need to know before we start
              </h2>
              <p className="mt-4 text-base text-mute font-light leading-relaxed">
                Clear answers about our design process, factory manufacturing, pricing, and project timelines.
              </p>
            </motion.div>

            {/* Direct Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-line bg-forest p-7 text-paper shadow-xl"
            >
              <h3 className="font-serif text-xl font-bold text-paper">Have a unique question?</h3>
              <p className="mt-2 text-xs sm:text-sm font-light text-paper/80 leading-relaxed">
                Our interior consultants are ready to answer your specific project requirements directly.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={TEL}
                  className="btn inline-flex items-center justify-center rounded-xl bg-brass px-5 py-2.5 text-xs font-semibold text-paper transition-all hover:bg-brassd shadow-sm"
                >
                  Call {PHONE}
                </a>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold text-paper backdrop-blur-md transition-all hover:bg-white/20"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="flex flex-col gap-4">
            {faqs.map(([q, a], index) => (
              <FaqItem
                key={q}
                index={index}
                q={q}
                a={a}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}