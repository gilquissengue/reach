import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-sm">
            <div className="text-3xl font-display font-bold mb-4 flex items-center gap-2">
              REACH <span className="w-2 h-2 bg-brand-blue rounded-full"></span>
            </div>
            <p className="text-gray-400 mb-6">
              Transformamos procura em clientes reais. Estratégias de performance para negócios que querem crescer.
            </p>
            <a href="mailto:geral@reach.ao" className="text-brand-blue hover:text-white transition-colors text-lg font-medium">
              geral@reach.ao
            </a>
          </div>

          <div className="flex gap-8 md:gap-16">
            <div className="space-y-4">
              <h4 className="font-bold">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} REACH. Todos os direitos reservados.
          </div>
          <div>
            Desenvolvido por <span className="text-white">Akira Consultoria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
