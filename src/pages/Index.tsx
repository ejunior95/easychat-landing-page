import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CodeExample } from "@/components/CodeExample";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";


const Index = () => {
  
  return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <Hero />
        <Features />
        <CodeExample />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
  );
};

export default Index;
