import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Nav
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.docs': 'Documentation',
    'nav.getStarted': 'Get Started',
    
    // Hero
    'hero.title': 'The AI Chat Widget',
    'hero.subtitle': 'for React Developers',
    'hero.description': 'Add a secure, plug-and-play ChatGPT-powered assistant to your React app in seconds. No API key exposure, fully customizable, and production-ready.',
    'hero.cta.primary': 'Start Building',
    'hero.cta.secondary': 'View Documentation',
    'hero.badge': 'Zero Configuration Required',
    
    // Features
    'features.title': 'Everything You Need',
    'features.subtitle': 'Built for developers who value security, speed, and simplicity',
    'features.plugplay.title': 'Plug & Play',
    'features.plugplay.desc': 'Simple React component. Install via npm and add to your app in under 60 seconds.',
    'features.secure.title': 'Security First',
    'features.secure.desc': 'Built-in proxy support keeps your OpenAI API keys safe on your backend, never exposed to clients.',
    'features.markdown.title': 'Markdown Support',
    'features.markdown.desc': 'Bot responses render beautifully with code blocks, lists, bold text, and more out of the box.',
    'features.responsive.title': 'Fully Responsive',
    'features.responsive.desc': 'Mobile-optimized UX with full-screen mode and smooth animations that work on any device.',
    'features.themeable.title': 'Dark/Light Themes',
    'features.themeable.desc': 'Built-in dark, light, and system mode. Customize colors to match your brand perfectly.',
    'features.typescript.title': 'Type-Safe',
    'features.typescript.desc': 'Written in TypeScript with full type definitions for a better development experience.',
    
    // Code
    'code.title': 'Get Started in Seconds',
    'code.subtitle': 'Install the package and add the component to your app',
    'code.step1': 'Install via npm',
    'code.step2': 'Import and configure',
    
    // Pricing
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.subtitle': 'Choose the plan that works for you',
    'pricing.free.title': 'Bring Your Own AI',
    'pricing.free.price': 'Free',
    'pricing.free.desc': 'Use your own OpenAI API key or custom AI backend',
    'pricing.free.feature1': 'Full component access',
    'pricing.free.feature2': 'All themes & customization',
    'pricing.free.feature3': 'Markdown rendering',
    'pricing.free.feature4': 'TypeScript support',
    'pricing.free.feature5': 'Community support',
    'pricing.free.cta': 'Get Started Free',
    'pricing.pro.title': 'Managed AI Service',
    'pricing.pro.price': '$4.99',
    'pricing.pro.period': '/month',
    'pricing.pro.desc': 'Let us handle the AI backend infrastructure for you',
    'pricing.pro.feature1': 'Everything in Free',
    'pricing.pro.feature2': 'No API key needed',
    'pricing.pro.feature3': 'Spam protection',
    'pricing.pro.feature4': 'Rate limiting',
    'pricing.pro.feature5': 'Priority support',
    'pricing.pro.cta': 'Start Free Trial',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Do I need my own OpenAI API key?',
    'faq.a1': 'Not necessarily. You can use your own API key (Free plan) or subscribe to our managed service where we handle the AI infrastructure for you.',
    'faq.q2': 'Is my API key secure?',
    'faq.a2': 'Yes! EasyChat is designed to work with a proxy/backend architecture, meaning your API key never gets exposed to the client-side code.',
    'faq.q3': 'Can I customize the appearance?',
    'faq.a3': 'Absolutely! You can customize colors, themes (dark/light/system), position, and even the AI personality via system prompts.',
    'faq.q4': 'Does it work with Next.js?',
    'faq.a4': 'Yes! EasyChat works with any React-based framework including Next.js, Create React App, Vite, and more.',
    'faq.q5': 'What about mobile devices?',
    'faq.a5': 'EasyChat is fully responsive and automatically transforms into a full-screen experience on mobile devices for better usability.',
    
    // Footer
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.pricing': 'Pricing',
    'footer.documentation': 'Documentation',
    'footer.developers': 'Developers',
    'footer.github': 'GitHub',
    'footer.npm': 'NPM Package',
    'footer.support': 'Support',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.blog': 'Blog',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
  },
  pt: {
    // Nav
    'nav.features': 'Recursos',
    'nav.pricing': 'Preços',
    'nav.docs': 'Documentação',
    'nav.getStarted': 'Começar',
    
    // Hero
    'hero.title': 'O Widget de Chat IA',
    'hero.subtitle': 'para Desenvolvedores React',
    'hero.description': 'Adicione um assistente ChatGPT seguro e plug-and-play ao seu app React em segundos. Sem exposição de chaves API, totalmente personalizável e pronto para produção.',
    'hero.cta.primary': 'Começar a Construir',
    'hero.cta.secondary': 'Ver Documentação',
    'hero.badge': 'Zero Configuração Necessária',
    
    // Features
    'features.title': 'Tudo que Você Precisa',
    'features.subtitle': 'Construído para desenvolvedores que valorizam segurança, velocidade e simplicidade',
    'features.plugplay.title': 'Plug & Play',
    'features.plugplay.desc': 'Componente React simples. Instale via npm e adicione ao seu app em menos de 60 segundos.',
    'features.secure.title': 'Segurança em Primeiro Lugar',
    'features.secure.desc': 'Suporte integrado a proxy mantém suas chaves da API OpenAI seguras no backend, nunca expostas aos clientes.',
    'features.markdown.title': 'Suporte a Markdown',
    'features.markdown.desc': 'Respostas do bot renderizam lindamente com blocos de código, listas, texto em negrito e muito mais.',
    'features.responsive.title': 'Totalmente Responsivo',
    'features.responsive.desc': 'UX otimizada para mobile com modo tela cheia e animações suaves que funcionam em qualquer dispositivo.',
    'features.themeable.title': 'Temas Escuro/Claro',
    'features.themeable.desc': 'Modos escuro, claro e sistema integrados. Personalize cores para combinar perfeitamente com sua marca.',
    'features.typescript.title': 'Type-Safe',
    'features.typescript.desc': 'Escrito em TypeScript com definições de tipos completas para uma melhor experiência de desenvolvimento.',
    
    // Code
    'code.title': 'Comece em Segundos',
    'code.subtitle': 'Instale o pacote e adicione o componente ao seu app',
    'code.step1': 'Instalar via npm',
    'code.step2': 'Importar e configurar',
    
    // Pricing
    'pricing.title': 'Preços Simples e Transparentes',
    'pricing.subtitle': 'Escolha o plano que funciona para você',
    'pricing.free.title': 'Traga Sua Própria IA',
    'pricing.free.price': 'Grátis',
    'pricing.free.desc': 'Use sua própria chave da API OpenAI ou backend de IA customizado',
    'pricing.free.feature1': 'Acesso completo ao componente',
    'pricing.free.feature2': 'Todos os temas e personalizações',
    'pricing.free.feature3': 'Renderização Markdown',
    'pricing.free.feature4': 'Suporte TypeScript',
    'pricing.free.feature5': 'Suporte da comunidade',
    'pricing.free.cta': 'Começar Grátis',
    'pricing.pro.title': 'Serviço IA Gerenciado',
    'pricing.pro.price': 'R$ 30',
    'pricing.pro.period': '/mês',
    'pricing.pro.desc': 'Deixe-nos cuidar da infraestrutura de IA para você',
    'pricing.pro.feature1': 'Tudo do plano Grátis',
    'pricing.pro.feature2': 'Sem necessidade de chave API',
    'pricing.pro.feature3': 'Proteção contra spam',
    'pricing.pro.feature4': 'Limitação de taxa',
    'pricing.pro.feature5': 'Suporte prioritário',
    'pricing.pro.cta': 'Iniciar Teste Grátis',
    
    // FAQ
    'faq.title': 'Perguntas Frequentes',
    'faq.q1': 'Preciso da minha própria chave da API OpenAI?',
    'faq.a1': 'Não necessariamente. Você pode usar sua própria chave API (plano Grátis) ou assinar nosso serviço gerenciado onde cuidamos da infraestrutura de IA para você.',
    'faq.q2': 'Minha chave API está segura?',
    'faq.a2': 'Sim! EasyChat é projetado para funcionar com uma arquitetura proxy/backend, o que significa que sua chave API nunca fica exposta ao código client-side.',
    'faq.q3': 'Posso personalizar a aparência?',
    'faq.a3': 'Absolutamente! Você pode personalizar cores, temas (escuro/claro/sistema), posição e até a personalidade da IA via prompts de sistema.',
    'faq.q4': 'Funciona com Next.js?',
    'faq.a4': 'Sim! EasyChat funciona com qualquer framework baseado em React incluindo Next.js, Create React App, Vite e mais.',
    'faq.q5': 'E quanto a dispositivos móveis?',
    'faq.a5': 'EasyChat é totalmente responsivo e automaticamente se transforma em uma experiência de tela cheia em dispositivos móveis para melhor usabilidade.',
    
    // Footer
    'footer.product': 'Produto',
    'footer.features': 'Recursos',
    'footer.pricing': 'Preços',
    'footer.documentation': 'Documentação',
    'footer.developers': 'Desenvolvedores',
    'footer.github': 'GitHub',
    'footer.npm': 'Pacote NPM',
    'footer.support': 'Suporte',
    'footer.company': 'Empresa',
    'footer.about': 'Sobre',
    'footer.blog': 'Blog',
    'footer.contact': 'Contato',
    'footer.rights': 'Todos os direitos reservados.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
