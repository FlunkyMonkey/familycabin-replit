import { 
  User, InsertUser,
  Subscriber, InsertSubscriber
} from "@shared/schema";
import {
  getSubscribers,
  saveSubscriber,
  getSubscriberById,
  getSubscriberByEmail
} from "./fileManager";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subscriber methods
  getSubscriber(id: number): Promise<Subscriber | undefined>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getAllSubscribers(): Promise<Subscriber[]>;
}

export class FileStorage implements IStorage {
  private users: Map<number, User>;
  userCurrentId: number;

  constructor() {
    this.users = new Map();
    this.userCurrentId = 1;
  }

  // User methods - still using in-memory storage
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Subscriber methods - using file storage
  async getSubscriber(id: number): Promise<Subscriber | undefined> {
    return getSubscriberById(id);
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return getSubscriberByEmail(email);
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    return saveSubscriber(subscriber);
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return getSubscribers();
  }
}

// Create a single instance for the app to use
export const storage = new FileStorage();