import { motion } from "framer-motion";

const PARTNERS = [
  "Google Partner", "Meta Business", "LinkedIn Marketing", "HubSpot", "Salesforce", "Shopify Plus"
];

export default function Partners() {
  return (
    <section id="parceiros" className="bg-[#020617] py-20 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">Trusted by Industry Leaders</p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-scrolling-text flex gap-16 whitespace-nowrap py-4">
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div 
              key={i} 
              className="text-2xl md:text-4xl font-display font-bold text-white/10 hover:text-blue-500/50 transition-colors cursor-default select-none"
            >
              {partner}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10" />
      </div>
    </section>
  );
}
