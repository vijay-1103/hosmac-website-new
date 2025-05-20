import { Article } from "@shared/schema";
import { Link } from "wouter";
import { formatDate } from "@/lib/utils";

interface NewsSectionProps {
  articles: Article[];
}

export default function NewsSection({ articles }: NewsSectionProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <a href="#" className="text-primary hover:underline">View all</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-2">{formatDate(article.date)}</div>
                <h3 className="text-lg font-bold hover:text-primary transition duration-300">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
