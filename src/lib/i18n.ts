import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      // Navigation
      home: 'Inicio',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
      dashboard: 'Panel de Control',
      settings: 'Configuración',
      profile: 'Perfil',
      
      // Home Page
      'home.title': 'Gamma AI',
      'home.subtitle': 'Plataforma de Agentes de Inteligencia Artificial',
      'home.construction': 'Sitio en Construcción',
      'home.description': 'Estamos trabajando para ofrecerte la mejor experiencia en creación y gestión de agentes de IA.',
      'home.cta': 'Ingresar al Sistema',
      
      // Login
      'login.title': 'Iniciar Sesión',
      'login.email': 'Correo Electrónico',
      'login.password': 'Contraseña',
      'login.submit': 'Ingresar',
      'login.remember': 'Recordarme',
      
      // Company Selection
      'companies.title': 'Seleccionar Empresa',
      'companies.subtitle': 'Elige la empresa con la que deseas trabajar',
      'companies.enter': 'Ingresar',
      
      // Dashboard
      'dashboard.title': 'Panel de Control',
      'dashboard.construction': 'Dashboard en Construcción',
      'dashboard.description': 'Pronto tendrás acceso a todas las funcionalidades de gestión de agentes de IA.',
      
      // Sidebar
      'sidebar.overview': 'Resumen',
      'sidebar.agents': 'Agentes',
      'sidebar.analytics': 'Analíticas',
      'sidebar.integrations': 'Integraciones',
      'sidebar.users': 'Usuarios',
      'sidebar.settings': 'Configuración',
      
      // Settings
      'settings.language': 'Idioma',
      'settings.theme': 'Tema',
      'settings.profile': 'Perfil del Usuario',
      'settings.appearance': 'Apariencia',
      
      // Theme
      'theme.light': 'Claro',
      'theme.dark': 'Oscuro',
      'theme.system': 'Sistema',
    }
  },
  en: {
    translation: {
      // Navigation
      home: 'Home',
      login: 'Login',
      logout: 'Logout',
      dashboard: 'Dashboard',
      settings: 'Settings',
      profile: 'Profile',
      
      // Home Page
      'home.title': 'Gamma AI',
      'home.subtitle': 'Artificial Intelligence Agents Platform',
      'home.construction': 'Under Construction',
      'home.description': 'We are working to provide you with the best experience in creating and managing AI agents.',
      'home.cta': 'Enter System',
      
      // Login
      'login.title': 'Sign In',
      'login.email': 'Email',
      'login.password': 'Password',
      'login.submit': 'Sign In',
      'login.remember': 'Remember me',
      
      // Company Selection
      'companies.title': 'Select Company',
      'companies.subtitle': 'Choose the company you want to work with',
      'companies.enter': 'Enter',
      
      // Dashboard
      'dashboard.title': 'Dashboard',
      'dashboard.construction': 'Dashboard Under Construction',
      'dashboard.description': 'Soon you will have access to all AI agent management functionalities.',
      
      // Sidebar
      'sidebar.overview': 'Overview',
      'sidebar.agents': 'Agents',
      'sidebar.analytics': 'Analytics',
      'sidebar.integrations': 'Integrations',
      'sidebar.users': 'Users',
      'sidebar.settings': 'Settings',
      
      // Settings
      'settings.language': 'Language',
      'settings.theme': 'Theme',
      'settings.profile': 'User Profile',
      'settings.appearance': 'Appearance',
      
      // Theme
      'theme.light': 'Light',
      'theme.dark': 'Dark',
      'theme.system': 'System',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;