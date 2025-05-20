import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

const FeaturedProject = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div 
            className="md:w-1/3"
            initial="hidden"
            animate={controls}
            variants={variants}
          >
            <h2 className="text-4xl font-light mb-6">Featured Work</h2>
            <p className="text-lg text-gray-700 mb-8">
              Comprehensive healthcare design solutions encompassing architectural planning, MEPF systems, biomedical integration, and project management.
            </p>
            <a 
              href="#work" 
              className="inline-block border-b border-black pb-1 hover:text-accent hover:border-accent transition-colors duration-300"
            >
              View all projects
              <span className="ml-2">→</span>
            </a>
          </motion.div>
          
          <motion.div 
            className="md:w-2/3"
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ delay: 0.2 }}
          >
            <div className="relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1516549655669-df668a1d9930?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Modern hospital interior" 
                className="w-full h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <div>
                  <h3 className="text-white text-2xl font-light">Metropolitan Medical Center</h3>
                  <p className="text-white opacity-90 mt-2">Comprehensive design and engineering solutions for a state-of-the-art hospital</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
