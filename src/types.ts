export interface Recipe {
  id: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  image?: string;
  ingredients: string[];
}

export interface CookingEvent {
  id: string;
  host: string;
  title: string;
  time: string;
  location: string;
  ingredientsNeeded: string[];
  participants: string[];
}

export interface UserProfile {
  name: string;
  streak: number;
  lastActive: string; // ISO date
  hostedEvents: string[]; // IDs
  joinedEvents: string[]; // IDs
  savedRecipes: string[]; // IDs
}
