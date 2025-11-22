import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Pricing = () => {
  const { t, language } = useLanguage();

  const plans = [
    {
      titleKey: 'pricing.free.title',
      priceKey: 'pricing.free.price',
      descKey: 'pricing.free.desc',
      features: ['pricing.free.feature1', 'pricing.free.feature2', 'pricing.free.feature3', 'pricing.free.feature4', 'pricing.free.feature5'],
      ctaKey: 'pricing.free.cta',
      isPro: false,
    },
    {
      titleKey: 'pricing.pro.title',
      priceKey: 'pricing.pro.price',
      periodKey: 'pricing.pro.period',
      descKey: 'pricing.pro.desc',
      features: ['pricing.pro.feature1', 'pricing.pro.feature2', 'pricing.pro.feature3', 'pricing.pro.feature4', 'pricing.pro.feature5'],
      ctaKey: 'pricing.pro.cta',
      isPro: true,
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t('pricing.title')}</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full ${plan.isPro ? 'border-primary shadow-glow' : 'border-border/50'} bg-card/50 backdrop-blur`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{t(plan.titleKey)}</CardTitle>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl font-bold">{t(plan.priceKey)}</span>
                    {plan.periodKey && <span className="text-muted-foreground">{t(plan.periodKey)}</span>}
                  </div>
                  <CardDescription className="mt-2">{t(plan.descKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{t(feature)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.isPro ? 'bg-primary text-primary-foreground' : ''}`}
                    variant={plan.isPro ? 'default' : 'outline'}
                    onClick={() => window.open('https://www.npmjs.com/package/@ejunior95/easy-chat', '_blank')}
                  >
                    {t(plan.ctaKey)}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
