import { Project } from "@shared/schema";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 h-full flex flex-col">
      <div className="relative">
        <img 
          src={project.coverImage} 
          alt={project.name} 
          className="w-full h-48 object-cover"
        />
        <div className="project-overlay absolute inset-0 bg-primary-dark bg-opacity-70 opacity-0 transition-opacity duration-300 flex items-center justify-center">
          <Link href={`/projects/${project.id}`}>
            <a className="px-4 py-2 bg-white text-primary rounded-md hover:bg-primary-light hover:text-white transition duration-300 text-sm font-medium">
              View Project
            </a>
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/projects/${project.id}`}>
          <a className="text-lg font-bold hover:text-primary transition duration-300">
            {project.name}
          </a>
        </Link>
        <p className="text-sm text-gray-500 mb-2">{project.location}</p>
        <div className="flex flex-wrap gap-2 mt-auto text-xs text-gray-500">
          {project.type && (
            <Badge variant="secondary" className="bg-[#F5F5F5] font-normal">
              {project.type}
            </Badge>
          )}
          {project.beds && (
            <Badge variant="secondary" className="bg-[#F5F5F5] font-normal">
              {formatNumber(project.beds)} Beds
            </Badge>
          )}
          {project.area && (
            <Badge variant="secondary" className="bg-[#F5F5F5] font-normal">
              {formatNumber(project.area)} sq.ft
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
