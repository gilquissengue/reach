import { motion } from "framer-motion";

const STATS = [
  { value: "+200.000 USD", label: "investidos em campanhas digitais" },
  { value: "Resultados", label: "comprovados em PME's e marcas nacionais" },
  { value: "Crescimento", label: "consistente e mensurável" }
];

export default function Stats() {
  return (
    <section className="bg-brand-blue-dark py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-4"
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-cyan mb-2 font-display">{stat.value}</div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
