"use client";

import { motion } from "framer-motion";
import { Heart, Instagram, Facebook, Mail, ArrowUp } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

interface FooterProps {
  siteName?: string;
  brandText?: string;
  copyrightText?: string;
  copyrightNote?: string;
  phone?: string;
  email?: string;
  location?: string;
  instagram?: string;
  facebook?: string;
  footerNavItems?: NavItem[];
}

export default function Footer({
  siteName = "Joana Sousa",
  brandText = "Personal trainer dedicada a ajudar-te a alcançar os teus objetivos de fitness e bem-estar.",
  copyrightText = "Joana Sousa",
  copyrightNote = "Paulo Sousa",
  phone = "+351 912 345 678",
  email = "joana@personaltraining.pt",
  location = "Lisboa, Portugal",
  instagram = "https://instagram.com",
  facebook = "https://facebook.com",
  footerNavItems = [],
}: FooterProps) {
  const defaultNavItems = [
    { name: "Início", href: "#home" },
    { name: "Sobre Mim", href: "#about" },
    { name: "Galeria", href: "#gallery" },
    { name: "Aulas", href: "#schedule" },
  ];

  const navItems = footerNavItems.length > 0 ? footerNavItems : defaultNavItems;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-secondary)] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{siteName}</h3>
            <p className="text-gray-400 mb-6 max-w-md">{brandText}</p>
            <div className="flex gap-4">
              {instagram && (
                <motion.a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </motion.a>
              )}
              {facebook && (
                <motion.a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </motion.a>
              )}
              {email && (
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </motion.a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {navItems.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {phone && <li>{phone}</li>}
              {email && <li>{email}</li>}
              {location && <li>{location}</li>}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} {copyrightText}. Feito com{" "}
            <Heart size={14} className="inline text-red-500" /> por{" "}
            {copyrightNote}
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
