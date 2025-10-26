"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Instagram, Facebook, Send } from "lucide-react";
import GoogleMap from "@/components/ui/GoogleMap";

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  phone?: string;
  email?: string;
  location?: string;
  mapLatitude?: string;
  mapLongitude?: string;
  instagram?: string;
  facebook?: string;
}

export default function ContactSection({
  title = "Vamos Começar?",
  subtitle = "Entra em contacto e dá o primeiro passo para a tua transformação",
  phone = "+351 912 345 678",
  email = "joana@personaltraining.pt",
  location = "Lisboa, Portugal",
  mapLatitude = "38.7223",
  mapLongitude = "-9.1393",
  instagram = "https://instagram.com/joanasousa",
  facebook = "https://facebook.com/joanasousa",
}: ContactSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);

    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Telefone",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: MapPin,
      label: "Localização",
      value: location,
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      href: instagram,
      color: "hover:text-pink-600",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: facebook,
      color: "hover:text-blue-600",
    },
  ].filter((social) => social.href && social.href.trim() !== "");

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
      id="contact"
      className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-200 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-30" />

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
            <span className="px-4 py-2 rounded-full bg-[var(--color-secondary)] text-white text-sm font-medium">
              Contacto
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
            className="text-lg md:text-xl text-gray-600"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informações de Contacto
              </h3>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-[var(--color-primary)] transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-[var(--color-primary)] flex items-center justify-center transition-colors">
                      <item.icon
                        size={20}
                        className="text-gray-600 group-hover:text-white transition-colors"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{item.label}</div>
                      <div className="font-medium text-[var(--color-secondary)]">
                        {item.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Segue-me nas Redes Sociais
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-full bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] text-white flex items-center justify-center transition-colors`}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Google Map */}
            <motion.div
              variants={itemVariants}
              className="aspect-video"
            >
              <GoogleMap
                latitude={mapLatitude}
                longitude={mapLongitude}
                location={location}
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Envia uma Mensagem
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors"
                    placeholder="O teu nome"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors"
                    placeholder="o.teu@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors"
                    placeholder="+351 912 345 678"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors resize-none"
                    placeholder="Conta-me sobre os teus objetivos..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full px-6 py-4 bg-[var(--color-primary)] text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--color-primary)]/30"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      A enviar...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send size={20} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
