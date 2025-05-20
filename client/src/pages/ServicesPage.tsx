
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-light mb-12">Our Services</h1>
        <SearchBar onSearch={() => {}} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div>
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
          </div>
          
          <div>
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
          </div>
          
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
