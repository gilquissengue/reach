import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Target, Users, BarChart3, ArrowRight } from "lucide-react";

const STEPS = [
  {
    id: "01",
    icon: Target,
    title: "Atração Inteligente",
    description: "Utilizamos algoritmos proprietários para identificar e captar o público mais qualificado via paid media e conteúdo estratégico.",
    color: "from-blue-500/20 to-blue-600/5"
  },
  {
    id: "02",
    icon: Users,
    title: "Venda Transacional",
    description: "Implementamos funis de conversão rápida para ofertas de entrada (low ticket), validando o interesse e criando confiança imediata.",
    color: "from-purple-500/20 to-purple-600/5"
  },
  {
    id: "03",
    icon: BarChart3,
    title: "Escala Relacional",
    description: "Maximização do LTV através de estratégias de upsell e retenção, transformando clientes pontuais em receita recorrente.",
    color: "from-cyan-500/20 to-cyan-600/5"
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="processo" className="relative bg-background py-32">
      <div className="container mx-auto px-6">
        <div className="mb-24 md:flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-4">
              O Processo <span className="text-blue-500">Reach</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg">
              Uma abordagem sistemática baseada em dados para escalar o crescimento do seu negócio.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {STEPS.map((step, i) => (
            <StickyCard key={i} step={step} index={i} total={STEPS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyCard({ step, index, total }: { step: any, index: number, total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="sticky top-32 glass rounded-2xl p-8 md:p-12 border border-white/10 overflow-hidden group"
      style={{ 
        marginBottom: `${(total - index - 1) * 20}px`,
        zIndex: index 
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-6xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors">
            {step.id}
          </span>
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
            <step.icon className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-white">{step.title}</h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            {step.description}
          </p>
        </div>
        
        <div className="relative h-[300px] w-full bg-black/20 rounded-xl overflow-hidden border border-white/5">
           {/* Abstract visualization for each step */}
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-32 h-32 rounded-full border border-blue-500/30 animate-[spin_10s_linear_infinite]" />
             <div className="absolute w-24 h-24 rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]" />
             <div className="absolute w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,1)]" />
           </div>
        </div>
      </div>
    </motion.div>
  );
}
