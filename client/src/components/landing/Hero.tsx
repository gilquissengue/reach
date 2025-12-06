import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@assets/generated_images/futuristic_blue_and_white_abstract_data_flow_connecting_nodes.png";
import SectionSeparator from "@/components/ui/section-separator";

export default function Hero() {
  return (
    <div className="relative">
      <section className="bg-gradient-to-b from-brand-blue-light/50 to-white pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 relative z-10"
          >
            <div className="inline-block bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Marketing de Performance
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] text-brand-blue-dark">
              Transformamos procura qualificada em <span className="text-brand-blue">clientes reais</span>
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-xl leading-relaxed">
              Na Reach, criamos estratégias de marketing e vendas que atraem o público certo e convertem leads em clientes de forma consistente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-brand-blue text-white hover:bg-blue-700 text-lg px-8 h-14 rounded-full shadow-xl shadow-brand-blue/20 hover:shadow-brand-blue/40 transition-all transform hover:-translate-y-1"
              >
                Começar Agora
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="border-brand-blue/20 text-brand-blue-dark hover:bg-brand-blue-light text-lg px-8 h-14 rounded-full"
              >
                Ver Cases
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-transparent rounded-full blur-3xl opacity-50" />
            <img 
              src={heroImage} 
              alt="Futuristic data flow" 
              className="relative w-full rounded-2xl shadow-2xl shadow-brand-blue/20 border border-white/50 rotate-1 hover:rotate-0 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </section>
      <div className="absolute bottom-0 w-full z-20">
        <SectionSeparator flipped className="fill-white" />
      </div>
    </div>
  );
}
