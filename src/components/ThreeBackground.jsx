import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";

const headlines = ["Culture.", "Reimagined.", "Digitally."];

const regions = [
  { name: "Asia", img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2" },
  { name: "Africa", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
  { name: "Europe", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da" },
];

const LandingPage = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityShift = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);

  // Mouse movement depth effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX - innerWidth / 2) / 50);
    mouseY.set((e.clientY - innerHeight / 2) / 50);
  };

  // Auto region slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % regions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-zinc-900 w-full min-h-screen overflow-hidden text-white"
    >

      {/* 🌌 Background Slider with Depth */}
      <motion.div style={{ y: yParallax, opacity: opacityShift }} className="absolute inset-0">
        {regions.map((region, i) => (
          <motion.img
            key={i}
            src={region.img}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: i === index ? 0.35 : 0 }}
            transition={{ duration: 1.5 }}
            style={{ x: smoothX, y: smoothY }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      </motion.div>

      {/* 🎨 Grain Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* 🚀 Main Content */}
      <div className="relative z-10 pt-36 px-[6vw]">

        {headlines.map((text, i) => (
          <motion.h1
            key={i}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: i * 0.25, duration: 1 }}
            whileHover={{ letterSpacing: "4px" }}
            className="font-['FoundersGrotesk'] text-[9vw] leading-[7vw] uppercase"
          >
            {text}
          </motion.h1>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 text-zinc-300 max-w-2xl text-[1.3vw]"
        >
          A living digital archive where stories, songs, and traditions transcend borders.
          Preserved through technology. Shared with humanity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-12 flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-6 py-3 border border-[#cdea68] text-[#cdea68] uppercase text-sm rounded-full tracking-wider"
          >
            Explore Archive
            <BsArrowUpRight />
          </motion.button>
        </motion.div>

        {/* Region Label */}
        <motion.div
          key={regions[index].name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-32 right-[6vw] text-right"
        >
          <p className="text-sm text-zinc-400 uppercase tracking-widest">
            Now Featuring
          </p>
          <h2 className="text-3xl font-light uppercase">
            {regions[index].name}
          </h2>
        </motion.div>
      </div>

      {/* 🎧 Bottom Wave Section (KEPT + ENHANCED) */}
      <div className="absolute bottom-0 w-full flex justify-center gap-2 opacity-40 pb-6">
        {[...Array(22)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [12, 50, 12] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut",
            }}
            className="w-[2px] bg-[#cdea68]"
          />
        ))}
      </div>

      {/* Scroll Indicator Animated */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-zinc-500 text-xs tracking-widest"
      >
        SCROLL TO DISCOVER
      </motion.div>
    </div>
  );
};

export default LandingPage;