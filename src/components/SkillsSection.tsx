
import { useEffect, useRef, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import TypingAnimation from './TypingAnimation';

interface Skill {
  name: string;
  percentage: number;
  category: 'design' | 'development';
}

const skills: Skill[] = [
  { name: 'Análises: Exploratória, Descritiva, Diagnóstica, Preditiva e Prescritiva', percentage: 95, category: 'design' },
  { name: 'Análise de Cohort', percentage: 90, category: 'design' },
  { name: 'Análise RMF', percentage: 85, category: 'design' },
  { name: 'Market Basket Analysis (com Regras de Associação e Algoritmo Apriori e ECLAT)', percentage: 80, category: 'design' },
  { name: 'Análise Estatística e Teste A/B para tomada de decisão', percentage: 80, category: 'design' },
  { name: 'Linguagens: Python, R, SQL e NoSQL', percentage: 80, category: 'design' },
  { name: 'Dashboards: PowerBI, Shiny, Streamlit, Metabase...', percentage: 80, category: 'design' },
  { name: 'Modelos de Machine Learning', percentage: 90, category: 'development' },
  { name: 'Interpretabilidade de Modelos com SHAP', percentage: 85, category: 'development' },
  { name: 'Conversão de métricas de performance dos modelos em performance de negócio', percentage: 80, category: 'development' },
  { name: 'Técnicas de balanceamento dos dados, seleção de atributos e redução de dimensionalidade', percentage: 75, category: 'development' },
  { name: 'Modelos Preditivos com Séries Temporais', percentage: 75, category: 'development' },
  { name: 'Documentação com R Markdown, Quarto Markdown, Confluence, Swagger...', percentage: 75, category: 'development' },
  { name: 'MLOps: MLFlow, Docker, Jenkins, Azure, Argo CD, Google CLoud Platform', percentage: 75, category: 'development' }
];

const SkillsSection = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progressValues, setProgressValues] = useState<{ [key: string]: number }>(
    skills.reduce((acc, skill) => ({ ...acc, [skill.name]: 0 }), {})
  );
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      const timers: NodeJS.Timeout[] = [];
      
      skills.forEach((skill) => {
        let current = 0;
        const step = skill.percentage / 50;
        
        const timer = setInterval(() => {
          if (current < skill.percentage) {
            current = Math.min(current + step, skill.percentage);
            setProgressValues(prev => ({
              ...prev,
              [skill.name]: current
            }));
          } else {
            clearInterval(timer);
          }
        }, 20);
        
        timers.push(timer);
      });
      
      return () => timers.forEach(clearInterval);
    }
  }, [isVisible]);

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <TypingAnimation text="Minhas Principais Hard Skills" speed={150} />
          </h2>
          <p className="section-subtitle">Habilidades de Análise e Ciência de Dados</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16" ref={skillsRef}>
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-px bg-primary mr-4"></span>
              Análise de Dados
            </h3>
            
            <div className="space-y-8">
              {skills.filter(skill => skill.category === 'design').map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary">{Math.round(progressValues[skill.name])}%</span>
                  </div>
                  <Progress value={progressValues[skill.name]} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-px bg-primary mr-4"></span>
              Ciência de Dados
            </h3>
            
            <div className="space-y-8">
              {skills.filter(skill => skill.category === 'development').map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary">{Math.round(progressValues[skill.name])}%</span>
                  </div>
                  <Progress value={progressValues[skill.name]} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
