import { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  
  if (isInView) {
    controls.start("visible");
  }
  
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
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-16">
          <motion.div 
            className="md:w-1/3"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.h2 
              className="text-4xl font-light mb-6"
              variants={itemVariants}
            >
              About HOSMAC
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-700 mb-8"
              variants={itemVariants}
            >
              For over 25 years, HOSMAC has been a leading healthcare design consultancy, creating innovative medical facilities that enhance patient care and clinical excellence.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 mb-8"
              variants={itemVariants}
            >
              Our multidisciplinary team of architects, engineers, and healthcare specialists brings expertise in turnkey design, MEPF systems, biomedical equipment planning, and project management to create comprehensive healthcare environments.
            </motion.p>
            
            <motion.a 
              href="#" 
              className="inline-block border-b border-black pb-1 hover:text-accent hover:border-accent transition-colors duration-300"
              variants={itemVariants}
            >
              Our expertise
              <span className="ml-2">→</span>
            </motion.a>
          </motion.div>
          
          <motion.div 
            className="md:w-2/3"
            variants={itemVariants}
            initial="hidden"
            animate={controls}
          >
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="HealthSpace team" 
              className="w-full h-[450px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
