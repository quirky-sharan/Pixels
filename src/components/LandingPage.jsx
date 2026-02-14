import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";

const headlines = ["Culture.", "Reimagined.", "Digitally."];

const regions = [
  {
    name: "Asia",
    img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
  },
  {
    name: "Africa",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    name: "Europe",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
  },
];

const WAVE_COUNT = 40;

export default function LandingPage() {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  /* ---------------- Scroll ---------------- */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityShift = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);

  /* ---------------- Mouse Depth ---------------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const handleMove = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    mouseX.set((x - window.innerWidth / 2) / 60);
    mouseY.set((y - window.innerHeight / 2) / 60);
  };

  /* ---------------- Auto Slide ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % regions.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- Smooth Wave ---------------- */
  const waveCursor = useMotionValue(0.5);
  const smoothWave = useSpring(waveCursor, {
    stiffness: 60,
    damping: 30,
  });

  const handleWaveMove = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    waveCursor.set(x / window.innerWidth);
  };

  const waveHeights = Array.from({ length: WAVE_COUNT }).map((_, i) =>
    useTransform(smoothWave, (v) => {
      const position = i / WAVE_COUNT;
      const sigma = 0.08;
      const amplitude = 60;
      const gaussian =
        amplitude *
        Math.exp(-Math.pow(position - v, 2) / (2 * sigma * sigma));

      return 20 + gaussian;
    })
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      className="relative bg-zinc-900 w-full min-h-screen overflow-hidden text-white"
    >
      {/* Background */}
      <motion.div
        style={{ y: yParallax, opacity: opacityShift }}
        className="absolute inset-0"
      >
        {regions.map((region, i) => (
          <motion.img
            key={i}
            src={region.img}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: i === index ? 0.35 : 0 }}
            transition={{ duration: 2 }}
            style={{ x: smoothX, y: smoothY }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      </motion.div>

      {/* Content - RESPONSIVE */}
      <div className="relative z-10 pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {headlines.map((text, i) => (
          <motion.h1
            key={i}
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: i * 0.4,
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ letterSpacing: "0.1em" }}
            className="font-['FoundersGrotesk'] text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] xl:text-[8vw] leading-[0.85] uppercase font-normal"
          >
            {text}
          </motion.h1>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="mt-6 sm:mt-8 md:mt-10 text-zinc-300 max-w-xl lg:max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl font-light"
        >
          A living digital archive where stories transcend borders.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 sm:mt-8 md:mt-10 flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-[#cdea68] text-[#cdea68] uppercase text-xs sm:text-sm rounded-full tracking-wider"
        >
          Explore Archive
          <BsArrowUpRight className="text-xs sm:text-sm" />
        </motion.button>

        <motion.div
          key={regions[index].name}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 right-4 sm:right-6 md:right-8 lg:right-12 xl:right-16 text-right"
        >
          <p className="text-xs sm:text-sm text-zinc-400 uppercase tracking-widest">
            Now Featuring
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light uppercase mt-1">
            {regions[index].name}
          </h2>
        </motion.div>
      </div>

      {/* Smooth Gaussian Wave - RESPONSIVE */}
      <div
        onMouseMove={handleWaveMove}
        onTouchMove={handleWaveMove}
        className="absolute bottom-0 w-full flex justify-center gap-[1px] sm:gap-[1.5px] md:gap-[2px] pb-6 sm:pb-7 md:pb-8 z-10"
      >
        {waveHeights.map((height, i) => (
          <motion.div
            key={i}
            style={{ height }}
            className="w-[2px] sm:w-[2.5px] md:w-[3px] bg-[#cdea68] opacity-70 rounded-full"
          />
        ))}
      </div>

      {/* Scroll Indicator - RESPONSIVE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3 }}
        className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 text-zinc-500 text-[10px] sm:text-xs tracking-widest"
      >
        SCROLL TO DISCOVER
      </motion.div>
    </div>
  );
}