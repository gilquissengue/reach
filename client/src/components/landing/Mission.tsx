import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section className="bg-brand-gray py-24">
      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-black tracking-tighter"
          >
            MUTUM.
          </motion.h2>
        </div>
        
        <div className="lg:col-span-8 space-y-8">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-black leading-tight"
          >
            Consultoria <span className="relative inline-block">
              concepção original brasileira
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-0 left-0 h-1 bg-brand-red w-full"
              />
            </span>
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-8 text-lg text-black/80">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Somos uma agência de marketing B2B consultiva que entende a complexidade e as boas práticas do marketing B2B de nicho e suas dinâmicas.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Por anos de uma metodologia exclusiva para a execução B2B fornecemos, desenvolvemos estratégias totalmente personalizadas com uso serviços por projetos com foco em geração de resultados e valor.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
