import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";

const Projects = () => {
    const controls = useAnimation();

    const titleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
        }
    };
  return (
    <section className="relative h-screen bg-black text-white flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://www.hosmac.com/wp-content/uploads/2020/01/1Prime-Hospital-scaled.jpg" 
          alt="HOSMAC Projects" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-light leading-tight mb-6 max-w-3xl animate-on-scroll"
        >
          Our Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl font-light max-w-2xl animate-on-scroll"
        >
          We deliver comprehensive healthcare facility solutions that enhance patient care through innovative design, engineering excellence, and integrated systems.
        </motion.p>

        {/* <motion.div 
          className="mt-16 text-left"
          animate={controls}
          variants={titleVariants}
          transition={{ delay: 0.4 }}
        >
          <a href="/projects" className="inline-block border-b border-black pb-1 hover:text-accent hover:border-accent transition-colors duration-300">
            View all projects
            <span className="ml-2">→</span>
          </a>
        </motion.div> */}
        <motion.div 
            className="mt-16 text-left"
            animate={controls}
            variants={titleVariants}
            transition={{ delay: 0.4 }}
            >
            <a
                href="/projects"
                className="inline-block bg-[hsl(var(--primary))] border-white text-white px-4 py-2 rounded-md transition-none"
            >
                View all projects
                <span className="ml-2">→</span>
            </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
