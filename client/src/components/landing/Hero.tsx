import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronRight, Terminal } from "lucide-react";
import heroImage from "@assets/generated_images/dark_digital_landscape_with_glowing_blue_data_streams_and_floating_financial_graphs.png";
import GraphicBackground from "./GraphicBackground";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#020617]">
      <GraphicBackground />
      
      {/* Background with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={heroImage} 
          alt="Abstract Digital Void" 
          className="w-full h-full object-cover opacity-50 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#020617] opacity-80" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md text-xs font-mono text-blue-400 mb-4 hover:bg-blue-500/10 transition-colors cursor-default">
            <Terminal className="w-3 h-3" />
            <span className="tracking-widest">SYSTEM_READY :: v2.5.0</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-display tracking-tighter text-white leading-[0.9]">
            DATA DRIVEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 text-glow animate-pulse">REVENUE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed font-sans">
            Transformamos complexidade digital em crescimento mensurável. 
            Estratégias de elite para marcas que exigem resultados.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Button 
              size="lg" 
              className="bg-blue-600 text-white hover:bg-blue-500 text-lg px-10 h-16 rounded-full font-medium transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
            >
              Iniciar Análise <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 text-lg px-10 h-16 rounded-full backdrop-blur-md font-mono"
            >
              Ver Metodologia
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono animate-pulse">Scroll to Initialize</span>
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
