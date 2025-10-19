"use client";

import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface HeroSectionProps {
  heroTitle?: string;
  heroSubtitle?: string;
  cta?: string;
}

export default function HeroSection({
  heroTitle = "Treino que transforma",
  heroSubtitle = "Marca a tua sessão",
  cta = "Contactar",
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
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-block mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-primary)] text-sm font-medium text-[var(--color-secondary)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
            </span>
            Treino Terapêutico
          </span>
        </motion.div>

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

          <motion.button
            className="group px-8 py-4 bg-white text-[var(--color-secondary)] rounded-full font-medium text-lg flex items-center gap-2 border-2 border-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play
              size={20}
              className="fill-[var(--color-secondary)] group-hover:fill-white transition-colors"
            />
            Ver Treinos
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "500+", label: "Alunos" },
            { value: "10+", label: "Anos Experiência" },
            { value: "98%", label: "Satisfação" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)] transition-colors"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
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
