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
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-background/50 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-display font-bold tracking-tighter text-white flex items-center gap-2">
            REACH <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
          </a>
        </Link>

        <nav className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md">
          {links.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </nav>

        <Button 
          className="bg-blue-600 text-white hover:bg-blue-500 rounded-full px-6 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300"
        >
          Pedir Orçamento
        </Button>
      </div>
    </motion.header>
  );
}
