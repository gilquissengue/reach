import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CaseStudies() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="aspect-[4/3] bg-[#E8F5E9] flex items-center justify-center mb-6 relative overflow-hidden">
              <span className="text-4xl font-bold text-green-800">ACCOUNTFY</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </div>
            <div className="space-y-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Inbound Marketing</span>
              <h3 className="text-3xl font-bold font-display">Gest Tecnologia</h3>
              <p className="text-gray-600 text-lg">
                As estratégias de SEO e criação de conteúdo para posicionamento orgânico trouxe em 12 meses +38% de tráfego.
              </p>
              <Button className="bg-brand-blue text-white hover:bg-blue-700 rounded-none group-hover:pl-6 transition-all">
                Ver case completo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
             <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center mb-6 relative overflow-hidden">
              {/* Placeholder for image "Professional wearing glasses" */}
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4" />
                <p className="text-gray-500 italic">Professional Image</p>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </div>
            <div className="space-y-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Geração de Leads</span>
              <h3 className="text-3xl font-bold font-display">NUVOX</h3>
              <p className="text-gray-600 text-lg">
                De 200k de faturamento liberando 4 colaboradores ao 1M em liberando o estratégico do comercial e do marketing
              </p>
              <Button className="bg-brand-blue text-white hover:bg-blue-700 rounded-none group-hover:pl-6 transition-all">
                Ver case completo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
