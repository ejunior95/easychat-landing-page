import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Menu, Check } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false); // Estado do menu mobile

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Fecha o menu mobile ao clicar
    }
  };

  // Componente do Seletor de Idioma (Reutilizável)
  const LanguageSelector = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('pt')} className="gap-2">
          <span className={language === 'pt' ? "opacity-100" : "opacity-0"}><Check className="h-4 w-4" /></span>
          Português (BR)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')} className="gap-2">
          <span className={language === 'en' ? "opacity-100" : "opacity-0"}><Check className="h-4 w-4" /></span>
          English (EN)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const NavLinks = ({ mobile = false }) => (
    <>
      <button 
        onClick={() => scrollToSection('features')}
        className={`text-sm font-medium hover:text-primary transition-colors ${mobile ? 'text-lg py-2' : ''}`}
      >
        {t('nav.features')}
      </button>
      <button 
        onClick={() => scrollToSection('pricing')}
        className={`text-sm font-medium hover:text-primary transition-colors ${mobile ? 'text-lg py-2' : ''}`}
      >
        {t('nav.pricing')}
      </button>
      <a 
        href="https://www.npmjs.com/package/@ejunior95/easy-chat"
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm font-medium hover:text-primary transition-colors ${mobile ? 'text-lg py-2' : ''}`}
      >
        {t('nav.docs')}
      </a>
    </>
  );

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white text-sm shadow-lg">
            <span>💬</span>
          </div>
          <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            EasyChat
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLinks />
        </div>

        {/* Actions Area (Language + CTA) */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSelector />
          <div className="w-px h-6 bg-border/50 mx-1" />
          <Button 
            onClick={() => scrollToSection('get-started')} 
            className="bg-primary text-primary-foreground hover:opacity-90 shadow-glow"
          >
            {t('nav.getStarted')}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSelector /> {/* Idioma aparece no mobile tbm fora do menu */}
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center text-white text-xs">💬</div>
                  EasyChat
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex flex-col gap-4 items-start">
                  <NavLinks mobile />
                </div>
                <div className="h-px w-full bg-border" />
                <Button 
                  onClick={() => scrollToSection('get-started')} 
                  className="w-full bg-primary shadow-glow"
                >
                  {t('nav.getStarted')}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};