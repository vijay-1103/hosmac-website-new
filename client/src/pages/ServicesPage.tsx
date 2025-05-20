
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const services = [
  {
    id: "turnkey",
    name: "Turnkey Design",
    description: "Comprehensive architectural design solutions tailored specifically for healthcare environments, from conceptual development to detailed specifications.",
    features: [
      "Architectural Planning",
      "Structural Engineering", 
      "Interior Design",
      "Landscape Integration"
    ],
    imagePath: "" // Will be updated with actual path
  },
  {
    id: "mepf",
    name: "MEPF Systems",
    description: "Advanced engineering solutions that create optimal healing environments with superior efficiency, safety, and sustainability.",
    features: [
      "Mechanical & HVAC Systems",
      "Electrical Engineering",
      "Plumbing & Sanitary",
      "Firefighting & Safety"
    ],
    imagePath: "" // Will be updated with actual path
  },
  {
    id: "biomedical",
    name: "Biomedical & PMC",
    description: "Specialized healthcare technology integration and comprehensive project management services for complex medical facilities.",
    features: [
      "Medical Equipment Planning",
      "Biomedical Integration",
      "Project Management",
      "Commissioning & Validation"
    ],
    imagePath: "" // Will be updated with actual path
  }
];

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState("turnkey");

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F5F5F5] py-3 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex text-sm text-gray-500">
            <a href="/" className="hover:text-primary">Home</a>
            <span className="mx-5">/</span>
            <span className="text-primary">Services</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        {/* About Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-light mb-6">About HOSMAC</h2>
          <p className="text-lg text-gray-700 mb-8">
            For over 25 years, HOSMAC has been a leading healthcare design consultancy, creating innovative medical facilities that enhance patient care and clinical excellence.
          </p>
          <p className="text-gray-700 mb-8">
            Our multidisciplinary team of architects, engineers, and healthcare specialists brings expertise in turnkey design, MEPF systems, biomedical equipment planning, and project management to create comprehensive healthcare environments.
          </p>
        </div>

        {/* Services Tabs */}
        <h1 className="text-4xl font-light mb-12">Our Services</h1>
        
        <Tabs defaultValue="turnkey" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start border-b mb-8 bg-transparent">
            {services.map((service) => (
              <TabsTrigger 
                key={service.id}
                value={service.id}
                className="text-lg px-8 py-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent"
              >
                {service.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                <div>
                  <h3 className="text-3xl font-light mb-6">{service.name}</h3>
                  <p className="text-gray-700 mb-8">{service.description}</p>
                  <ul className="space-y-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="mr-3">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-[400px] overflow-hidden">
                  {service.imagePath ? (
                    <img 
                      src={service.imagePath}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-400">Image will be added</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ServicesPage;
