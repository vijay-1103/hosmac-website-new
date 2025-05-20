// import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { pgTable, text, serial, integer, boolean, date, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Project Category
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  area: integer("area").notNull(), // in square feet
  beds: integer("beds"), // optional for non-hospital projects
  completionDate: text("completion_date").notNull(),
  coverImage: text("cover_image").notNull(),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  videoUrl: text("video_url"), // URL for project video
  client: text("client"),
  awards: jsonb("awards").$type<string[]>().default([]),
  featured: boolean("featured").default(false),
  categories: jsonb("categories").$type<string[]>().notNull().default([]),
  features: jsonb("features").$type<string[]>().default([]),
  website: text("website"),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  slug: true,
  description: true,
  location: true,
  type: true,
  area: true,
  beds: true,
  completionDate: true,
  coverImage: true,
  images: true,
  videoUrl: true,
  client: true,
  awards: true,
  featured: true,
  categories: true,
  features: true,
  website: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Articles/News
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  date: text("date").notNull(),
  categories: jsonb("categories").$type<string[]>().notNull().default([]),
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  slug: true,
  excerpt: true, 
  content: true,
  image: true,
  date: true,
  categories: true,
});

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

// Users (keeping from original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;