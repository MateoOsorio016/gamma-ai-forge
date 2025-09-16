export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'super_admin';
  companies: Company[];
  preferences: UserPreferences;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  slug: string;
  description?: string;
  plan: 'basic' | 'pro' | 'enterprise';
  isActive: boolean;
}

export interface UserPreferences {
  language: 'es' | 'en';
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  selectedCompany: Company | null;
  isLoading: boolean;
}

export type Language = 'es' | 'en';
export type Theme = 'light' | 'dark' | 'system';