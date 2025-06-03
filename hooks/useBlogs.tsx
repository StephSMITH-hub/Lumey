import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define blog post type
export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author_id: string;
  category_id: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  read_time: number;
  published_at: string;
  image: string;
  author?: {
    _id: string;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
  };
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  tags?: Array<{
    _id: string;
    name: string;
    slug: string;
  }>;
  related_posts?: BlogPost[];
}

// API functions
const fetchBlogs = async (): Promise<BlogPost[]> => {
  const response = await fetch('/api/blogs');
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  const data = await response.json();
  return data.blogs;
};

const fetchBlogById = async (slug: string): Promise<BlogPost> => {
  const response = await fetch(`/api/blogs/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  const data = await response.json();
  return data.blog;
};

const createBlog = async (blog: Omit<BlogPost, '_id'>): Promise<BlogPost> => {
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });

  if (!response.ok) {
    throw new Error('Failed to create blog');
  }

  const data = await response.json();
  return data.blog;
};

const updateBlog = async (id: string, blog: Partial<BlogPost>): Promise<BlogPost> => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });

  if (!response.ok) {
    throw new Error('Failed to update blog');
  }

  const data = await response.json();
  return data.blog;
};

const deleteBlog = async (id: string): Promise<void> => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete blog');
  }
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all blogs
  const fetchAllBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to fetch blogs. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch blogs. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new blog
  const addBlog = async (blog: Omit<BlogPost, '_id'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const newBlog = await createBlog(blog);
      setBlogs((prev) => [...prev, newBlog]);
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
      return newBlog;
    } catch (err) {
      console.error("Error creating blog:", err);
      setError("Failed to create blog. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create blog. Please try again later.",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing blog
  const updateExistingBlog = async (id: string, blog: Partial<BlogPost>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedBlog = await updateBlog(id, blog);
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? updatedBlog : b))
      );
      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });
      return updatedBlog;
    } catch (err) {
      console.error("Error updating blog:", err);
      setError("Failed to update blog. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update blog. Please try again later.",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a blog
  const removeBlog = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });
      return true;
    } catch (err) {
      console.error("Error deleting blog:", err);
      setError("Failed to delete blog. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete blog. Please try again later.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single blog by ID
  const getBlogById = async (slug: string): Promise<BlogPost | null> => {
    try {
      return await fetchBlogById(slug);
    } catch (err) {
      console.error("Error fetching blog:", err);
      return null;
    }
  };

  // Load blogs on component mount
  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return {
    blogs,
    isLoading,
    error,
    fetchAllBlogs,
    addBlog,
    updateExistingBlog,
    removeBlog,
    getBlogById,
  };
};

export default useBlogs;
