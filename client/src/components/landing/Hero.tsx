import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/abstract_red_concentric_circles_pattern_on_black_background.png";

export default function Hero() {
  return (
    <section className="bg-black text-white min-h-[80vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight">
            Agência de marketing B2B
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-xl">
            Uma nova experiência de marketing consultivo, inbound e digital na geração de demanda B2B. Bem-vindo à Mutum.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-200 text-lg px-8 h-14 rounded-none font-medium"
          >
            Ressignificar meu negócio
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-full min-h-[400px] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent z-10 opacity-50 lg:opacity-100" />
          <img 
            src={heroImage} 
            alt="Abstract red concentric circles" 
            className="w-full max-w-md lg:max-w-full object-cover opacity-90 animate-pulse-slow"
            style={{ filter: 'contrast(1.2) brightness(1.1)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
