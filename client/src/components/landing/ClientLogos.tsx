import { motion } from "framer-motion";

const LOGOS = [
  "Frente", "Fortes", "BPI", "abc27 Brasil", "ADdisma", "MLIS"
];

export default function ClientLogos() {
  return (
    <section className="bg-brand-gray py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {LOGOS.map((name, i) => (
            <div key={i} className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <span className="text-2xl font-display font-bold text-black">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
