import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authAPI } from "@/services/api";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  balance: number;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      console.log('AuthProvider: Checking authentication...');
      try {
        const token = localStorage.getItem('authToken');
        console.log('AuthProvider: Token found:', !!token);
        if (token) {
          console.log('AuthProvider: Attempting to get user data...');
          const userData = await authAPI.getMe();
          console.log('AuthProvider: User data received:', userData);
          setUser(userData);
        } else {
          console.log('AuthProvider: No token found, user not authenticated');
        }
      } catch (error) {
        console.error('AuthProvider: Auth check failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        console.log('AuthProvider: Setting isLoading to false');
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user: userData, authToken } = await authAPI.login(email, password);
      
      // Store token in localStorage
      localStorage.setItem('authToken', authToken);
      
      // Set user in state
      setUser(userData);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Clear auth state regardless of API call success
      localStorage.removeItem('authToken');
      localStorage.removeItem('token'); // Clear any old token keys too
      setUser(null);
      navigate('/welcome');
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      const { user: newUser, authToken } = await authAPI.signup(userData);
      
      // Store token in localStorage
      localStorage.setItem('authToken', authToken);
      
      // Set user in state
      setUser(newUser);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
