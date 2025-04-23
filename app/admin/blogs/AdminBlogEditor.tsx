import { useEffect, useState } from "react";
import { useParams, useNavigate } from "next/link";
import MDEditor from "@uiw/react-md-editor";
import {
  Save,
  Image,
  ArrowLeft,
  Eye,
  EyeOff,
  Tag,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { featuredPosts } from "@/data/blogData";

interface BlogFormData {
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

const AdminBlogEditor = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);

  // Set default form state
  const defaultFormData: BlogFormData = {
    id: "",
    title: "",
    excerpt: "",
    author: "",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readTime: "5 min read",
    image: "/images/farm.jpg",
    category: "",
    content:
      "# Start writing your blog post here\n\nThis is an example paragraph.",
  };

  const [formData, setFormData] = useState<BlogFormData>(defaultFormData);

  // Load blog data if editing an existing blog
  useEffect(() => {
    if (blogId) {
      document.title = "Edit Blog Post | Lumey Admin";

      const blogToEdit = featuredPosts.find((post) => post.id === blogId);

      if (blogToEdit) {
        setFormData(blogToEdit);
      } else {
        toast({
          variant: "destructive",
          title: "Blog not found",
          description: "The blog post you're trying to edit doesn't exist.",
        });
        navigate("/admin/blogs");
      }
    } else {
      document.title = "New Blog Post | Lumey Admin";
    }
  }, [blogId, navigate, toast]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.title ||
      !formData.excerpt ||
      !formData.content ||
      !formData.category ||
      !formData.author
    ) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    // In a real app, this would save to a database
    // For now, just show success message

    if (blogId) {
      toast({
        title: "Blog updated",
        description: "Your blog post has been successfully updated.",
      });
    } else {
      toast({
        title: "Blog created",
        description: "Your new blog post has been successfully created.",
      });
    }

    // Navigate back to blog list
    navigate("/admin/blogs");
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate ID from title
  const generateId = () => {
    if (formData.title) {
      const id = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");

      setFormData((prev) => ({ ...prev, id }));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/blogs")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold">
            {blogId ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Preview
              </>
            )}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-lumey-orange hover:bg-lumey-yellow"
          >
            <Save className="h-4 w-4 mr-2" />
            {blogId ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </div>

      <div
        className={`grid gap-6 ${
          showPreview ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Post Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter blog post title"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={generateId}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">Post ID/Slug</Label>
                <Input
                  id="id"
                  name="id"
                  placeholder="post-url-slug"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-gray-500">
                  This will be used in the URL. Use lowercase letters, numbers,
                  and hyphens only.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                placeholder="Brief summary of the blog post"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Author name"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="e.g. Industry Insights, Guides"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Publish Date</Label>
                <Input
                  id="date"
                  name="date"
                  placeholder="e.g. April 15, 2025"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  name="readTime"
                  placeholder="e.g. 5 min read"
                  value={formData.readTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  name="image"
                  placeholder="/images/your-image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  type="button"
                  className="flex-shrink-0"
                >
                  <Image className="h-4 w-4 mr-2" />
                  Browse
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Enter the path to the image file. Image must be already uploaded
                to the server.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown)</Label>
            <div className="border rounded-md">
              <MDEditor
                value={formData.content}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, content: value || "" }))
                }
                height={500}
                preview="edit"
              />
            </div>
            <p className="text-xs text-gray-500">
              Use Markdown to format your content. You can add headers, lists,
              links, and more.
            </p>
          </div>
        </form>

        {showPreview && (
          <div className="space-y-6">
            <div className="sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Post Preview</h2>
              <Card>
                <div className="aspect-video overflow-hidden relative">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt={formData.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-lumey-yellow/90 px-3 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      <span className="text-xs font-medium">
                        {formData.category || "Category"}
                      </span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h1 className="text-2xl font-bold mb-3">
                    {formData.title || "Blog Post Title"}
                  </h1>

                  <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{formData.author || "Author Name"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formData.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{formData.readTime}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">
                    {formData.excerpt || "Blog post excerpt will appear here."}
                  </p>

                  <div className="prose max-w-none">
                    <MDEditor.Markdown source={formData.content} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminBlogEditor;
