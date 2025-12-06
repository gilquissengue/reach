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
    <section ref={containerRef} id="processo" className="relative bg-background py-16 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-24 md:flex justify-between items-end">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-3 md:mb-4">
              O Processo <span className="text-blue-500">Reach</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-base md:text-lg">
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
      transition={{ 
        duration: 1.2, 
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={`sticky top-20 md:top-32 glass rounded-2xl p-6 md:p-8 lg:p-12 overflow-hidden group ${index === 0 ? 'border border-white/10' : ''}`}
      style={{ 
        marginBottom: `${(total - index - 1) * 20}px`,
        zIndex: index 
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${step.color}`} style={{ opacity: 0.8 }} />
      
      <div className="relative z-10 grid grid-cols-[auto_1fr] gap-4 md:gap-8 items-start">
        <span className="text-6xl md:text-8xl font-display font-bold text-white/5 group-hover:text-white transition-colors duration-700 ease-out">
          {step.id}
        </span>
        <div className="space-y-3 md:space-y-4 pt-2">
          <h3 className="text-2xl md:text-3xl font-bold text-white">{step.title}</h3>
          <p className="text-gray-400 text-xl md:text-2xl leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
