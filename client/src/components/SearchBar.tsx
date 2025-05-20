import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      onSearch("");
    }
  };

  return (
    <div className="bg-white py-4 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            type="text"
            placeholder="Search projects by name, location, or type..."
            className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={handleChange}
          />
          <button 
            type="submit" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
