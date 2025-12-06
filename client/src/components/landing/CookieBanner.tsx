import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50 flex flex-col md:flex-row items-center justify-between gap-4 container mx-auto"
      >
        <p className="text-xs text-black max-w-3xl">
          Nós usamos cookies para melhorar a sua experiência de navegação no site. Ao continuar navegando, você concorda com a nossa Política de Privacidade.
        </p>
        <div className="flex gap-4">
           <Button 
            size="sm" 
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => setIsVisible(false)}
          >
            Aceitar
          </Button>
          <button onClick={() => setIsVisible(false)} className="md:hidden text-black">
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
