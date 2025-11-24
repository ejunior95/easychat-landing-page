import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const ContactContent = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12 flex flex-col">
      <div className="fixed inset-0 bg-gradient-to-tl from-primary/5 via-background to-secondary/5 -z-10" />

      <div className="container mx-auto px-4 max-w-4xl flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.desc')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">

          <motion.a
            href="https://wa.me/5515988309658"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="block group"
          >
            <Card className="h-full p-8 flex flex-col items-center justify-center text-center bg-card/50 backdrop-blur border-border/50 hover:border-green-500/50 hover:bg-green-500/5 transition-all cursor-pointer group-hover:shadow-glow">
              <div className="h-16 w-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 text-green-500 group-hover:scale-110 transition-transform">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('contact.whatsapp')}</h3>
              <p className="text-muted-foreground">+55 (15) 98830-9658</p>
            </Card>
          </motion.a>

          {/* Email Card */}
          <motion.a
            href="mailto:contato@easychat.ia.br"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="block group"
          >
            <Card className="h-full p-8 flex flex-col items-center justify-center text-center bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group-hover:shadow-glow">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('contact.email')}</h3>
              <p className="text-muted-foreground">contato@easychat.ia.br</p>
            </Card>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

const Contact = () => (
  <LanguageProvider>
    <Navigation />
    <ContactContent />
    <Footer />
  </LanguageProvider>
);

export default Contact;