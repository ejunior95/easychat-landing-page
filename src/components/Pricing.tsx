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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import FormAI from "./FormAi";


export const Pricing = () => {
  const { t, language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDomainValid, setIsDomainValid] = useState(false);


  const baseUrl = import.meta.env.VITE_BASE_URL;
  const priceIdBr = import.meta.env.VITE_PRICE_ID_BRL;
  const priceIdUsd = import.meta.env.VITE_PRICE_ID_USD;

  const handleSubscribeClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!domain) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: domain,
          priceId: language === 'pt' ? priceIdBr : priceIdUsd
        })
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Erro ao iniciar checkout", error);
    } finally {
      setIsLoading(false);
    }
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
          <Card className="flex flex-col border-border shadow-sm hover:shadow-md transition-all h-full">
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
              {language === 'en' ? 'Best Value' : 'Melhor Custo-Benefício'}
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
                    {language === 'pt' ? 'R$ 49,90' : '$29,90'}
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
                onClick={handleSubscribeClick}
              >
                {t('pricing.pro.cta')}
              </Button>

              {/* Modal para pedir o domínio */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{language === 'pt' ? 'Configure sua Licença' : 'License Setup'}</DialogTitle>
                    <DialogDescription>
                      {language === 'pt' ? 'Onde você vai usar o EasyChat? (Ex: meudominio.com)' : 'Where will you use EasyChat? (e.g., mydomain.com)'}
                      <br />
                      <span className="text-xs text-muted-foreground">
                        {language === 'pt' ? '*Sua licença funcionará neste site e em localhost automaticamente.' : '*Your license will work on this site and on localhost automatically.'}
                      </span>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="domain">{language === 'pt' ? 'Domínio do Site' : 'Your domain'}</Label>
                      <FormAI
                        prompt="Campo de texto para domínio de internet (ex: meudominio.com). Use validação REGEX para garantir o formato correto de URL/Domínio. Não use máscara de tamanho fixo."
                        onChange={(value) => setDomain(value)}
                        onValidate={(isValid) => setIsDomainValid(isValid)}
                        onEnter={() => {
                          if (!isLoading) {
                            handleConfirmPurchase();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    {language === 'pt' ? (
                      <Button
                        onClick={handleConfirmPurchase}
                        disabled={isLoading || !isDomainValid}
                      >
                        {isLoading && language === 'pt' ? "Processando..." : "Ir para Pagamento"}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleConfirmPurchase}
                        disabled={isLoading || !isDomainValid}
                      >
                        {isLoading && language === 'en' ? "Processing..." : "Proceed to Payment"}
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>

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