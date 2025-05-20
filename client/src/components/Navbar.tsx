import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add scrolled class when scrolled more than 50px
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed w-full bg-white z-50 transition-all duration-300",
        scrolled ? "py-2 shadow-md" : "py-4",
        hidden ? "transform -translate-y-full" : "transform translate-y-0"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              HOSMAC | <span className="text-accent">Perfecting Healthcare</span><span className="text-xs align-top ml-0.5"></span>
            </Link>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {/* Work dropdown */}
              <li className="nav-item relative group">
                <a href="#work" className="font-medium hover:text-accent transition-colors duration-300">Work</a>
                <div className="nav-dropdown absolute left-0 mt-1 bg-white shadow-lg p-4 w-48">
                  <a href="#" className="block py-2 hover:text-accent transition-colors">Hospitals</a>
                  <a href="#" className="block py-2 hover:text-accent transition-colors">Clinics</a>
                  <a href="#" className="block py-2 hover:text-accent transition-colors">Research</a>
                  <a href="#" className="block py-2 hover:text-accent transition-colors">Rehabilitation</a>
                </div>
              </li>
              
              <li className="nav-item relative group">
                <a href="#approach" className="font-medium hover:text-accent transition-colors duration-300">Approach</a>
              </li>
              
              {/* Services dropdown */}
              <li className="nav-item relative group">
                <a href="#services" className="font-medium hover:text-accent transition-colors duration-300">Services</a>
                <div className="nav-dropdown absolute left-0 mt-1 bg-white shadow-lg p-4 w-60">
                  <a href="#" className="block py-2 hover:text-accent transition-colors">Turnkey Design</a>
                  <a href="#" className="block py-2 hover:text-accent transition-colors">MEPF Systems</a>
                  <a href="#" className="block py-2 hover:text-accent transition-colors">Biomedical Integration</a>
                  <a href="#" className="block py-2 hover:text-accent transition-colors">Project Management</a>
                </div>
              </li>
              
              <li className="nav-item relative group">
                <a href="#about" className="font-medium hover:text-accent transition-colors duration-300">About</a>
              </li>
              
              <li className="nav-item relative group">
                <a href="#contact" className="font-medium hover:text-accent transition-colors duration-300">Contact</a>
              </li>
            </ul>
          </nav>
          
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white w-full ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-4 space-y-3">
          <a href="#work" className="block font-medium">Work</a>
          <a href="#approach" className="block font-medium">Approach</a>
          <a href="#services" className="block font-medium">Services</a>
          <a href="#about" className="block font-medium">About</a>
          <a href="#contact" className="block font-medium">Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
