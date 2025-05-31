import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define blog post type
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  content: string;
}

// API functions
const fetchBlogs = async (): Promise<BlogPost[]> => {
  const response = await fetch('/api/blogs');
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch blogs');
  }

  return data.blogs.map((blog: any) => ({
    id: blog._id,
    title: blog.title,
    excerpt: blog.excerpt,
    author: blog.author,
    date: new Date(blog.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    readTime: blog.readTime,
    image: blog.image,
    category: blog.category,
    content: blog.content
  }));
};

const createBlog = async (blog: BlogPost): Promise<{ success: boolean; message?: string; data?: BlogPost }> => {
  try {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to create blog post',
      };
    }

    return {
      success: true,
      data: data.blog,
    };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
};

const updateBlog = async (blog: BlogPost): Promise<{ success: boolean; message?: string; data?: BlogPost }> => {
  try {
    const response = await fetch(`/api/blogs/${blog.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to update blog post',
      };
    }

    return {
      success: true,
      data: data.blog,
    };
  } catch (error) {
    console.error('Error updating blog post:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
};

const deleteBlog = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete blog post');
    }

    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
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

  // Add a new blog post
  const addBlog = async (blog: BlogPost) => {
    setIsLoading(true);
    setError(null);
    try {
      const newBlog = await createBlog(blog);
      if (newBlog.success && newBlog.data) {
        const typedBlog: BlogPost = {
          ...newBlog.data,
          id: newBlog.data.id,
          title: newBlog.data.title,
          excerpt: newBlog.data.excerpt,
          author: newBlog.data.author,
          date: newBlog.data.date,
          readTime: newBlog.data.readTime,
          image: newBlog.data.image,
          category: newBlog.data.category,
          content: newBlog.data.content
        };
        setBlogs((prev) => [...prev, typedBlog]);
        toast({
          title: "Success",
          description: "Blog post created successfully!",
        });
        return typedBlog;
      } else {
        throw new Error(newBlog.message || 'Failed to create blog post');
      }
    } catch (err) {
      console.error("Error creating blog post:", err);
      setError("Failed to create blog post. Please try again later.");
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
  const updateExistingBlog = async (blog: BlogPost) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedBlog = await updateBlog(blog);
      if (updatedBlog.success && updatedBlog.data) {
        const typedBlog: BlogPost = {
          ...updatedBlog.data,
          id: updatedBlog.data.id,
          title: updatedBlog.data.title,
          excerpt: updatedBlog.data.excerpt,
          author: updatedBlog.data.author,
          date: updatedBlog.data.date,
          readTime: updatedBlog.data.readTime,
          image: updatedBlog.data.image,
          category: updatedBlog.data.category,
          content: updatedBlog.data.content
        };
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? typedBlog : b))
        );
        toast({
          title: "Success",
          description: "Blog post updated successfully!",
        });
        return typedBlog;
      } else {
        throw new Error(updatedBlog.message || 'Failed to update blog post');
      }
    } catch (err) {
      console.error("Error updating blog post:", err);
      setError("Failed to update blog post. Please try again later.");
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
  const removeBlog = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const success = await deleteBlog(id);
      if (success) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        toast({
          title: "Success",
          description: "Blog post deleted successfully!",
        });
        return true;
      } else {
        throw new Error('Failed to delete blog post');
      }
    } catch (err) {
      console.error("Error deleting blog post:", err);
      setError("Failed to delete blog post. Please try again later.");
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

  // Get a single blog post by ID
  const getBlogById = (id: string): BlogPost | undefined => {
    return blogs.find((blog) => blog.id === id);
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
