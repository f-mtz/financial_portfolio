
import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github  } from 'lucide-react';
import { FaKaggle } from 'react-icons/fa';  // Font Awesome Kaggle icon
import TypingAnimation from './TypingAnimation';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

const ContactSection = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isContactInfoVisible, setIsContactInfoVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          sectionObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const formObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true);
          formObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const contactInfoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContactInfoVisible(true);
          contactInfoObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const mapObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMapVisible(true);
          mapObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    if (formRef.current) {
      formObserver.observe(formRef.current);
    }
    
    if (contactInfoRef.current) {
      contactInfoObserver.observe(contactInfoRef.current);
    }
    
    if (mapRef.current) {
      mapObserver.observe(mapRef.current);
    }

    return () => {
      if (sectionRef.current) sectionObserver.unobserve(sectionRef.current);
      if (formRef.current) formObserver.unobserve(formRef.current);
      if (contactInfoRef.current) contactInfoObserver.unobserve(contactInfoRef.current);
      if (mapRef.current) mapObserver.unobserve(mapRef.current);
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formState);
    setFormState(initialFormState);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-background" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <TypingAnimation text="Entre em contato" speed={150} scrollTriggered={true} />
          </h2>
          <p className="section-subtitle">
            <TypingAnimation text="Sinta-se à vontade para entrar em contato." speed={100} scrollTriggered={true} />
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div ref={contactInfoRef} className={`transition-all duration-700 ${isContactInfoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-2xl font-bold mb-8">
              <TypingAnimation text="" speed={100} scrollTriggered={true} />
            </h3>
            
            <div className="space-y-8">
              <div className={`flex items-start transition-all duration-500`} style={{ transitionDelay: '200ms' }}>
                <div className="shrink-0 mr-4 p-3 bg-secondary rounded-lg text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <a href="mailto:martin@resumee.com" className="text-gray-300 hover:text-primary">
                    <li>felipe.rs.ds23@gmail.com</li>
                    <li>mtz.dev.si@gmail.com</li>
                  </a>
                </div>
              </div>

              <div className={`flex items-start transition-all duration-500`} style={{ transitionDelay: '400ms' }}>
                <div className="shrink-0 mr-4 p-3 bg-secondary rounded-lg text-primary">
                  <FaKaggle size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Kaggle</h4>
                  <a href="https://www.kaggle.com/fehhds" className="text-gray-300 hover:text-primary">
                    https://www.kaggle.com/fehhds
                  </a>
                </div>
              </div>
              
              <div className={`flex items-start transition-all duration-500`} style={{ transitionDelay: '400ms' }}>
                <div className="shrink-0 mr-4 p-3 bg-secondary rounded-lg text-primary">
                  <Github size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Github</h4>
                  <a href="https://github.com/f-mtz" className="text-gray-300 hover:text-primary">
                    https://github.com/f-mtz
                  </a>
                </div>
              </div>
              
              <div className={`flex items-start transition-all duration-500`} style={{ transitionDelay: '600ms' }}>
                <div className="shrink-0 mr-4 p-3 bg-secondary rounded-lg text-primary">
                  <Linkedin  size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">LinkedIn</h4>
                  <address className="text-gray-300 not-italic">
                    <a href="https://www.linkedin.com/in/felipe-ribeiro-data-science/" className="text-gray-300 hover:text-primary">https://www.linkedin.com/in/felipe-ribeiro-data-science/</a>
                  </address>
                </div>
              </div>
            </div>



            
            
            <div className={`mt-12 transition-all duration-700`} style={{ transitionDelay: '800ms' }}>
              <h3 className="text-2xl font-bold mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                <a href="#" className="social-icon">
                  <span className="sr-only">Facebook</span>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <span className="sr-only">Twitter</span>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <span className="sr-only">Instagram</span>
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <span className="sr-only">LinkedIn</span>
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-icon">
                  <span className="sr-only">Dribbble</span>
                  <i className="fab fa-dribbble"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div ref={formRef} className={`bg-secondary p-8 rounded-lg border border-gray-800 transition-all duration-700 ${isFormVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-2xl font-bold mb-6">
              <TypingAnimation text="Send Me a Message" speed={100} scrollTriggered={true} />
            </h3>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-primary/20 border border-primary rounded-lg">
                <p className="text-primary font-medium">Your message has been sent successfully!</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="transition-all duration-500" style={{ transitionDelay: '200ms' }}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full bg-background border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="transition-all duration-500" style={{ transitionDelay: '300ms' }}>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-background border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="transition-all duration-500" style={{ transitionDelay: '400ms' }}>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full bg-background border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="transition-all duration-500" style={{ transitionDelay: '500ms' }}>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full bg-background border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6 transition-all duration-500" style={{ transitionDelay: '600ms' }}>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-background border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className={`btn btn-primary w-full transition-all duration-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
                style={{ transitionDelay: '700ms' }}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>
        </div>
        
        <div ref={mapRef} className={`mt-16 transition-all duration-1000 ${isMapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="rounded-lg overflow-hidden h-96">
            {/* This is a placeholder for a map. In a real implementation, you would integrate Google Maps or another map provider here */}
            <div className="w-full h-full bg-secondary border border-gray-800 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-primary mx-auto mb-4" />
                <p className="text-gray-300">123 Design Street, Creative City, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
