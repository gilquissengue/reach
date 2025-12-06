import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SERVICES = [
  {
    title: "Inbound marketing",
    description: "Use as empresas crescem de uma vez por meio do conteúdo relevante por gerar leads e criar relacionamentos que fecham negócios a longo prazo e com qualidade para o sucesso.",
    color: "#0000FF",
    titleColor: "#0000FF"
  },
  {
    title: "Branding",
    description: "Construa uma marca que ecoa em sua indústria e com seus clientes. Nossa consultoria de branding está focada na construção de uma marca B2B relevante",
    color: "#FFFF00",
    titleColor: "#000000"
  },
  {
    title: "Criação de conteúdo",
    description: "Transforme a jornada do comprador na jornada com seu conteúdo de alta qualidade. Nossos escritores especializados criam conteúdos técnicos que convertem em suas fases do funil.",
    color: "#0000FF",
    titleColor: "#0000FF"
  },
  {
    title: "Design",
    description: "Trabalhe sua marca em cada toque do cliente com uma identidade visual que convence, relaciona com sua indústria e reflete a missão e valores.",
    color: "#FFFF00",
    titleColor: "#000000"
  },
  {
    title: "ABM marketing",
    description: "Abordagem estratégica de geração de leads totalmente personalizados com foco específico nas contas que mais importam para seu negócio.",
    color: "#0000FF",
    titleColor: "#0000FF"
  },
  {
    title: "Consultoria de marketing digital",
    description: "Como acelerar ofertas e iniciar estrutura com foco em crescimento. Conte com consultores de forma estratégica para apoiar processos e fazer seu negócio prosperar.",
    color: "#FFFF00",
    titleColor: "#000000"
  }
];

export default function Services() {
  return (
    <section className="bg-brand-gray pb-24 pt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="text-6xl font-black font-display text-black tracking-tighter">Serviços</h2>
          <p className="text-sm max-w-xs text-right font-medium mt-4 md:mt-0">
            Como a Mutum, uma agência de marketing, se uniu à consultoria? Veja como podemos ajudar seu negócio!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-0 shadow-none rounded-none group hover:shadow-xl transition-shadow duration-300">
                <div className="h-2 w-full" style={{ backgroundColor: service.color }} />
                <CardHeader>
                  <CardTitle 
                    className="text-2xl font-bold font-display"
                    style={{ color: service.titleColor }}
                  >
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {service.description}
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
