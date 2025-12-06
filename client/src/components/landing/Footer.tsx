import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-md space-y-6">
            <div className="text-3xl font-display font-bold flex items-center gap-2">
              REACH <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Agência de performance focada em inteligência de dados e conversão.
              Transformamos complexidade digital em crescimento mensurável.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-6">
              <h4 className="font-bold text-white">Contato</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="mailto:geral@reach.ao" className="hover:text-blue-500 transition-colors">geral@reach.ao</a></li>
                <li><span className="text-gray-600 block text-xs mb-1">Localização</span>Luanda, Angola</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-bold text-white">Social</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div>
            © {new Date().getFullYear()} REACH Performance.
          </div>
          <div className="font-mono">
            System Status: <span className="text-green-500">Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
