import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


const CodeBlock = ({ code, codeLanguage }: { code: string; codeLanguage: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { language } = useLanguage();


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-white/10">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 p-2 rounded-md bg-black/50 hover:bg-black/80 text-muted-foreground hover:text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/10"
        title={language === 'en' ? "Copy to clipboard" : 'Copiar para a área de transferência'}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>

      <div className="text-sm">
        <SyntaxHighlighter
          language={codeLanguage}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: '#09090b',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

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
          <Card className="border-border/50 bg-card/50 backdrop-blur shadow-2xl">
            <CardContent className="p-4 sm:p-6">
              <Tabs defaultValue="install" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="install" className="text-xs sm:text-sm">{t('code.step1')}</TabsTrigger>
                  <TabsTrigger value="usage" className="text-xs sm:text-sm">{t('code.step2')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="install" className="mt-0">
                  <CodeBlock code={installCode} codeLanguage="bash" />
                </TabsContent>
                
                <TabsContent value="usage" className="mt-0">
                  <CodeBlock code={usageCode} codeLanguage="tsx" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};