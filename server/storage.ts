import { 
  users, type User, type InsertUser,
  subscribers, type Subscriber, type InsertSubscriber
} from "@shared/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";

// modify the interface with any CRUD methods
// you might need

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

// PostgreSQL DB implementation
export class DbStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    // Use DATABASE_URL environment variable
    const connectionString = process.env.DATABASE_URL || '';
    const client = postgres(connectionString);
    this.db = drizzle(client);
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getSubscriber(id: number): Promise<Subscriber | undefined> {
    const result = await this.db.select().from(subscribers).where(eq(subscribers.id, id)).limit(1);
    return result[0];
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const result = await this.db.select().from(subscribers).where(eq(subscribers.email, email)).limit(1);
    return result[0];
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const result = await this.db.insert(subscribers).values(subscriber).returning();
    return result[0];
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return await this.db.select().from(subscribers).orderBy(subscribers.createdAt);
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subscribers: Map<number, Subscriber>;
  userCurrentId: number;
  subscriberCurrentId: number;

  constructor() {
    this.users = new Map();
    this.subscribers = new Map();
    this.userCurrentId = 1;
    this.subscriberCurrentId = 1;
  }

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

  async getSubscriber(id: number): Promise<Subscriber | undefined> {
    return this.subscribers.get(id);
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberCurrentId++;
    const createdAt = new Date();
    const subscriber: Subscriber = { ...insertSubscriber, id, createdAt };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values()).sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
  }
}

// Use PostgreSQL storage if DATABASE_URL is provided, otherwise fallback to in-memory
export const storage = process.env.DATABASE_URL 
  ? new DbStorage() 
  : new MemStorage();
