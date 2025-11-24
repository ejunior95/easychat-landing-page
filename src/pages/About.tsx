import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Code, ShieldCheck } from "lucide-react";

const AboutContent = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Heart, text: 'about.values.1' },
    { icon: Code, text: 'about.values.2' },
    { icon: ShieldCheck, text: 'about.values.3' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">

      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
      
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {t('about.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-primary">
                  {t('about.story.title')}
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>{t('about.story.p1')}</p>
                  <p>{t('about.story.p2')}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/30 border border-border/50"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-medium">{t(item.text)}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <LanguageProvider>
    <Navigation />
    <AboutContent />
    <Footer />
  </LanguageProvider>
);

export default About;