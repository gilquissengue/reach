import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionSeparator from "@/components/ui/section-separator";

const BENEFITS = [
  "Aumenta visibilidade e notoriedade",
  "Estratégias personalizadas por objetivo",
  "Optimização contínua de resultados",
  "Relatórios transparentes e claros",
  "Especialistas dedicados ao sucesso do cliente"
];

export default function Benefits() {
  return (
    <div className="relative">
      <div className="absolute top-0 w-full z-20 -mt-[80px] md:-mt-[119px] pointer-events-none">
         <SectionSeparator className="fill-brand-blue-dark" />
      </div>
      <section id="beneficios" className="bg-brand-blue-dark text-white py-24 pt-32">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-display mb-6">Benefícios de trabalhar com a REACH</h2>
            <p className="text-blue-200 text-lg mb-8">
              Não somos apenas uma agência de tráfego. Somos parceiros estratégicos focados no crescimento do seu negócio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-4"
          >
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="flex items-center bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center mr-4 flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-lg">{benefit}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
