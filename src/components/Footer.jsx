import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.2 });
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });

  // Transform values based on scroll
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const contentY = useTransform(scrollYProgress, [0, 0.4, 1], [80, 0, -30]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0.9]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const linkVariants = {
    rest: { x: 0 },
    hover: {
      x: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -15 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div 
      ref={footerRef}
      data-scroll 
      data-scroll-section 
      className='relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 w-full bg-zinc-800 z-10 overflow-hidden'
    >
      {/* Animated background gradient */}
      <motion.div
        className='absolute inset-0 opacity-30'
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className='flex flex-col lg:flex-row items-start justify-between relative z-10 gap-8 lg:gap-0'>
        
        {/* Left Side - Large Titles - RESPONSIVE */}
        <div className='w-full lg:w-1/2 flex flex-col justify-start lg:min-h-[60vh]'>
          <motion.div style={{ y: titleY, opacity: titleOpacity }}>
            <motion.h1 
              className="font-['FoundersGrotesk'] leading-[0.85] uppercase text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] font-normal"
              custom={0}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={titleVariants}
              whileHover={{ 
                scale: 1.02,
                color: '#a1a1aa',
                transition: { duration: 0.3 }
              }}
              style={{ perspective: 1000 }}
            >
              STORIES
            </motion.h1>
            <motion.h1 
              className="font-['FoundersGrotesk'] leading-[0.85] uppercase text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] font-normal"
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={titleVariants}
              whileHover={{ 
                scale: 1.02,
                color: '#a1a1aa',
                transition: { duration: 0.3 }
              }}
              style={{ perspective: 1000 }}
            >
              LIVE
            </motion.h1>
          </motion.div>
        </div>

        {/* Right Side - Content - RESPONSIVE */}
        <motion.div 
          className='w-full lg:w-1/2'
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.div 
            className='flex flex-col gap-6 sm:gap-8 md:gap-10'
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Forever Title */}
            <motion.h1 
              className="font-['FoundersGrotesk'] leading-[0.85] uppercase text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] font-normal"
              custom={2}
              variants={titleVariants}
              whileHover={{ 
                scale: 1.02,
                color: '#a1a1aa',
                transition: { duration: 0.3 }
              }}
            >
              FOREVER
            </motion.h1>

            {/* Links Section - RESPONSIVE */}
            <motion.div 
              className='flex flex-col gap-0 text-sm sm:text-base'
              variants={itemVariants}
            >
              <motion.span 
                className='mb-3 sm:mb-4 text-zinc-400'
                whileHover={{ color: '#ffffff', transition: { duration: 0.2 } }}
              >
                C:
              </motion.span>
              {['Instagram', 'Community Forum', 'Story Circles', 'Global Contributors'].map((link, index) => (
                <motion.span
                  key={link}
                  variants={linkVariants}
                  initial="rest"
                  whileHover="hover"
                  className='cursor-pointer relative overflow-hidden group text-xs sm:text-sm md:text-base'
                  custom={index}
                >
                  <motion.span
                    className='inline-block'
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link}
                  </motion.span>
                  <motion.span
                    className='absolute bottom-0 left-0 w-0 h-[1px] bg-white'
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              ))}
            </motion.div>

            {/* Two Column Section - RESPONSIVE */}
            <motion.div 
              className='flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-4 md:gap-0 sm:pr-4 md:pr-7'
              variants={itemVariants}
            >
              <div className='flex flex-col gap-0 text-sm sm:text-base'>
                <motion.span 
                  className='mb-3 sm:mb-4 text-zinc-400'
                  whileHover={{ color: '#ffffff', transition: { duration: 0.2 } }}
                >
                  H:
                </motion.span>
                {['Digital Archive', 'Global Access', 'Open Story Library', 'Preserved Traditions'].map((link) => (
                  <motion.span
                    key={link}
                    variants={linkVariants}
                    initial="rest"
                    whileHover="hover"
                    className='cursor-pointer relative group text-xs sm:text-sm md:text-base'
                  >
                    <motion.span
                      className='inline-block'
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link}
                    </motion.span>
                    <motion.span
                      className='absolute bottom-0 left-0 w-0 h-[1px] bg-white'
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                ))}
              </div>

              <div className='flex flex-col gap-0 text-sm sm:text-base'>
                <motion.span 
                  className='mb-3 sm:mb-4 text-zinc-400'
                  whileHover={{ color: '#ffffff', transition: { duration: 0.2 } }}
                >
                  N:
                </motion.span>
                {['Home', 'Explore', 'Featured Regions', 'About', 'Contribute', 'Contact'].map((link) => (
                  <motion.span
                    key={link}
                    variants={linkVariants}
                    initial="rest"
                    whileHover="hover"
                    className='cursor-pointer relative group text-xs sm:text-sm md:text-base'
                  >
                    <motion.span
                      className='inline-block'
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link}
                    </motion.span>
                    <motion.span
                      className='absolute bottom-0 left-0 w-0 h-[1px] bg-white'
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Email Section - RESPONSIVE */}
            <motion.div 
              className='flex flex-col gap-0 text-sm sm:text-base'
              variants={itemVariants}
            >
              <motion.span 
                className='mb-3 sm:mb-4 text-zinc-400'
                whileHover={{ color: '#ffffff', transition: { duration: 0.2 } }}
              >
                E:
              </motion.span>
              <motion.span
                className='cursor-pointer relative group text-xs sm:text-sm md:text-base'
                whileHover={{ x: 3, color: '#a1a1aa' }}
                transition={{ duration: 0.2 }}
              >
                pixels@xyz.world
                <motion.span
                  className='absolute bottom-0 left-0 w-0 h-[1px] bg-white'
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Section - RESPONSIVE */}
      <motion.div 
        className='flex flex-col sm:flex-row gap-6 sm:gap-0 mt-8 sm:mt-10'
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className='w-full sm:w-1/2'>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <svg
              width="60"
              height="25"
              viewBox="0 0 72 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className='cursor-pointer w-[50px] sm:w-[60px] md:w-[72px] h-auto'
            >
              <motion.path 
                d="M9.8393 10.2032C4.22951 10.3257 -0.0459221 14.7356 0.000372391 20.2752C0.0412204 25.3548 4.57808 30.3608 10.6862 29.9226C15.5145 29.5768 19.9015 25.4119 19.8525 20.0057C19.8035 14.5995 15.1904 10.0916 9.8393 10.2032ZM9.89649 25.7005C6.87101 25.7005 4.39834 23.1144 4.40924 19.9839C4.39525 19.2507 4.52792 18.522 4.79947 17.8407C5.07102 17.1594 5.47597 16.5392 5.99056 16.0164C6.50515 15.4937 7.11902 15.0789 7.79613 14.7966C8.47324 14.5142 9.19995 14.3698 9.93362 14.372C10.6673 14.3742 11.3931 14.5228 12.0686 14.8092C12.744 15.0956 13.3554 15.514 13.8668 16.0398C14.3783 16.5656 14.7796 17.1882 15.0471 17.8711C15.3146 18.554 15.4429 19.2834 15.4246 20.0166C15.4409 23.1008 12.9111 25.7059 9.88832 25.7005H9.89649Z" 
                fill="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </div>

        <motion.div 
          className='w-full sm:w-1/2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4'
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
            className='text-xs sm:text-sm'
          >
            ©Pixels 2026. Preserving Cultural Heritage.
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
            className='text-xs sm:text-sm'
          >
            Built with passion for stories & songs.
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Footer;