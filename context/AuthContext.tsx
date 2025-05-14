"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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
  logout: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  addPost: (post: BlogPost) => Promise<BlogPost | null>;
  fetchPost: () => Promise<BlogPost[]>;
  updatePost: (post: BlogPost) => Promise<BlogPost | null>;
  deletePost: (id: string) => Promise<boolean>;
  checkAuth: () => Promise<boolean>;
}

// Define blog post type
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  tags?: string[];
}

// API URL - replace with your actual API endpoint
const API_URL = "/api/";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin credentials
const ADMIN_EMAIL = "admin@lumey.com";
const ADMIN_PASSWORD = "LE@=admin00";

// Mock admin user
const ADMIN_USER: User = {
  id: "admin-001",
  name: "Admin User",
  email: ADMIN_EMAIL,
  role: "admin",
};

// Create a new blog post
const fetchAllBlogs = async (): Promise<BlogPost[]> => {
  const response = await fetch(API_URL + "blog-posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to create blog post: ${response.status}`);
  }

  return response.json();
};

const createBlogPost = async (post: BlogPost): Promise<BlogPost> => {
  const response = await fetch(API_URL + "blog-posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(`Failed to create blog post: ${response.status}`);
  }

  return response.json();
};

// Update an existing blog post
const updateBlogPost = async (post: BlogPost): Promise<BlogPost> => {
  const response = await fetch(`${API_URL}blog-posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(`Failed to update blog post: ${response.status}`);
  }

  return response.json();
};

// Delete a blog post
const deleteBlogPost = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_URL}blog-posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete blog post: ${response.status}`);
  }

  return true;
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
        await new Promise((resolve) => setTimeout(resolve, 800));

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
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );

      toast({
        variant: "destructive",
        title: "Login failed",
        description:
          err instanceof Error
            ? err.message
            : "Login failed. Please try again.",
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

  // Add a new blog post
  const addPost = async (post: BlogPost) => {
    setIsLoading(true);
    setError(null);

    try {
      const newPost = await createBlogPost(post);

      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });

      return newPost;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error creating blog post:", err);
      setError(errorMessage);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create blog post. Please try again later.",
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPost = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const allPost = await fetchAllBlogs();

      // toast({
      //   title: "Success",
      //   description: "Blog post created successfully!",
      // });

      return allPost;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error creating blog post:", err);
      setError(errorMessage);

      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to create blog post. Please try again later.",
      // });

      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing blog post
  const updatePost = async (post: BlogPost) => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedPost = await updateBlogPost(post);

      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });

      return updatedPost;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error updating blog post:", err);
      setError(errorMessage);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update blog post. Please try again later.",
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a blog post
  const deletePost = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteBlogPost(id);

      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error deleting blog post:", err);
      setError(errorMessage);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete blog post. Please try again later.",
      });

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
    addPost,
    fetchPost,
    deletePost,
    updatePost,
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
