"use client";

import { motion } from "framer-motion";
import {
  Dumbbell,
  HeartPulse,
  User,
  Users,
  Activity,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Dumbbell,
  HeartPulse,
  User,
  Users,
  Activity,
  Sparkles,
};

interface Program {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

interface ProgramsSectionProps {
  title?: string;
  subtitle?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  programs?: Program[];
}

export default function ProgramsSection({
  title = "Programas de Treino",
  subtitle = "Escolha o programa que melhor se adapta aos seus objetivos e estilo de vida. Todos incluem acompanhamento profissional dedicado.",
  ctaTitle = "Pronto para Começar?",
  ctaDescription = "Entre em contacto e agende a sua primeira sessão. Juntos vamos criar o plano perfeito para alcançar os seus objetivos.",
  ctaPrimaryText = "Agendar Sessão",
  ctaSecondaryText = "Saber Mais",
  programs = [],
}: ProgramsSectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="programs"
      className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-6">
            {title}
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {programs.map((program, index) => {
            const IconComponent = iconMap[program.icon] || Dumbbell;

            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -8 }}
                className="rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-sm text-gray-600">{program.description}</p>
                </div>

                {/* Card Content */}
                <div className="px-6 pb-6">
                  <ul className="space-y-2">
                    {program.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover indicator */}
                <div className="h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {ctaTitle}
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {ctaDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium bg-white text-primary rounded-full shadow-lg hover:shadow-xl transition-all group"
              >
                {ctaPrimaryText}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.a>

              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-primary transition-all"
              >
                {ctaSecondaryText}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
