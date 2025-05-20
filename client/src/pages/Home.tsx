import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import FeaturedProject from "@/components/FeaturedProject";
// import PortfolioGrid from "@/components/PortfolioGrid";
import Projects from "@/components/Projects";
import Approach from "@/components/Approach";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import useScrollAnimation from "@/hooks/useScrollAnimation";

// const Home = () => {
//   useScrollAnimation();
  
//   // Add scroll behavior for header
//   useEffect(() => {
//     const header = document.querySelector("header");
//     let lastScrollTop = 0;
    
//     const handleScroll = () => {
//       const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
//       if (scrollTop > lastScrollTop && scrollTop > 200) {
//         header?.classList.add("transform", "-translate-y-full");
//       } else {
//         header?.classList.remove("transform", "-translate-y-full");
//       }
      
//       lastScrollTop = scrollTop;
//     };
    
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <Hero />
//       {/* <FeaturedProject /> */}
//       {/* <PortfolioGrid /> */}
//       <Projects />
//       <Approach />
//       <Services />
//       <About />
//       <Contact />
//       <Footer />
//     </div>
//   );
// };

// export default Home;

export default function Home() {
  useScrollAnimation();

  // refs to each "page"
  const sectionRefs = useRef<HTMLElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const assignRef = (el: HTMLElement | null, idx: number) => {
    if (el) sectionRefs.current[idx] = el;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    let scrolling = false;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();              // stop native scroll *in this container*
      if (scrolling) return;
      scrolling = true;

      const dir = e.deltaY > 0 ? 1 : -1;
      setCurrent((prev) => {
        const next = Math.min(
          Math.max(prev + dir, 0),
          sectionRefs.current.length - 1
        );
        if (next !== prev) {
          sectionRefs.current[next].scrollIntoView({ behavior: "smooth" });
        }
        return next;
      });

      setTimeout(() => (scrolling = false), 600);
    };

    // bind to your container, not window
    const el = containerRef.current;
    el.addEventListener("wheel", onWheel as any, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel as any);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden"      // lock scroll here only
    >
      <section ref={(el) => assignRef(el, 0)} className="section">
        <Navbar />
        <Hero />
      </section>

      <section ref={(el) => assignRef(el, 1)} className="section">
        <Projects />
      </section>

      <section ref={(el) => assignRef(el, 2)} className="section">
        <Services />
      </section>

      <section ref={(el) => assignRef(el, 3)} className="section">
        <Approach />
      </section>

      <section ref={(el) => assignRef(el, 4)} className="section">
        <About />
      </section>

      <section ref={(el) => assignRef(el, 5)} className="section">
        <Contact />
        <Footer />
      </section>

      {/* <section ref={(el) => assignRef(el, 6)} className="h-screen">
      </section> */}
    </div>
  );
}