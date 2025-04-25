import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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
const API_URL = "/api/blog";

// Fetch all blog posts
const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.status}`);
  }
  return response.json();
};

// Fetch a single blog post by ID
const fetchBlogPostById = async (id: string): Promise<BlogPost> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch blog post: ${response.status}`);
  }
  return response.json();
};

// Create a new blog post
const createBlogPost = async (post: BlogPost): Promise<BlogPost> => {
  const response = await fetch(API_URL, {
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
  const response = await fetch(`${API_URL}/${post.id}`, {
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
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete blog post: ${response.status}`);
  }

  return true;
};

export const useBlogData = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all blog posts
  const fetchAllPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchBlogPosts();
      setPosts(data);

      // You can define featured posts based on specific criteria
      // For example, the first 3 posts or posts with a 'featured' property
      setFeaturedPosts(data.slice(0, 4));

      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error fetching blog posts:", err);
      setError(errorMessage);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch blog posts. Please try again later.",
      });

      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single blog post by ID
  const getPostById = async (id: string): Promise<BlogPost | null> => {
    // First check if we already have it in state
    const existingPost = posts.find((post) => post.id === id);
    if (existingPost) return existingPost;

    // Otherwise fetch from API
    setIsLoading(true);
    setError(null);

    try {
      const post = await fetchBlogPostById(id);
      return post;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error(`Error fetching blog post with ID ${id}:`, err);
      setError(errorMessage);

      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to fetch blog post. Please try again later.`,
      });

      return null;
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
      setPosts((prev) => [...prev, newPost]);

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

  // Update an existing blog post
  const updatePost = async (post: BlogPost) => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedPost = await updateBlogPost(post);
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)));

      // Update featuredPosts if needed
      setFeaturedPosts((prev) =>
        prev.map((p) => (p.id === post.id ? updatedPost : p))
      );

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
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setFeaturedPosts((prev) => prev.filter((p) => p.id !== id));

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

  // Search posts by title or content
  const searchPosts = (query: string): BlogPost[] => {
    const searchTerm = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm)
    );
  };

  // Filter posts by category
  const filterByCategory = (category: string): BlogPost[] => {
    return posts.filter((post) => post.category === category);
  };

  // Get recent posts
  const getRecentPosts = (count: number = 5): BlogPost[] => {
    return [...posts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  };

  // Get categories from posts
  const getCategories = (): string[] => {
    const categories = new Set<string>();
    posts.forEach((post) => categories.add(post.category));
    return Array.from(categories);
  };

  // Load blog posts on component mount
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return {
    posts,
    featuredPosts,
    isLoading,
    error,
    fetchAllPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost,
    searchPosts,
    filterByCategory,
    getRecentPosts,
    getCategories,
  };
};

export default useBlogData;
