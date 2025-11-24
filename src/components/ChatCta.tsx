import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const ChatCTA = () => {
const { language } = useLanguage();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-24 right-5 z-40 hidden md:flex flex-col items-end pointer-events-none"
      >

        <div className="bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-xl shadow-lg mb-2 mr-2 relative animate-in fade-in slide-in-from-bottom-2 duration-1000">
          {language === 'en' ? 'Click here and test me!' : 'Clique aqui e teste agora!'}

          <div className="absolute -bottom-1 right-4 w-3 h-3 bg-primary transform rotate-45" />
        </div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut",
          }}
          className="mr-[0.85rem] drop-shadow-lg" 
        >
          <ArrowDown className="h-8 w-8 text-primary" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};