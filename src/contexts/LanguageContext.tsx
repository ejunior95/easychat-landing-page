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
    'pricing.subtitle': 'Pay once, use forever. No recurring fees.',
    'pricing.free.title': 'Open Source',
    'pricing.free.price': 'Free',
    'pricing.free.desc': 'Perfect for hobby projects and testing',
    'pricing.free.feature1': 'Full component access',
    'pricing.free.feature2': 'Basic themes',
    'pricing.free.feature3': 'Markdown rendering',
    'pricing.free.feature4': 'Community support',
    'pricing.free.cta': 'Install Now',
    
    'pricing.pro.title': 'Lifetime License',
    'pricing.pro.price': '$29',
    'pricing.pro.period': 'one-time payment',
    'pricing.pro.desc': 'The complete toolkit for professional developers',
    'pricing.pro.feature1': 'Unlimited Projects',
    'pricing.pro.feature2': 'Commercial License',
    'pricing.pro.feature3': 'Priority Support',
    'pricing.pro.feature4': 'Free Updates Forever',
    'pricing.pro.feature5': 'Advanced Customization',
    'pricing.pro.cta': 'Get Lifetime Access',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Is this a subscription?',
    'faq.a1': 'No! This is a lifetime license. You pay once and can use EasyChat in as many projects as you want, forever.',
    'faq.q2': 'Do I need my own OpenAI API key?',
    'faq.a2': 'Yes. EasyChat provides the frontend widget and the secure backend proxy code. You use your own OpenAI key, giving you full control over costs.',
    'faq.q3': 'Can I use it in commercial projects?',
    'faq.a3': 'Yes! The Lifetime License grants you the right to use EasyChat in unlimited commercial projects for clients or your own SaaS.',
    'faq.q4': 'Does it work with Next.js?',
    'faq.a4': 'Yes! EasyChat works with any React-based framework including Next.js, Create React App, Vite, and more.',
    'faq.q5': 'What if I need help?',
    'faq.a5': 'Lifetime license holders get priority support via email and GitHub issues.',
    
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

    // About
    'about.title': 'About Us',
    'about.subtitle': 'Our Mission',
    'about.story.title': 'Our Story',
    'about.story.p1': 'EasyChat was born from a real need. As developers, we were tired of complex integrations just to put a simple AI chat on our clients\' websites.',
    'about.story.p2': 'We wanted something that was plug-and-play, secure by default, and fully customizable without fighting against the library.',
    'about.values.title': 'Our Values',
    'about.values.1': 'Simplicity First',
    'about.values.2': 'Developer Experience',
    'about.values.3': 'Privacy & Security',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We\'d love to hear from you',
    'contact.whatsapp': 'Chat on WhatsApp',
    'contact.email': 'Send an Email',
    'contact.desc': 'Have a question about the Lifetime License or need technical support?',
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
    'pricing.title': 'Preços Simples',
    'pricing.subtitle': 'Pague uma vez, use para sempre. Sem mensalidades.',
    'pricing.free.title': 'Open Source',
    'pricing.free.price': 'Grátis',
    'pricing.free.desc': 'Perfeito para projetos pessoais e testes',
    'pricing.free.feature1': 'Acesso ao componente',
    'pricing.free.feature2': 'Temas básicos',
    'pricing.free.feature3': 'Renderização Markdown',
    'pricing.free.feature4': 'Suporte da comunidade',
    'pricing.free.cta': 'Instalar Agora',
    
    'pricing.pro.title': 'Licença Vitalícia',
    'pricing.pro.price': 'R$ 49,90',
    'pricing.pro.period': 'pagamento único',
    'pricing.pro.desc': 'O kit completo para desenvolvedores profissionais',
    'pricing.pro.feature1': 'Projetos Ilimitados',
    'pricing.pro.feature2': 'Licença Comercial',
    'pricing.pro.feature3': 'Suporte Prioritário',
    'pricing.pro.feature4': 'Atualizações Gratuitas',
    'pricing.pro.feature5': 'Customização Avançada',
    'pricing.pro.cta': 'Comprar Acesso Vitalício',
    
    // FAQ
    'faq.title': 'Perguntas Frequentes',
    'faq.q1': 'Isso é uma assinatura mensal?',
    'faq.a1': 'Não! Esta é uma licença vitalícia (Lifetime). Você paga uma única vez e pode usar o EasyChat em quantos projetos quiser, para sempre.',
    'faq.q2': 'Preciso da minha própria chave da API OpenAI?',
    'faq.a2': 'Sim. O EasyChat fornece o widget frontend e o código seguro do proxy backend. Você usa sua própria chave da OpenAI, tendo total controle sobre seus custos.',
    'faq.q3': 'Posso usar em projetos comerciais?',
    'faq.a3': 'Sim! A Licença Vitalícia garante o direito de usar o EasyChat em projetos comerciais ilimitados, seja para clientes ou para seu próprio SaaS.',
    'faq.q4': 'Funciona com Next.js?',
    'faq.a4': 'Sim! EasyChat funciona com qualquer framework baseado em React incluindo Next.js, Create React App, Vite e mais.',
    'faq.q5': 'E se eu precisar de ajuda?',
    'faq.a5': 'Detentores da licença vitalícia têm suporte prioritário via email e GitHub.',
    
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

    // About
    'about.title': 'Sobre Nós',
    'about.subtitle': 'Nossa Missão',
    'about.story.title': 'Nossa História',
    'about.story.p1': 'O EasyChat nasceu de uma necessidade real. Como desenvolvedores, estávamos cansados de integrações complexas apenas para colocar um chat de IA simples nos sites dos nossos clientes.',
    'about.story.p2': 'Queríamos algo que fosse plug-and-play, seguro por padrão e totalmente personalizável sem precisar lutar contra a biblioteca.',
    'about.values.title': 'Nossos Valores',
    'about.values.1': 'Simplicidade Primeiro',
    'about.values.2': 'Experiência do Desenvolvedor',
    'about.values.3': 'Privacidade e Segurança',

    // Contact
    'contact.title': 'Entre em Contato',
    'contact.subtitle': 'Adoraríamos falar com você',
    'contact.whatsapp': 'Conversar no WhatsApp',
    'contact.email': 'Enviar um Email',
    'contact.desc': 'Tem alguma dúvida sobre a Licença Vitalícia ou precisa de suporte técnico?',
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