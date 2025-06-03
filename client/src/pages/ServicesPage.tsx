
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const services = [
  {
    id: "architecture",
    name: "Architecture",
    description: `This begins with space programming in an effort to capture the scope and the scale of the facility and finalized services mix. We try to understand the The exercise cultural ethos and the professional practices, through interaction with the stakeholders. The purpose of this exercise, apart from defining the functional content based on the brief referred to, is to facilitate deliberation towards arriving at concurrence on the operational principles governing the delivery of clinical, diagnostic and support services.

A departmental schedule giving sizes of all rooms and activity spaces is drawn, including summary area statement. The schedule of accommodation also provides total net departmental areas, an estimated circulation area requirement commensurate with departmental activity and total gross target construction area. This would help arrive at the total built up area of habitable floors and provide a basis for generating the cost estimate.

Following space programming, a complete design of the building/civil component of the Project, inclusive of further

development/detailing of the Master Plan for the whole complex, accounting for diverse physical and logistical parameters, the designing for the main hospital building(s), internal space and facility planning, ancillary support services building bloc(s) design, intra-site road network designing, etc, is done. The architectural design is developed in conformity with client’s requirements, end-user sensibilities, and efficient functionality of the hospital premises. At all times, our emphasis is on patient friendliness, efficient space usage, cost-effectiveness, and aesthetic propriety of the built form.

Then comes the structural design which includes the complete design of the structural framework for the entire built component in the complex. It includes determining the appropriate framing system, generating schemes for structural design conforming to the specific needs of the intended space, and harmonized with the requirements of the services and other components of the project, and making detailed construction drawings for the work to proceed on site.`,
    features: null,
    imagePath: "https://www.hosmac.com/wp-content/uploads/2017/01/001-min-4.jpg" // Will be updated with actual path
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
    name: "Biomedical",
    description: `Buying medical equipment best suited for your facility is tricky. What should you buy- low-end or high-end? How to stay future-ready in the rapidly-evolving tech-space? We help you procure medical equipment for your hospital as per its needs.
A generic medical equipment schedule is prepared, at the commencement of this service. A procurement schedule is then drawn up to enable client / owners understand the timelines by which the orders need finally be placed. We arrange pre-qualification presentations by vendors for the purpose of short-listing. We also prepare a report on complete new and updated equipment and assist on latest equipment and practices, as well as mention their future aspects and usability and other specifications.
We provide and generate department wise equipment list and specifications to solicit offers from the shortlisted vendors, The offers are received to generate techno-commercial comparatives. Demonstrations for medical users are also arranged for at this stage, if desired by you. We facilitates technical and preliminary financial negotiations.
We oversee the installation of select critical equipment in radiology & imaging, laboratories, intensive care units, surgical suite and the CSSD to culminate in certification that equipment is commissioned satisfactorily.`,
    features: null,
    imagePath: "" // Will be updated with actual path
  },
  {
    id: "pmc",
    name: "PMC",
    description: `We understand and appreciate the fact that building a healthcare facility involves altogether a different paradigm and skill set, and together with our pool of specialists we make the process quite simpler for the stakeholders, owners, architects and contractors. Our understanding of the finer nuances of a healthcare space aids us in identifying the potential bottlenecks and lags and nullifying them in time.

  It is during this stage that we take the ‘idea of a project’ from client and give it a more concrete shape by creating a strategic plan for the project viz. establishing timelines, budget, resources required and constraints. The next crucial step is the finalization of design wherein we ensure that the flow of information between the various design teams is a seamless process.

  During the intermittent stages of space programme, concept planning & schematic design we work closely with the end users and design consultants to ensure that the healthcare guidelines and requirements are incorporated keeping in sync with the vision of the project and the design theme. The finalization of contracting agencies marks the last major step before actual physical construction sets in.

  The project schedule along with communication, safety and quality SOPs serves as the reference manual during this phase. We work closely with all the stakeholders to ensure smooth deliverance, all the time emphasizing greatly on the three triads – cost, time and quality. We provide that extra edge to the construction management techniques by understanding the possible constraints in building a healthcare facility and mitigating them beforehand.

  This is the period spanning from the completion of physical construction till project turnover to the owner. It comprises activities such as cleaning of job site, demobilization of labor, creation and addressing of a punch list (snag list) of activities that need further attention, handover of project documents to the owner and training to owner’s team. We expedite all of the above activities to the utmost satisfaction of the owner.`,
    features: null,
    imagePath: "https://media.istockphoto.com/id/1411195926/photo/project-manager-working-on-laptop-and-updating-tasks-and-milestones-progress-planning-with.jpg?s=1024x1024&w=is&k=20&c=s8RW3X1fOgFhpBb_4-CVlAo_ZnR2HJnM-zoVWf9sWkM=" // Will be updated with actual path
  },
  {
    id: "interior_design",
    name: "Interior Design",
    description: `This is the complete design of the interior spaces, including public areas like waiting areas, and semi medical and medical areas like inpatient wards and rooms, intensive care units, surgical suite, Laboratory, Blood Bank, Dialysis, etc. We are uniquely positioned to provide interior design that combines aesthetic appropriateness with the specialized technical requirements of the critical medical areas.`,
    features: [
      "Medical Equipment Planning",
      "Biomedical Integration",
      "Project Management",
      "Commissioning & Validation"
    ],
    imagePath: "	https://www.hosmac.com/wp-content/uploads/2019/10/cosme-uae5.jpg" // Will be updated with actual path
  },
  {
    id: "hcs",
    name: "HCS",
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
  const [activeTab, setActiveTab] = useState("architecture");

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
        
        <Tabs defaultValue="architecture" className="w-full" onValueChange={setActiveTab}>
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
                  {Array.isArray(service.features) && service.features.length > 0 && (
                    <ul className="space-y-4">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="mr-3">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
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
