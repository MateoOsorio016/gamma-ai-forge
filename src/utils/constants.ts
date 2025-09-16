// Application Constants
export const APP_CONFIG = {
  name: 'Gamma AI',
  version: '1.0.0',
  description: 'Plataforma de Agentes de Inteligencia Artificial',
} as const;

export const THEME_CONFIG = {
  defaultTheme: 'system',
  defaultLanguage: 'es',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.gamma-ai.com' 
    : 'http://localhost:3001',
  timeout: 10000,
} as const;

export const STORAGE_KEYS = {
  theme: 'gamma-theme',
  language: 'gamma-language',
  auth: 'gamma-auth',
  company: 'gamma-selected-company',
} as const;