import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CodeExample = () => {
  const { t } = useLanguage();

  const installCode = `npm install @ejunior95/easy-chat`;

  const usageCode = `import React from 'react';
import { EasyChat } from '@ejunior95/easy-chat';
import '@ejunior95/easy-chat/dist/style.css';

function App() {
  return (
    <div className="App">
      <h1>My Awesome App</h1>
      
      <EasyChat 
        config={{
          title: "AI Support",
          position: "bottom-right",
          primaryColor: "#00D9FF",
          theme: "dark",
          systemPrompt: "You are a helpful assistant.",
          api: {
            useProxy: true,
            proxyUrl: "https://your-api.vercel.app/api"
          }
        }} 
      />
    </div>
  );
}`;

  return (
    <section id="get-started" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t('code.title')}</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t('code.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-4 sm:p-6">
              <Tabs defaultValue="install" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="install" className="text-xs sm:text-sm">{t('code.step1')}</TabsTrigger>
                  <TabsTrigger value="usage" className="text-xs sm:text-sm">{t('code.step2')}</TabsTrigger>
                </TabsList>
                <TabsContent value="install" className="mt-4 sm:mt-6">
                  <pre className="bg-muted rounded-lg p-4 sm:p-6 overflow-x-auto">
                    <code className="text-xs sm:text-sm text-foreground">{installCode}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="usage" className="mt-4 sm:mt-6">
                  <pre className="bg-muted rounded-lg p-4 sm:p-6 overflow-x-auto">
                    <code className="text-xs sm:text-sm text-foreground">{usageCode}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
