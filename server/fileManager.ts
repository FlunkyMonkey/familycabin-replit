import fs from 'fs';
import path from 'path';
import { Subscriber, InsertSubscriber } from '@shared/schema';

// Path to the subscribers file
const subscribersFilePath = path.join(process.cwd(), 'data', 'subscribers.txt');

// Ensure the data directory exists
export function ensureDataDirExists() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Create subscribers file if it doesn't exist
  if (!fs.existsSync(subscribersFilePath)) {
    fs.writeFileSync(subscribersFilePath, '', 'utf8');
  }
}

// Get all subscribers from the file
export function getSubscribers(): Subscriber[] {
  ensureDataDirExists();
  
  try {
    const fileContent = fs.readFileSync(subscribersFilePath, 'utf8');
    if (!fileContent.trim()) {
      return [];
    }
    
    return fileContent
      .split('\n')
      .filter(line => line.trim() !== '')
      .map((line, index) => {
        const [email, timestamp] = line.split(',');
        return {
          id: index + 1,
          email,
          createdAt: timestamp ? new Date(timestamp) : new Date()
        };
      });
  } catch (error) {
    console.error('Error reading subscribers file:', error);
    return [];
  }
}

// Save a new subscriber to the file
export function saveSubscriber(subscriber: InsertSubscriber): Subscriber {
  ensureDataDirExists();
  
  try {
    const subscribers = getSubscribers();
    
    // Check if email already exists
    const existingSubscriber = subscribers.find(s => s.email === subscriber.email);
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    // Create new subscriber
    const newSubscriber = {
      id: subscribers.length + 1,
      email: subscriber.email,
      createdAt: new Date()
    };
    
    // Append to file
    fs.appendFileSync(
      subscribersFilePath, 
      `${newSubscriber.email},${newSubscriber.createdAt.toISOString()}\n`, 
      'utf8'
    );
    
    return newSubscriber;
  } catch (error) {
    console.error('Error saving subscriber:', error);
    throw error;
  }
}

// Get a specific subscriber by email
export function getSubscriberByEmail(email: string): Subscriber | undefined {
  const subscribers = getSubscribers();
  return subscribers.find(s => s.email === email);
}

// Get a specific subscriber by ID
export function getSubscriberById(id: number): Subscriber | undefined {
  const subscribers = getSubscribers();
  return subscribers.find(s => s.id === id);
}