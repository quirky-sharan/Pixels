import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const About = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // ultra smooth scroll
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.4,
  });

  // parallax intro
  const textY = useTransform(smooth, [0, 1], [120, -120]);
  const textOpacity = useTransform(smooth, [0, 0.25], [0, 1]);

  // image motion
  const imgScale = useTransform(smooth, [0, 1], [0.85, 1]);
  const imgRotate = useTransform(smooth, [0, 1], [-4, 0]);

  const fadeUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease },
    },
    viewport: { once: true, margin: "-100px" },
  };

  const stagger = {
    whileInView: {
      transition: { staggerChildren: 0.18 },
    },
  };

  return (
    <section
      ref={container}
      data-scroll
      data-scroll-speed="-.2"
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-[#cdea68] rounded-t-3xl text-zinc-900 overflow-hidden"
    >
      {/* TOP TEXT - RESPONSIVE */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      >
        <p className="text-[5vw] sm:text-[4.5vw] md:text-[4vw] lg:text-[3.65vw] leading-tight sm:leading-snug w-full sm:w-[95%] md:w-[90%] font-light">
          Our platform is a living digital archive for the world's folk stories,
          oral traditions, and timeless songs — built to preserve cultural
          heritage, celebrate diversity, and connect generations through stories.
        </p>
      </motion.div>

      {/* STRIP - RESPONSIVE */}
      <motion.div
        variants={stagger}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="w-full border-y border-zinc-500/60 mt-8 sm:mt-10 md:mt-12 lg:mt-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      >
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 pt-4 sm:pt-5 md:pt-6 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
          
          {/* First Column */}
          <motion.div
            variants={fadeUp}
            className="lg:basis-[50vw] text-sm sm:text-base"
          >
            What you can experience:
          </motion.div>

          {/* Second Column */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col w-full lg:w-[50vw] gap-4 sm:gap-5 md:gap-6 lg:gap-7 text-sm sm:text-base"
          >
            <span className="font-light">
              Explore authentic folk tales, regional legends, and traditional
              songs from every corner of the globe — shared by communities,
              storytellers, and cultural enthusiasts.
            </span>

            <span className="font-light">
              Discover stories in their original voice, language, and emotion.
              We blend technology with tradition to make cultural heritage
              accessible, immersive, and everlasting.
            </span>
          </motion.div>

          {/* Third Column */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col lg:justify-end lg:pl-12 xl:pl-24 text-sm sm:text-base"
          >
            <span className="mb-2 sm:mb-3">Connect:</span>

            {[
              "Submit Your Story",
              "Upload Folk Songs",
              "Join Cultural Circles",
              "Collaborate Globally",
            ].map((item, i) => (
              <motion.span
                key={i}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="cursor-pointer font-light"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* BOTTOM - RESPONSIVE */}
      <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-4 sm:mt-5 md:mt-6 justify-between items-start lg:items-center">
        
        {/* Left Side - Button */}
        <motion.div
          {...fadeUp}
          className="flex flex-col gap-4 sm:gap-5 items-start"
        >
          <h3 className="text-[6vw] sm:text-[5vw] md:text-[4.5vw] lg:text-[4vw] font-normal">
            Our approach:
          </h3>

          <motion.button
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="relative text-white px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 md:py-4 bg-zinc-900 rounded-full text-xs sm:text-sm md:text-base lg:text-[1.184vw] overflow-hidden"
          >
            <motion.span
              variants={{
                rest: { y: 0 },
                hover: { y: "-100%" },
              }}
              transition={{ duration: 0.45, ease }}
              className="block"
            >
              READ MORE
            </motion.span>

            <motion.span
              variants={{
                rest: { y: "100%" },
                hover: { y: 0 },
              }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0 flex items-center justify-center"
            >
              READ MORE
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          style={{ scale: imgScale, rotate: imgRotate }}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease }}
          className="rounded-2xl overflow-hidden flex items-center justify-center w-full sm:w-[90%] md:w-[500px] lg:w-[580px] xl:w-[640px] shadow-[0_15px_50px_rgba(0,0,0,0.15)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.18)] lg:shadow-[0_25px_70px_rgba(0,0,0,0.18)]"
        >
          <img
            src="https://ochi.design/wp-content/uploads/2022/05/Homepage-Photo-663x469.jpg"
            className="object-cover w-full h-full"
            alt="About"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;