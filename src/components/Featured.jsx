import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

const Featured = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const cards = [useAnimation(), useAnimation(), useAnimation(), useAnimation()];

  const [hoveredCard, setHoveredCard] = useState(null);

  const handleHovering = (index) => {
    setHoveredCard(index);
    cards[index].start({ y: "0" });
  };

  const handleHoverEnd = (index) => {
    setHoveredCard(null);
    cards[index].start({ y: "100%" });
  };

  // Card data with culturally rich images
  const cardData = [
    {
      title: "INDIA",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071",
      description: "Ancient Traditions",
      color: "#cdea68",
      delay: 0
    },
    {
      title: "AFRICA",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072",
      description: "Tribal Rhythms",
      color: "#cdea68",
      delay: 0.1
    },
    {
      title: "JAPAN",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070",
      description: "Sacred Ceremonies",
      color: "#cdea68",
      delay: 0.2
    },
    {
      title: "PERU",
      image: "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?q=80&w=2070",
      description: "Indigenous Heritage",
      color: "#cdea68",
      delay: 0.3
    }
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: custom,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div ref={sectionRef} className="relative z-10 bg-zinc-900 w-full py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Subtle animated background texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Header Section - RESPONSIVE */}
      <motion.div 
        className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-6 sm:pb-8 md:pb-10 border-b border-zinc-700/50 relative"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        >
          <h1 className="text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] font-['FoundersGrotesk'] tracking-tight font-normal">
            Featured Collections
          </h1>
          <motion.p 
            className="text-zinc-400 text-xs sm:text-sm max-w-md pb-0 sm:pb-1"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Explore cultural narratives from around the world, where ancient traditions meet contemporary storytelling.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Cards Grid - RESPONSIVE */}
      <div ref={cardsRef} className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="w-full relative flex flex-wrap -mx-1 sm:-mx-2">
          
          {cardData.map((card, index) => (
            <motion.div
              key={card.title}
              custom={card.delay}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              onHoverStart={() => handleHovering(index)}
              onHoverEnd={() => handleHoverEnd(index)}
              className={`cardcontainer group relative p-1 sm:p-2 mb-4 sm:mb-6 md:mb-8 lg:mb-10 h-[40vh] sm:h-[45vh] md:h-[60vh] lg:h-[75vh] w-full md:w-1/2`}
            >
              {/* Animated Title - RESPONSIVE - Hidden on mobile for space */}
              <h1 
                className={`hidden md:flex overflow-hidden text-[12vw] md:text-[10vw] lg:text-[8vw] absolute z-[999] top-1/2 -translate-y-1/2 font-['FoundersGrotesk'] font-normal pointer-events-none ${
                  index % 2 === 0 
                    ? 'left-full -translate-x-1/2' 
                    : 'right-full translate-x-1/2'
                }`}
                style={{ 
                  color: card.color,
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
                  WebkitTextStroke: '0.5px rgba(0,0,0,0.2)',
                  fontWeight: 400,
                }}
              >
                {card.title.split("").map((letter, letterIndex) => (
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={cards[index]}
                    transition={{
                      delay: letterIndex * 0.05,
                      ease: [0.76, 0, 0.24, 1],
                      duration: 0.5
                    }}
                    className="inline-block"
                    key={letterIndex}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>

              {/* Card Container with subtle effects */}
              <motion.div 
                className="card-wrapper relative w-full h-full"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Subtle glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg blur-2xl opacity-0 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle at center, ${card.color}20, transparent 70%)`,
                    zIndex: 0
                  }}
                  animate={{
                    opacity: hoveredCard === index ? 0.3 : 0
                  }}
                />

                {/* Main Card */}
                <div className="card relative z-[1] w-full h-full rounded-lg overflow-hidden">
                  {/* Image with overlay */}
                  <motion.div className="relative w-full h-full">
                    <motion.img
                      className="object-cover object-center w-full h-full"
                      src={card.image}
                      alt={card.title}
                      initial={{ scale: 1.05 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    
                    {/* Subtle dark overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black"
                      initial={{ opacity: 0.25 }}
                      whileHover={{ opacity: 0.15 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Minimal gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </motion.div>

                  {/* Title badge on mobile */}
                  <motion.div
                    className="absolute top-4 left-4 md:hidden px-3 py-1.5 bg-zinc-900/70 backdrop-blur-sm rounded-full border border-zinc-700/50"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <span className="text-xs text-[#cdea68] tracking-wider uppercase font-medium">
                      {card.title}
                    </span>
                  </motion.div>

                  {/* Description tag - more subtle - RESPONSIVE */}
                  <motion.div
                    className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-4 sm:left-5 md:left-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-900/70 backdrop-blur-sm rounded-full border border-zinc-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-[10px] sm:text-xs text-zinc-300 tracking-wider uppercase font-light">
                      {card.description}
                    </span>
                  </motion.div>
                </div>

                {/* Minimal corner accent lines - Hidden on small mobile */}
                <motion.div
                  className="hidden sm:block absolute top-3 sm:top-4 left-3 sm:left-4 w-5 sm:w-6 h-5 sm:h-6 border-t border-l opacity-0 pointer-events-none z-[2]"
                  style={{ borderColor: card.color }}
                  animate={{
                    opacity: hoveredCard === index ? 0.3 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="hidden sm:block absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-5 sm:w-6 h-5 sm:h-6 border-b border-r opacity-0 pointer-events-none z-[2]"
                  style={{ borderColor: card.color }}
                  animate={{
                    opacity: hoveredCard === index ? 0.3 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* Bottom decorative element - RESPONSIVE */}
      <motion.div
        className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 border-t border-zinc-800/50"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-xs sm:text-sm text-zinc-500">
          <motion.span
            whileHover={{ color: '#cdea68', x: 3 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer font-light"
          >
            View All Collections →
          </motion.span>
          <span className="font-light text-[11px] sm:text-sm">Preserving cultural heritage through immersive storytelling</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Featured;