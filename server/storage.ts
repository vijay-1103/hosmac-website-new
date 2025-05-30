// import { users, type User, type InsertUser } from "@shared/schema";
import { users, type User, type InsertUser, projects, articles, categories, Project, Article, Category } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Projects 
  getProjects(options: { page: number; limit: number; category?: string; search?: string }): Promise<{ projects: Project[]; total: number }>;
  getProjectById(id: number): Promise<Project | undefined>;
  getFeaturedProjects(): Promise<Project[]>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  
  // Articles
  getArticles(): Promise<Article[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;

  currentId: number;
  currentProjectId: number;
  currentCategoryId: number;
  currentArticleId: number;


  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.categories = new Map();
    this.articles = new Map();

    this.currentId = 1;
    this.currentProjectId = 1;
    this.currentCategoryId = 1;
    this.currentArticleId = 1;
    
    this.seedData();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
    
  // Project methods
  async getProjects({ page, limit, category, search }: { page: number; limit: number; category?: string; search?: string }): Promise<{ projects: Project[]; total: number }> {
    let filteredProjects = Array.from(this.projects.values());
    
    // Apply category filter if provided
    if (category) {
      filteredProjects = filteredProjects.filter(project => 
        project.categories.includes(category)
      );
    }
    
    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.name.toLowerCase().includes(searchLower) ||
        project.location.toLowerCase().includes(searchLower) ||
        project.type.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      projects: filteredProjects.slice(startIndex, endIndex),
      total: filteredProjects.length
    };
  }
  
  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.featured);
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  // Article methods
  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }
  
  // Seed the database with initial data
  private seedData() {
    // Seed categories
    const categoryData = [
      { name: "Healthcare", slug: "healthcare" },
      { name: "Hospitals", slug: "hospitals" },
      { name: "Clinics", slug: "clinics" },
      { name: "Laboratories", slug: "laboratories" },
      { name: "Wellness", slug: "wellness" }
    ];
    
    categoryData.forEach(cat => {
      const id = this.currentCategoryId++;
      this.categories.set(id, { ...cat, id });
    });
    
    // Seed projects
    const projectData: Array<Omit<Project, "id">> = [
      {
        name: "Shrimad Rajchandra Hospital",
        slug: "shrimad-rajchandra-hospital",
        description: "Shrimad Rajchandra Hospital and Research Centre is a 250-bed multi-specialty charitable hospital offering world-class healthcare, rarely seen in rural areas. Nestled in an ashram precinct with a rural backdrop, the 230,000 sq. ft. building features an open-arm design with narrow wings to maximize natural light and ventilation. Its down-to-earth aesthetics ensure that it remains welcoming and non-intimidating to patients from lower socioeconomic strata. In addition, we are designing an Animal Hospital, a compassionate initiative aimed at offering comprehensive charitable medical treatment for all types of animals under one roof.",
        location: "Dharampur (Gujarat), India",
        type: "Hospital",
        area: 230000,
        beds: 250,
        completionDate: "-",
        coverImage: "/assets/images/srims/1 (29).jpeg",
        images: [
          "/assets/images/srims/1 (29).jpeg",
          "/assets/images/srims/1 (34).jpeg",
          "/assets/images/srims/1 (35).jpeg"          
        ],
        videoUrl: "/assets/videos/srims/Madhav.mp4",
        client: "Shrimad Rajchandra Hospital",
        awards: ["-"],
        featured: true,
        categories: ["Healthcare", "Hospitals"],
        features: [
          "Advanced robotic surgery facilities",
          "Dedicated oncology wing with linear accelerators",
          "Smart patient rooms with integrated IoT technologies",
          "Healing gardens and therapeutic landscapes",
          "LEED Gold certification for sustainable design",
          "Modular construction approach for future expansion"
        ],
        website: "https://hospital.srmd.org/"
      },
      {
        name: "Believers Church Medical College Hospital",
        slug: "believers-church-medical-college-hospital",
        description: "Believers Church Medical College Hospital, a 650-bed NABH-accredited tertiary care center in Kerala, offers comprehensive medical services, state-of-the-art facilities, and specialized departments, including cardiology, neurology, and oncology. The attached medical college enrolls 100 MBBS students annually and offers a variety of postgraduate programs, fostering a holistic learning environment with extensive library and recreational facilities. The lush green campus, with an overall built-up area of 12,30,000 sq. ft., features buildings with exposed brick façades and GRC work. The main hospital building showcases Gothic architecture with stained glass and a central atrium.",
        location: "Thiruvella (Kerala), India",
        type: "Medical Hospital, Medical College, Teaching Hospital",
        area: 1230000,
        beds: 650,
        completionDate: "2023-01-20",
        coverImage: "/assets/images/bcmch/BCH5.png",
        images: [
          "/assets/images/bcmch/BCH5.png",
          "/assets/images/bcmch/2 (2).jpg",
          "/assets/images/bcmch/BCH3.png",
          "/assets/images/bcmch/BCH6.png",
          "/assets/images/bcmch/MAP.jpg",
        ],
        // videoUrl: "https://player.vimeo.com/video/714882934",
        videoUrl: null,
        client: "Believers Church",
        awards: ["-"],
        featured: true,
        categories: ["Healthcare", "Clinics"],
        features: [
          "Specialized cardiology diagnostic center",
          "Integrated digital health monitoring systems",
          "Sound-attenuated consultation spaces",
          "Touchless patient journey through digital check-in",
          "Modular furniture systems for operational flexibility"
        ],
        website: "https://www.bcmch.org/"
      },
      {
        name: "City General Hospital",
        slug: "city-general-hospital",
        description: "City General Hospital in Bangalore represents a comprehensive approach to urban healthcare delivery. This project involved the modernization of an existing facility and a significant expansion to serve the growing metropolitan population. The design prioritizes operational efficiency, infection control, and creates a welcoming environment for patients and staff.",
        location: "Bangalore, India",
        type: "Hospital",
        area: 320000,
        beds: 1280,
        completionDate: "2021-11-12",
        coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        images: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
        ],
        videoUrl: "https://player.vimeo.com/video/489646889",
        client: "City Healthcare Corporation",
        awards: [],
        featured: false,
        categories: ["Healthcare", "Hospitals"],
        features: [
          "Level 1 trauma center",
          "Hybrid operating rooms",
          "Centralized nurse stations with 360° visibility",
          "Dedicated research wing"
        ],
        website: null
      },
      {
        name: "HeartCare Specialty Center",
        slug: "heartcare-specialty-center",
        description: "The HeartCare Specialty Center in Chennai is a dedicated cardiovascular care facility featuring advanced diagnostic and treatment capabilities. The architecture balances technical requirements with human-centered design to reduce patient anxiety and support clinical excellence. Innovative layout strategies minimize travel distances for emergency cases while creating distinct zones for outpatient services.",
        location: "Chennai, India",
        type: "Specialty Clinic",
        area: 45000,
        beds: 80,
        completionDate: "2022-06-08",
        coverImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        images: [
          "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
        ],
        videoUrl: "https://player.vimeo.com/video/542542429",
        client: "CardioHealth India",
        awards: [],
        featured: false,
        categories: ["Healthcare", "Clinics"],
        features: [
          "Catheterization laboratories",
          "Non-invasive imaging suite",
          "Cardiac rehabilitation center",
          "Patient education spaces"
        ],
        website: null
      },
      {
        name: "Tranquil Wellness Resort",
        slug: "tranquil-wellness-resort",
        description: "Tranquil Wellness Resort in Goa integrates traditional healing practices with modern wellness approaches in a coastal setting. The architecture responds to the natural landscape, using local materials and passive design strategies to create a sustainable retreat. Indoor-outdoor connectivity and biophilic design principles enhance the healing environment.",
        location: "Goa, India",
        type: "Wellness",
        area: 32000,
        beds: null,
        completionDate: "2023-03-30",
        coverImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        images: [
          "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
        ],
        videoUrl: "https://player.vimeo.com/video/439307082",
        client: "Wellness Horizons Ltd.",
        awards: ["Hospitality Design Award 2023"],
        featured: false,
        categories: ["Healthcare", "Wellness"],
        features: [
          "Ayurvedic treatment pavilions",
          "Meditation gardens",
          "Hydrotherapy pools",
          "Yoga studios with ocean views",
          "Organic dining facilities"
        ],
        website: "https://www.tranquilwellness.com"
      },
      {
        name: "Smile Dental Network",
        slug: "smile-dental-network",
        description: "Smile Dental Network in Hyderabad is a modern dental care facility designed to transform the patient experience. The interiors use calming aesthetics and strategic layout to minimize dental anxiety. Advanced technology integration allows for precise treatments while maintaining a non-clinical atmosphere throughout the patient areas.",
        location: "Hyderabad, India",
        type: "Dental Clinic",
        area: 8500,
        beds: null,
        completionDate: "2022-09-15",
        coverImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        images: [
          "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
        ],
        videoUrl: "https://player.vimeo.com/video/373391713",
        client: "Smile Dental Care Group",
        awards: [],
        featured: false,
        categories: ["Healthcare", "Clinics"],
        features: [
          "Digital imaging center",
          "Child-friendly treatment areas",
          "Specialized cosmetic dentistry suite",
          "Patient relaxation lounge"
        ],
        website: null
      },
      {
        name: "Discovery Research Labs",
        slug: "discovery-research-labs",
        description: "Discovery Research Labs in Pune is a cutting-edge medical research facility designed to foster innovation and collaboration. The architecture creates flexible laboratory environments that can adapt to evolving research methodologies while meeting stringent safety and containment requirements. Shared amenity spaces encourage interdisciplinary interaction among researchers.",
        location: "Pune, India",
        type: "Laboratory",
        area: 65000,
        beds: null,
        completionDate: "2022-04-22",
        coverImage: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        images: [
          "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
        ],
        videoUrl: "https://player.vimeo.com/video/673245565",
        client: "BioGene Research Institute",
        awards: ["Research Facility Design Excellence 2022"],
        featured: false,
        categories: ["Healthcare", "Laboratories"],
        features: [
          "Biosafety Level 3 laboratories",
          "Advanced imaging facilities",
          "Open collaboration spaces",
          "Rooftop greenhouse for botanical research",
          "Modular lab benching systems"
        ],
        website: null
      },
      {
        name: "Horizon Rehabilitation Center",
        slug: "horizon-rehabilitation-center",
        description: "The Horizon Rehabilitation Center in Kolkata combines therapeutic environments with cutting-edge technology to support physical and neurological rehabilitation. The facility design emphasizes accessibility and progressive therapy spaces that simulate real-world environments. Indoor-outdoor connectivity provides varied settings for therapeutic activities and respite.",
        location: "Kolkata, India",
        type: "Rehabilitation",
        area: 42000,
        beds: 120,
        completionDate: "2022-10-05",
        coverImage: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        images: [
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
        ],
        videoUrl: "https://player.vimeo.com/video/289084642",
        client: "NeuroHealth Foundation",
        awards: [],
        featured: false,
        categories: ["Healthcare", "Hospitals"],
        features: [
          "Robotics-assisted therapy units",
          "Simulated home environments for activities of daily living",
          "Hydrotherapy pools with adjustable floors",
          "Adaptive sports facilities",
          "Therapeutic gardens with varied terrain"
        ],
        website: null
      }
    ];
    
    projectData.forEach(project => {
      const id = this.currentProjectId++;
      this.projects.set(id, { ...project, id });
    });
    
    // Seed articles
    const articleData = [
      {
        title: "Latest Trends in Healthcare Design: 2023 Edition",
        slug: "latest-trends-healthcare-design-2023",
        excerpt: "Exploring innovative approaches to healthcare facility design that prioritize patient experience and staff efficiency.",
        content: "The healthcare design landscape continues to evolve rapidly in 2023, with several key trends emerging across the industry. Facilities are increasingly adopting modular and flexible design approaches that can adapt to changing requirements and technologies. Patient-centered design has moved beyond a buzzword to become a fundamental organizing principle, with facilities incorporating elements like decentralized nursing stations, same-handed rooms, and family zones within patient spaces. Biophilic design elements continue to gain traction, with research supporting their positive impact on healing outcomes and staff wellbeing. The integration of digital technologies has accelerated, with facilities now planning for telemedicine suites, remote monitoring capabilities, and smart building systems from the early design phases. Sustainability has become non-negotiable, with healthcare organizations pursuing aggressive carbon reduction targets through energy-efficient systems, renewable energy integration, and sustainable material selection.",
        image: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        date: "2023-03-15",
        categories: ["Design", "Trends"]
      },
      {
        title: "Sustainable Design in Modern Healthcare Facilities",
        slug: "sustainable-design-modern-healthcare-facilities",
        excerpt: "How healthcare organizations are implementing eco-friendly practices and sustainable design to reduce environmental impact.",
        content: "Healthcare facilities have traditionally been resource-intensive operations, but a new wave of sustainable design strategies is transforming the sector. Leading organizations are embracing the challenge of reducing their environmental footprint while maintaining exceptional care quality. New construction projects are incorporating passive design strategies like optimal building orientation, high-performance building envelopes, and natural ventilation where appropriate. Energy systems are being reimagined with heat recovery systems, on-site renewable generation, and smart building controls to minimize consumption. Water conservation has become a priority through rainwater harvesting, gray water recycling, and water-efficient fixtures and equipment. Material selection now emphasizes low-VOC products, locally sourced materials, and elements with recycled content and end-of-life recyclability. Site design strategies incorporate permeable paving, native landscaping, and healing gardens that support both environmental goals and therapeutic outcomes. These integrated approaches are delivering measurable benefits in terms of operational costs, staff satisfaction, and environmental impact.",
        image: "https://pixabay.com/get/g0de2715662f29ef2d288e11bdc3cab298d45775aeedbc0cdaf04d457f0bfe4b146d9b5ce30ec439430e968fdfe846348294f93be1a132630409e39b47b7a1334_1280.jpg",
        date: "2023-03-08",
        categories: ["Sustainability", "Design"]
      },
      {
        title: "Digital Health Integration in Healthcare Facilities",
        slug: "digital-health-integration-healthcare-facilities",
        excerpt: "Strategies for designing healthcare spaces that accommodate advancing technologies and digital health solutions.",
        content: "The rapid growth of digital health technologies is reshaping healthcare facility design requirements as organizations work to integrate virtual care alongside traditional in-person services. Successful integration requires rethinking both physical spaces and infrastructure systems. Facilities are now incorporating dedicated telemedicine consultation rooms with appropriate lighting, acoustics, and backgrounds to support effective virtual interactions. Infrastructure planning has expanded to ensure robust wireless capabilities, sufficient bandwidth, and redundant systems to support mission-critical digital applications. Hybrid care models are emerging with spaces designed to support both virtual and in-person care simultaneously, including exam rooms equipped with integrated telehealth capabilities. Remote monitoring technologies are changing space requirements as more patients can be monitored from centralized locations. Staff work areas are being reimagined to support the growing roles of data analysts, informaticists, and virtual care coordinators who support these digital systems. As healthcare continues to expand beyond facility walls through digital platforms, organizations are reassessing their overall space needs and distribution strategies for the digital future.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        date: "2023-02-28",
        categories: ["Technology", "Design"]
      }
    ];
    
    articleData.forEach(article => {
      const id = this.currentArticleId++;
      this.articles.set(id, { ...article, id });
    });
  }
}

export const storage = new MemStorage();