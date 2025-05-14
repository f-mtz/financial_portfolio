
import { useRef, useState, useEffect } from 'react';
import TypingAnimation from './TypingAnimation';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 UI/UX Design Trends to Watch in 2023",
    excerpt: "Discover the latest UI/UX design trends that are shaping the digital landscape this year.",
    date: "June 12, 2023",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=800&h=600",
    category: "Design"
  },
  {
    id: 2,
    title: "The Importance of Brand Consistency",
    excerpt: "Learn why maintaining consistency across your brand touchpoints is crucial for business success.",
    date: "May 28, 2023",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&w=800&h=600",
    category: "Branding"
  },
  {
    id: 3,
    title: "Designing for Accessibility: A Comprehensive Guide",
    excerpt: "How to create digital experiences that are accessible to everyone, regardless of abilities.",
    date: "April 15, 2023",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&w=800&h=600",
    category: "Accessibility"
  }
];

const BlogSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="blog" className="py-24 bg-background" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <TypingAnimation text="Minhas Publicações" speed={150} scrollTriggered={true} />
          </h2>
          <p className="section-subtitle">
            <TypingAnimation text="Principais Artigos e Contribuições" speed={100} scrollTriggered={true} />
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={post.id} 
              className={`bg-secondary rounded-lg overflow-hidden card-hover transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 right-4 bg-primary text-white text-xs py-1 px-3 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors duration-300">
                  <a href="#">{post.title}</a>
                </h3>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <a href="#" className="inline-flex items-center font-medium text-primary hover:underline">
                  Read More
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a href="#" className="btn btn-outline">
            Veja todos os POSTS
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
