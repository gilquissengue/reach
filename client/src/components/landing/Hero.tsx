import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@assets/generated_images/minimalist_dark_futuristic_abstract_landscape_with_deep_blue_geometric_accents.png";
import GraphicBackground from "./GraphicBackground";

const themes = [
  {
    title: "CRESCIMENTO",
    subtitle: "EXPONENCIAL",
    description: "Transformamos complexidade digital em crescimento mensurável. Estratégias de elite para marcas que exigem resultados."
  },
  {
    title: "PERFORMANCE",
    subtitle: "MAXIMIZADA",
    description: "Otimizamos cada ponto de contato para converter visitantes em clientes. Resultados que superam expectativas."
  },
  {
    title: "INOVAÇÃO",
    subtitle: "CONTÍNUA",
    description: "Tecnologia de ponta e estratégias avançadas para manter sua marca à frente da concorrência."
  },
  {
    title: "RESULTADOS",
    subtitle: "COMPROVADOS",
    description: "Dados reais, métricas transparentes e ROI mensurável. Cada investimento gera retorno tangível."
  }
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % themes.length);
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  const currentTheme = themes[currentIndex];

  return (
    <section className="relative h-screen min-h-[800px] flex items-end justify-start overflow-hidden bg-[#020617]">
      <GraphicBackground />
      
      {/* Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={heroImage} 
          alt="Abstract Digital Void" 
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pb-32">
        <motion.div
          initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white leading-[1.1]">
                {currentTheme.title} <br />
                <span className="text-gray-200">{currentTheme.subtitle}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-xl leading-relaxed font-sans mt-4">
                {currentTheme.description}
              </p>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex pt-6">
            <Button 
              size="lg" 
              className="bg-blue-600 text-white hover:bg-blue-500 text-lg px-12 h-16 rounded-full font-medium transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] group"
            >
              Iniciar Análise <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity, right: 'calc(3rem + 4%)' }}
        className="absolute bottom-12 flex flex-col items-center gap-3 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono animate-pulse">Role para explorar</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
