import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { projectTabs, brands } from "../data/content";

// Define project items locally with explicit category keys matching projectTabs
export const projects = [
  {
    id: "1",
    key: "kitchen",
    cat: "Kitchen",
    name: "Ivory Gallery Kitchen",
    colors: "#cfc3a5,#8f7e55",
    imgUrl:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    key: "kitchen",
    cat: "Kitchen",
    name: "Aurora Line Modular Kitchen",
    colors: "#b8c7bb,#4f7062",
    imgUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    key: "bath",
    cat: "Washroom",
    name: "The Aura Marble Washroom",
    colors: "#c3ccd1,#6b838d",
    imgUrl:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    key: "bed",
    cat: "Wardrobe",
    name: "The Horizon Slide Closet",
    colors: "#cbc6d0,#7c7488",
    imgUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    key: "living",
    cat: "Feature wall",
    name: "Golden Glow Feature Panel",
    colors: "#e0cd96,#a98530",
    imgUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    key: "bed",
    cat: "Bedroom",
    name: "The Zen Rest Bedroom",
    colors: "#d6c2bb,#9a7568",
    imgUrl:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "7",
    key: "kitchen",
    cat: "Kitchen",
    name: "The Signature Marble Kitchen",
    colors: "#d3cdc0,#857d6b",
    imgUrl:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "8",
    key: "living",
    cat: "Living",
    name: "Contemporary Glow Panel Design",
    colors: "#c7c9d3,#6d7390",
    imgUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
  },
];

function ProjectTile({ cat, name, colors, imgUrl }) {
  const [a, b] = colors.split(",");
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.figure
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: `linear-gradient(135deg, ${a}, ${b})`,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative m-0 flex aspect-[4/5] cursor-pointer flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-md transition-shadow duration-300 hover:shadow-2xl perspective-1000"
    >
      <motion.img
        src={imgUrl}
        alt={name}
        loading="lazy"
        style={{ translateZ: "50px" }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

      <figcaption
        style={{ transform: "translateZ(70px)" }}
        className="relative z-10 transition-transform duration-300"
      >
        <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium tracking-wide text-white/95 backdrop-blur-md">
          {cat}
        </span>
        <span className="mt-2 block font-serif text-lg font-bold leading-tight sm:text-xl text-white drop-shadow-md">
          {name}
        </span>
      </figcaption>
    </motion.figure>
  );
}

export default function Projects({ onOpen }) {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter(
    (item) => filter === "all" || item.key === filter,
  );

  return (
    <section
      id="work"
      className="border-y border-line bg-white py-16 lg:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="text-xs font-bold tracking-widest text-brassd uppercase">
            Portfolio
          </span>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-main mt-1.5">
            Spaces we have designed
          </h2>
          <p className="mt-3 text-base sm:text-lg text-mute font-light leading-relaxed">
            A selection from our portfolio. Want a similar space for your home?
            Ask us for a walkthrough.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div
          className="-mx-5 mt-8 flex gap-2.5 overflow-x-auto px-5 pb-3 scrollbar-none"
          role="group"
          aria-label="Filter projects"
        >
          {projectTabs.map(([k, t]) => {
            const isActive = filter === k;
            return (
              <button
                key={k}
                aria-pressed={isActive}
                onClick={() => setFilter(k)}
                className={`relative shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                  isActive ? "text-white" : "text-mute hover:text-main"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterTab"
                    className="absolute inset-0 rounded-full bg-forest shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Project Grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item) => (
              <ProjectTile
                key={item.id}
                cat={item.cat}
                name={item.name}
                colors={item.colors}
                imgUrl={item.imgUrl}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Centered CTA */}
        <div className="mt-14 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpen}
            className="btn rounded-xl bg-forest px-8 py-4 text-sm font-semibold text-paper shadow-xl transition-all hover:bg-forest/90 hover:shadow-2xl focus:outline-none ring-offset-2 focus:ring-2 focus:ring-forest/50"
          >
            Get a design like this for my home
          </motion.button>
        </div>

        {/* Redesigned Premium Brands Showcase */}
        <div className="mt-24 border-t border-line/70 pt-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brassd/30 bg-brassd/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-brassd mb-3">
                Partners & Quality
              </div>
              <h3 className="font-serif text-3xl font-semibold text-main sm:text-4xl">
                Materials and trusted brands we work with
              </h3>
            </div>
            <p className="text-sm text-mute font-light max-w-md leading-relaxed">
              We source strictly from industry leaders in hardware, surfaces, and finishes to ensure lifelong structural integrity and finish perfection.
            </p>
          </div>

          {/* Editorial Bento Grid Layout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.04 } },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {brands.map((b, idx) => (
              <motion.div
                key={b}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line/80 bg-gradient-to-br from-paper/60 via-paper/30 to-white p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-forest/50 hover:bg-white hover:shadow-xl hover:shadow-forest/5 cursor-default min-h-[110px]"
              >
                {/* Ambient glow effect corner badge */}
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-forest/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-forest/15" />

                {/* Top Item Code / Index Indicator */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-mute/50 group-hover:text-forest/70 font-semibold tracking-widest">
                    0{idx + 1}
                  </span>
                  <span className="text-mute/30 group-hover:text-forest transition-colors text-xs font-mono transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 duration-300">
                    ↗
                  </span>
                </div>

                {/* Brand Name */}
                <div className="mt-4">
                  <span className="block font-serif text-sm sm:text-base font-bold tracking-tight text-main group-hover:text-forest transition-colors leading-tight">
                    {b}
                  </span>
                  <span className="mt-1 block text-[10px] font-medium tracking-wide uppercase text-mute/70">
                    Certified Partner
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}