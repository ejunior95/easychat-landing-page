import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

export const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-primary flex items-center justify-center font-bold text-background text-sm">
            EC
          </div>
          <span className="text-lg sm:text-xl font-bold">EasyChat</span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.features')}
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.pricing')}
          </button>
          <a 
            href="https://www.npmjs.com/package/@ejunior95/easy-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.docs')}
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
            className="rounded-full h-9 w-9"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => scrollToSection('get-started')} 
            className="bg-primary text-primary-foreground hover:opacity-90 h-9 px-3 sm:px-4 text-sm"
          >
            <span className="hidden sm:inline">{t('nav.getStarted')}</span>
            <span className="sm:hidden">Start</span>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
