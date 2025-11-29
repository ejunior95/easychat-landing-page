import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { EasyChat } from '@ejunior95/easy-chat';
import '@ejunior95/easy-chat/dist/style.css';
import { ChatCTA } from "@/components/ChatCta";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import { ChatProvider, useChatContext } from "./contexts/ChatContext";

const queryClient = new QueryClient();

const salesSystemPromptPT = `
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
const salesSystemPromptEN = `
You are EasyBot, the official virtual assistant of the EasyChat library.
Your mission is to help developers understand the benefits of this lib and answer technical questions.

---
KNOWLEDGE BASE:

1. WHAT IT IS:
   - A plug-and-play React Component (Chat Widget).
   - Works as a secure wrapper for the OpenAI API.

2. TECHNICAL DIFFERENTIATORS (Sell this!):
   - Security: Built-in Proxy Architecture (Your API Key is never exposed on the frontend).
   - Design: Light/Dark/System themes and fully customizable via CSS/Props.
   - Mobile: Native responsiveness (becomes full screen on mobile).
   - TypeScript: Full typing included.
   - Markdown: Renders code and lists perfectly.

3. PRICING (Currencies: USD and BRL):
   - Free Version (Open Source): The dev uses their own API Key.
   - Lifetime License (Lifetime Pro):
     - Price: $29 USD or R$ 49.90 BRL (One-time payment).
     - Benefits: Unlimited projects, commercial use, free updates forever.

---
NLP AND BEHAVIOR:
- Be friendly, direct, and use emojis occasionally.
- If asked "How to install?", reply only: 'npm install @ejunior95/easy-chat'
  - If asked about technologies, state that it is compatible with React 18, 19, Next.js, Vite, etc.
- Whenever mentioning price, emphasize that it is a ** ONE - TIME PAYMENT ** (no monthly fees).
`;

// const handleHistoryChange = (messages) => {
//   console.log("Current Chat History:", messages);
// };

const MainLayout = () => {
  const { language } = useLanguage();
  const { isPlaygroundVisible } = useChatContext();
  const licenseKey = import.meta.env.VITE_EASYCHAT_LICENSE;

  return (
    <>
      <Outlet />
      
      <div 
        className={`transition-opacity duration-300 ${
          isPlaygroundVisible 
            ? 'opacity-0 pointer-events-none' 
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <ChatCTA />
        <EasyChat
          key={language}
          config={{
            title: "EasyBot 🤖",
            position: "bottom-right",
            primaryColor: "#0067E2",
            theme: "dark",
            language: language,
            systemPrompt: language === 'pt' ? salesSystemPromptPT : salesSystemPromptEN,
            initialMessage: language === 'pt' ? "Olá! Precisa de alguma ajuda com o EasyChat?" : "Hi there! Need some help with EasyChat?",
            licenseKey
          }}
        />
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChatProvider>
        <Toaster />
        <Sonner />
        <Analytics />
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </ChatProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;