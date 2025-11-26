import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, RotateCcw, Settings2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EasyChat } from '@ejunior95/easy-chat';

interface PlaygroundConfig {
  title: string;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor: string;
  theme: 'light' | 'dark' | 'system';
  language: 'pt' | 'en';
  initialMessage: string;
}

const defaultConfig: PlaygroundConfig = {
  title: "Playground ChatBot (TESTE) 🤖",
  position: "bottom-left",
  primaryColor: "#10b981",
  theme: "system",
  language: "pt",
  initialMessage: "Mude as configurações acima e veja a mágica! ✨"
};

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
    <div className="relative group rounded-lg overflow-hidden border border-white/10 bg-[#09090b]">
      <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <button
          onClick={handleCopy}
          className="text-xs flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
        >
          {isCopied ? (
            <>
              <Check className="h-3 w-3 text-green-400" />
              {language === 'pt' ? 'Copiado!' : 'Copied!'}
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              {language === 'pt' ? 'Copiar' : 'Copy'}
            </>
          )}
        </button>
      </div>

      <div className="text-sm font-mono">
        <SyntaxHighlighter
          language={codeLanguage}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.6',
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
  const { t, language } = useLanguage();
  const [config, setConfig] = useState<PlaygroundConfig>(defaultConfig);
  
  const handleReset = () => setConfig(defaultConfig);

  const installCode = `npm install @ejunior95/easy-chat`;

  const usageCode = `import React from 'react';
import { EasyChat } from '@ejunior95/easy-chat';
import '@ejunior95/easy-chat/dist/style.css';

function App() {
  return (
    <div className="App">
      <EasyChat 
        config={{
          title: "${config.title}",
          position: "${config.position}",
          primaryColor: "${config.primaryColor}",
          theme: "${config.theme}",
          language: "${config.language}",
          initialMessage: "${config.initialMessage}",
          // Use your own proxy or backend
          api: {
            useProxy: true,
            proxyUrl: "https://your-proxy-url.com/api" 
          }
        }} 
      />
    </div>
  );
}`;

  return (
    <section id="get-started" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <EasyChat 
        key={JSON.stringify(config)}
        config={{
          ...config,
          systemPrompt: "You are a playground bot. Keep answers short.",
          // @ts-ignore
          isPlayground: true,
        }} 
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-3 sm:space-y-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t('code.title')}</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t('code.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="border-border/90 bg-card/35 backdrop-blur h-auto lg:h-full">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-border/50 pb-4">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Settings2 className="h-5 w-5" />
                    <h3>{language === 'pt' ? 'Playground ao vivo ' : 'Live Playground' }</h3>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{language === 'pt' ? 'Titulo' : 'Title'}</Label>
                    <Input 
                      value={config.title}
                      onChange={(e) => setConfig({...config, title: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{language === 'pt' ? 'Tema' : 'Theme'}</Label>
                      <Select 
                        value={config.theme} 
                        onValueChange={(v: any) => setConfig({...config, theme: v})}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{language === 'pt' ? 'Idioma' : 'Language'}</Label>
                      <Select 
                        value={config.language} 
                        onValueChange={(v: any) => setConfig({...config, language: v})}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{language === 'pt' ? 'Posicionamento' : 'Position'}</Label>
                    <Select 
                      value={config.position} 
                      onValueChange={(v: any) => setConfig({...config, position: v})}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" disabled>{language === 'pt' ? 'Canto inferior direito' : 'Bottom Right'}</SelectItem>
                        <SelectItem value="bottom-left">{language === 'pt' ? 'Canto inferior esquerdo' : 'Bottom Left'}</SelectItem>
                        <SelectItem value="top-right">{language === 'pt' ? 'Canto superior direito' : 'Top Right'}</SelectItem>
                        <SelectItem value="top-left">{language === 'pt' ? 'Canto superior esquerdo' : 'Top Left'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{language === 'pt' ? 'Cor primária' : 'Primary Color'}</Label>
                    <div className="flex gap-2 items-center">
                      <div className="relative w-full">
                        <Input 
                          type="color" 
                          value={config.primaryColor}
                          onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                          className="h-10 w-full p-1 cursor-pointer"
                        />
                      </div>
                      <Input 
                        value={config.primaryColor}
                        onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                        className="font-mono w-24 bg-background/50 flex-shrink-0"
                        maxLength={7}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 text-xs text-muted-foreground text-center">
                    👆 {language === 'pt' ? 'O chat aparecerá no canto da tela.' : 'The chat will appear in the corner of your screen.'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >

            <Card className="border-border/90 bg-card/35 backdrop-blur shadow-2xl h-auto lg:h-full flex flex-col">
              <CardContent className="p-4 sm:p-6 flex-1">
                <Tabs defaultValue="install" className="w-full h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="install" className="text-xs sm:text-sm">{t('code.step1')}</TabsTrigger>
                    <TabsTrigger value="usage" className="text-xs sm:text-sm">{t('code.step2')}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="install" className="mt-0">
                    <CodeBlock code={installCode} codeLanguage="bash" />
                  </TabsContent>
                  
                  <TabsContent value="usage" className="mt-0 flex-1">
                    <CodeBlock code={usageCode} codeLanguage="tsx" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};