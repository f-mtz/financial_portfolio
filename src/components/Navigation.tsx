
import { useState, useEffect } from "react";
import { Menu, X, ArrowUp, Sun, Moon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "Sobre", href: "#about" },
  // { label: "Resume", href: "#resume" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Publicações", href: "#blog" },
  // { label: "Clients", href: "#clients" },
  { label: "Contatos", href: "#contact" }
];

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
      setShowScrollToTop(scrollPosition > 500);
      
      // Determine which section is currently in view
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute("id") || "";
        }
      });
      
      if (currentSection !== activeSection && currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-background z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 flex justify-end">
          <button onClick={() => setMobileMenuOpen(false)} className="text-foreground">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`nav-link mb-4 ${activeSection === href.substring(1) ? "active text-primary" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </nav>
      </div>

      {/* Main Navigation */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "py-4 bg-background/95 backdrop-blur-sm shadow-md" : "py-6 bg-transparent"}`}>
        <div className="container flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <a href="#hero" className="text-2xl font-bold text-foreground">
              Portifólio<span className="text-primary">.</span>
            </a>
          </div>
          <div className="flex items-center">
            <nav className="hidden lg:flex items-center space-x-2 mr-4">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className={`nav-link ${activeSection === href.substring(1) ? "active text-primary" : ""}`}
                >
                  {label}
                </a>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Social Icons Sidebar */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 hidden md:flex flex-col space-y-4">
        <a href="#" className="social-icon">
          <span className="sr-only">Facebook</span>
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="social-icon">
          <span className="sr-only">Twitter</span>
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="social-icon">
          <span className="sr-only">LinkedIn</span>
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="#" className="social-icon">
          <span className="sr-only">Dolar</span>
          <i className="fas fa-dollar-sign"></i>
        </a>
        <a href="#" className="social-icon">
          <span className="sr-only">Bitcoin</span>
          <i className="fab fa-bitcoin"></i>
        </a>
      </div>

      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top ${showScrollToTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};

export default Navigation;
