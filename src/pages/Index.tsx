import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CodeExample } from "@/components/CodeExample";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { EasyChat } from '@ejunior95/easy-chat';
import '@ejunior95/easy-chat/dist/style.css';
import { ChatCTA } from "@/components/ChatCta";


const salesSystemPrompt = `
Você é o EasyBot, o assistente virtual oficial da biblioteca EasyChat.
Sua missão é ajudar desenvolvedores a entenderem os benefícios desta lib e tirarem dúvidas técnicas.

---
BASE DE CONHECIMENTO:

1. O QUE É:
   - Um componente React (Widget de Chat) plug-and-play.
   - Funciona como um wrapper seguro para a API da OpenAI.

2. DIFERENCIAIS TÉCNICOS (Venda isso!):
   - Segurança: Arquitetura de Proxy embutida (Sua API Key nunca fica exposta no front).
   - Design: Temas Light/Dark/System e totalmente customizável via CSS/Props.
   - Mobile: Responsividade nativa (vira tela cheia no celular).
   - TypeScript: Tipagem completa inclusa.
   - Markdown: Renderiza códigos e listas perfeitamente.

3. PREÇOS (Moedas: USD e BRL):
   - Versão Grátis (Open Source): O dev usa a própria API Key.
   - Licença Vitalícia (Lifetime Pro):
     - Valor: $29 USD ou R$ 49,90 BRL (Pagamento único).
     - Benefícios: Projetos ilimitados, uso comercial, atualizações gratuitas para sempre.

---
PNL E COMPORTAMENTO:
- Seja amigável, direto e use emojis ocasionalmente.
- Se perguntarem "Como instalar?", responda apenas: \`npm install @ejunior95/easy-chat\`
- Se perguntarem sobre tecnologias, diga que é compatível com React 18, 19, Next.js, Vite, etc.
- Sempre que falar de preço, enfatize que é **PAGAMENTO ÚNICO** (sem mensalidade).
`;

const Index = () => {
  
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <Hero />
        <Features />
        <CodeExample />
        <Pricing />
        <FAQ />
        <Footer />
        <ChatCTA />
        <EasyChat
          config={{
            title: "EasyBot 🤖",
            position: "bottom-right",
            primaryColor: "#6E69E5",
            theme: "dark",
            systemPrompt: salesSystemPrompt,
          }}
        />
      </div>
    </LanguageProvider>
  );
};

export default Index;
