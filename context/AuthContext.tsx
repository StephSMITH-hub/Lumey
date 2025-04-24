
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin credentials
const ADMIN_EMAIL = "admin@lumey.com";
const ADMIN_PASSWORD = "admin123";

// Mock admin user
const ADMIN_USER: User = {
  id: "admin-001",
  name: "Admin User",
  email: ADMIN_EMAIL,
  role: "admin",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuthOnLoad = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    
    checkAuthOnLoad();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we're just checking against hardcoded values
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Save user to local storage
        localStorage.setItem("lumey_auth_user", JSON.stringify(ADMIN_USER));
        setUser(ADMIN_USER);
        
        toast({
          title: "Login successful",
          description: "Welcome back, Admin!",
        });
        
        return true;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err instanceof Error ? err.message : "Login failed. Please try again.",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Remove user from local storage
    localStorage.removeItem("lumey_auth_user");
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Check if user is authenticated
  const checkAuth = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would verify the token with the server
      const storedUser = localStorage.getItem("lumey_auth_user");
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        return true;
      }
      
      return false;
    } catch (err) {
      console.error("Auth check error:", err);
      setError("Authentication check failed.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
