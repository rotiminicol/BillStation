import { useState, useEffect } from 'react';
import { mockService, mockUser } from '@/services/mockData';

export interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (mock implementation)
    const checkAuth = async () => {
      try {
        const userData = await mockService.getMe();
        setUser(userData);
      } catch (error) {
        console.log('No user logged in');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await mockService.login(email, password);
      setUser(response.user);
      // Store mock token in localStorage for persistence
      localStorage.setItem('authToken', response.authToken);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData: any) => {
    try {
      const response = await mockService.signup(userData);
      setUser(response.user);
      localStorage.setItem('authToken', response.authToken);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return {
    user,
    login,
    signup,
    logout,
    isLoading
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
