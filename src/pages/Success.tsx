import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Copy, Loader2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface LicenseData {
  key: string;
  domains: string[];
}

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const [loading, setLoading] = useState(true);
  const [license, setLicense] = useState<LicenseData | null>(null);
  const [error, setError] = useState("");
  
  const sessionId = searchParams.get("session_id");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
      return;
    }

    const fetchLicense = async () => {
      try {
        const response = await fetch(`${baseUrl}/license?session_id=${sessionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if(response.status === 404) throw new Error("Processing");
            throw new Error("Failed to fetch license");
        }

        const data = await response.json();
        setLicense(data);
        triggerConfetti();
        setLoading(false);
      } catch (err: any) {
        if(err.message === "Processing") {
            setTimeout(fetchLicense, 2000);
        } else {
            console.error(err);
            setError(language === 'pt' ? "Erro ao recuperar sua licença. Verifique seu e-mail." : "Error retrieving your license. Please check your email.");
            setLoading(false);
        }
      }
    };

    fetchLicense();
  }, [sessionId, baseUrl, navigate, language]);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleCopy = () => {
    if (license?.key) {
      navigator.clipboard.writeText(license.key);
      toast({
        title: language === 'pt' ? "Copiado!" : "Copied!",
        description: language === 'pt' ? "Chave de licença copiada para a área de transferência." : "License key copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-semibold animate-pulse">
          {language === 'pt' ? "Finalizando seu pedido..." : "Finalizing your order..."}
        </h2>
        <p className="text-muted-foreground mt-2">
          {language === 'pt' ? "Estamos gerando sua chave de licença segura." : "We are generating your secure license key."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-destructive/50">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-center text-destructive">Ops!</CardTitle>
            <CardDescription className="text-center">{error}</CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button onClick={() => navigate("/contact")} variant="outline">
              {language === 'pt' ? "Fale Conosco" : "Contact Support"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8 space-y-2">
          <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/20">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {language === 'pt' ? "Pagamento Confirmado!" : "Payment Successful!"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {language === 'pt' ? "Bem-vindo ao time EasyChat Pro." : "Welcome to the EasyChat Pro team."}
          </p>
        </div>

        <Card className="border-primary/20 shadow-glow bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-primary" />
              {language === 'pt' ? "Sua Chave de Licença" : "Your License Key"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative group">
              <div className="bg-background border border-input rounded-lg p-4 font-mono text-lg text-center break-all selection:bg-primary/20">
                {license?.key}
              </div>
              <Button 
                onClick={handleCopy}
                className="absolute right-2 top-2 h-8 px-3 opacity-0 group-hover:opacity-100 transition-opacity"
                variant="secondary"
                size="sm"
              >
                <Copy className="h-3.5 w-3.5 mr-1" />
                {language === 'pt' ? "Copiar" : "Copy"}
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
              <p className="font-medium text-foreground">
                {language === 'pt' ? "Domínios autorizados:" : "Authorized domains:"}
              </p>
              <ul className="list-disc list-inside text-muted-foreground">
                {license?.domains.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full h-11 text-base" onClick={() => window.open('https://www.npmjs.com/package/@ejunior95/easy-chat', '_blank')}>
              {language === 'pt' ? "Ler Documentação" : "Read Documentation"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => navigate("/")}>
              {language === 'pt' ? "Voltar ao Início" : "Back to Home"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Success;