import { motion } from "framer-motion";

const PARTNERS = [
  "Empresa 1", "Empresa 2", "Empresa 3", "Empresa 4", "Empresa 5", "Empresa 6"
];

export default function Partners() {
  return (
    <section id="parceiros" className="bg-[#020617] py-12 md:py-20 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center">
        <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">Empresas que confiam em nós</p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-scrolling-text flex gap-8 md:gap-16 whitespace-nowrap py-4">
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div 
              key={i} 
              className="text-xl sm:text-2xl md:text-4xl font-display font-bold text-white/10 hover:text-blue-500/50 active:text-blue-500/30 transition-colors cursor-default select-none"
            >
              {partner}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#020617] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#020617] to-transparent z-10" />
      </div>
    </section>
  );
}
