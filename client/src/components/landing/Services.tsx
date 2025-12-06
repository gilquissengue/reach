import { motion } from "framer-motion";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    title: "Inteligência Meta Ads",
    features: ["Segmentação Comportamental", "Criativos Dinâmicos", "Retargeting Multiplataforma"],
    gradient: "from-blue-600 to-blue-900"
  },
  {
    title: "Ecossistema Google",
    features: ["Mineração de Intenção de Busca", "Elevação de Marca no YouTube", "Display Programático"],
    gradient: "from-indigo-600 to-purple-900"
  },
  {
    title: "Operações de Conversão",
    features: ["CRO e Páginas de Destino", "Automação de CRM", "Dashboards em Tempo Real"],
    gradient: "from-emerald-600 to-teal-900"
  }
];

export default function Services() {
  return (
    <section id="servicos" className="bg-background py-16 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12 md:mb-20">
          <span className="text-blue-500 font-medium tracking-widest uppercase text-xs mb-2 block">Capacidades</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white">
            Ecossistema de Performance
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative min-h-[350px] md:h-[400px] glass rounded-2xl p-1 overflow-hidden transition-all duration-500 hover:border-blue-500/50 active:border-blue-500/30 touch-manipulation"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />

              <div className="relative z-20 h-full p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-lg mb-4 md:mb-6 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">{service.title}</h3>
                  <ul className="space-y-3 md:space-y-4">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-start text-gray-400 text-sm md:text-sm group-hover:text-gray-300 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                   <span className="text-blue-400 text-sm font-medium flex items-center gap-2 cursor-pointer">
                     Explorar Solução <ArrowUpRight className="w-4 h-4" />
                   </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
