import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    id: "01",
    title: "Atração Inteligente",
    description: "Utilizamos algoritmos proprietários para identificar e captar o público mais qualificado via paid media e conteúdo estratégico.",
    color: "from-blue-500/20 to-blue-600/5"
  },
  {
    id: "02",
    title: "Venda Transacional",
    description: "Implementamos funis de conversão rápida para ofertas de entrada (low ticket), validando o interesse e criando confiança imediata.",
    color: "from-blue-500/20 to-blue-600/5"
  },
  {
    id: "03",
    title: "Escala Relacional",
    description: "Maximização do LTV através de estratégias de upsell e retenção, transformando clientes pontuais em receita recorrente.",
    color: "from-blue-500/20 to-blue-600/5"
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
      className={`sticky top-32 glass rounded-2xl p-8 md:p-12 overflow-hidden group ${index === 0 ? 'border border-white/10' : ''}`}
      style={{ 
        marginBottom: `${(total - index - 1) * 20}px`,
        zIndex: index 
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${step.color}`} style={{ opacity: 0.8 }} />
      
      <div className="relative z-10 grid grid-cols-[auto_1fr] gap-8 items-start">
        <span className="text-8xl font-display font-bold text-white/5 group-hover:text-white transition-colors duration-300">
          {step.id}
        </span>
        <div className="space-y-4 pt-2">
          <h3 className="text-3xl font-bold text-white">{step.title}</h3>
          <p className="text-gray-400 text-xl md:text-2xl leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
