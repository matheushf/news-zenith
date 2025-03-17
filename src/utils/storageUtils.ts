import { UserPreferences } from '@/types/news';

const USER_PREFS_KEY = 'newsUserPreferences';

const defaultPreferences: UserPreferences & { preferredAuthors?: string[] } = {
  preferredSources: [],
  preferredCategories: [],
  preferredAuthors: []
};

export const getUserPreferences = (): UserPreferences & { preferredAuthors?: string[] } => {
  if (typeof window === 'undefined') {
    return defaultPreferences;
  }
  
  try {
    const savedPrefs = localStorage.getItem(USER_PREFS_KEY);
    if (!savedPrefs) {
      return defaultPreferences;
    }
    
    const parsedPrefs = JSON.parse(savedPrefs);
    return {
      preferredSources: parsedPrefs.preferredSources || [],
      preferredCategories: parsedPrefs.preferredCategories || [],
      preferredAuthors: parsedPrefs.preferredAuthors || []
    };
  } catch (error) {
    console.error('Error retrieving user preferences:', error);
    return defaultPreferences;
  }
};

export const saveUserPreferences = (preferences: UserPreferences & { preferredAuthors?: string[] }): UserPreferences & { preferredAuthors?: string[] } => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_PREFS_KEY, JSON.stringify(preferences));
  }
  return preferences;
};

export const toggleSourcePreference = (sourceId: string): UserPreferences & { preferredAuthors?: string[] } => {
  const preferences = getUserPreferences();
  
  const sourceIndex = preferences.preferredSources.indexOf(sourceId);
  if (sourceIndex === -1) {
    preferences.preferredSources.push(sourceId);
  } else {
    preferences.preferredSources.splice(sourceIndex, 1);
  }
  
  return saveUserPreferences(preferences);
};

export const toggleCategoryPreference = (category: string): UserPreferences & { preferredAuthors?: string[] } => {
  const preferences = getUserPreferences();
  
  const categoryIndex = preferences.preferredCategories.indexOf(category);
  if (categoryIndex === -1) {
    preferences.preferredCategories.push(category);
  } else {
    preferences.preferredCategories.splice(categoryIndex, 1);
  }
  
  return saveUserPreferences(preferences);
};

export const toggleAuthorPreference = (author: string): UserPreferences & { preferredAuthors?: string[] } => {
  const preferences = getUserPreferences();
  
  if (!preferences.preferredAuthors) {
    preferences.preferredAuthors = [];
  }
  
  const authorIndex = preferences.preferredAuthors.indexOf(author);
  if (authorIndex === -1) {
    preferences.preferredAuthors.push(author);
  } else {
    preferences.preferredAuthors.splice(authorIndex, 1);
  }
  
  return saveUserPreferences(preferences);
};
