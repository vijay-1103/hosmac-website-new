import { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

const Approach = () => {
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
    <section id="approach" className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-16">
          <motion.div 
            className="md:w-1/3"
            variants={itemVariants}
            initial="hidden"
            animate={controls}
          >
            <h2 className="text-4xl font-light mb-6">Our Approach</h2>
            <p className="text-lg text-gray-700 mb-8">
              We deliver integrated healthcare design and engineering solutions that optimize facility performance, enhance patient experience, and support clinical excellence.
            </p>
            <a href="#" className="inline-block border-b border-black pb-1 hover:text-accent hover:border-accent transition-colors duration-300">
              Learn more
              <span className="ml-2">→</span>
            </a>
          </motion.div>
          
          <motion.div 
            className="md:w-2/3 grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-light mb-4">Patient-Centered</h3>
              <p className="text-gray-700">
                We place patient outcomes at the heart of our design process, creating healing environments that promote recovery, comfort, and well-being.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-light mb-4">Technically Advanced</h3>
              <p className="text-gray-700">
                We integrate cutting-edge medical technology, biomedical systems, and smart building solutions to create next-generation healthcare facilities.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-light mb-4">Interdisciplinary</h3>
              <p className="text-gray-700">
                Our comprehensive team combines expertise in architecture, interior design, MEPF systems, biomedical engineering, and project management.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-light mb-4">Outcome-Focused</h3>
              <p className="text-gray-700">
                We measure success through improved clinical workflows, operational efficiency, energy performance, and enhanced patient experiences.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
