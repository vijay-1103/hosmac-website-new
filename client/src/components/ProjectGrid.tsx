import { useMemo } from "react";
import { Project } from "@shared/schema";
import ProjectCard from "@/components/ProjectCard";
import Pagination from "@/components/Pagination";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectGridProps {
  projects: Project[];
  searchTerm: string;
  selectedCategory: string | null;
  currentPage: number;
  totalProjects: number;
  onPageChange: (page: number) => void;
}

export default function ProjectGrid({
  projects,
  searchTerm,
  selectedCategory,
  currentPage,
  totalProjects,
  onPageChange,
}: ProjectGridProps) {
  // Filter projects based on search term and category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchTerm === "" ||
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === null ||
        project.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  // Calculate pagination
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(totalProjects / ITEMS_PER_PAGE);
  
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  return (
    <section className="py-8 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Projects</h2>
          
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>
        
        {/* Empty state */}
        {paginatedProjects.length === 0 && (
          <div className="bg-white rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No projects found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm && "Try adjusting your search or "}
              {selectedCategory && "changing the selected category or "}
              browse all projects.
            </p>
            {(searchTerm || selectedCategory) && (
              <Button
                onClick={() => {
                  onPageChange(1);
                  // Reset filters in parent component
                }}
              >
                View All Projects
              </Button>
            )}
          </div>
        )}
        
        {/* Project Grid */}
        {paginatedProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {filteredProjects.length > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </section>
  );
}
