import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';
import axios from 'axios';


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);

  // Mock users data
  const mockUsers: User[] = [
    {
      id: 1,
      nom: 'Admin User',
      email: 'admin@tourism.com',
      motDePasse: 'admin123',
      role: 'admin',
      contact: '+33123456789',
    },
    {
      id: 2,
      nom: 'Client User',
      email: 'client@email.com',
      motDePasse: 'client123',
      role: 'client',
      contact: '+33987654321',
    }
  ];

 const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Login attempt with email:", email, "and password:", password);
    
    try {
      const response = await axios.post("http://localhost:4005/api/auth/login", {
        email: email,
        mot_de_passe: password
      });
      
      console.log(response.data);
      
      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token); // Stockez aussi le token si nécessaire
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return {
    user,
    login,
    logout,
    isAdmin: user?.role === 'admin'
  };
};