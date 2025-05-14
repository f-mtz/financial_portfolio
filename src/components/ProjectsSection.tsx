
import { useState } from 'react';
import TypingAnimation from './TypingAnimation';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  { id: 1, title: "Brand Identity Design", category: "Data Analytics", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=800&h=600" },
  { id: 2, title: "E-commerce Website", category: "Data Science", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=800&h=600" },
  { id: 3, title: "Mobile App UI", category: "MLOps", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&w=800&h=600" },
  { id: 4, title: "Corporate Brochure", category: "Negócio", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&w=800&h=600" },
  { id: 5, title: "Portfolio Website", category: "Dashboards", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&w=800&h=600" },
  { id: 6, title: "Product Packaging", category: "Data Science", image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&w=800&h=600" },
];

const categories = ["Todos", ...new Set(projects.map(project => project.category))];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [visibleProjects, setVisibleProjects] = useState(6);
  
  const filteredProjects = activeCategory === "Todos"
    ? projects
    : projects.filter(project => project.category === activeCategory);
    
  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  
  const loadMore = () => {
    setVisibleProjects(prev => prev + 3);
  };

  return (
    <section id="projects" className="py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <TypingAnimation text="Meus Projetos" speed={150} />
          </h2>
          <p className="section-subtitle">Projetos de Destaque</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full text-sm transition-colors duration-300 ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-background text-gray-300 hover:bg-primary/20"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map(project => (
            <div key={project.id} className="group card-hover">
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-primary">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {visibleProjects < filteredProjects.length && (
          <div className="text-center mt-12">
            <button 
              className="btn btn-outline"
              onClick={loadMore}
            >
              LOAD MORE
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
