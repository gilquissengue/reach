import { motion } from "framer-motion";

const STATS = [
  { value: "+200K", label: "USD Geridos em Ads" },
  { value: "3.5x", label: "ROAS Médio Global" },
  { value: "+45", label: "Parceiros Ativos" }
];

export default function Stats() {
  return (
    <section className="bg-black py-0 border-y border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="py-12 md:px-12 flex flex-col items-center text-center group hover:bg-white/5 transition-colors duration-500"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-2 font-display tracking-tight group-hover:text-blue-500 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-gray-500 font-mono text-sm uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
