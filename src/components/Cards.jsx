import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const Cards = () => {
  const sectionRef = useRef(null);
  const firstCardRef = useRef(null);
  const secondCardRef = useRef(null);
  const thirdCardRef = useRef(null);

  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.7]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);

  // Individual card scroll effects
  const card1Y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const card2Y = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const card3Y = useTransform(scrollYProgress, [0, 0.5], [110, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    }
  };

  return (
    <motion.div 
      ref={sectionRef}
      data-scroll 
      data-scroll-section 
      data-scroll-speed="-.1" 
      className="min-h-screen w-full flex flex-col md:flex-row gap-5 items-center px-[3.922vw] py-20 relative overflow-hidden bg-zinc-900"
      style={{ opacity, scale }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(205, 234, 104, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 77, 67, 0.15) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#cdea68] rounded-full opacity-20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full flex flex-col md:flex-row gap-5 relative z-10"
      >
        {/* First Large Card */}
        <motion.div 
          ref={firstCardRef}
          variants={cardVariants}
          className="cardcontainer w-full md:w-1/2 h-[55vh]"
          style={{ y: card1Y }}
        >
          <motion.div 
            className="card group relative h-full w-full bg-gradient-to-br from-[#004d43] to-[#003832] rounded-xl flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(205, 234, 104, 0.1) 0%, transparent 70%)'
              }}
            />

            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'linear-gradient(45deg, transparent, rgba(205, 234, 104, 0.3), transparent)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `linear-gradient(rgba(205, 234, 104, 0.5) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(205, 234, 104, 0.5) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            />

            <motion.img
              variants={iconVariants}
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Heritage Icon"
              className="w-36 relative z-10 drop-shadow-2xl"
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
                filter: "drop-shadow(0 0 20px rgba(205, 234, 104, 0.6))"
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Decorative corner elements */}
            <motion.div
              className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#cdea68] opacity-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#cdea68] opacity-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />

            <motion.button 
              className="absolute left-8 bottom-6 border-2 border-[#cdea68] px-4 py-2 rounded-full text-xs text-[#cdea68] font-medium backdrop-blur-sm bg-black/20 overflow-hidden group/btn"
              whileHover={{ scale: 1.05, borderColor: "#ffffff" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.span
                className="absolute inset-0 bg-[#cdea68]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                PRESERVING HERITAGE SINCE 2026
              </span>
            </motion.button>

            {/* Floating particles inside card */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#cdea68] rounded-full opacity-40"
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${20 + i * 15}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side Cards Container */}
        <motion.div 
          className="cardcontainer w-full md:w-1/2 h-[55vh] flex gap-5"
          variants={containerVariants}
        >
          {/* Second Card */}
          <motion.div 
            ref={secondCardRef}
            variants={cardVariants}
            className="w-1/2"
            style={{ y: card2Y }}
          >
            <motion.div 
              className="card group relative w-full h-full bg-gradient-to-br from-[#212121] to-[#161616] rounded-xl flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.03, rotateY: -5 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Animated mesh gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)'
                }}
              />

              {/* Scan line effect */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)'
                }}
                animate={{
                  y: ["-100%", "100%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <motion.img
                variants={iconVariants}
                src="https://cdn-icons-png.flaticon.com/512/2991/2991108.png"
                alt="Stories Icon"
                className="w-36 relative z-10 drop-shadow-2xl"
                whileHover={{ 
                  scale: 1.15,
                  rotate: 360,
                  filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))"
                }}
                transition={{ duration: 0.6 }}
              />

              {/* Corner accent */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />

              <motion.button 
                className="absolute left-8 bottom-6 border-2 border-white/50 px-4 py-2 rounded-full text-xs backdrop-blur-sm bg-white/10 overflow-hidden group/btn"
                whileHover={{ scale: 1.05, borderColor: "#cdea68", color: "#cdea68" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 font-medium">
                  1000+ STORIES ARCHIVED
                </span>
              </motion.button>

              {/* Glowing orb */}
              <motion.div
                className="absolute w-32 h-32 bg-white/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>

          {/* Third Card */}
          <motion.div 
            ref={thirdCardRef}
            variants={cardVariants}
            className="w-1/2"
            style={{ y: card3Y }}
          >
            <motion.div 
              className="card group relative w-full h-full bg-gradient-to-br from-[#212121] to-[#0a0a0a] rounded-xl flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.03, rotateY: 5 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Radial gradient overlay */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 70% 70%, rgba(205, 234, 104, 0.08) 0%, transparent 60%)'
                }}
              />

              {/* Dot pattern */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

              <motion.img
                variants={iconVariants}
                src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
                alt="Community Icon"
                className="w-36 relative z-10 drop-shadow-2xl"
                whileHover={{ 
                  scale: 1.15,
                  y: -10,
                  filter: "drop-shadow(0 0 20px rgba(205, 234, 104, 0.5))"
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }}
              />

              {/* Animated rings */}
              <motion.div
                className="absolute w-40 h-40 border border-white/10 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="absolute w-40 h-40 border border-white/10 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1
                }}
              />

              {/* Corner accent */}
              <motion.div
                className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />

              <motion.button 
                className="absolute left-8 bottom-6 border-2 border-white/50 px-4 py-2 rounded-full text-xs backdrop-blur-sm bg-white/10 overflow-hidden group/btn"
                whileHover={{ scale: 1.05, borderColor: "#cdea68", color: "#cdea68" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 font-medium">
                  GLOBAL CONTRIBUTORS
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Cards;