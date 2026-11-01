import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from 'lucide-react'
import { navLinks, PHONE, TEL } from '../data/content'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('top')
  const [logoOk, setLogoOk] = useState(true)

  // Background change on scroll, and "Home" stays active near the top of the page
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      if (window.scrollY < 200) setActiveTab('top')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  // Close the menu on Escape, or when the screen becomes desktop size
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMobileMenuOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setMobileMenuOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Highlight the link of the section on screen. "top" (Home) is handled by the scroll listener above.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveTab(e.target.id)),
      { rootMargin: '-20% 0px -70% 0px' }
    )
    navLinks.forEach(([id]) => {
      if (id === 'top') return
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id) => {
    setActiveTab(id)
    setMobileMenuOpen(false)
  }

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full px-3 sm:px-5 lg:px-8"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)' }}
    >
      <div
        className={`pointer-events-auto mx-auto max-w-6xl rounded-full border px-3 py-1.5 backdrop-blur-xl transition-all duration-300 sm:px-5 sm:py-2 lg:px-6 ${
          scrolled ? 'border-line/80 bg-paper/95 shadow-md shadow-black/10' : 'border-line/40 bg-paper/80'
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <motion.a
            href="#top"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="group flex min-w-0 shrink items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
            aria-label="Jain Signature Studio Home"
          >
            {logoOk ? (
              <img
                src="./logo.png"
                alt="Jain Signature Studio"
                className="h-10 w-auto max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11 md:h-12 lg:h-14 lg:max-w-none"
                onError={() => setLogoOk(false)}
              />
            ) : (
              <span className="px-2 font-serif text-base font-semibold leading-none text-forest sm:text-lg">
                Jain Signature Studio
              </span>
            )}
          </motion.a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-0.5 rounded-full border border-line/50 bg-paper/60 p-1 lg:flex" aria-label="Main navigation">
            {navLinks.map(([id, title]) => {
              const isActive = activeTab === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => handleNavClick(id)}
                  className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 xl:px-4 ${
                    isActive ? 'text-paper' : 'text-mute hover:text-forest'
                  }`}
                >
                  {isActive && (
                    <motion.div layoutId="active-pill" className="absolute inset-0 rounded-full bg-forest" transition={{ type: 'spring', duration: 0.5 }} />
                  )}
                  <span className="relative z-10">{title}</span>
                </a>
              )
            })}
          </nav>

          {/* Right side controls */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex shrink-0 items-center gap-2 sm:gap-3"
          >
            {/* Call Now: icon only on phones, icon + text from sm up */}
            <motion.a
              href={TEL}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label={`Call now ${PHONE}`}
              className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-forest px-3 text-xs font-semibold tracking-wide text-paper shadow-md shadow-forest/20 transition-all hover:bg-forest/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-1 sm:px-5"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Call Now</span>
            </motion.a>

            {/* Hamburger (below lg) */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper/80 text-forest transition-colors hover:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="relative block h-3.5 w-4">
                <span className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 block h-0.5 w-full rounded-full bg-current transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="pointer-events-auto fixed inset-0 -z-10 bg-black/30 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="pointer-events-auto mx-auto mt-2 max-h-[calc(100dvh-5.5rem)] max-w-6xl overflow-y-auto rounded-2xl border border-line/80 bg-paper p-4 shadow-2xl sm:p-5 lg:hidden"
            >
              <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation">
                {navLinks.map(([id, title], i) => {
                  const isActive = activeTab === id
                  return (
                    <motion.a
                      key={id}
                      href={`#${id}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleNavClick(id)}
                      className={`flex min-h-[48px] items-center justify-between rounded-xl px-3 text-base font-semibold transition-colors ${
                        isActive ? 'bg-forest/10 text-forest' : 'text-forest hover:bg-forest/5'
                      }`}
                    >
                      <span>{title}</span>
                      <span className="text-xs font-normal text-mute">0{i + 1}</span>
                    </motion.a>
                  )
                })}

                <hr className="my-2 border-line/60" />

                <a
                  href={TEL}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-forest text-sm font-semibold text-paper shadow-md transition-all hover:bg-forest/90"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call Now · {PHONE}
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}