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
    <div ref={sectionRef} className="relative z-10 bg-zinc-900 w-full py-20 overflow-hidden">
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

      {/* Header Section */}
      <motion.div 
        className="w-full px-[3.922vw] pb-10 border-b border-zinc-700/50 relative"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="flex items-end justify-between"
        >
          <h1 className="text-[4vw] font-['FoundersGrotesk'] tracking-tight font-normal">
            Featured Collections
          </h1>
          <motion.p 
            className="text-zinc-400 text-sm max-w-md pb-1"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Explore cultural narratives from around the world, where ancient traditions meet contemporary storytelling.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Cards Grid */}
      <div ref={cardsRef} className="w-full px-[3.922vw] py-[2.922vw]">
        <div className="w-full relative flex flex-wrap -mx-2">
          
          {cardData.map((card, index) => (
            <motion.div
              key={card.title}
              custom={card.delay}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              onHoverStart={() => handleHovering(index)}
              onHoverEnd={() => handleHoverEnd(index)}
              className={`cardcontainer group relative p-2 mb-10 h-[50vh] md:h-[75vh] ${
                index < 2 ? 'w-full md:w-1/2' : 'w-full md:w-1/2'
              }`}
            >
              {/* Animated Title - Clean and minimal */}
              <h1 
                className={`flex overflow-hidden text-[8vw] absolute z-[999] top-1/2 -translate-y-1/2 font-['FoundersGrotesk'] font-normal pointer-events-none ${
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

                  {/* Description tag - more subtle */}
                  <motion.div
                    className="absolute bottom-6 left-6 px-4 py-2 bg-zinc-900/70 backdrop-blur-sm rounded-full border border-zinc-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-xs text-zinc-300 tracking-wider uppercase font-light">
                      {card.description}
                    </span>
                  </motion.div>
                </div>

                {/* Minimal corner accent lines */}
                <motion.div
                  className="absolute top-4 left-4 w-6 h-6 border-t border-l opacity-0 pointer-events-none z-[2]"
                  style={{ borderColor: card.color }}
                  animate={{
                    opacity: hoveredCard === index ? 0.3 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-4 right-4 w-6 h-6 border-b border-r opacity-0 pointer-events-none z-[2]"
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

      {/* Bottom decorative element */}
      <motion.div
        className="w-full px-[3.922vw] pt-10 border-t border-zinc-800/50"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center justify-between text-sm text-zinc-500">
          <motion.span
            whileHover={{ color: '#cdea68', x: 3 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer font-light"
          >
            View All Collections →
          </motion.span>
          <span className="font-light">Preserving cultural heritage through immersive storytelling</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Featured;