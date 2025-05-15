
import { ArrowRight, PiggyBank, Wallet, CreditCard } from "lucide-react";
import TypingAnimation from "./TypingAnimation";

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-background to-secondary">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      </div>
      
      <div className="container relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="max-w-3xl">
          <p className="text-primary font-medium text-lg mb-4 animate-fade-in">Olá! meu nome é</p>
          <h1 className="text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <TypingAnimation text="Felipe Ribeiro" speed={550} /><span className="text-primary">.</span>
          </h1>
          <h2 className="text-2xl text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
            Ciêntista de Dados | Analista em Modelagem de Risco | Finanças Quantitativas
          </h2>
          <div className="h-px w-20 bg-primary mb-6 animate-fade-in" style={{ animationDelay: "600ms" }}></div>
          <h3 className="text-3xl font-bold mb-8 animate-fade-in" style={{ animationDelay: "800ms" }}>
            <TypingAnimation text="Cientista de Dados com Foco em Soluções Data-Driven para o Setor Financeiro" speed={40} />
          </h3>
          
          <div className="flex flex-wrap gap-4 mb-8 animate-fade-in" style={{ animationDelay: "1000ms" }}>
            <div className="flex items-center">
              <PiggyBank className="text-primary mr-2" size={24} />
              <span>Otimização de Alocação de Ativos</span>
            </div>
            <div className="flex items-center">
              <Wallet className="text-primary mr-2" size={24} />
              <span>Análise de Carteiras</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="text-primary mr-2" size={24} />
              <span>Analista Financeiro</span>
            </div>
          </div>
          
          <a href="#about" className="btn btn-primary animate-fade-in flex items-center gap-2 w-fit" style={{ animationDelay: "1200ms" }}>
            <span>Vamos começar</span>
            <ArrowRight size={16} />
          </a>
        </div>
        
        <div className="hidden md:block animate-fade-in relative" style={{ animationDelay: "600ms" }}>
          <div className="relative">
            {/* Circular image container with stats */}
            <div className="rounded-full overflow-hidden relative w-[450px] h-[450px] mx-auto">
              {/* Background circle with primary color */}
              {/* <div className="absolute inset-0 bg-primary rounded-full"></div> */}
              
              {/* Profile image */}
              <img 
                // src="public\images\profile-face.JPG" 
                src="images\original.jpg" 
                alt="Felipe Ribeiro" 
                className="w-full h-full object-cover object-center"
              />
              
              {/* Decorative dots pattern */}
              <div className="absolute -right-6 top-1/4 grid grid-rows-6 gap-2">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="flex gap-2">
                    {Array(4).fill(0).map((_, j) => (
                      <div key={j} className="w-1.5 h-1.5 rounded-full bg-background/80"></div>
                    ))}
                  </div>
                ))}
              </div>
              
              {/* Stats bubbles */}
              {/* <div className="absolute -left-16 bottom-1/4 bg-background rounded-full py-3 px-6 flex items-center gap-2 shadow-lg">
                <span className="text-3xl font-bold">12</span>
                <span className="text-primary font-bold text-xl">+</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase">YEARS OF</span>
                  <span className="text-primary text-xs font-semibold uppercase">EXPERIENCE</span>
                </div>
              </div> */}
              
              {/* <div className="absolute -right-20 bottom-1/3 bg-background rounded-full py-3 px-6 flex items-center gap-2 shadow-lg">
                <span className="text-3xl font-bold">330</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase">COMPLETED</span>
                  <span className="text-primary text-xs font-semibold uppercase">PROJECTS</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
