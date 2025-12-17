# EasyChat Landing Page - AI Coding Agent Instructions

## Project Overview
This is a **marketing landing page** for the EasyChat library (`@ejunior95/easy-chat`) - a React chat widget component. The site is built with **React 18 + TypeScript + Vite** and uses **shadcn/ui** components with Tailwind CSS. The page itself showcases and integrates the EasyChat widget as a live demo.

## Architecture & Key Patterns

### Component Structure
- **Page Components** ([src/pages/](src/pages/)): Route-level components (Index, About, Contact, Success, NotFound)
- **Feature Components** ([src/components/](src/components/)): Reusable sections (Hero, Features, Pricing, FAQ, etc.)
- **UI Components** ([src/components/ui/](src/components/ui/)): shadcn/ui primitives (Button, Card, Dialog, etc.)
- **Layouts**: [App.tsx](src/App.tsx) contains `MainLayout` with nested routing via `<Outlet />`

### Context Pattern
Two global contexts wrap the entire app:
- **LanguageContext** ([src/contexts/LanguageContext.tsx](src/contexts/LanguageContext.tsx)): Manages i18n (en/pt) via `useLanguage()` hook
  - Access translations: `const { t, language, setLanguage } = useLanguage()`
  - Usage: `<h1>{t('hero.title')}</h1>`
- **ChatContext** ([src/contexts/ChatContext.tsx](src/contexts/ChatContext.tsx)): Controls playground visibility via `useChatContext()`

### EasyChat Integration
The proprietary EasyChat widget is mounted in [App.tsx](src/App.tsx#L100-L115):
```tsx
import { EasyChat } from '@ejunior95/easy-chat';
import '@ejunior95/easy-chat/dist/style.css'; // Required CSS import

<EasyChat 
  config={{
    title: "EasyBot 🤖",
    primaryColor: "#0067E2",
    theme: "dark",
    language: language, // From LanguageContext
    systemPrompt: salesSystemPromptPT, // Defined in App.tsx
    licenseKey // From VITE_EASYCHAT_LICENSE env var
  }}
/>
```
- **System Prompts**: Two detailed prompts (PT/EN) are defined at the top of [App.tsx](src/App.tsx#L21-L87) - edit these to change bot behavior
- **Visibility Toggle**: The widget fades out when `isPlaygroundVisible` is true (playground not yet implemented)

### Styling & Theming
- **Utility Function**: Use `cn()` from [src/lib/utils.ts](src/lib/utils.ts) for conditional class merging
- **CSS Variables**: Theme colors defined in [src/index.css](src/index.css) as HSL custom properties (`--primary`, `--background`, etc.)
- **Tailwind Config**: Extended theme in [tailwind.config.ts](tailwind.config.ts) includes custom colors and animations
- **shadcn/ui**: Components are pre-configured in [components.json](components.json) - avoid manual edits

### Internationalization (i18n)
All user-facing text MUST use the translation system:
1. Add keys to `translations` object in [LanguageContext.tsx](src/contexts/LanguageContext.tsx) (both `en` and `pt`)
2. Use `t()` function in components: `t('section.key')`
3. **Never hardcode text** - this breaks language switching

### Animation Patterns
- **Framer Motion** is used extensively for page transitions and reveals
- Common pattern: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- See [Hero.tsx](src/components/Hero.tsx) for reference implementations

## Development Workflow

### Commands
```bash
npm run dev          # Start dev server on http://[::]:8080
npm run build        # Production build
npm run build:dev    # Development build (different mode)
npm run lint         # ESLint check
npm run preview      # Preview production build
```

### Path Aliases
- `@/` maps to `src/` (configured in [vite.config.ts](vite.config.ts))
- Always use: `import { Button } from "@/components/ui/button"`

### Environment Variables
- `VITE_EASYCHAT_LICENSE`: License key for EasyChat widget (loaded via `import.meta.env`)

### Key Dependencies
- **@ejunior95/easy-chat**: The chat widget being showcased (see [README.md](README.md) for docs)
- **@ejunior95/formai-react**: AI-powered form validation (used in [FormAi.tsx](src/components/FormAi.tsx))
- **react-router-dom v6**: Client-side routing
- **@tanstack/react-query**: Data fetching (QueryClient in [App.tsx](src/App.tsx))
- **framer-motion**: Animations
- **lucide-react**: Icon library

## Component Creation Guidelines

### New Feature Component
```tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export const MyFeature = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold">{t('myfeature.title')}</h2>
        {/* Content */}
      </div>
    </section>
  );
};
```

### New Route Page
1. Create component in [src/pages/](src/pages/)
2. Add route in [App.tsx](src/App.tsx#L130-L135) `<Routes>` block
3. Add navigation link in [Navigation.tsx](src/components/Navigation.tsx)

## Critical Notes
- **Mobile Responsiveness**: All components must work on mobile (use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`)
- **Dark Mode**: Theme switching is handled by shadcn/ui - avoid hardcoded colors
- **Type Safety**: This is a TypeScript project - always provide proper types
- **Image Optimization**: Hero image uses `.avif` format ([src/assets/hero-chat.avif](src/assets/hero-chat.avif))

## Testing the EasyChat Widget
The integrated widget is a live demo of the library. To modify its behavior:
1. Edit system prompts in [App.tsx](src/App.tsx#L21-L87)
2. Change config props in the `<EasyChat config={{...}} />` block
3. Reference the library docs in [README.md](README.md) for available config options
