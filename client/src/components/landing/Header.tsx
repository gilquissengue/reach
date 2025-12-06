import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full bg-black text-white border-b border-white/10"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/">
          <a className="text-3xl font-display font-bold tracking-tighter hover:opacity-80 transition-opacity">M.</a>
        </Link>

        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link href="/mutum">
                <a className={navigationMenuTriggerStyle() + " bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"}>
                  A Mutum
                </a>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/services">
                <a className={navigationMenuTriggerStyle() + " bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"}>
                  Serviços de Marketing B2B
                </a>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/cases">
                <a className={navigationMenuTriggerStyle() + " bg-transparent text-brand-red hover:bg-white/10 hover:text-brand-red focus:bg-white/10 focus:text-brand-red font-semibold"}>
                  Cases
                </a>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/materiais">
                <a className={navigationMenuTriggerStyle() + " bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"}>
                  Materiais
                </a>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button 
          variant="outline" 
          className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-colors"
        >
          Fale Conosco
        </Button>
      </div>
    </motion.header>
  );
}
