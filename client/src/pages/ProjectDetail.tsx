import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Project } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Building, SquareEqual, Users, Bed, Award, Globe, Play, X } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const projectId = params?.id;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Fetch project details
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: [`/api/projects/${projectId}`],
  });

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center py-12">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="text-gray-500 mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Link href="/projects">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb navigation */}
      {/* <div className="bg-[#F5F5F5] py-3 border-b border-gray-200">
        <div className="container mr-10 ml-10 pl-5 pr-5">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>{project.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div> */}

      {/* Project Hero */}
      <div className="relative h-[50vh] bg-gray-900">
        <img 
          src={project.coverImage} 
          alt={project.name} 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="container mx-auto">
            <div className="flex items-center mb-2">
              {project.categories.map((category) => (
                <span key={category} className="bg-primary px-2 py-1 text-xs md:text-sm rounded mr-2 text-white font-medium">
                  {category}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{project.name}</h1>
            <div className="flex items-center text-white/90 text-sm md:text-base mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">{project.description}</p>

            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            
            {/* Main selected image or video */}
            <div className="mb-4">
              {showVideoModal && project.videoUrl ? (
                <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
                  <video 
                    // src={`${project.videoUrl}?autoplay=1`}
                    // className="absolute top-0 left-0 w-full h-full border-0"
                    // allow="autoplay; fullscreen; picture-in-picture"
                    // allowFullScreen
                    src={project.videoUrl}
                    autoPlay
                    controls
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                  ></video>
                </div>
              ) : (
                // <div className="relative bg-gray-100 rounded-lg h-[600px] flex items-center justify-center">
                //   <img 
                //     src={selectedImage || project.images[0]} 
                //     alt={`${project.name} - Featured`}
                //     className="w-full h-full object-cover"
                //     // className="max-w-full max-h-full"
                //   />
                  
                // </div>
                <div className="relative bg-gray-100 rounded-lg h-[500px] w-full">
                  <img
                    src={selectedImage || project.images[0]}
                    alt={`${project.name} - Featured`}
                    className="w-full h-full object-fill rounded-lg"
                  />
                </div>
              )}
              
              {/* Video modal close button */}
              {showVideoModal && (
                <button 
                  onClick={() => setShowVideoModal(false)} 
                  className="bg-white rounded-full p-1 shadow-md absolute top-4 right-4"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
            
            {/* Image thumbnails grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-8">
              {project.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`rounded-md overflow-hidden h-16 cursor-pointer border-2 ${selectedImage === image ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => { setSelectedImage(image); setShowVideoModal(false); }}
                >
                  <img 
                    src={image} 
                    alt={`${project.name} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition"
                  />
                </div>
              ))}
              {project.videoUrl && (
                <div 
                  className={`rounded-md overflow-hidden h-16 cursor-pointer border-2 ${showVideoModal ? 'border-primary' : 'border-transparent'} relative bg-gray-800`}
                  onClick={() => setShowVideoModal(true)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
              )}
            </div>

            {project.features && project.features.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="list-disc pl-5 mb-8 space-y-2 text-gray-700">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Project Type</p>
                      <p className="font-medium">{project.type}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Completion Date</p>
                      <p className="font-medium">{formatDate(project.completionDate)}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start">
                    <SquareEqual className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-medium">{project.area} sq.ft</p>
                    </div>
                  </div>
                  
                  {project.beds && (
                    <>
                      <Separator />
                      <div className="flex items-start">
                        <Bed className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Beds</p>
                          <p className="font-medium">{project.beds} Beds</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {project.client && (
                    <>
                      <Separator />
                      <div className="flex items-start">
                        <Users className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Client</p>
                          <p className="font-medium">{project.client}</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {project.awards && project.awards.length > 0 && (
                    <>
                      <Separator />
                      <div className="flex items-start">
                        <Award className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Awards</p>
                          <ul className="list-disc pl-4 text-sm">
                            {project.awards.map((award, index) => (
                              <li key={index}>{award}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {project.website && (
                    <>
                      <Separator />
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <a 
                            href={project.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-medium text-primary hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectDetailSkeleton() {
  return (
    <div>
      <div className="bg-[#F5F5F5] py-3 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <Skeleton className="h-6 w-48" />
        </div>
      </div>

      <div className="relative h-[50vh] bg-gray-900">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-8 w-60 mb-4" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-4/5 mb-8" />

            <Skeleton className="h-8 w-40 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>

          <div>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <Skeleton className="h-7 w-48 mb-4" />
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i}>
                      <div className="flex items-center">
                        <Skeleton className="h-5 w-5 mr-3" />
                        <div className="w-full">
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-5 w-40" />
                        </div>
                      </div>
                      {i < 4 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
