import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ServicesCTA() {
  return (
    <section className="bg-brand-gray pb-24">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Serviços de marketing <span className="text-orange-500">focados em</span> empresas B2B
        </motion.h2>
        <p className="text-xl mb-8 text-gray-700">
          A agência de marketing B2B que te entrega resultados reais!
        </p>
        <Button size="lg" className="bg-brand-red text-white hover:bg-red-700 rounded-full px-10 text-lg">
          Falar com a gente
        </Button>
      </div>
    </section>
  );
}
