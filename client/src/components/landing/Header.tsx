import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  const links = [
    { name: "Início", href: "/" },
    { name: "Processo", href: "#processo" },
    { name: "Serviços", href: "#servicos" },
    { name: "Benefícios", href: "#beneficios" },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-display font-bold text-brand-blue-dark tracking-tight flex items-center gap-2">
            REACH <span className="text-brand-blue text-sm font-sans font-normal hidden md:inline-block">Performance Marketing</span>
          </a>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-brand-blue transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-brand-blue transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <Button 
          className="bg-brand-blue text-white hover:bg-blue-700 rounded-full px-6 shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 transition-all"
        >
          Pedir Orçamento
        </Button>
      </div>
    </motion.header>
  );
}
