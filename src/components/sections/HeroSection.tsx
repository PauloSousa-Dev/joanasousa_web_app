"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface HeroSectionProps {
  heroTitle?: string;
  heroSubtitle?: string;
  cta?: string;
  backgroundImage?: string | null;
}

export default function HeroSection({
  heroTitle = "Treino que transforma",
  heroSubtitle = "Marca a tua sessão",
  cta = "Contactar",
  backgroundImage,
}: HeroSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100"
    >
      {/* Background Image */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              filter: 'brightness(1.15) saturate(0.5) blur(2px)',
              opacity: 0.4
            }}
          />
          {/* White overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/50" />
        </>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large animated gradient circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[var(--color-secondary)]/10 to-transparent rounded-full blur-3xl"
        />

        {/* Geometric circles inspired by brand identity */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full border-2 border-[var(--color-primary)]/10 opacity-40" />
        <div className="absolute top-32 right-20 w-64 h-64 rounded-full bg-[var(--color-primary)]/5" />
        <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full border-2 border-[var(--color-primary)]/10 opacity-30" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 left-1/4 w-48 h-48 rounded-full border-4 border-[var(--color-primary)]/10"
        />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-secondary-light)] to-[var(--color-primary)] bg-clip-text text-transparent">
            {heroTitle}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          {heroSubtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#contact"
            className="group px-8 py-4 bg-[var(--color-primary)] text-white rounded-full font-medium text-lg flex items-center gap-2 hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg shadow-[var(--color-primary)]/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {cta}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>

{/* <motion.button
            className="group px-8 py-4 bg-white text-[var(--color-secondary)] rounded-full font-medium text-lg flex items-center gap-2 border-2 border-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play
              size={20}
              className="fill-[var(--color-secondary)] group-hover:fill-white transition-colors"
            />
            Ver Treinos
          </motion.button> */}
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors"
        >
          <span className="text-sm font-medium">Scroll</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
}
