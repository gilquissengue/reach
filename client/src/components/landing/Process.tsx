import { motion } from "framer-motion";
import { Target, Users, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const STEPS = [
  {
    icon: Target,
    title: "Marketing (atração)",
    description: "Estratégias para captar público qualificado via paid media, conteúdo e anúncios direcionados.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Users,
    title: "Comercial 1 – Venda Transacional",
    subtitle: "(low ticket)",
    description: "Conversão rápida de leads com ofertas de baixo valor, criando confiança e validando interesse.",
    color: "bg-cyan-100 text-cyan-600"
  },
  {
    icon: BarChart3,
    title: "Comercial 2 – Venda Relacional",
    subtitle: "(high ticket)",
    description: "Relacionamento contínuo, upsell e fidelização de clientes para aumentar LTV.",
    color: "bg-indigo-100 text-indigo-600"
  }
];

export default function Process() {
  return (
    <section id="processo" className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display text-brand-blue-dark mb-4">Como atraímos e convertemos clientes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Nosso método proprietário integra marketing e vendas para maximizar o retorno sobre o investimento.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white group relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${step.color.split(" ")[1].replace("text", "bg")}`} />
                <CardContent className="p-8 flex flex-col h-full items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-blue-dark mb-1">{step.title}</h3>
                  {step.subtitle && <span className="text-sm text-gray-400 font-medium mb-4 block">{step.subtitle}</span>}
                  <p className="text-gray-600 leading-relaxed mt-auto pt-4">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
