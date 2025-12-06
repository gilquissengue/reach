import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Newsletter() {
  return (
    <section className="bg-[#0000CC] py-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Assinar nossa newsletter mensal!</h2>
          <p className="text-white/80 mb-12 max-w-2xl mx-auto">
            Aqui nós vamos dar notícias no marketing, boas metodologias que funcionam sobre vendas e outras coisas legais para atender na caixa de email, na primeira ou a favor da semana! Leva menos de 5s para de inscrever, Junte-se a nós!
          </p>
        </motion.div>

        <form className="space-y-6 max-w-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <Input 
              placeholder="Nome" 
              className="bg-white text-black border-none h-12"
            />
            <Input 
              placeholder="Nome do E-mail" 
              type="email"
              className="bg-white text-black border-none h-12"
            />
          </div>
          
          <div className="flex items-center space-x-2 justify-center">
            <Checkbox id="privacy" className="border-white data-[state=checked]:bg-white data-[state=checked]:text-[#0000CC]" />
            <Label htmlFor="privacy" className="text-xs text-white/80 font-normal">
              Ao compartilhar meu dados concordo com a Política de Privacidade
            </Label>
          </div>

          <Button className="bg-white text-[#0000CC] hover:bg-gray-100 w-full md:w-auto px-12 h-12 font-bold text-lg">
            Inscrever-se
          </Button>
        </form>
      </div>
    </section>
  );
}
