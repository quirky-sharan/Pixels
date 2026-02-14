import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const navLinks = [
    { name: 'Explore', href: '#explore' },
    { name: 'Collections', href: '#collections' },
    { name: 'Contribute', href: '#contribute' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-5 md:py-6">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-white font-['FoundersGrotesk'] text-xl sm:text-2xl md:text-3xl uppercase tracking-tight font-normal cursor-pointer"
          >
            PIXELS
          </motion.div>

          {/* Desktop Menu - Hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-zinc-300 hover:text-white transition-colors text-sm xl:text-base font-light relative group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cdea68] group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 border border-[#cdea68] text-[#cdea68] rounded-full text-xs xl:text-sm uppercase tracking-wider font-medium"
          >
            Submit Story
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1.5 sm:gap-2 w-8 sm:w-9 h-8 sm:h-9 justify-center items-center relative z-50"
          >
            <motion.span
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0
              }}
              className="w-full h-0.5 bg-white block"
            />
            <motion.span
              animate={{
                opacity: isOpen ? 0 : 1
              }}
              className="w-full h-0.5 bg-white block"
            />
            <motion.span
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0
              }}
              className="w-full h-0.5 bg-white block"
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-zinc-900 z-40 lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  custom={i}
                  variants={linkVariants}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-3xl sm:text-4xl md:text-5xl font-['FoundersGrotesk'] uppercase tracking-tight font-normal relative group"
                  whileHover={{ x: 10, color: '#cdea68' }}
                  transition={{ duration: 0.3 }}
                >
                  {link.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#cdea68] group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}

              {/* Mobile CTA */}
              <motion.button
                custom={navLinks.length}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#cdea68] text-[#cdea68] rounded-full text-sm sm:text-base uppercase tracking-wider font-medium"
                onClick={() => setIsOpen(false)}
              >
                Submit Your Story
              </motion.button>

              {/* Social Links */}
              <motion.div
                custom={navLinks.length + 1}
                variants={linkVariants}
                className="flex gap-6 sm:gap-8 mt-8 sm:mt-10"
              >
                {['Instagram', 'Twitter', 'YouTube'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="text-zinc-400 hover:text-[#cdea68] text-xs sm:text-sm uppercase tracking-wider transition-colors"
                    whileHover={{ y: -3 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(205, 234, 104, 0.15) 0%, transparent 50%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;