
import { useState, useEffect, useRef } from 'react';
import TypingAnimation from './TypingAnimation';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jane Cooper",
    position: "CEO",
    company: "GlobalTech",
    text: "Working with Martin was an absolute pleasure. He understood our brand vision perfectly and delivered a website design that exceeded our expectations. His attention to detail and creative approach truly sets him apart.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 2,
    name: "Robert Johnson",
    position: "Marketing Director",
    company: "InnovateCorp",
    text: "Martin's design skills are exceptional. He created a unique brand identity for our startup that perfectly captures our company values. The entire process was smooth, and he was very responsive to feedback.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 3,
    name: "Emily Wilson",
    position: "Product Manager",
    company: "TechSolutions",
    text: "We hired Martin to redesign our e-commerce platform, and the results were outstanding. Not only did he create a beautiful interface, but he also improved the user experience, which led to a 40% increase in conversions!",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150"
  }
];

const clientLogos = [
  "https://via.placeholder.com/160x80/333333/FFFFFF?text=Client+1",
  "https://via.placeholder.com/160x80/333333/FFFFFF?text=Client+2",
  "https://via.placeholder.com/160x80/333333/FFFFFF?text=Client+3",
  "https://via.placeholder.com/160x80/333333/FFFFFF?text=Client+4",
  "https://via.placeholder.com/160x80/333333/FFFFFF?text=Client+5",
  "https://via.placeholder.com/160x80/333333/FFFFFF?text=Client+6",
];

const ClientsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="clients" className="py-24 bg-secondary" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <TypingAnimation text="My Clients" speed={150} scrollTriggered={true} />
          </h2>
          <p className="section-subtitle">
            <TypingAnimation text="WHAT OUR CLIENTS SAY" speed={100} scrollTriggered={true} />
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-20">
          <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="p-8 bg-background rounded-lg border border-gray-800">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="shrink-0">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                  />
                </div>
                <div>
                  <div className="text-4xl text-primary mb-4">"</div>
                  <blockquote className="text-lg text-gray-300 mb-6">
                    {testimonials[activeTestimonial].text}
                  </blockquote>
                  <div>
                    <h4 className="font-bold text-lg">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-primary">
                      {testimonials[activeTestimonial].position}, {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <button 
                className="w-12 h-12 rounded-full bg-background border border-gray-800 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors duration-300"
                onClick={prevTestimonial}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                className="w-12 h-12 rounded-full bg-background border border-gray-800 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors duration-300"
                onClick={nextTestimonial}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className={`mt-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-center mb-12">Trusted By</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {clientLogos.map((logo, index) => (
              <div key={index} className={`flex items-center justify-center transition-all duration-500`} style={{ transitionDelay: `${index * 100}ms` }}>
                <img 
                  src={logo} 
                  alt={`Client ${index + 1}`}
                  className="max-h-12 opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
