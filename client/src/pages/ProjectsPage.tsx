import { useQuery } from "@tanstack/react-query";
import SecondaryNav from "@/components/SecondaryNav";
import SearchBar from "@/components/SearchBar";
import ProjectGrid from "@/components/ProjectGrid";
import NewsSection from "@/components/NewsSection";
import { useState } from "react";
import { Project, Category, Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch projects data
  const { data: projectsData, isLoading: projectsLoading } = useQuery<{
    projects: Project[];
    featured: Project[];
    categories: Category[];
    total: number;
  }>({
    queryKey: ["/api/projects"],
  });
  
  // Fetch news/articles data
  const { data: articlesData, isLoading: articlesLoading } = useQuery<{
    articles: Article[];
  }>({
    queryKey: ["/api/articles"],
  });

  // Handle search input change
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle category filter change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <SecondaryNav 
        categories={projectsData?.categories || []} 
        activeCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        isLoading={projectsLoading}
      />
      
      <SearchBar onSearch={handleSearch} />
      
      {projectsLoading ? (
        <div className="py-8 bg-[#F5F5F5]">
          <div className="container mx-auto px-4">
            <Skeleton className="w-1/4 h-8 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="w-full h-48" />
                  <div className="p-4">
                    <Skeleton className="w-3/4 h-5 mb-2" />
                    <Skeleton className="w-1/2 h-4 mb-2" />
                    <div className="flex gap-2">
                      <Skeleton className="w-20 h-6" />
                      <Skeleton className="w-24 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ProjectGrid 
          projects={projectsData?.projects || []}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          currentPage={currentPage}
          totalProjects={projectsData?.total || 0}
          onPageChange={handlePageChange}
        />
      )}
      
      {articlesLoading ? (
        <div className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="w-1/4 h-8" />
              <Skeleton className="w-20 h-5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="w-full h-48" />
                  <div className="p-4">
                    <Skeleton className="w-24 h-4 mb-2" />
                    <Skeleton className="w-3/4 h-5 mb-3" />
                    <Skeleton className="w-full h-12" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NewsSection articles={articlesData?.articles || []} />
      )}
    </div>
  );
}