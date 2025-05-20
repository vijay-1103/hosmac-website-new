export interface PortfolioItem {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
  category: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "General Hospital Expansion",
    location: "New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "hospitals"
  },
  {
    id: 2,
    title: "Medical Research Center",
    location: "Chicago, IL",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "research"
  },
  {
    id: 3,
    title: "Specialized Clinic Facility",
    location: "San Francisco, CA",
    imageUrl: "https://images.unsplash.com/photo-1581056771107-24695e0d75ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "clinics"
  },
  {
    id: 4,
    title: "Healthcare Campus Infrastructure",
    location: "Seattle, WA",
    imageUrl: "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "infrastructure"
  },
  {
    id: 5,
    title: "Emergency Care Center",
    location: "Boston, MA",
    imageUrl: "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "emergency"
  },
  {
    id: 6,
    title: "Rehabilitation Center",
    location: "Austin, TX",
    imageUrl: "https://images.unsplash.com/photo-1551601651-09492b5468b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "rehabilitation"
  }
];
