import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-white pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9]">
              Let's build <br />
              <span className="text-gray-500">something</span> <span className="text-blue-500">legendary.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-lg font-light leading-relaxed">
              Não deixe para amanhã o crescimento que você pode começar hoje. 
              Sua concorrência não está esperando. Vamos dominar o mercado juntos?
            </p>
            <div className="flex gap-4 pt-4">
              <a href="mailto:geral@reach.ao" className="inline-flex items-center gap-2 text-white border-b border-blue-500 pb-1 hover:text-blue-400 transition-colors text-lg group">
                Iniciar Conversa <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:pl-12">
            <div className="space-y-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">Contato Direto</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:geral@reach.ao" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    geral@reach.ao
                  </a>
                </li>
                <li>
                  <a href="tel:+244923456789" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    +244 923 456 789
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-gray-300 group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    Luanda, Angola
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">Links Rápidos</h4>
              <ul className="space-y-2">
                {["Sobre Nós", "Metodologia", "Cases de Sucesso", "Carreiras", "Blog"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
          <div>
            © {new Date().getFullYear()} REACH Performance Marketing. All systems operational.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
