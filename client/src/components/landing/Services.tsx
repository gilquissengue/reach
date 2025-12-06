import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SERVICES = [
  {
    title: "Gestão de campanhas Meta Ads",
    subtitle: "Facebook e Instagram",
    features: ["Segmentação avançada", "Criativos de alta conversão", "Retargeting estratégico"]
  },
  {
    title: "Gestão de campanhas Google Ads",
    subtitle: "Search, Display, YouTube, Remarketing",
    features: ["Palavras-chave de intenção", "Otimização de CTR", "Foco em leads qualificados"]
  },
  {
    title: "Suporte e optimização contínua",
    subtitle: "Monitorização diária, relatórios claros",
    features: ["Dashboard em tempo real", "Reuniões de alinhamento", "Ajustes rápidos"]
  }
];

export default function Services() {
  return (
    <section id="servicos" className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-brand-blue font-semibold tracking-wider uppercase text-sm">Nossas Soluções</span>
            <h2 className="text-4xl font-bold font-display text-brand-blue-dark mt-2">O que fazemos pelo teu negócio</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-brand-blue-dark">{service.title}</CardTitle>
                  <p className="text-brand-blue font-medium">{service.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-gray-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
