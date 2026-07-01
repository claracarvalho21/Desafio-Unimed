// frontend/src/contexts/AuthContext.tsx

import { createContext } from 'react';

export interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);