"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, AlertCircle, RefreshCw } from "lucide-react";
import { useWeekSchedule } from "@/hooks/useWeekSchedule";

interface ScheduleSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function ScheduleSection({
  title = "Aulas & Horários",
  subtitle = "Encontra o Horário Perfeito Para Ti",
  description = "Oferecemos uma variedade de programas ao longo da semana para te ajudar a alcançar os teus objetivos.",
}: ScheduleSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Use React Query hook for data fetching
  const {
    data: weekSchedule,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useWeekSchedule();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="schedule"
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-6">
            {title}
          </h2>
          <p className="text-xl text-secondary font-semibold mb-4">{subtitle}</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">
              A carregar horários da semana...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Estamos a buscar os dados mais recentes do RegyBox
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Erro ao Carregar Horários
            </h3>
            <p className="text-gray-600 mb-1">
              {error instanceof Error
                ? error.message
                : "Não foi possível carregar os horários. Por favor, tente novamente."}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Se o problema persistir, contacte o suporte.
            </p>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
              />
              {isFetching ? "A Recarregar..." : "Tentar Novamente"}
            </button>
          </motion.div>
        )}

        {/* Background Refetch Indicator */}
        {isFetching && !isLoading && (
          <div className="fixed top-4 right-4 z-50 bg-primary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">Atualizando...</span>
          </div>
        )}

        {/* Schedule Grid */}
        {!isLoading && !isError && (
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16"
          >
            {weekSchedule.map((daySchedule, dayIndex) => (
              <motion.div
                key={dayIndex}
                variants={itemVariants}
                className="bg-white rounded-2xl border-2 border-gray-200 hover:border-primary transition-all shadow-lg overflow-hidden"
              >
                {/* Day Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-4 text-center">
                  <h3 className="text-lg font-bold text-white">
                    {daySchedule.day}
                  </h3>
                </div>

                {/* Classes List */}
                <div className="p-4 space-y-3">
                  {daySchedule.classes.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Sem aulas programadas
                    </p>
                  ) : (
                    daySchedule.classes.map((classItem, classIndex) => (
                      <div
                        key={classIndex}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          classItem.available
                            ? "border-gray-200 hover:border-primary/50 bg-white"
                            : "border-gray-100 bg-gray-50 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Clock
                            size={14}
                            className="text-primary flex-shrink-0"
                          />
                          <span className="text-sm font-bold text-gray-900">
                            {classItem.time}
                          </span>
                        </div>
                        <div className="text-xs text-gray-700 font-medium mb-2">
                          {classItem.program}
                        </div>

                        {/* Student Count */}
                        <div className="text-xs text-gray-600 mb-2">
                          {classItem.studentsInClass} / {classItem.totalStudents}{" "}
                          alunos
                        </div>

                        {/* Availability Badge */}
                        {classItem.available ? (
                          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            Disponível
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                            Esgotado
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Programs Legend */}
        <motion.div
          variants={itemVariants}
          className="mb-16 p-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Programas Disponíveis
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
              <div className="text-2xl">🏋️</div>
              <div className="text-sm font-medium text-gray-800">
                Treino Funcional
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
              <div className="text-2xl">💪</div>
              <div className="text-sm font-medium text-gray-800">
                Treino Terapêutico
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
              <div className="text-2xl">🎯</div>
              <div className="text-sm font-medium text-gray-800">
                Treino Personalizado
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
              <div className="text-2xl">👥</div>
              <div className="text-sm font-medium text-gray-800">
                Treino em Grupo
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
              <div className="text-2xl">💻</div>
              <div className="text-sm font-medium text-gray-800">
                Treino Online
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
              <div className="text-2xl">✨</div>
              <div className="text-sm font-medium text-gray-800">
                Consultoria Fitness
              </div>
            </div>
          </div>
        </motion.div>

        {/* Free Trial Section */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Primeira Sessão Experimental Gratuita
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Conhece o espaço, os métodos de treino e discute os teus
                objetivos sem qualquer compromisso.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Avaliação física completa
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Plano de treino personalizado
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Sem compromisso
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-primary text-white rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all"
              >
                Agendar Sessão Gratuita
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
