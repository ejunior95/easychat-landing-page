import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const Pricing = () => {
  const { t, language } = useLanguage();

  // TODO: Substitua pelos seus links de pagamento do Stripe reais
  const STRIPE_LINK_BRL = "https://buy.stripe.com/SEU_LINK_REAIS";
  const STRIPE_LINK_USD = "https://buy.stripe.com/SEU_LINK_DOLAR";

  const handleSubscribe = () => {
    const checkoutUrl = language === 'pt' ? STRIPE_LINK_BRL : STRIPE_LINK_USD;
    window.open(checkoutUrl, '_blank');
  };

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <Card className="flex flex-col border-border/50 shadow-sm hover:shadow-md transition-all h-full">
            <CardHeader>
              <CardTitle className="text-2xl">{t('pricing.free.title')}</CardTitle>
              <CardDescription>{t('pricing.free.desc')}</CardDescription>
              <div className="mt-6">
                <span className="text-4xl font-bold">{t('pricing.free.price')}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{t(`pricing.free.feature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => window.open('https://www.npmjs.com/package/@ejunior95/easy-chat', '_blank')}
              >
                {t('pricing.free.cta')}
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Tier (Lifetime) */}
          <Card className="flex flex-col border-primary shadow-glow relative overflow-hidden h-full bg-card/50 backdrop-blur-sm">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Best Value
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{t('pricing.pro.title')}</CardTitle>
              <CardDescription>{t('pricing.pro.desc')}</CardDescription>
              <div className="mt-6 flex flex-col justify-start items-start">
                  <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full w-1/2 flex items-center justify-center">
                    {t('pricing.pro.period')}
                  </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">
                    {language === 'pt' ? 'R$ 49,90' : '$19,90'}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{t(`pricing.pro.feature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-primary hover:opacity-90 shadow-lg shadow-primary/20 text-lg h-12" 
                onClick={handleSubscribe}
              >
                {t('pricing.pro.cta')}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {language === 'pt' 
              ? 'Pagamento seguro via Stripe.' 
              : 'Secure payment via Stripe.'}
          </p>
        </div>
      </div>
    </section>
  );
};