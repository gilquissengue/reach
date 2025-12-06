import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Início", href: "/" },
    { name: "Processo", href: "#processo" },
    { name: "Serviços", href: "#servicos" },
    { name: "Parceiros", href: "#parceiros" },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? "bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent py-8"}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className={`font-display font-bold tracking-tighter text-white flex items-center gap-2 group transition-all duration-500 ${scrolled ? "text-xl" : "text-3xl"}`}>
            REACH <span className={`bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6] transition-all duration-500 ${scrolled ? "w-1 h-1" : "w-2 h-2"}`}></span>
          </a>
        </Link>

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

        <Button 
          className={`bg-blue-600 text-white hover:bg-blue-500 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-500 font-medium tracking-wide ${scrolled ? "px-5 h-9 text-sm" : "px-8 h-12 text-base"}`}
        >
          Iniciar Projeto
        </Button>
      </div>
    </motion.header>
  );
}
