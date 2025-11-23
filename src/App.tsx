import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"; // Adicionado Outlet
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact"; // Corrigido: Importando a página, não o ícone
import { EasyChat } from '@ejunior95/easy-chat';
import '@ejunior95/easy-chat/dist/style.css';
import { ChatCTA } from "@/components/ChatCta"; // Opcional: Se quiser manter o balão chamativo
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

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

const MainLayout = () => {
  return (
    <>
      <Outlet />
      
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
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;