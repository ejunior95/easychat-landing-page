import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-chat.png";

export const Hero = () => {
  const { t, language } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-x-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-primary via-background to-secondary/5 -z-10" />
      <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-background to-background -z-10" />
      
      <div className="container relative z-10 mx-auto px-4 py-12 sm:py-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-3 rounded-full bg-primary/10 border border-primary/20 mx-auto lg:mx-0"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">{t('hero.badge')}</span>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                {t('hero.title')}
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {t('hero.subtitle')}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('get-started')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 h-12 px-8 text-base"
              >
                {t('hero.cta.primary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.open('https://www.npmjs.com/package/@ejunior95/easy-chat', '_blank')}
                className="h-12 px-8 text-base border-input hover:bg-accent hover:text-accent-foreground"
              >
                {t('hero.cta.secondary')}
              </Button>
            </div>

            <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>TypeScript Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>React 18 & 19</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>MIT License</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative mx-auto max-w-[500px] lg:max-w-none"
          >
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-background/50 backdrop-blur-sm">
              <img 
                src={ heroImage } 
                alt="EasyChat Interface" 
                className="w-full h-[30dvh] lg:h-[45dvh] object-cover"
                loading="eager"
              />

              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
            </div>
            
            <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-primary/20 blur-[100px] -z-10 animate-pulse" />
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-secondary/20 blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};