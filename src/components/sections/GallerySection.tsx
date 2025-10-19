"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

interface GalleryImage {
  title: string;
  alt: string;
  aspect: "tall" | "wide" | "square";
  image?: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  images?: GalleryImage[];
  testimonials?: Testimonial[];
}

export default function GallerySection({
  title = "Galeria",
  subtitle = "As Nossas Aulas",
  description = "Vê como são as nossas sessões de treino e o ambiente de trabalho.",
  images = [],
  testimonials = [],
}: GallerySectionProps) {
  const defaultTestimonials = [
    {
      name: "Maria Silva",
      role: "Treino Terapêutico",
      quote:
        "Após 3 meses de treino terapêutico, consegui recuperar completamente da lesão no joelho. A Joana é uma profissional excecional!",
    },
    {
      name: "João Santos",
      role: "Treino Funcional",
      quote:
        "Perdi 15kg e ganhei uma nova perspetiva de vida. O acompanhamento personalizado fez toda a diferença.",
    },
    {
      name: "Ana Costa",
      role: "Treino em Grupo",
      quote:
        "A energia das aulas em grupo é incrível! Sinto-me mais forte e confiante a cada treino.",
    },
  ];

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : defaultTestimonials;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const galleryImages = images;

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-6">
            {title}
          </h2>
          <p className="text-xl text-secondary font-semibold mb-4">
            {subtitle}
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>

      {/* Full Width Masonry Gallery */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`${
                image.aspect === "tall"
                  ? "row-span-2"
                  : image.aspect === "wide"
                  ? "col-span-1 row-span-1"
                  : "row-span-1"
              }`}
            >
              <div className="group relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                {image.image ? (
                  // Real image from Keystatic
                  <Image
                    src={image.image}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  // Placeholder when no image
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="text-center p-4 sm:p-6">
                      <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">
                        📸
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-1">
                        {image.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">
                      {image.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O Que Dizem os Nossos Clientes
          </h3>
          <p className="text-lg text-gray-600">
            Histórias reais de transformação e superação
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-3xl font-serif">&ldquo;</span>
              </div>

              <div className="pt-8">
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  {testimonial.quote}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
