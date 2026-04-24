import { Recipe, CookingEvent, UserProfile } from '../types';

const STORAGE_KEYS = {
  USER: 'wagner_cooking_user',
  EVENTS: 'wagner_cooking_events',
  RECIPES: 'wagner_cooking_recipes',
};

const DEFAULT_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Dorm Room Pad Thai',
    author: 'Sarah W.',
    description: 'Quick and easy with peanut butter and ramen noodles.',
    tags: ['Vegetarian', 'Under $10', 'Quick'],
    ingredients: ['Peanut butter', 'Ramen', 'Lime', 'Soy sauce'],
  },
  {
    id: '2',
    title: 'Wagner Wild Berry Salad',
    author: 'Chef Mike',
    description: 'A refreshing salad using berries from the local market.',
    tags: ['Healthy', 'Vegan'],
    ingredients: ['Spinach', 'Blueberries', 'Walnuts', 'Balsamic'],
  },
  {
    id: '3',
    title: 'Midnight Pasta',
    author: 'David L.',
    description: 'Perfect for late-night study sessions.',
    tags: ['Under $5', 'Garlic Lovers'],
    ingredients: ['Pasta', 'Garlic', 'Olive oil', 'Chili flakes'],
  }
];

const DEFAULT_EVENTS: CookingEvent[] = [
  {
    id: 'e1',
    host: 'Emma J.',
    title: 'Taco Tuesday @ Harborview',
    time: 'Tuesday, 6:00 PM',
    location: 'Harborview Hall Kitchen',
    ingredientsNeeded: ['Cilantro', 'Onions', 'Taco shells'],
    participants: ['user123', 'emma_j'],
  },
  {
    id: 'e2',
    host: 'Liam K.',
    title: 'Sunday Roast Prep',
    time: 'Sunday, 12:00 PM',
    location: 'Guild Hall Lounge',
    ingredientsNeeded: ['Potatoes', 'Carrots', 'Herbs'],
    participants: ['liam_k'],
  }
];

export const getStoredUser = (): UserProfile => {
  const stored = localStorage.getItem(STORAGE_KEYS.USER);
  if (stored) return JSON.parse(stored);
  
  const newUser: UserProfile = {
    name: 'Wagner Cook',
    streak: 4,
    lastActive: new Date().toISOString(),
    hostedEvents: ['e1'],
    joinedEvents: ['e2'],
    savedRecipes: ['1', '3'],
  };
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
  return newUser;
};

export const updateStoredUser = (user: UserProfile) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getStoredEvents = (): CookingEvent[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.EVENTS);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(DEFAULT_EVENTS));
  return DEFAULT_EVENTS;
};

export const saveEvent = (event: CookingEvent) => {
  const events = getStoredEvents();
  events.push(event);
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
};

export const getStoredRecipes = (): Recipe[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.RECIPES);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(DEFAULT_RECIPES));
  return DEFAULT_RECIPES;
};

export const updateStreak = () => {
  const user = getStoredUser();
  const lastActive = new Date(user.lastActive);
  const now = new Date();
  
  // Simple streak logic: if last active was yesterday, increment. If today, stay same. Else reset.
  const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    user.streak += 1;
  } else if (diffDays > 1) {
    user.streak = 1;
  }
  
  user.lastActive = now.toISOString();
  updateStoredUser(user);
};
