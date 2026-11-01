import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { WA } from "../data/content";

const SLIDE_MS = 2000;

// Each slide: background image + matching text.
const slides = [
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
    alt: "Sample image of a modern villa",
    badge: "Villas & independent houses",
    title: "Interiors for your villa, designed, built and installed by",
    accent: "one team",
    text: "Complete interiors for villas and independent houses across Ghaziabad and Delhi NCR. See your space in 3D before any work begins.",
  },
  {
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000",
    alt: "Sample image of a living room interior",
    badge: "Full home interiors",
    title: "Living spaces that feel like",
    accent: "you",
    text: "Living, dining and bedrooms, false ceilings, wall decor and lighting, planned together as one design for your home.",
  },
  {
    img: "https://images.unsplash.com/photo-1641823911769-c55f23c25143?auto=format&fit=crop&q=80&w=2000",
    alt: "Sample image of a modern kitchen with white cabinets",
    badge: "Modular kitchens & wardrobes",
    title: "Kitchens and wardrobes made to",
    accent: "your measurements",
    text: "Built at our own factory and installed by our team, so every unit fits the way it was designed.",
  },
];

const points = [
  "Free design consultation",
  "3D view before production",
  "Own factory, one accountable team",
];

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export default function Hero({ onOpen }) {
  // All hooks must stay INSIDE this function
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (i) => setIndex((i + slides.length) % slides.length),
    [],
  );

  // Auto slide
  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      SLIDE_MS,
    );
    return () => clearInterval(t);
  }, [paused]);

  const s = slides[index];

  return (
    <section
      className="relative flex min-h-[620px] items-center justify-center overflow-hidden bg-forest px-4 pb-24 pt-28 text-white sm:px-6 sm:pt-32 lg:min-h-[100svh] lg:pb-28 lg:pt-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured interior services"
    >
      {/* Background slides: crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={s.img}
            src={s.img}
            alt={s.alt}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-forest/75 via-forest/60 to-forest/85" />
      </div>

      {/* Slide content, centered */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <div
          className="flex min-h-[19rem] flex-col items-center justify-center sm:min-h-[21rem]"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center"
            >
              <motion.span
                custom={0}
                variants={textVariants}
                className="inline-flex items-center gap-2 rounded-full border border-[#e5cf9c]/40 bg-forest/70 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[#e5cf9c] shadow-lg backdrop-blur-md sm:text-xs"
              >
                <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#e5cf9c]" />
                {s.badge}
              </motion.span>

              <motion.h1
                custom={1}
                variants={textVariants}
                className="mt-5 font-serif text-3xl font-semibold leading-[1.15] tracking-tight drop-shadow-sm sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {s.title}{" "}
                <span className="font-normal italic text-[#e5cf9c]">
                  {s.accent}
                </span>
                .
              </motion.h1>

              <motion.p
                custom={2}
                variants={textVariants}
                className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-[#e3ece8] drop-shadow sm:mt-5 sm:text-base lg:text-lg"
              >
                {s.text}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Trust points */}
        <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-paper/95 sm:text-sm md:text-[15px]">
          {points.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#e5cf9c]/30 bg-[#e5cf9c]/20 text-[10px] font-bold text-[#e5cf9c] sm:h-5 sm:w-5 sm:text-xs">
                ✓
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpen}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#e5cf9c] px-7 py-3 text-sm font-semibold text-forest shadow-xl transition-all hover:bg-[#edd8af] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#e5cf9c]/50"
          >
            Get a free quote
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/40 bg-forest/40 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-[#e5cf9c] hover:bg-forest/60"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
            <span>WhatsApp us</span>
          </motion.a>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-3 sm:bottom-8">
        <button
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-forest/40 text-white backdrop-blur-md transition-colors hover:bg-forest/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5cf9c] sm:flex"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div
          className="flex items-center"
          role="tablist"
          aria-label="Choose slide"
        >
          {slides.map((sl, i) => (
            <button
              key={sl.badge}
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${sl.badge}`}
              onClick={() => go(i)}
              className="group flex h-8 items-center px-1.5 focus:outline-none"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#e5cf9c] ${
                  i === index
                    ? "w-9 bg-[#e5cf9c]"
                    : "w-4 bg-white/50 group-hover:bg-white/80"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-forest/40 text-white backdrop-blur-md transition-colors hover:bg-forest/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5cf9c] sm:flex"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <p className="absolute bottom-2 right-3 z-10 text-[10px] text-white/50">
        Sample images
      </p>
    </section>
  );
}
