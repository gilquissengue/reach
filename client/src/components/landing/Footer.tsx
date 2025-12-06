import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="text-3xl font-display font-bold">M.</div>
            <p className="text-xs text-gray-400 max-w-[200px]">
              Rua Ministro Orozimbo Nonato, 422 - Vila da Serra - Nova Lima - MG - Brazil
            </p>
            <div className="flex gap-4">
               {/* Partner Badges Placeholder */}
               <div className="h-12 w-24 bg-white/10 rounded flex items-center justify-center text-[10px] text-center leading-tight p-1">
                 RD Station Partner
               </div>
               <div className="h-12 w-24 bg-white/10 rounded flex items-center justify-center text-[10px] text-center leading-tight p-1">
                 Google Partner
               </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Suporte</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Serviço de Marketing B2B</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cases</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">A Mutum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Materiais</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <a href="#" className="bg-[#00A0DC] p-2 rounded-full hover:opacity-80 transition-opacity"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="bg-[#E4405F] p-2 rounded-full hover:opacity-80 transition-opacity"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="bg-[#1877F2] p-2 rounded-full hover:opacity-80 transition-opacity"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="bg-[#FF0000] p-2 rounded-full hover:opacity-80 transition-opacity"><Youtube className="w-5 h-5" /></a>
            </div>
            
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <span className="block text-xs text-gray-500">E-mail</span>
                contato@agenciamutum.com.br
              </p>
              <p>
                <span className="block text-xs text-gray-500">Telefone</span>
                (31) 3241-9631
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Mutum. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
