import React, { useEffect, useState, useRef } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  scrollTriggered?: boolean;
}

const TypingAnimation = ({ 
  text, 
  speed = 500, 
  className = "", 
  scrollTriggered = false 
}: TypingAnimationProps) => {
  const [animationState, setAnimationState] = useState<'entering' | 'visible'>('entering');
  const [isInView, setIsInView] = useState(!scrollTriggered);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Scroll detection effect
  useEffect(() => {
    if (!scrollTriggered) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [scrollTriggered]);

  // Animation trigger
  useEffect(() => {
    if (isInView) {
      setAnimationState('entering');
      const timer = setTimeout(() => {
        setAnimationState('visible');
      }, speed);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, text, speed]);

  return (
    <span 
      ref={elementRef} 
      className={`${className} inline-block overflow-hidden`}
    >
      <span
        className={`inline-block transition-transform duration-${speed} ease-out ${
          animationState === 'entering' ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{ transitionDuration: `${speed}ms` }}
      >
        {text}
      </span>
    </span>


  );
};

export default TypingAnimation;

// import React, { useEffect, useState, useRef } from 'react';

// interface TypingAnimationProps {
//   text: string;
//   speed?: number;
//   className?: string;
//   scrollTriggered?: boolean;
// }

// const TypingAnimation = ({ text, speed = 100, className = "", scrollTriggered = false }: TypingAnimationProps) => {
//   const [displayText, setDisplayText] = useState('');
//   const [index, setIndex] = useState(0);
//   const [showCursor, setShowCursor] = useState(true);
//   const [isInView, setIsInView] = useState(!scrollTriggered);
//   const elementRef = useRef<HTMLSpanElement>(null);

//   // Scroll detection effect
//   useEffect(() => {
//     if (!scrollTriggered) return;
    
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsInView(true);
//           // Once triggered, no need to observe anymore
//           if (elementRef.current) {
//             observer.unobserve(elementRef.current);
//           }
//         }
//       },
//       { threshold: 0.2 } // Trigger when 20% of the element is visible
//     );

//     if (elementRef.current) {
//       observer.observe(elementRef.current);
//     }

//     return () => {
//       if (elementRef.current) {
//         observer.unobserve(elementRef.current);
//       }
//     };
//   }, [scrollTriggered]);

//   // Typing effect
//   useEffect(() => {
//     if (!isInView) return;
    
//     if (index < text.length) {
//       const timeout = setTimeout(() => {
//         setDisplayText(prev => prev + text[index]);
//         setIndex(index + 1);
//       }, speed);
      
//       return () => clearTimeout(timeout);
//     }
//   }, [index, text, speed, isInView]);

//   // Blinking cursor effect
//   useEffect(() => {
//     const cursorInterval = setInterval(() => {
//       setShowCursor(prev => !prev);
//     }, 500);
    
//     return () => clearInterval(cursorInterval);
//   }, []);

//   return (
//     <span ref={elementRef} className={className}>
//       {displayText}
//       <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
//     </span>
//   );
// };

// export default TypingAnimation;
