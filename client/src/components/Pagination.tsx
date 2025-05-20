import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Generate page buttons
  const getPageButtons = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range to show around current page
    let rangeStart = Math.max(2, currentPage - 1);
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust range if at edges
    if (currentPage <= 2) {
      rangeEnd = Math.min(4, totalPages - 1);
    }
    if (currentPage >= totalPages - 1) {
      rangeStart = Math.max(2, totalPages - 3);
    }
    
    // Add ellipsis if needed
    if (rangeStart > 2) {
      pages.push("...");
    }
    
    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed
    if (rangeEnd < totalPages - 1) {
      pages.push("...");
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="inline-flex rounded-md shadow-sm">
        <Button 
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="rounded-r-none"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        
        {getPageButtons().map((page, index) => (
          typeof page === "number" ? (
            <Button
              key={index}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="rounded-none border-l-0"
            >
              {page}
            </Button>
          ) : (
            <Button
              key={index}
              variant="outline"
              size="sm"
              disabled
              className="rounded-none border-l-0 px-2"
            >
              {page}
            </Button>
          )
        ))}
        
        <Button 
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="rounded-l-none border-l-0"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
