import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-screen bg-black text-white flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1631248055158-edec7a3c072b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
          alt="Modern healthcare facility" 
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
          We design healthcare spaces that enhance patient outcomes
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl font-light max-w-2xl animate-on-scroll"
        >
          Comprehensive healthcare design solutions from architectural planning to biomedical integration
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
