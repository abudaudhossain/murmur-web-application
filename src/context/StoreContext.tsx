"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";



interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  confirmed: boolean;
  avatar: string
  accessToken: string;
  // lastLogin: string; // or Date
}

// Define the shape of the context
interface StoreContextType {
  user: UserType | null;
  setUser: (value: UserType | null) => void;
}

// Create the context with a default value of undefined
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Define props for the provider
interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {

  const [user, setUser] = useLocalStorage<UserType | null>("user", null);
  return (
    <StoreContext.Provider value={{ user, setUser }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to consume the context
export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
