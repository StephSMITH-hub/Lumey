
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Edit, 
  Trash2, 
  Plus, 
  Calendar, 
  User, 
  Search,
  Eye,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Import sample blog data from FeaturedBlogs
import { featuredPosts } from "@/data/blogData";

const AdminBlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState(featuredPosts);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Set document title
  useEffect(() => {
    document.title = "Manage Blogs | Lumey Admin";
  }, []);

  // Filter blogs based on search query
  const filteredBlogs = blogPosts.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogPosts(prev => prev.filter(post => post.id !== id));
      toast({
        title: "Blog post deleted",
        description: "The blog post has been successfully deleted.",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Manage Blog Posts</h1>
        <Button 
          onClick={() => navigate("/admin/blogs/new")}
          className="bg-lumey-orange hover:bg-lumey-yellow"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Blog Post
        </Button>
      </div>
      
      <div className="bg-white rounded-md shadow mb-6">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search blogs by title, author or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">
                  <div className="flex items-center space-x-1">
                    <span>Title</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Author</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-gray-500" />
                        {blog.author}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="bg-lumey-yellow/20 text-lumey-orange px-2 py-1 rounded-full text-xs font-medium">
                        {blog.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        {blog.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => window.open(`/blog/${blog.id}`, '_blank')}
                          title="View post"
                        >
                          <Eye className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                          title="Edit post"
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(blog.id)}
                          title="Delete post"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No blog posts found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AdminBlogList;
