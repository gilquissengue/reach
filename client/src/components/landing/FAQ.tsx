import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "Posso adicionar mais itens no Ressignificar?",
    answer: "Sim, o processo é flexível e adaptável às necessidades do seu negócio.",
    value: "item-1"
  },
  {
    question: "Quais os diferenciais da minha agência versus agências?",
    answer: "Temos mais de 10 anos de experiência em marketing B2B. Nossa equipe é especializada para atender o mercado B2B especificamente e a expertise na aplicação B2B. Nosso foco é criar marketing e mostrar demanda qualificada a partir do que os negócios precisam.",
    value: "item-2"
  },
  {
    question: "A agência atende que segmento?",
    answer: "Atendemos empresas B2B que tenham processos comerciais bem definidos, com ciclos de vendas maiores e que são agressivas no suporte digital e consultorias nos setores (Saúde, Varejo) onde tem facilidade.",
    value: "item-3"
  }
];

export default function FAQ() {
  return (
    <section className="bg-brand-gray py-24">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-5xl font-black font-display">FAQs</h2>
          <p className="text-lg text-gray-700">
            Respondemos algumas perguntas que recebemos sobre os serviços. Mas, lembre-se você pode entrar em contato para tirar dúvidas sobre os projetos. De qual jeito de dúvida ser ok.
          </p>
          <Button className="bg-brand-red text-white hover:bg-red-700 rounded-md px-8">
            Saiba mais
          </Button>
        </div>

        <div>
          <Accordion type="single" collapsible defaultValue="item-2" className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem 
                key={item.value} 
                value={item.value}
                className="border-none bg-transparent"
              >
                <AccordionTrigger 
                  className="bg-[#FF6633] text-white px-6 py-4 text-lg font-medium hover:bg-[#ff5522] hover:no-underline data-[state=open]:bg-[#FF6633] data-[state=open]:text-white transition-all rounded-sm"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="bg-white p-6 text-gray-700 text-base leading-relaxed shadow-sm mt-1">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
