import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const Marquee = () => {
  const marqueeRef = useRef(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: marqueeRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <motion.div 
      ref={marqueeRef}
      data-scroll 
      data-scroll-speed='.1' 
      className="w-full py-[8vw] sm:py-[7vw] md:py-[6vw] lg:py-[5.922vw] rounded-t-3xl bg-gradient-to-br from-[#004D43] via-[#005d4f] to-[#004D43] relative overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Subtle background elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(205, 234, 104, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle floating orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 rounded-full blur-3xl opacity-30"
          style={{
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(205, 234, 104, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
            left: `${i * 30}%`,
            top: `${i % 2 === 0 ? '10%' : '70%'}`,
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}

      {/* Top fade overlay - RESPONSIVE */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-gradient-to-b from-[#004D43] via-[#004D43]/60 to-transparent z-10 pointer-events-none" />
      
      {/* Bottom fade overlay - RESPONSIVE */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-[#004D43] via-[#004D43]/60 to-transparent z-10 pointer-events-none" />

      {/* Left fade overlay - RESPONSIVE */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-[#004D43] via-[#004D43]/70 to-transparent z-10 pointer-events-none" />
      
      {/* Right fade overlay - RESPONSIVE */}
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-20 md:w-24 bg-gradient-to-l from-[#004D43] via-[#004D43]/70 to-transparent z-10 pointer-events-none" />

      <motion.div 
        className="text border-t border-b border-zinc-300/20 flex items-center gap-[3vw] whitespace-nowrap font-['FoundersGrotesk'] uppercase overflow-hidden relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        {/* Subtle animated border glow */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#cdea68]/40 to-transparent opacity-60"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#cdea68]/40 to-transparent opacity-60"
          animate={{
            x: ['100%', '-100%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* First marquee text - RESPONSIVE */}
        <motion.h1
          initial={{ x: '0%' }}
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
          className="leading-none text-[35vw] sm:text-[32vw] md:text-[30vw] font-normal tracking-tight relative"
          style={{
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
            fontWeight: 400,
            marginTop: '-0.19em',
            marginBottom: '-0.09em',
          }}
        >
          <motion.span
            className="inline-block"
            whileHover={{ 
              color: '#cdea68',
            }}
            transition={{ duration: 0.4 }}
          >
            We are PIXELS
          </motion.span>
        </motion.h1>

        {/* Second marquee text - RESPONSIVE */}
        <motion.h1
          initial={{ x: '0%' }}
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
          className="leading-none text-[35vw] sm:text-[32vw] md:text-[30vw] font-normal tracking-tight relative"
          style={{
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
            fontWeight: 400,
            marginTop: '-0.19em',
            marginBottom: '-0.09em',
          }}
        >
          <motion.span
            className="inline-block"
            whileHover={{ 
              color: '#cdea68',
            }}
            transition={{ duration: 0.4 }}
          >
            We are PIXELS
          </motion.span>
        </motion.h1>

        {/* Third marquee text (for seamless loop) - RESPONSIVE */}
        <motion.h1
          initial={{ x: '0%' }}
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
          className="leading-none text-[35vw] sm:text-[32vw] md:text-[30vw] font-normal tracking-tight relative"
          style={{
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
            fontWeight: 400,
            marginTop: '-0.19em',
            marginBottom: '-0.09em',
          }}
        >
          <motion.span
            className="inline-block"
            whileHover={{ 
              color: '#cdea68',
            }}
            transition={{ duration: 0.4 }}
          >
            We are PIXELS
          </motion.span>
        </motion.h1>
      </motion.div>

      {/* Minimal decorative elements - RESPONSIVE */}
      <motion.div
        className="absolute top-6 sm:top-8 md:top-10 left-6 sm:left-8 md:left-10 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border border-[#cdea68]/15 rounded-full"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-10 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 border border-white/10 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Minimal particles - RESPONSIVE */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-0.5 h-0.5 bg-[#cdea68] rounded-full opacity-20"
          style={{
            left: `${15 + i * 18}%`,
            top: i % 2 === 0 ? '25%' : '75%',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}

      {/* Very subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(205, 234, 104, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(205, 234, 104, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
    </motion.div>
  );
};

export default Marquee;