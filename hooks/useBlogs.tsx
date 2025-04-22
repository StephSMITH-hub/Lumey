
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define blog type
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  published: boolean;
  date: string;
  image: string;
  category: string;
  tags?: string[];
}

// Fake API functions (to be replaced with real API calls)
const fetchBlogPosts = (): Promise<BlogPost[]> => {
  return new Promise((resolve) => {
    // Simulating API delay
    setTimeout(() => {
      resolve([
        {
          id: "sustainable-energy-future",
          title: "Building a Sustainable Energy Future",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          excerpt: "How renewable energy is transforming Nigerian homes and businesses.",
          author: "Emmanuel Adegoke",
          published: true,
          date: "2025-03-15",
          image: "/images/blog/solar-panel.jpg",
          category: "Sustainability",
          tags: ["renewable energy", "solar power"]
        },
        {
          id: "power-outage-solutions",
          title: "Effective Solutions for Power Outages",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          excerpt: "Practical ways to keep your home powered during blackouts.",
          author: "Chioma Okafor",
          published: true,
          date: "2025-03-05",
          image: "/images/blog/power-outage.jpg",
          category: "Solutions",
          tags: ["power outage", "backup solutions"]
        },
        {
          id: "solar-power-tips",
          title: "Maximizing Your Solar Power System",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          excerpt: "Expert tips to get the most from your solar installation.",
          author: "David Johnson",
          published: true,
          date: "2025-02-20",
          image: "/images/blog/solar-setup.jpg",
          category: "Tips",
          tags: ["solar power", "efficiency"]
        }
      ]);
    }, 800);
  });
};

const createBlogPost = (post: BlogPost): Promise<BlogPost> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        ...post, 
        id: post.id || post.title.toLowerCase().replace(/\s+/g, '-'), 
        date: post.date || new Date().toISOString().split('T')[0] 
      });
    }, 800);
  });
};

const updateBlogPost = (post: BlogPost): Promise<BlogPost> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(post);
    }, 800);
  });
};

const deleteBlogPost = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 800);
  });
};

export const useBlogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all blog posts
  const fetchAllBlogPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchBlogPosts();
      setBlogPosts(data);
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("Failed to fetch blog posts. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch blog posts. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new blog post
  const addBlogPost = async (post: BlogPost) => {
    setIsLoading(true);
    setError(null);
    try {
      const newPost = await createBlogPost(post);
      setBlogPosts((prev) => [...prev, newPost]);
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
      return newPost;
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
  const updateExistingBlogPost = async (post: BlogPost) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedPost = await updateBlogPost(post);
      setBlogPosts((prev) =>
        prev.map((p) => (p.id === post.id ? updatedPost : p))
      );
      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });
      return updatedPost;
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
  const removeBlogPost = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteBlogPost(id);
      setBlogPosts((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });
      return true;
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
  const getBlogPostById = (id: string): BlogPost | undefined => {
    return blogPosts.find((post) => post.id === id);
  };

  // Load blog posts on component mount
  useEffect(() => {
    fetchAllBlogPosts();
  }, []);

  return {
    blogPosts,
    isLoading,
    error,
    fetchAllBlogPosts,
    addBlogPost,
    updateExistingBlogPost,
    removeBlogPost,
    getBlogPostById,
  };
};
