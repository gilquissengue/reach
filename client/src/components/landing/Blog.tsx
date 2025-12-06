import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const POSTS = [
  {
    category: "Inbound Marketing",
    title: "Inbound Marketing B2B: o que é, características, estratégias e como aplicar ao seu negócio",
    description: "Conheça como a demanda do Inbound Marketing B2B funciona e de forma se conecta ao processo de vendas e dos clientes direto e sempre."
  },
  {
    category: "Marketing",
    title: "Melhores práticas e estratégias de marketing B2B para aplicar no seu negócio",
    description: "Veja o que fazer para transformar as táticas de marketing em uma real geração de demanda desde a atra..."
  },
  {
    category: "Marketing Digital",
    title: "Estratégias de marketing b2b digital de sucesso de tecnologia aumentaram o fechamento de contratos",
    description: "Acompanhe quais foram as empresas do setor de tecnologia que usaram as melhores estratégias do fechamento reais dos..."
  }
];

export default function Blog() {
  return (
    <section className="bg-white pb-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-5xl font-black font-display text-brand-blue">Blog</h2>
          <Badge className="bg-[#FF6600] hover:bg-[#FF6600] text-white border-none px-3 py-1 text-sm">
            Novos por aqui?
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {POSTS.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-0 shadow-none hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video bg-gray-100 mb-4" /> {/* Placeholder image */}
                <CardHeader className="p-0 mb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold font-display leading-tight hover:text-brand-blue transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.description}
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
