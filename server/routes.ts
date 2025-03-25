import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { subscriberFormSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Subscribers API Routes
  
  // Create a new subscriber
  app.post("/api/subscribers", async (req: Request, res: Response) => {
    try {
      // Validate the request body against our schema
      const validatedData = subscriberFormSchema.parse(req.body);
      
      // Check if the email already exists
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      if (existingSubscriber) {
        return res.status(409).json({ 
          message: "This email is already registered." 
        });
      }
      
      // Create the subscriber
      const subscriber = await storage.createSubscriber(validatedData);
      
      // Return the created subscriber (omit sensitive data if needed)
      return res.status(201).json({ 
        id: subscriber.id,
        email: subscriber.email,
        message: "Thank you for signing up!" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        return res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.format() 
        });
      }
      
      console.error("Error creating subscriber:", error);
      return res.status(500).json({ 
        message: "An error occurred while processing your request." 
      });
    }
  });

  // Get all subscribers (could be protected in a real app)
  app.get("/api/subscribers", async (_req: Request, res: Response) => {
    try {
      const subscribers = await storage.getAllSubscribers();
      return res.json(subscribers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      return res.status(500).json({ 
        message: "An error occurred while retrieving subscribers." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
