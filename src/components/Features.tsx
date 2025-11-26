import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Zap, Shield, FileText, Smartphone, Palette, Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    titleKey: 'features.plugplay.title',
    descKey: 'features.plugplay.desc',
  },
  {
    icon: Shield,
    titleKey: 'features.secure.title',
    descKey: 'features.secure.desc',
  },
  {
    icon: FileText,
    titleKey: 'features.markdown.title',
    descKey: 'features.markdown.desc',
  },
  {
    icon: Smartphone,
    titleKey: 'features.responsive.title',
    descKey: 'features.responsive.desc',
  },
  {
    icon: Palette,
    titleKey: 'features.themeable.title',
    descKey: 'features.themeable.desc',
  },
  {
    icon: Code2,
    titleKey: 'features.typescript.title',
    descKey: 'features.typescript.desc',
  },
];

export const Features = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted-foreground/20 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t('features.title')}</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{t(feature.titleKey)}</h3>
                    <p className="text-muted-foreground">{t(feature.descKey)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
