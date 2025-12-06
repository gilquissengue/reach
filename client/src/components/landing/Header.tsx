import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on scroll
    if (mobileMenuOpen) {
      const handleScroll = () => setMobileMenuOpen(false);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [mobileMenuOpen]);

  const links = [
    { name: "Início", href: "/" },
    { name: "Processo", href: "#processo" },
    { name: "Serviços", href: "#servicos" },
    { name: "Parceiros", href: "#parceiros" },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? "bg-[#020617]/95 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent py-4 md:py-8"}`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center group transition-all duration-500">
              <img 
                src="/logo.png" 
                alt="REACH Performance Marketing" 
                className={`transition-all duration-500 object-contain brightness-0 invert ${scrolled ? "h-12 md:h-16 max-w-[100px] md:max-w-[120px]" : "h-10 md:h-16 max-w-[140px] md:max-w-[200px]"}`}
              />
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-8 bg-white/5 px-6 rounded-full border border-white/5 backdrop-blur-md transition-all duration-500 ${scrolled ? "py-1.5 opacity-80 hover:opacity-100" : "py-3"}`}>
            {links.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group font-mono tracking-tight"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-blue-500 transition-all group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Button 
              className={`bg-blue-600 text-white hover:bg-blue-500 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-500 font-medium tracking-wide ${scrolled ? "px-5 h-9 text-sm" : "px-8 h-12 text-base"}`}
            >
              Iniciar Projeto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-blue-400 transition-colors touch-manipulation"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden pt-20"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#020617] border-l border-white/10 z-50 md:hidden overflow-y-auto pt-20 pb-8 px-6"
            >
              <nav className="flex flex-col gap-6">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-gray-300 hover:text-white transition-colors py-3 border-b border-white/5 font-mono"
                  >
                    {link.name}
                  </a>
                ))}
                <Button 
                  className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-500 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] h-14 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Projeto
                </Button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
