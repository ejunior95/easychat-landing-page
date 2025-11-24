import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, MessageSquareWarning } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
      <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10 opacity-50" />

      <div className="container px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >

          <div className="mx-auto w-24 h-24 bg-muted/30 rounded-3xl flex items-center justify-center border border-border/50 mb-8 backdrop-blur-sm shadow-card">
            <MessageSquareWarning className="w-12 h-12 text-primary" />
          </div>

          <h1 className="text-8xl font-extrabold tracking-tighter bg-gradient-primary bg-clip-text text-transparent">
            404
          </h1>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Página não encontrada
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-lg">
              Ops! Parece que a conversa parou por aqui. A página que você está procurando não existe ou foi movida.
            </p>
          </div>

          <div className="pt-6">
            <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/20">
              <Link to="/">
                <Home className="w-4 h-4" />
                Voltar para o Início
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;