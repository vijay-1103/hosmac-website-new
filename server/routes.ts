// import type { Express } from "express";
// import { createServer, type Server } from "http";
// import { portfolioItems } from "../shared/data";

// export async function registerRoutes(app: Express): Promise<Server> {
//   // API endpoint to get all portfolio projects
//   app.get('/api/projects', (req, res) => {
//     res.json(portfolioItems);
//   });

//   // API endpoint to get a specific portfolio project by ID
//   app.get('/api/projects/:id', (req, res) => {
//     const projectId = parseInt(req.params.id);
//     const project = portfolioItems.find(p => p.id === projectId);
    
//     if (project) {
//       res.json(project);
//     } else {
//       res.status(404).json({ message: "Project not found" });
//     }
//   });

//   // API endpoint to get projects filtered by category
//   app.get('/api/projects/category/:category', (req, res) => {
//     const category = req.params.category.toLowerCase();
//     const filteredProjects = portfolioItems.filter(p => 
//       category === 'all' ? true : p.category.toLowerCase() === category
//     );
    
//     res.json(filteredProjects);
//   });

//   const httpServer = createServer(app);

//   return httpServer;
// }

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all projects with pagination
  app.get("/api/projects", async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 6;
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;
      
      const { projects, total } = await storage.getProjects({ page, limit, category, search });
      const featured = await storage.getFeaturedProjects();
      const categories = await storage.getCategories();
      
      res.json({ projects, featured, categories, total });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get a single project by ID
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const project = await storage.getProjectById(id);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get all articles
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json({ articles });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });
  
  const httpServer = createServer(app);

  return httpServer;
}
