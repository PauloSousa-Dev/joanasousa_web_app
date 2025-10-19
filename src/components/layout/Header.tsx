"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

interface HeaderProps {
  navItems?: NavItem[];
}

export default function Header({ navItems = [] }: HeaderProps) {
  const defaultNavItems = [
    { name: "Início", href: "#home" },
    { name: "Sobre Mim", href: "#about" },
    { name: "Galeria", href: "#gallery" },
    { name: "Aulas", href: "#schedule" },
    { name: "Contacto", href: "#contact" },
  ];

  const displayNavItems = navItems.length > 0 ? navItems : defaultNavItems;
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    navItems.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleClick(e, "#home")}
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Joana Sousa
            </motion.a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              {displayNavItems.map(({ name, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleClick(e, href)}
                    className={`relative text-sm font-medium transition-colors hover:text-secondary ${
                      activeSection === href.slice(1)
                        ? "text-secondary"
                        : "text-gray-600"
                    }`}
                  >
                    {name}
                    {activeSection === href.slice(1) && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button Desktop */}
            <motion.a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="hidden md:block px-6 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Marcar Aula
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-secondary"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: "100%" },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-white shadow-2xl md:hidden"
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <ul className="flex flex-col gap-6">
            {displayNavItems.map(({ name, href }, index) => (
              <motion.li
                key={href}
                initial={{ opacity: 0, x: 20 }}
                animate={
                  mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                }
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  className={`text-lg font-medium transition-colors ${
                    activeSection === href.slice(1)
                      ? "text-primary"
                      : "text-gray-600"
                  }`}
                >
                  {name}
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="mt-8 px-6 py-3 bg-primary text-white rounded-full text-center font-medium shadow-lg shadow-primary/30"
            initial={{ opacity: 0, y: 20 }}
            animate={
              mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ delay: 0.5 }}
          >
            Marcar Aula
          </motion.a>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}
