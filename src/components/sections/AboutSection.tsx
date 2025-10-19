"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Heart, Target, TrendingUp } from "lucide-react";
import VideoPlayer from "@/components/ui/VideoPlayer";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  bio1?: string;
  bio2?: string;
  yearsExperience?: number;
  videoWebm?: string;
  videoMp4?: string;
  videoPoster?: string;
}

export default function AboutSection({
  title = "Sobre Mim",
  subtitle = "Conhece-me Melhor",
  description = "Personal trainer certificada com mais de 10 anos de experiência em transformar vidas através do fitness.",
  bio1 = "A minha missão é ajudar-te a alcançar o teu melhor eu, através de treinos personalizados, nutrição equilibrada e um acompanhamento que vai além do ginásio.",
  bio2 = "Acredito que cada pessoa é única e merece um plano adaptado às suas necessidades, objetivos e estilo de vida. Juntos, vamos criar uma versão mais forte, saudável e confiante de ti.",
  yearsExperience = 10,
  videoWebm,
  videoMp4,
  videoPoster,
}: AboutSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Award,
      title: "Certificação Profissional",
      description: "Formação especializada e certificações internacionais",
    },
    {
      icon: Target,
      title: "Treino Personalizado",
      description: "Programas adaptados aos teus objetivos específicos",
    },
    {
      icon: Heart,
      title: "Acompanhamento Total",
      description: "Suporte contínuo dentro e fora do ginásio",
    },
    {
      icon: TrendingUp,
      title: "Resultados Comprovados",
      description: "Histórico de sucesso com centenas de alunos",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[var(--color-primary)]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-secondary)]/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-60" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-[var(--color-secondary)] text-sm font-medium text-white">
              {subtitle}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image/Video Side */}
          <motion.div variants={itemVariants} className="relative">
            {/* Vídeo (se disponível) ou Imagem Placeholder */}
            {videoMp4 && videoPoster ? (
              <VideoPlayer
                webmSrc={videoWebm}
                mp4Src={videoMp4}
                poster={videoPoster}
                title="Vídeo Treino Terapêutico - Joana Sousa"
                autoPlayOnView={true}
                className="aspect-[4/5] shadow-2xl"
              />
            ) : (
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden shadow-2xl">
                {/* Placeholder - Replace with actual image or video */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Award size={48} className="mx-auto mb-4" />
                    <p className="text-sm">
                      Adicionar vídeo ou foto profissional
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-primary"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  {yearsExperience}+
                </div>
                <div>
                  <div className="font-semibold text-secondary">Anos</div>
                  <div className="text-sm text-gray-600">Experiência</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">{bio1}</p>

            <p className="text-gray-600 text-lg leading-relaxed">{bio2}</p>

            {/* Key Points */}
            <div className="space-y-4 pt-4">
              {[
                "Treinos adaptados ao teu nível e objetivos",
                "Acompanhamento nutricional personalizado",
                "Motivação e suporte contínuos",
                "Flexibilidade de horários",
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                  <span className="text-gray-700">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-[var(--color-primary)] hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)] text-white flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[var(--color-primary)] transition-all">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-secondary)] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
