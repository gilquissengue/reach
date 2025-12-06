import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronRight } from "lucide-react";
import heroImage from "@assets/generated_images/deep_blue_abstract_digital_void_with_floating_geometric_particles.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={heroImage} 
          alt="Abstract Digital Void" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-blue-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Performance Marketing Intelligence
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tight text-white leading-[0.9]">
            Transformamos dados <br />
            em <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-glow">Receita Real</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Estratégias de marketing de alta performance que conectam sua marca ao público certo através de inteligência de dados.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 h-14 rounded-full font-medium transition-transform hover:scale-105"
            >
              Iniciar Projeto <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 h-14 rounded-full backdrop-blur-md"
            >
              Ver Metodologia
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-blue-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
