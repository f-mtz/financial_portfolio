
import { useEffect, useRef, useState } from 'react';
import TypingAnimation from './TypingAnimation';

const AboutSection = () => {
  const countersRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isCountersVisible, setIsCountersVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          sectionObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      sectionObserver.unobserve(sectionRef.current);
      sectionObserver.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!countersRef.current) return;
      
      const countersElement = countersRef.current;
      const countersPosition = countersElement.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (countersPosition < windowHeight * 0.75) {
        setIsCountersVisible(true);
        
        const counters = countersElement.querySelectorAll('.counter');
        
        counters.forEach((counter) => {
          const el = counter as HTMLElement;
          const targetValue = parseInt(el.dataset.target || '0', 10);
          let currentValue = 0;
          const increment = targetValue / 50; // Divide to control animation speed
          
          const updateCounter = () => {
            if (currentValue < targetValue) {
              currentValue += increment;
              el.innerText = Math.ceil(currentValue).toString();
              setTimeout(updateCounter, 30);
            } else {
              el.innerText = targetValue.toString();
            }
          };
          
          updateCounter();
        });
        
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Timeline observer
  useEffect(() => {
    const timelineObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTimelineVisible(true);
          timelineObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const timeline = document.querySelector('.timeline-container');
    if (timeline) {
      timelineObserver.observe(timeline);
    }

    return () => {
      if (timeline) {
        timelineObserver.unobserve(timeline);
      }
    };
  }, []);

  // Services observer
  useEffect(() => {
    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true);
          servicesObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const services = document.querySelector('.services-container');
    if (services) {
      servicesObserver.observe(services);
    }

    return () => {
      if (services) {
        servicesObserver.unobserve(services);
      }
    };
  }, []);

  return (
    <section id="about" className="py-24 bg-secondary" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <TypingAnimation text="Sobre Mim" speed={150} scrollTriggered={true} />
          </h2>
          <p className="section-subtitle">
            <TypingAnimation text="Algumas informações sobre mim" speed={100} scrollTriggered={true} />
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-3xl font-bold mb-6">
              <TypingAnimation text="Cientista de Dados em formação" speed={100} scrollTriggered={true} />
            </h3>
            <p className="text-gray-300 mb-8">
              <TypingAnimation 
                text="com sólida base em análise estatística, machine learning e visualização de dados, buscando minha primeira oportunidade no setor financeiro/bancário.

Ao longo da minha jornada, desenvolvi projetos práticos que emulam desafios reais do mercado." 
                speed={30} 
                scrollTriggered={true} 
              />
            </p>
            
            <div className="grid grid-cols-2 gap-8" ref={countersRef}>
              <div className={`text-center transition-all duration-500 ${isCountersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
                <div className="text-5xl font-bold text-primary mb-2">
                  <span className="counter" data-target="125">0</span>
                </div>
                <p className="text-sm uppercase tracking-wider">Projetos Completos</p>
              </div>
              <div className={`text-center transition-all duration-500 ${isCountersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
                <div className="text-5xl font-bold text-primary mb-2">
                  <span className="counter" data-target="84">0</span>
                </div>
                <p className="text-sm uppercase tracking-wider">Deploys em Produção</p>
              </div>
              <div className={`text-center transition-all duration-500 ${isCountersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
                <div className="text-5xl font-bold text-primary mb-2">
                  <span className="counter" data-target="12">0</span>
                </div>
                <p className="text-sm uppercase tracking-wider">Publicações</p>
              </div>
              <div className={`text-center transition-all duration-500 ${isCountersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
                <div className="text-5xl font-bold text-primary mb-2">
                  <span className="counter" data-target="7500">0</span>+
                </div>
                <p className="text-sm uppercase tracking-wider">Métrica ...</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 border border-gray-800 rounded-lg bg-background/50 timeline-container">
            <h3 className="text-2xl font-bold mb-6 text-primary">
              <TypingAnimation text="Breve histórico de Experiências" speed={100} scrollTriggered={true} />
            </h3>
            
            <div className="space-y-8">
              <div className={`timeline-item transition-all duration-500 ${isTimelineVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '100ms' }}>
                <div className="timeline-dot"></div>
                <div className="mb-2">
                  <h4 className="text-xl font-bold">Cientista de Dados</h4>
                  <p className="text-sm text-primary">2018 - Atual</p>
                </div>
                <p className="text-gray-400">
                  Lorem ipsum.
                </p>
              </div>
              
              <div className={`timeline-item transition-all duration-500 ${isTimelineVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '300ms' }}>
                <div className="timeline-dot"></div>
                <div className="mb-2">
                  <h4 className="text-xl font-bold">Cargo ...</h4>
                  <p className="text-sm text-primary">2015 - 2018</p>
                </div>
                <p className="text-gray-400">
                  Completed major projects including 'Domik' and helped establish the company design language.
                </p>
              </div>
              
              <div className={`timeline-item transition-all duration-500 ${isTimelineVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '500ms' }}>
                <div className="timeline-dot"></div>
                <div className="mb-2">
                  <h4 className="text-xl font-bold">Cargo ...</h4>
                  <p className="text-sm text-primary">2012 - 2015</p>
                </div>
                <p className="text-gray-400">
                  Learned fundamentals of design while supporting senior designers on various client projects.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 services-container">
          <div className="text-center mb-12">
            <h3 className="section-title">
              <TypingAnimation text="Soft Skills" speed={150} scrollTriggered={true} />
            </h3>
            <p className="section-subtitle">
              <TypingAnimation text="Como Posso Gerar Impacto no Seu Negócio" speed={100} scrollTriggered={true} />
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`p-6 border border-gray-800 rounded-lg bg-background/50 hover:border-primary transition-all duration-500 ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-brain"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Mentalidade Analítica & Resolução de Problemas</h4>
              <p className="text-gray-400">
                <li>Identificação de gaps e oportunidades através de dados.</li>
                <li>Framework OKR para alinhar métricas aos objetivos do negócio.</li>
              </p>
            </div>
            
            <div className={`p-6 border border-gray-800 rounded-lg bg-background/50 hover:border-primary transition-all duration-500 ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
              <div className="text-primary text-4xl mb-4">
                {/* <i className="fas fa-people-group"></i> */}
                {/* <i className="fas fa-users"></i> */}
                <i className="fas fa-rocket"></i>

              </div>
              <h4 className="text-xl font-bold mb-3">Colaboração & Proatividade</h4>
              <p className="text-gray-400">
                <li>Trabalho em equipe com áreas como Risk, Marketing e Produto.</li>
                <li>Senso crítico para priorizar as dores do cliente e da empresa.</li>
              </p>
            </div>
            
            <div className={`p-6 border border-gray-800 rounded-lg bg-background/50 hover:border-primary transition-all duration-500 ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '500ms' }}>
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-bullhorn"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Comunicação Eficiente</h4>
              <p className="text-gray-400">
                <li>Storytelling com dados: traduzo insights técnicos em decisões claras.</li>
                <li>Objetividade ao apresentar ideias para times multidisciplinares.</li>
              </p>
            </div>
            
            <div className={`p-6 border border-gray-800 rounded-lg bg-background/50 hover:border-primary transition-all duration-500 ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '700ms' }}>
              <div className="text-primary text-4xl mb-4">
                <i className="fa-duotone fa-solid fa-money-bill-trend-up"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Orientado a Resultados</h4>
              <p className="text-gray-400">
                <li>Busco sempre pensar no imacto de negócio ao planejar um projeto de dados orientado a negócio.</li>
                <li>Foco em KPIs e métricas financeiras (ROI, churn, risco).</li>
                <li>Senso de urgência para entregar soluções ágeis e escaláveis.</li>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
