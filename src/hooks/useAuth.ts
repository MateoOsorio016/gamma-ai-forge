import { useState, useEffect, createContext, useContext } from 'react';
import { AuthState, User, Company } from '@/types/common.types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  selectCompany: (company: Company) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    selectedCompany: null,
    isLoading: true,
  });

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulación de login - reemplazar con API real
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email,
        name: 'Usuario Demo',
        role: 'admin',
        companies: [
          {
            id: '1',
            name: 'Empresa Alpha',
            slug: 'alpha',
            plan: 'pro',
            isActive: true,
            description: 'Empresa líder en tecnología'
          },
          {
            id: '2',
            name: 'Beta Solutions',
            slug: 'beta',
            plan: 'enterprise',
            isActive: true,
            description: 'Soluciones empresariales'
          },
          {
            id: '3',
            name: 'Gamma Corp',
            slug: 'gamma',
            plan: 'basic',
            isActive: true,
            description: 'Corporación internacional'
          }
        ],
        preferences: {
          language: 'es',
          theme: 'system',
          notifications: true,
        }
      };

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        selectedCompany: null,
        isLoading: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      selectedCompany: null,
      isLoading: false,
    });
  };

  const selectCompany = (company: Company) => {
    setAuthState(prev => ({
      ...prev,
      selectedCompany: company,
    }));
  };

  useEffect(() => {
    // Simular verificación de sesión existente
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAuthState(prev => ({ ...prev, isLoading: false }));
    };
    
    checkAuth();
  }, []);

  return {
    ...authState,
    login,
    logout,
    selectCompany,
  };
};

export { AuthContext };