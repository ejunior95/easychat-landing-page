import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Twitter } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 bg-muted/30 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center font-bold text-background">
                EC
              </div>
              <span className="text-xl font-bold">EasyChat</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The secure, plug-and-play AI Chat Widget for React.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/ejunior95/easy-chat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">{t('footer.features')}</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">{t('footer.pricing')}</a></li>
              <li><a href="https://www.npmjs.com/package/@ejunior95/easy-chat" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t('footer.documentation')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.developers')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://github.com/ejunior95/easy-chat" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t('footer.github')}</a></li>
              <li><a href="https://www.npmjs.com/package/@ejunior95/easy-chat" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t('footer.npm')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">{t('footer.about')}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t('footer.blog')}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EasyChat. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};
