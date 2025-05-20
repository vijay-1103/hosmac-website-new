import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Category } from "@shared/schema";

interface SecondaryNavProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  isLoading?: boolean;
}

export default function SecondaryNav({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  isLoading = false
}: SecondaryNavProps) {
  if (isLoading) {
    return (
      <div className="bg-[#F5F5F5] py-3 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex text-sm mb-2 md:mb-0">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-8 mx-2" />
              <Skeleton className="h-5 w-24" />
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] py-3 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Breadcrumb */}
          <div className="flex text-sm text-gray-500 mb-2 mr-5 md:mb-0">
            <Link href="/">
              <a className="hover:text-primary">Home</a>
            </Link>
            <span className="mx-5">/</span>
            <span className="text-primary">Projects</span>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-4  ml-5text-sm">
            <button
              onClick={() => onCategoryChange(null)}
              className={`${
                activeCategory === null
                  ? "text-primary font-medium"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              All Projects
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.name)}
                className={`${
                  activeCategory === category.name
                    ? "text-primary font-medium"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
