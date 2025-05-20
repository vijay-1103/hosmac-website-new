import { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

const Services = () => {
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
    <section id="services" className="py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2 
          className="text-4xl font-light mb-6"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          Our Services
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-700 mb-16 max-w-3xl"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          From concept development to project completion, we provide turnkey solutions for healthcare facilities of all types and scales.
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants}>
            <img 
              src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Turnkey Design" 
              className="w-full h-64 object-cover mb-6"
            />
            <h3 className="text-2xl font-light mb-4">Turnkey Design</h3>
            <p className="text-gray-700 mb-6">
              Comprehensive architectural design solutions tailored specifically for healthcare environments, from conceptual development to detailed specifications.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Architectural Planning</li>
              <li>• Structural Engineering</li>
              <li>• Interior Design</li>
              <li>• Landscape Integration</li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <img 
              src="https://images.unsplash.com/photo-1581092921461-6dd24b6a758a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="MEPF Systems" 
              className="w-full h-64 object-cover mb-6"
            />
            <h3 className="text-2xl font-light mb-4">MEPF Systems</h3>
            <p className="text-gray-700 mb-6">
              Advanced engineering solutions that create optimal healing environments with superior efficiency, safety, and sustainability.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Mechanical & HVAC Systems</li>
              <li>• Electrical Engineering</li>
              <li>• Plumbing & Sanitary</li>
              <li>• Firefighting & Safety</li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <img 
              src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Biomedical & PMC" 
              className="w-full h-64 object-cover mb-6"
            />
            <h3 className="text-2xl font-light mb-4">Biomedical & PMC</h3>
            <p className="text-gray-700 mb-6">
              Specialized healthcare technology integration and comprehensive project management services for complex medical facilities.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Medical Equipment Planning</li>
              <li>• Biomedical Integration</li>
              <li>• Project Management</li>
              <li>• Commissioning & Validation</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
