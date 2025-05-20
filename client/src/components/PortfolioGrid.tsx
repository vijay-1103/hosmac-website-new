import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

interface PortfolioItem {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
  category: string;
}

const PortfolioGrid = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const { data: projects = [] } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/projects"],
  });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === activeFilter);
  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="work" className="py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          <h2 className="text-4xl font-light mb-4">Our Projects</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl">
            We deliver comprehensive healthcare facility solutions that enhance patient care through innovative design, engineering excellence, and integrated systems.
          </p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="mb-12"
        >
          <ul className="flex flex-wrap gap-8">
            <li>
              <button 
                className={`font-medium ${activeFilter === "all" ? "border-b border-black" : "text-gray-500"} pb-1 hover:text-accent hover:border-accent transition-colors duration-300`}
                onClick={() => setActiveFilter("all")}
              >
                All
              </button>
            </li>
            <li>
              <button 
                className={`font-medium ${activeFilter === "hospitals" ? "border-b border-black" : "text-gray-500"} pb-1 hover:text-accent hover:border-accent transition-colors duration-300`}
                onClick={() => setActiveFilter("hospitals")}
              >
                Hospitals
              </button>
            </li>
            <li>
              <button 
                className={`font-medium ${activeFilter === "clinics" ? "border-b border-black" : "text-gray-500"} pb-1 hover:text-accent hover:border-accent transition-colors duration-300`}
                onClick={() => setActiveFilter("clinics")}
              >
                Clinics
              </button>
            </li>
            <li>
              <button 
                className={`font-medium ${activeFilter === "research" ? "border-b border-black" : "text-gray-500"} pb-1 hover:text-accent hover:border-accent transition-colors duration-300`}
                onClick={() => setActiveFilter("research")}
              >
                Research
              </button>
            </li>
            <li>
              <button 
                className={`font-medium ${activeFilter === "rehabilitation" ? "border-b border-black" : "text-gray-500"} pb-1 hover:text-accent hover:border-accent transition-colors duration-300`}
                onClick={() => setActiveFilter("rehabilitation")}
              >
                Rehabilitation
              </button>
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              className="portfolio-item overflow-hidden group"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="portfolio-overlay absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-light">{project.title}</h3>
                    <p className="text-white opacity-90 mt-1">{project.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          transition={{ delay: 0.4 }}
        >
          <a href="#" className="inline-block border-b border-black pb-1 hover:text-accent hover:border-accent transition-colors duration-300">
            View all projects
            <span className="ml-2">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
