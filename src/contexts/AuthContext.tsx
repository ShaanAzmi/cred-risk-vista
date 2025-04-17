
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Mock user data
export interface User {
  id: string;
  email: string;
  name: string;
  isBankLinked: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  linkBank: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    // Mock authentication
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Basic validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // Mock successful login
      setUser({
        id: "user-123",
        email,
        name: email.split("@")[0],
        isBankLinked: false,
      });
      
      toast({
        title: "Login Successful",
        description: "Welcome to Cred Risk Predict",
      });
      
      navigate("/link-bank");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const linkBank = () => {
    if (!user) return;
    
    // Update user with linked bank
    setUser({
      ...user,
      isBankLinked: true,
    });
    
    toast({
      title: "Bank Account Linked",
      description: "Your bank account has been successfully linked",
    });
    
    navigate("/dashboard");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, linkBank }}>
      {children}
    </AuthContext.Provider>
  );
};
